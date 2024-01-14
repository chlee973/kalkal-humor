import pool from '$lib/db';
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		// TODO log the user in
		const data = await request.formData();
		const title = data.get('title');
		const nickname = data.get('nickname');
		const content = data.get('content');
		const password = data.get('password');
		const client = await pool.connect();
		try {
			const query = {
				text: 'INSERT INTO quote.post (title, nickname, content, password) VALUES ($1, $2, $3, $4)',
				values: [title, nickname, content, password]
			};
			await client.query(query);
		} catch (error) {
			console.log(error);
		} finally {
			client.release();
		}
	}
};
