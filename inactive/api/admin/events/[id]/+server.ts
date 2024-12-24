import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { events } from '$lib/db/schema';
import { eq } from 'drizzle-orm';

export const DELETE: RequestHandler = async ({ params }) => {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    return json({ message: 'Invalid event ID' }, { status: 400 });
  }

  try {
    await db.delete(events).where(eq(events.id, id));
    return json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return json({ message: 'Error deleting event' }, { status: 500 });
  }
};

