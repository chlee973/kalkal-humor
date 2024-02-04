import pool from '$lib/db';

/** @type {import('./$types').PageServerLoad} */

export async function load() {
	const client = await pool.connect();
	try {
		const postsQuery = {
			text: `
			SELECT 
				post.id,
				post.title,
				post.nickname,
				post.image,
        post.created_at,
        post.updated_at,
				post.upvote_count,
				COUNT(comment.id) AS comment_count
			FROM
				humor.post
      LEFT JOIN
				humor.comment
			ON
				post.id = comment.post_id
			GROUP BY
				post.id
			ORDER BY
				post.created_at DESC;
			`
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
