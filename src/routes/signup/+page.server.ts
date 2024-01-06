import type { Actions, PageServerLoad } from './$types';
import type { SqliteError } from 'better-sqlite3';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { Argon2id } from 'oslo/password';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { createUserSession } from '$lib/server/auth/utils';
import { createId } from '$lib/utils';

// todo: use drizzle-zod
const form = z.object({
	username: z.string().min(3),
	password: z.string().min(7),
});

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
	return {};
};

export const actions: Actions = {
	default: async ({ cookies, request }) => {
		const formData = await request.formData();
		const result = form.safeParse({
			username: formData.get('username'),
			password: formData.get('password'),
		});

		if (!result.success) {
			return fail(400, { message: result.error.errors[0].message });
		}

		const { username, password: unhashedPassword } = result.data;
		const userId = createId('user');
		const password = await new Argon2id().hash(unhashedPassword);

		try {
			await db.insert(userTable).values({ id: userId, username, password });
		} catch (error: unknown) {
			const sqliteError = error as SqliteError;
			if (
				'code' in sqliteError &&
				sqliteError.code === 'SQLITE_CONSTRAINT_UNIQUE'
			) {
				return fail(400, { message: 'username taken' });
			}
			console.log(error);
			return fail(400, { message: 'something went wrong' });
		}

		await createUserSession({ userId, cookies });
		return redirect(302, '/');
	},
};
