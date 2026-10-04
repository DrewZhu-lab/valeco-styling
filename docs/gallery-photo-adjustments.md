# Gallery photo sources

The source catalogue contains all 79 supplied photographs, grouped by their original room names. After deduplication, the gallery displays 68 photographs across seven room pages. See `gallery-deduplication.md` for the excluded photographs. WebP copies in `public/gallery/` are used for display; full original files remain in `public/listing-photos/` in the local working project. The release checkout and published build contain only the optimized display copies; the original archive is not uploaded.

On 2026-10-04, the four photographs previously retouched by AI were restored from the supplied originals. Their display copies use only orientation correction, resizing and WebP encoding; no generated retouches are displayed.

| Original | Gallery copy |
| --- | --- |
| `bedroom/bedroom 5.jpg` | `bedroom-07.webp` |
| `dining room/dining 5.jpg` | `dining-06.webp` |
| `kitchen/kitchen3.jpg` | `kitchen-04.webp` |
| `bedroom/master bedroom 3.jpg` | `bedroom-17.webp` |

Previous generated retouch masters remain locally in the private source archive `assets/photo-adjustments/2026-10-04/`. This directory is not part of the published public assets and is not referenced by the website. All displayed After photographs come from the supplied source catalogue. Gallery sliders retain the previously generated Before illustrations reconstructed from those photos; these are not original Before photographs. See `gallery-before-generation.md`.

The homepage uses supplied real photographs only. On 2026-10-04, the hero was reselected as `gallery/living-06.webp` (original `living room/lounge 2.jpg`). The six work previews use `living-02`, `living-01`, `dining-01`, `kitchen-02`, `bedroom-03` and `entry-01` from the source catalogue. The homepage does not display reconstructed Before images or the previous generated styling imagery. Its layout and watermarks are retained.

On 2026-10-04, the wide living-room scene with grey plank flooring, plantation shutters and garden doors (`gallery/living-05.webp`, source `living room/lounge 1.jpg`) received a display-only colour adjustment: `sepia(0.12) saturate(1.18) contrast(1.12) brightness(0.99)`. This adds gentle warmth, colour and contrast. The identical filter is applied to Before and After in both gallery cards and the enlarged comparison. Original image files, floor textures, architecture and furniture remain unchanged. The adjustment is keyed by the source path so deduplication or renumbering cannot apply it to another photograph.
