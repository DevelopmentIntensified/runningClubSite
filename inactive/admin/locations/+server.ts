import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { locations } from '$lib/db/schema';

export const GET: RequestHandler = async () => {
  try {
    const allLocations = await db.select().from(locations);
    return json(allLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    return json({ message: 'Error fetching locations' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name') as string;
  const description = form.get('description') as string;
  const latitude = form.get('latitude') as string;
  const longitude = form.get('longitude') as string;

  if (!name || !latitude || !longitude) {
    return json({ message: 'Name, latitude, and longitude are required' }, { status: 400 });
  }

  try {
    const [newLocation] = await db
      .insert(locations)
      .values({
        name,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      })
      .returning();

    return json(newLocation);
  } catch (error) {
    console.error('Error adding location:', error);
    return json({ message: 'Error adding location' }, { status: 500 });
  }
};
