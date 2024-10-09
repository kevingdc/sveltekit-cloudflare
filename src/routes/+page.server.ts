import { connectDb } from '$lib/db';
import { usersTable } from '$lib/db/tables/users.table';
import type { PageServerLoad } from './$types';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform }) => {
	console.log(platform?.env.DB);
	console.log('I am here');

	if (platform?.env.DB) {
		console.log(platform.env.DB);
		const db = connectDb(platform.env.DB);

		const users = await db.select().from(usersTable);

		console.log(users);

		const usersWithFilter = await db.select().from(usersTable).where(eq(usersTable.id, 1));
		console.log(usersWithFilter);

		// const { results } = await platform.env.DB.prepare(
		// 	'SELECT * FROM Customers WHERE CompanyName = ?'
		// )
		// 	.bind('Bs Beverages')
		// 	.all();

		// console.log(results);
	}
};
