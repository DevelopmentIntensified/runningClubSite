import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = (await request.json()) as HandleUploadBody;

    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        const sessionId = request.cookies.get('session');
        if (!sessionId) {
          throw error(401, 'Unauthorized');
        }

        const { lucia } = await import('$lib/server/auth');
        const { session, user } = await lucia.validateSession(sessionId);
        
        if (!session || !user || !user.isAdmin) {
          throw error(403, 'Forbidden');
        }

        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
          addRandomSuffix: true,
        };
      },
    });

    return new Response(JSON.stringify(jsonResponse), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    console.error('Blob upload error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
