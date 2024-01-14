import pg from 'pg';

const { Pool } = pg;
// PostgreSQL 데이터베이스 연결 설정
const pool = new Pool({
	user: 'kalkal',
	host: 'localhost',
	database: 'kalkal_db',
	password: 'sang@830139',
	port: 5432 // 기본 포트 번호
});

export default pool;
