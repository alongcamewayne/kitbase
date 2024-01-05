import type { Config } from 'drizzle-kit';

export default {
	schema: ['./src/lib/server/db/schema.ts'],
	out: './drizzle',
	driver: 'better-sqlite',
	dbCredentials: {
		url: './src/lib/server/db/local.sqlite',
	},
} satisfies Config;
