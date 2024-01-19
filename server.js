import dotenv from 'dotenv';
import { handler } from './build/handler.js';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

dotenv.config();
const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${process.env.HOST_USER}/privkey.pem`);
const certificate = fs.readFileSync(`/etc/letsencrypt/live/${process.env.HOST_USER}/cert.pem`);
const ca = fs.readFileSync(`/etc/letsencrypt/live/${process.env.HOST_USER}/chain.pem`);
const credentials = { key: privateKey, cert: certificate, ca: ca };

const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const PORT = 80;
const SSLPORT = 443;

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

httpServer.listen(PORT, function () {
	console.log('HTTP Server is running on: http://localhost:%s', PORT);
});

httpsServer.listen(SSLPORT, function () {
	console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
});
