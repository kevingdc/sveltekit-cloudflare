import { drizzle } from 'drizzle-orm/d1';

export function connectDb(d1: D1Database) {
	const db = drizzle(d1, { logger: true, casing: 'snake_case' });

	return db;
}
