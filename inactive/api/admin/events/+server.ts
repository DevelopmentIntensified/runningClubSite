import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { events } from '$lib/server/db/schema';

export const GET: RequestHandler = async () => {
  try {
    const allEvents = await db.select().from(events).orderBy(events.start);
    return json(allEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return json({ message: 'Error fetching events' }, { status: 500 });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const title = form.get('title') as string;
  const start = form.get('start') as string;
  const end = form.get('end') as string;
  const description = form.get('description') as string;
  const location = form.get('location') as string;

  if (!title || !start || !end) {
    return json({ message: 'Title, start, and end are required' }, { status: 400 });
  }

  try {
    const [newEvent] = await db.insert(events).values({
      title,
      start: new Date(start),
      end: new Date(end),
      description,
      location,
    }).returning();

    return json(newEvent);
  } catch (error) {
    console.error('Error adding event:', error);
    return json({ message: 'Error adding event' }, { status: 500 });
  }
};

