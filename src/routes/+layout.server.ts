import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	return {
		user: locals.user,
		isLoggedIn: !!locals.user,
		isAdmin: !!locals.user?.isAdmin
	};
};
