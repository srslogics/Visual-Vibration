import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const port = Number(process.env.PORT || 8020);
const assets = new Map([
  ['/styles.css', ['text/css; charset=utf-8', readFileSync(join(root, 'styles.css'))]],
  ['/app.js', ['text/javascript; charset=utf-8', readFileSync(join(root, 'app.js'))]],
  ['/og.png', ['image/png', readFileSync(join(root, 'public/og.png'))]],
]);
const html = readFileSync(join(root, 'index.html'), 'utf8');

const server = createServer((request, response) => {
  const origin = `http://${request.headers.host || `localhost:${port}`}`;
  const path = new URL(request.url || '/', origin).pathname;
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (path === '/' || path === '/index.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache');
    response.end(html.replaceAll('__SITE_ORIGIN__', origin));
    return;
  }

  const asset = assets.get(path);
  if (asset) {
    response.setHeader('Content-Type', asset[0]);
    response.end(asset[1]);
    return;
  }

  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('Not found');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Visual Vibrations Customer Loyalty + CRM is running at http://localhost:${port}/`);
});
