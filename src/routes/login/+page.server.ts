import type { Actions, PageServerLoad } from './$types';
import { lucia } from '$lib/server/auth';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { Argon2id } from 'oslo/password';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const username = String(formData.get('username') || '');
		const password = String(formData.get('password') || '');

		// get user from db
		const user = await db.query.userTable.findFirst({
			where: eq(userTable.username, username),
		});

		if (!user) return fail(400, { message: 'username not found' });

		const isValidPassword = await new Argon2id().verify(
			user.password,
			password
		);
		if (!isValidPassword)
			return fail(400, { message: 'incorrect username or password' });

		const session = await lucia.createSession(user.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes,
		});

		return redirect(302, '/');
	},
};