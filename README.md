# Vale&Co. Styling — marketing site

Property styling / home staging site for Ausred International Investment Group.
React site with a photographic hero, room gallery, services and contact pages.

## Stack

Vite 7 · React 19 · TypeScript · Tailwind CSS v4 (`@tailwindcss/vite`) · lucide-react

## Commands

```bash
npm install
npm run dev      # http://localhost:3003
npm run build    # type-check + production build → dist/
```

## Structure

- `src/data.ts` — address suggestions and location regions
- `src/listingPhotos.ts` + `src/galleryItems.ts` — supplied photo catalogue, deduplication and featured photos
- `src/components/Hero.tsx` — full-screen supplied photograph
- `src/components/AIStudio.tsx` — "enter your address → preview styles" experience
- `src/components/StyleGallery.tsx` + `ListingGallery.tsx` — home previews and seven room gallery pages
- `src/components/Services.tsx`, `Contact.tsx`, `Footer.tsx`, `Nav.tsx`

## Current placeholders (to replace before launch)

- **Gallery imagery** uses the supplied photo catalogue: 68 photos after deduplication.
  Each supplied After photo retains its reconstructed Before slider. The old AI-only
  gallery collection and generated hero imagery have been removed. Source details are
  documented in [`docs/gallery-photo-adjustments.md`](docs/gallery-photo-adjustments.md).
- **Stats** (280+ homes, 12%, 18 days) are invented — replace with real numbers.
- **Contact form** has no backend — hook up to email service / API before launch.
- **Phone number** intentionally omitted until Vale&Co. confirms one.

## AI Style Studio — demo vs production

The current build is a **demo**: address autocomplete against a static list, a staged
"analysing" progress sequence, and six curated style cards. No external calls, no API keys.

**Free-preview limit:** each customer gets 3 generations, after which a
"book a free consultation" gate appears. Demo enforcement is `localStorage`
(per browser, trivially bypassable — fine for demo). Production must enforce
server-side: count by email/phone captured before generating, plus IP rate
limiting as a backstop.

Production path (all pieces are additive, UI stays as-is):

1. **Address input** → Google Places Autocomplete (or Geoscape for AU addresses).
2. **"Styled homes near you"** → Vale&Co. project database with geocoded past
   projects; count + styles queried by radius.
3. **Preview generation** → image-generation API (e.g. Gemini image models or
   Stable Diffusion virtual-staging pipelines) seeded with the property's own
   photos (user upload or listing photos) restyled per style profile.
4. Serverless proxy (Lambda@Edge / API Gateway) so API keys never ship to the
   browser; static hosting can stay S3 + CloudFront.
