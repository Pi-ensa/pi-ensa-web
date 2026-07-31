"""Prepara las galerías públicas de PI-ENSA y actualiza noticias.md."""

from __future__ import annotations

import io
import re
from dataclasses import dataclass
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError as exc:
    raise SystemExit(
        "Falta Pillow. Ejecuta: python -m pip install -r requirements-galerias.txt"
    ) from exc


ROOT = Path(__file__).resolve().parents[1]
NEWS_FILE = ROOT / "src/content/paginas/noticias.md"
SUPPORTED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_SIDE = 1800
MAX_FILE_SIZE = 600 * 1024


@dataclass(frozen=True)
class Gallery:
    folder: str
    news_title: str

    @property
    def source(self) -> Path:
        return ROOT / "fotos_originales" / self.folder

    @property
    def destination(self) -> Path:
        return ROOT / "public" / "fotos_publicables" / self.folder


GALLERIES = (
    Gallery("graduacion", "Graduación Otoño 2026"),
    Gallery("talleres_periodo", "Talleres Primavera 2026"),
)


def natural_key(path: Path) -> list[object]:
    return [int(part) if part.isdigit() else part.casefold() for part in re.split(r"(\d+)", path.name)]


def source_images(folder: Path) -> list[Path]:
    return sorted(
        (path for path in folder.iterdir() if path.is_file() and path.suffix.casefold() in SUPPORTED_EXTENSIONS),
        key=natural_key,
    )


def encode_webp(image: Image.Image) -> bytes:
    working = image
    for scale in (1.0, 0.9, 0.8, 0.7):
        if scale < 1.0:
            width = max(1, round(image.width * scale))
            height = max(1, round(image.height * scale))
            working = image.resize((width, height), Image.Resampling.LANCZOS)

        latest = b""
        for quality in (82, 78, 74, 70, 66, 62):
            buffer = io.BytesIO()
            working.save(buffer, format="WEBP", quality=quality, method=6)
            latest = buffer.getvalue()
            if len(latest) <= MAX_FILE_SIZE:
                return latest
    return latest


def prepare_gallery(gallery: Gallery) -> list[Path]:
    gallery.source.mkdir(parents=True, exist_ok=True)
    gallery.destination.mkdir(parents=True, exist_ok=True)

    for old_file in gallery.destination.iterdir():
        if old_file.is_file() and old_file.suffix.casefold() in SUPPORTED_EXTENSIONS:
            old_file.unlink()

    outputs: list[Path] = []
    for index, source in enumerate(source_images(gallery.source), start=1):
        destination = gallery.destination / f"{index:03d}.webp"
        with Image.open(source) as opened:
            image = ImageOps.exif_transpose(opened).convert("RGB")
            image.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)
            destination.write_bytes(encode_webp(image))
        outputs.append(destination)
        print(f"  {source.name} -> {destination.relative_to(ROOT)}")

    return outputs


def update_gallery_table(outputs: dict[Gallery, list[Path]]) -> None:
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

    rows: list[str] = []
    for gallery in GALLERIES:
        for index, image in enumerate(outputs[gallery], start=1):
            public_path = f"/fotos_publicables/{gallery.folder}/{image.name}"
            alt = f"Fotografía {index} de {gallery.news_title}."
            rows.append(f"| {gallery.news_title} | {public_path} | {alt} |")

    updated = lines[: separator_index + 1] + rows
    if section_end < len(lines):
        updated += [""] + lines[section_end:]
    NEWS_FILE.write_text("\n".join(updated).rstrip() + "\n", encoding="utf-8")


def main() -> None:
    outputs: dict[Gallery, list[Path]] = {}
    for gallery in GALLERIES:
        print(f"Procesando {gallery.folder}...")
        outputs[gallery] = prepare_gallery(gallery)
        print(f"  {len(outputs[gallery])} fotografía(s) preparada(s).")

    update_gallery_table(outputs)
    print("Galerías y tabla de noticias actualizadas.")


if __name__ == "__main__":
    main()
