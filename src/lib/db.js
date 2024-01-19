import pg from 'pg';

const { Pool } = pg;
// PostgreSQL 데이터베이스 연결 설정
const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DB,
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT)
});

export default pool;
