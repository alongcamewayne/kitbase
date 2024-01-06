import type { Cookies } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';
import { createId } from '$lib/utils';

type CreateUserSessionArgs = {
	userId: string;
	cookies: Cookies;
};

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
