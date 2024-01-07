import type { Cookies } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';
import { lucia } from '$lib/server/auth';
import { z } from 'zod';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { createId } from '$lib/utils';

type CreateUserArgs = {
	username: string;
	password: string;
};

type CreateUserResult =
	| { success: true; data: { id: string; username: string } }
	| { success: false; error: string };

type CreateUserSessionArgs = {
	userId: string;
	cookies: Cookies;
};

export async function createUser({
	username,
	password,
}: CreateUserArgs): Promise<CreateUserResult> {
	try {
		const result = await z
			.object({
				id: z.string().startsWith('user_').optional().default(createId('user')),
				username: z.string().min(3),
				password: z
					.string()
					.min(7)
					.transform(async (pw) => await new Argon2id().hash(pw)),
			})
			.parseAsync({ username, password });

		await db.insert(users).values(result);

		return {
			success: true,
			data: { id: result.id, username: result.username },
		};
	} catch (error) {
		// todo: handle errors better
		console.log(error);
		return { success: false, error: String(error) };
	}
}

export async function createUserSession({
	userId,
	cookies,
}: CreateUserSessionArgs) {
	const session = await lucia.createSession(
		userId,
		{},
		{ sessionId: createId('session', 32) }
	);
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});
}
