import contextlib
import io
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

import elminar_galeria_historico as cleanup
import preparar_galerias as prepare
from PIL import Image


def news_source(title="Graduación 2027", folder="graduacion"):
    return (
        "# Noticias\n\n## Noticias publicadas\n\n"
        "| Fecha | Título | Descripción | Enlace | Popup | Mostrar | Galería |\n"
        "| --- | --- | --- | --- | --- | --- | --- |\n"
        f"| Por definir | {title} | Texto | | Galería | No | {folder} |\n\n"
        "## Galerías de noticias\n\n"
        "| Galería | Imagen | Texto alternativo |\n"
        "| --- | --- | --- |\n\n"
        "## Otra sección\n\nContenido que debe conservarse.\n"
    )


class GalleryTests(unittest.TestCase):
    def test_titles_come_from_markdown_and_allow_escaped_pipes(self):
        galleries = prepare.configured_galleries(news_source(r"Graduación \| 2027"))
        self.assertEqual(galleries, (prepare.Gallery("graduacion", "Graduación | 2027"),))

    def test_unassigned_galleries_are_skipped(self):
        self.assertEqual(prepare.configured_galleries(news_source(folder="")), ())

    def test_unknown_or_duplicate_folder_is_rejected(self):
        with self.assertRaises(ValueError):
            prepare.configured_galleries(news_source(folder="../otra"))
        duplicate = news_source().replace(
            "\n\n## Galerías de noticias",
            "\n| Otra fecha | Otro título | Texto | | Galería | Sí | graduacion |\n\n## Galerías de noticias",
        )
        with self.assertRaises(ValueError):
            prepare.configured_galleries(duplicate)

    def test_prepare_and_cleanup_use_only_temporary_photos(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            news = root / "noticias.md"
            news.write_text(news_source(), encoding="utf-8")
            with patch.object(prepare, "ROOT", root), patch.object(prepare, "NEWS_FILE", news):
                gallery = prepare.configured_galleries(news.read_text(encoding="utf-8"))[0]
                gallery.source.mkdir(parents=True)
                gallery.destination.mkdir(parents=True)
                (gallery.destination / ".gitkeep").touch()
                Image.new("RGB", (2400, 1200), "red").save(gallery.source / "foto10.jpg")
                Image.new("RGB", (2400, 1200), "blue").save(gallery.source / "foto2.jpg")
                self.assertEqual([p.name for p in prepare.source_images(gallery.source)], ["foto2.jpg", "foto10.jpg"])
                with contextlib.redirect_stdout(io.StringIO()):
                    prepare.main()
                outputs = sorted(gallery.destination.glob("*.webp"))
                self.assertEqual([p.name for p in outputs], ["001.webp", "002.webp"])
                for output in outputs:
                    with Image.open(output) as image:
                        self.assertEqual(image.size, (1800, 900))
                    self.assertLessEqual(output.stat().st_size, prepare.MAX_FILE_SIZE)
                generated = news.read_text(encoding="utf-8")
                self.assertIn("| graduacion | /fotos_publicables/graduacion/001.webp |", generated)
                self.assertIn("Fotografía 1 de Graduación 2027.", generated)
                self.assertEqual(generated.split("## Galerías de noticias")[0], news_source().split("## Galerías de noticias")[0])
                self.assertIn("Contenido que debe conservarse.", generated)
                self.assertEqual(len(list(gallery.source.glob("*.jpg"))), 2)

                with patch.object(cleanup, "NEWS_FILE", news), patch.object(cleanup, "GALLERY_FOLDERS", (gallery.source, gallery.destination)):
                    with patch("builtins.input", return_value="NO"), contextlib.redirect_stdout(io.StringIO()):
                        cleanup.main()
                    self.assertEqual(news.read_text(encoding="utf-8"), generated)
                    self.assertTrue(outputs[0].exists())
                    with patch("builtins.input", return_value="ELIMINAR"), contextlib.redirect_stdout(io.StringIO()):
                        cleanup.main()
                    self.assertFalse(list(gallery.source.glob("*.jpg")))
                    self.assertFalse(list(gallery.destination.glob("*.webp")))
                    self.assertTrue((gallery.destination / ".gitkeep").exists())
                    cleaned = news.read_text(encoding="utf-8")
                    self.assertNotIn("/fotos_publicables/", cleaned)
                    self.assertIn("Contenido que debe conservarse.", cleaned)


if __name__ == "__main__":
    unittest.main()
