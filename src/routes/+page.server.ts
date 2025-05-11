import { db } from '$lib/server/db';
import { slideShowImages } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const images = await db.select().from(slideShowImages).orderBy(slideShowImages.order);

  let slides = images.map((image) => {
    return {
      id: image.id,
      alt: image.title,
      image: image.imageUrl,
    };
  })
  return { slides };
};

