# Gallery photo adjustments

The source catalogue contains all 79 supplied photographs, grouped by their original room names. After deduplication, the gallery displays 68 of these photographs alongside 18 existing pairs. See `gallery-deduplication.md` for the excluded and retained pairs. WebP copies in `public/gallery/` are used for display; full original files remain in `public/listing-photos/`.

Four phone photographs received an initial AI retouch for the local preview: exposure and shadow balance, white balance, and moderate clarity. The aim is a natural interior-photo appearance. AI retouching can alter fine textures or small details; the original files are retained for comparison and replacement.

| Original | Gallery copy |
| --- | --- |
| `bedroom/bedroom 5.jpg` | `bedroom-07.webp` |
| `dining room/dining 5.jpg` | `dining-06.webp` |
| `kitchen/kitchen3.jpg` | `kitchen-04.webp` |
| `bedroom/master bedroom 3.jpg` | `bedroom-17.webp` |

The generated retouch masters are saved under `assets/photo-adjustments/2026-10-04/`. Other photographs use their supplied appearance, with resizing and WebP encoding only. No changes have been published by this local-preview work.

Release scope: raw originals in `public/listing-photos/` and generation masters in `assets/before-generation/` are local archives. They are excluded from the release checkout and published site; only the optimized WebP files are shipped.
