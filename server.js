import { file } from 'bun';
import { build_options, handler_default } from './build/handler.js';
const { httpserver } = handler_default(build_options.assets ?? true);
const privateKey = await file('./ssl/submoo.net-key.pem').arrayBuffer();
const certificate = await file('./ssl/submoo.net-chain.pem').arrayBuffer();

// 로그 함수 생성
const writer = file('./access.log').writer();

async function logRequest(req, status = 200) {
	const timestamp = new Date().toISOString();
	const method = req.method;
	const url = new URL(req.url);
	const ip = req.headers.get('x-forwarded-for') || 'direct';
	const userAgent = req.headers.get('user-agent') || '-';
	const logLine = `${timestamp} | ${ip} | ${method} ${url.pathname} | ${status} | ${userAgent}\n`;
	console.log(logLine);
	writer.write(logLine);
}

// HTTP 서버
Bun.serve({
	port: 80,
	fetch(req) {
		const url = new URL(req.url);
		if (url.pathname.startsWith('/static')) {
			return new Response(Bun.file(`./${url.pathname}`));
		}

		if (url.pathname.startsWith('/.well-known/acme-challenge/')) {
			logRequest(req);
			return new Response(Bun.file(`./public/${url.pathname}`));
		}
		logRequest(req, 301); // 리다이렉트는 301 상태코드
		return Response.redirect(`https://${url.hostname}${url.pathname}${url.search}`);
	}
});

// HTTPS 서버
Bun.serve({
	port: 443,
	tls: {
		key: privateKey,
		cert: certificate
	},
	fetch: async (req) => {
		try {
			const response = await httpserver(req);
			logRequest(req, response.status);
			return response;
		} catch (error) {
			logRequest(req, 500); // 에러 발생시 500 상태코드
			throw error;
		}
	}
});

process.on('exit', () => {
	writer.end();
});
