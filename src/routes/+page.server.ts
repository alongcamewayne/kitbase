import type { Actions, PageServerLoad } from './$types';
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) throw redirect(302, '/login');
	return { user: locals.user };
};

export const actions: Actions = {
	logout: async ({ cookies, locals }) => {
		if (!locals.session) return fail(401);
		await lucia.invalidateSession(locals.session.id);
		const sessionCookie = lucia.createBlankSessionCookie();
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});
		return redirect(302, '/login');
	},
};
