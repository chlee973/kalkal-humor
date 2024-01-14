import pool from '$lib/db';

/** @type {import('./$types').PageServerLoad} */
export async function load() {
	const client = await pool.connect();
	try {
		const postsQuery = {
			text: `
			SELECT
				*,
				(SELECT COUNT(*) AS comment_count FROM quote.comment AS comment WHERE comment.post_id = post.id)
			FROM quote.post AS post`
		};
		const result = await client.query(postsQuery);
		return {
			posts: result.rows
		};
	} catch (error) {
		console.log(error);
	} finally {
		client.release();
	}
}
