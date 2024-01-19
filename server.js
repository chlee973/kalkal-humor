import dotenv from 'dotenv';
import { handler } from './build/handler.js';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';

dotenv.config();
const privateKey = fs.readFileSync(`./ssl/privkey.pem`);
const certificate = fs.readFileSync(`./ssl/fullchain.pem`);
const credentials = { key: privateKey, cert: certificate };

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
