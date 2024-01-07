import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { createUser, createUserSession } from '$lib/server/auth/utils';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') || '');
		const password = String(formData.get('password') || '');

		const result = await createUser({ username, password });

		if (result.success) {
			await createUserSession({ userId: result.data.id, cookies });
			return redirect(302, '/');
		}

		return fail(400, { message: result.error });
	},
};
