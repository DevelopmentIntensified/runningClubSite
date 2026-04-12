import { handleUpload } from '@vercel/blob/client';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.arrayBuffer();
    
    const jsonResponse = await handleUpload({
      token: BLOB_READ_WRITE_TOKEN,
      body: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array(body));
          controller.close();
        }
      }),
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
