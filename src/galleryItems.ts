import { roomPairs, visibleStyleIndicesByRoom } from './data'
import { listingPhotoGroups, type ListingPhoto, type ListingRoom } from './listingPhotos'
import { listingBeforePhotos } from './listingBeforePhotos'

export type GalleryItem = {
  id: string
  kind: ListingPhoto['kind']
  after: string
  before?: string
  styleIndex?: number
}

const originalGroups: Partial<Record<ListingRoom, number[]>> = {
  living: [...visibleStyleIndicesByRoom[0], ...visibleStyleIndicesByRoom[1]],
  dining: visibleStyleIndicesByRoom[2],
  kitchen: visibleStyleIndicesByRoom[3],
  bedroom: visibleStyleIndicesByRoom[4],
  entry: visibleStyleIndicesByRoom[5],
}

// Duplicate -> retained photo. Keep the source catalogue and generated pairs intact.
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

export const galleryGroups = listingPhotoGroups.map(group => ({
  id: group.id,
  items: [
    ...(originalGroups[group.id] ?? []).map((styleIndex): GalleryItem => ({
      id: `concept-${styleIndex}`,
      kind: styleIndex >= 3 && styleIndex < 6 ? 'lounge' : group.id,
      ...roomPairs[styleIndex],
      styleIndex,
    })),
    ...group.photos.filter(photo => !duplicateListingPhotos.has(photo.src)).map((photo): GalleryItem => ({
      id: photo.src,
      kind: photo.kind,
      after: `${import.meta.env.BASE_URL}${photo.src}`,
      before: listingBeforePhotos[photo.src] ? `${import.meta.env.BASE_URL}${listingBeforePhotos[photo.src]}` : undefined,
    })),
  ],
}))

export const galleryItemCount = galleryGroups.reduce((count, group) => count + group.items.length, 0)
