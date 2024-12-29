import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();
  return {
    user: session ? {
      userId: session.user.userId,
      email: session.user.email,
      isAdmin: session.user.isAdmin
    } : null
  };
};

