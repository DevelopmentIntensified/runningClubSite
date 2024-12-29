import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { locations } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const DELETE: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return json({ message: 'Invalid location ID' }, { status: 400 });
  }

  try {
    await db.delete(locations).where(eq(locations.id, id));
    return json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Error deleting location:', error);
    return json({ message: 'Error deleting location' }, { status: 500 });
  }
};
