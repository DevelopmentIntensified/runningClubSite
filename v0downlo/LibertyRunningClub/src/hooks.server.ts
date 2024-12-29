import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const session = await event.locals.auth.validate();
  if (event.url.pathname.startsWith('/admin')) {
    if (!session || !session.user.isAdmin) {
      return new Response('Unauthorized', { status: 403 });
    }
  }
  return resolve(event);
};

