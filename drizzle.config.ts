// import { defineConfig } from 'drizzle-kit';

// export default defineConfig({
// 	out: './migrations',
// 	schema: './src/lib/db/tables/*.table.ts',
// 	dialect: 'sqlite',
// 	driver: 'd1-http',
// 	dbCredentials: {
// 		accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
// 		databaseId: process.env.CLOUDFLARE_DATABASE_ID!,
// 		token: process.env.CLOUDFLARE_D1_TOKEN!
// 	}
// });

// drizzle.config.ts

import { defineConfig } from 'drizzle-kit';
import fs from 'fs';
import path from 'path';

function getLocalD1Db() {
	try {
		const basePath = path.resolve('.wrangler');
		const dbFile = fs.readdirSync(basePath, { encoding: 'utf-8', recursive: true }).find((f) => {
			const parts = f.split(path.sep);
			return (
				parts.includes('d1') &&
				parts.slice(parts.indexOf('d1')).includes('d1') &&
				f.endsWith('.sqlite')
			);
		});

		if (!dbFile) {
			throw new Error(`.sqlite file not found in ${basePath}`);
		}

		console.info(`Found .sqlite file in path: ${dbFile}`);

		const url = path.resolve(basePath, dbFile);
		return url;
	} catch (err) {
		console.log(`Error  ${err.message}`);
	}
}

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/db/tables/*.table.ts',
	out: './migrations',
	...(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'prod'
		? {
				driver: 'd1-http',
				dbCredentials: {
					accountId: process.env.CLOUDFLARE_ACCOUNT_ID,
					databaseId: process.env.CLOUDFLARE_DATABASE_ID,
					token: process.env.CLOUDFLARE_D1_TOKEN
				}
			}
		: {
				dbCredentials: {
					url: getLocalD1Db()
				}
			})
});
