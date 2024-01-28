import pool from '$lib/db';
import { redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { writeFileSync, existsSync, mkdirSync } from 'fs';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const title = data.get('title');
		const nickname = data.get('nickname');
		const content = data.get('content');
		const password = data.get('password');
		const image = data.get('image');
		let postId;
		let imagePath;
		const client = await pool.connect();
		if (image instanceof File && image?.name) {
			const yyyymmdd = new Date().toISOString().split('T')[0]; // yyyy-mm-dd
			const uuid = randomUUID();
			const newFileName = `${uuid}_${image.name}`;
			const dir = `static/uploads/images/${yyyymmdd}`;
			if (!existsSync(dir)) {
				mkdirSync(dir, { recursive: true });
			}
			writeFileSync(`${dir}/${newFileName}`, Buffer.from(await image.arrayBuffer()));
			imagePath = `/uploads/images/${yyyymmdd}/${newFileName}`;
		}
		const saltRounds = 10;
		let hash = password;
		if (typeof password === 'string') {
			hash = await bcrypt.hash(password, saltRounds);
		}
		try {
			const query = {
				text: 'INSERT INTO humor.post (title, nickname, content, image, password) VALUES ($1, $2, $3, $4, $5) RETURNING id',
				values: [title, nickname, content, imagePath ?? null, hash]
			};
			const res = await client.query(query);
			postId = res.rows[0].id;
		} catch (error) {
			console.log(error);
		} finally {
			client.release();
		}
		if (postId) {
			redirect(303, `/humor/detail/${postId}`);
		}
	}
};
