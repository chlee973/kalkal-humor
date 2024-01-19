import pg from 'pg';
import { DB_USER, DB_HOST, DB_DB, DB_PASSWORD, DB_PORT } from '$env/static/private';

const { Pool } = pg;
// PostgreSQL 데이터베이스 연결 설정
const pool = new Pool({
	user: DB_USER,
	host: DB_HOST,
	database: DB_DB,
	password: DB_PASSWORD,
	port: Number(DB_PORT)
});

export default pool;
