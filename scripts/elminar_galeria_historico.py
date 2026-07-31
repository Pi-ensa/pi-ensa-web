"""Elimina las fotografías de las galerías y limpia sus filas en noticias.md."""

from __future__ import annotations

from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
NEWS_FILE = ROOT / "src/content/paginas/noticias.md"
PHOTO_EXTENSIONS = {
    ".avif",
    ".gif",
    ".heic",
    ".heif",
    ".jpeg",
    ".jpg",
    ".png",
    ".tif",
    ".tiff",
    ".webp",
}
GALLERY_FOLDERS = (
    ROOT / "fotos_originales/graduacion",
    ROOT / "fotos_originales/talleres_periodo",
    ROOT / "public/fotos_publicables/graduacion",
    ROOT / "public/fotos_publicables/talleres_periodo",
)


def news_without_gallery_rows() -> str:
    lines = NEWS_FILE.read_text(encoding="utf-8").splitlines()
    heading_index = lines.index("## Galerías de noticias")
    header_index = next(
        index for index in range(heading_index + 1, len(lines)) if lines[index].lstrip().startswith("|")
    )
    separator_index = header_index + 1
    section_end = next(
        (index for index in range(separator_index + 1, len(lines)) if lines[index].startswith("## ")),
        len(lines),
    )

    updated = lines[: separator_index + 1]
    if section_end < len(lines):
        updated += [""] + lines[section_end:]
    return "\n".join(updated).rstrip() + "\n"


def remove_photos(folder: Path) -> int:
    folder.mkdir(parents=True, exist_ok=True)
    removed = 0
    for path in folder.iterdir():
        if path.is_file() and path.suffix.casefold() in PHOTO_EXTENSIONS:
            path.unlink()
            removed += 1
    return removed


def main() -> None:
    cleaned_news = news_without_gallery_rows()
    print("Se eliminarán las fotografías originales y publicables de ambas galerías.")
    confirmation = input("Escribe ELIMINAR para continuar: ").strip()
    if confirmation != "ELIMINAR":
        print("Operación cancelada. No se modificó ningún archivo.")
        return

    removed = sum(remove_photos(folder) for folder in GALLERY_FOLDERS)
    NEWS_FILE.write_text(cleaned_news, encoding="utf-8")
    print(f"Se eliminaron {removed} fotografía(s).")
    print("La tabla Galerías de noticias quedó vacía.")


if __name__ == "__main__":
    main()
