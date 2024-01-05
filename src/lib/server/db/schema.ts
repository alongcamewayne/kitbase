import {
	integer,
	sqliteTable,
	text,
	uniqueIndex,
} from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable(
	'user',
	{
		id: text('id').notNull().primaryKey(),
		username: text('username').notNull(),
		password: text('password').notNull(),
	},
	(table) => {
		return {
			usernameIdx: uniqueIndex('username_idx').on(table.username),
		};
	}
);

export const sessionTable = sqliteTable('user_session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: integer('expires_at').notNull(),
});
