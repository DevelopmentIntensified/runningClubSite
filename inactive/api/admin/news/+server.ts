import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/db';
import { news } from '$lib/db/schema';

export const POST: RequestHandler = async ({ request, locals }) => {
	const session = await locals.auth.validate();
	if (!session || !session.user.isAdmin) {
		return json({ message: 'Unauthorized' }, { status: 403 });
	}

	const { title, content } = await request.json();

	if (!title || !content) {
		return json({ message: 'Title and content are required' }, { status: 400 });
	}

	try {
		const [createdNews] = await db
			.insert(news)
			.values({
				title,
				content,
				userId: session.user.userId
			})
			.returning();

		return json({ message: 'News created successfully', news: createdNews });
	} catch (error) {
		console.error('Error creating news:', error);
		return json({ message: 'An error occurred while creating the news' }, { status: 500 });
	}
};
