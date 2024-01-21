import pool from '$lib/db';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		// TODO log the user in
		const data = await request.formData();
		const title = data.get('title');
		const nickname = data.get('nickname');
		const content = data.get('content');
		const password = data.get('password');
		const speaker = data.get('speaker');
		const client = await pool.connect();

		const saltRounds = 10;

		let postId;
		let hash = password;
		if (typeof password === 'string') {
			hash = await bcrypt.hash(password, saltRounds);
		}
		try {
			const query = {
				text: 'INSERT INTO quote.post (title, nickname, content, speaker, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
				values: [title, nickname, content, speaker, hash]
			};
			const res = await client.query(query);
			postId = res.rows[0].id;
		} catch (error) {
			console.log(error);
		} finally {
			client.release();
		}
		if (postId) {
			redirect(303, `/quote/detail/${postId}`);
		}
	}
};
