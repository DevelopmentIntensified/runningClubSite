import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/server/db';
import { leaders } from '$lib/server/db/schema';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name') as string;
  const imageUrl = form.get('imageUrl') as string;
  const position = form.get('position') as string;
  const description = form.get('description') as string;

  if (!name || !imageUrl || !position || !description) {
    return json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    await db.insert(leaders).values({
      name,
      image_url: imageUrl,
      position,
      description
    });

    return json({ message: 'Leader added successfully' });
  } catch (error) {
    console.error('Error adding leader:', error);
    return json({ message: 'Error adding leader' }, { status: 500 });
  }
};
