import type { Cookies } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

type CreateUserSessionArgs = {
	userId: string;
	cookies: Cookies;
};

export async function createUserSession({
	userId,
	cookies,
}: CreateUserSessionArgs) {
	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes,
	});
}
