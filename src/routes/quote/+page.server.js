import pool from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const client = await pool.connect();
	try {
		const query = {
			text: 'SELECT * FROM quote.post'
		};
		const result = await client.query(query);
		return {
			posts: result.rows
		};
	} catch (error) {
		console.log(error);
	}
}
