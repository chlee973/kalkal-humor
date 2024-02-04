import pool from '$lib/db';
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const client = await pool.connect();
	try {
		const query = {
			text: `
			SELECT
				post.id,
        post.title,
        post.nickname,
				post.image,
        post.created_at,
        post.updated_at,
        post.upvote_count,
        post.content
			FROM 
				humor.post 
			WHERE
				post.id = $1
				`,
			values: [params.postId]
		};
		const result = await client.query(query);
		const post = result.rows[0];
		if (!post) {
			error(404, {
				message: '페이지를 찾을 수 없습니다.'
			});
		}
		return {
			post: result.rows[0]
		};
	} catch (e) {
		error(404, {
			message: '페이지를 찾을 수 없습니다.'
		});
	} finally {
		client.release();
	}
}
