import { listingPhotoGroups, type ListingPhoto, type ListingRoom } from './listingPhotos'
import { listingBeforePhotos } from './listingBeforePhotos'

export type GalleryItem = {
  id: string
  kind: ListingPhoto['kind']
  src: string
  before: string
  imageFilter?: string
}

// Duplicate -> retained photograph from the supplied source catalogue.
export const galleryPhotoDuplicates: Readonly<Record<string, string>> = {
  'gallery/living-07.webp': 'gallery/living-02.webp',
  'gallery/dining-10.webp': 'gallery/dining-04.webp',
  'gallery/kitchen-06.webp': 'gallery/kitchen-02.webp',
  'gallery/bedroom-11.webp': 'gallery/bedroom-05.webp',
  'gallery/bedroom-15.webp': 'gallery/bedroom-14.webp',
  'gallery/living-12.webp': 'gallery/living-13.webp',
  'gallery/living-16.webp': 'gallery/living-21.webp',
  'gallery/living-20.webp': 'gallery/living-21.webp',
  'gallery/dining-05.webp': 'gallery/dining-06.webp',
  'gallery/bedroom-02.webp': 'gallery/bedroom-07.webp',
  'gallery/bedroom-10.webp': 'gallery/bedroom-08.webp',
}

const duplicateListingPhotos = new Set(Object.keys(galleryPhotoDuplicates))

// Apply identical colour grading to both sides without changing scene details.
const galleryImageFilters: Readonly<Record<string, string>> = {
  'gallery/living-05.webp': 'sepia(0.12) saturate(1.18) contrast(1.12) brightness(0.99)',
}

export const galleryGroups = listingPhotoGroups.map(group => ({
  id: group.id,
  items: group.photos.filter(photo => !duplicateListingPhotos.has(photo.src)).map((photo): GalleryItem => ({
    id: photo.src,
    kind: photo.kind,
    src: `${import.meta.env.BASE_URL}${photo.src}`,
    before: `${import.meta.env.BASE_URL}${listingBeforePhotos[photo.src]}`,
    imageFilter: galleryImageFilters[photo.src],
  })),
}))

export const galleryItemCount = galleryGroups.reduce((count, group) => count + group.items.length, 0)

export const galleryPhotoTitle = (room: ListingRoom, index: number) =>
  `${room.charAt(0).toUpperCase()}${room.slice(1)} ${String(index + 1).padStart(2, '0')}`

const featuredIds = ['living-02', 'living-01', 'dining-01', 'kitchen-02', 'bedroom-03', 'entry-01']

export const featuredGalleryPhotos = featuredIds.map(id => {
  const group = galleryGroups.find(group => group.items.some(photo => photo.id === `gallery/${id}.webp`))
  if (!group) throw new Error(`Missing featured photograph: ${id}`)
  const index = group.items.findIndex(photo => photo.id === `gallery/${id}.webp`)
  return { ...group.items[index], room: group.id, title: galleryPhotoTitle(group.id, index) }
})

// Supplied real photograph: listing-photos/living room/lounge 2.jpg.
export const heroPhoto = `${import.meta.env.BASE_URL}gallery/living-06.webp`
