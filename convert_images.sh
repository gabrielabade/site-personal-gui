#!/usr/bin/env bash
set -euo pipefail
if command -v magick >/dev/null 2>&1; then
  IMAGEMAGICK="magick"
elif command -v convert >/dev/null 2>&1; then
  IMAGEMAGICK="convert"
else
  echo "Error: nem 'magick' nem 'convert' encontrado. Instale ImageMagick."
  exit 1
fi
OUT_WEBP="../webp"
OUT_JPG="../jpg"
mkdir -p "$OUT_WEBP" "$OUT_JPG"
shopt -s nullglob
for src in *.jpg .jpeg; do
  [ -f "$src" ] || continue
  name="${src%.}"
  echo "Processando $src ..."
  "$IMAGEMAGICK" "$src" -strip -resize 480x> -quality 85 "$OUT_JPG/${name}-480.jpg"
  "$IMAGEMAGICK" "$src" -strip -resize 900x> -quality 85 "$OUT_JPG/${name}-900.jpg"
  "$IMAGEMAGICK" "$src" -strip -resize 1600x> -quality 85 "$OUT_JPG/${name}-1600.jpg"
  if command -v cwebp >/dev/null 2>&1; then
    cwebp -q 80 "$OUT_JPG/${name}-480.jpg" -o "$OUT_WEBP/${name}-480.webp" >/dev/null 2>&1 || echo "Aviso: falha em gerar $name-480.webp"
    cwebp -q 80 "$OUT_JPG/${name}-900.jpg" -o "$OUT_WEBP/${name}-900.webp" >/dev/null 2>&1 || echo "Aviso: falha em gerar $name-900.webp"
    cwebp -q 80 "$OUT_JPG/${name}-1600.jpg" -o "$OUT_WEBP/${name}-1600.webp" >/dev/null 2>&1 || echo "Aviso: falha em gerar $name-1600.webp"
  else
    echo "Aviso: cwebp não encontrado — só foram criados os JPGs."
  fi
  echo "  -> ${name} criado (480/900/1600)."
done
shopt -u nullglob
echo "Concluído para imagens."
