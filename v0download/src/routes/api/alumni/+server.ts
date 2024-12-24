import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { alumni } from '$lib/db/schema';

export const POST: RequestHandler = async ({ request }) => {
  const form = await request.formData();
  const name = form.get('name') as string;
  const imageUrl = form.get('imageUrl') as string;
  const graduationYear = parseInt(form.get('graduationYear') as string);
  const major = form.get('major') as string;
  const achievements = form.get('achievements') as string;
  const currentOccupation = form.get('currentOccupation') as string;

  if (!name || !imageUrl || !graduationYear || !major || !achievements || !currentOccupation) {
    return json({ message: 'All fields are required' }, { status: 400 });
  }

  try {
    await db.insert(alumni).values({
      name,
      image_url: imageUrl,
      graduation_year: graduationYear,
      major,
      achievements,
      current_occupation: currentOccupation,
    });

    return json({ message: 'Alumni added successfully' });
  } catch (error) {
    console.error('Error adding alumni:', error);
    return json({ message: 'Error adding alumni' }, { status: 500 });
  }
};

