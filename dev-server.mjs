import { createServer } from 'node:http';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const requestedPort = Number(process.env.PORT || 8020);
let activePort = requestedPort;
const assets = new Map([
  ['/styles.css', ['text/css; charset=utf-8', readFileSync(join(root, 'styles.css'))]],
  ['/premium.css', ['text/css; charset=utf-8', readFileSync(join(root, 'premium.css'))]],
  ['/app.js', ['text/javascript; charset=utf-8', readFileSync(join(root, 'app.js'))]],
  ['/partner.css', ['text/css; charset=utf-8', readFileSync(join(root, 'partner.css'))]],
  ['/partner-app.css', ['text/css; charset=utf-8', readFileSync(join(root, 'partner-app.css'))]],
  ['/partner.js', ['text/javascript; charset=utf-8', readFileSync(join(root, 'partner.js'))]],
  ['/assurance.css', ['text/css; charset=utf-8', readFileSync(join(root, 'assurance.css'))]],
  ['/assurance.js', ['text/javascript; charset=utf-8', readFileSync(join(root, 'assurance.js'))]],
  ['/pwa.js', ['text/javascript; charset=utf-8', readFileSync(join(root, 'pwa.js'))]],
  ['/sw.js', ['text/javascript; charset=utf-8', readFileSync(join(root, 'sw.js'))]],
  ['/manifest.webmanifest', ['application/manifest+json; charset=utf-8', readFileSync(join(root, 'manifest.webmanifest'))]],
  ['/partner.webmanifest', ['application/manifest+json; charset=utf-8', readFileSync(join(root, 'partner.webmanifest'))]],
  ['/icon-192.png', ['image/png', readFileSync(join(root, 'public/icon-192.png'))]],
  ['/icon-512.png', ['image/png', readFileSync(join(root, 'public/icon-512.png'))]],
  ['/icon-maskable-512.png', ['image/png', readFileSync(join(root, 'public/icon-maskable-512.png'))]],
  ['/apple-touch-icon.png', ['image/png', readFileSync(join(root, 'public/apple-touch-icon.png'))]],
  ['/og.png', ['image/png', readFileSync(join(root, 'public/og.png'))]],
  ['/visual-vibrations-logo.jpg', ['image/jpeg', readFileSync(join(root, 'public/visual-vibrations-logo.jpg'))]],
]);
const html = readFileSync(join(root, 'index.html'), 'utf8');
const partnerHtml = readFileSync(join(root, 'partner.html'), 'utf8');
const assuranceHtml = readFileSync(join(root, 'assurance.html'), 'utf8');

const server = createServer((request, response) => {
  const origin = `http://${request.headers.host || `localhost:${activePort}`}`;
  const path = new URL(request.url || '/', origin).pathname;
  response.setHeader('X-Content-Type-Options', 'nosniff');

  if (path === '/' || path === '/index.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache');
    response.end(html.replaceAll('__SITE_ORIGIN__', origin));
    return;
  }

  if (path === '/partner' || path === '/partner.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache');
    response.end(partnerHtml.replaceAll('__SITE_ORIGIN__', origin));
    return;
  }

  if (path === '/assurance' || path === '/assurance.html') {
    response.setHeader('Content-Type', 'text/html; charset=utf-8');
    response.setHeader('Cache-Control', 'no-cache');
    response.end(assuranceHtml.replaceAll('__SITE_ORIGIN__', origin));
    return;
  }

  const asset = assets.get(path);
  if (asset) {
    response.setHeader('Content-Type', asset[0]);
    response.setHeader('Cache-Control', path === '/sw.js' ? 'no-cache' : 'public, max-age=3600');
    response.end(asset[1]);
    return;
  }

  response.statusCode = 404;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.end('Not found');
});

const announce = () => console.log(`Visual Vibrations Customer Loyalty + CRM is running at http://localhost:${activePort}/`);

server.once('error', error => {
  if (error.code === 'EADDRINUSE' && !process.env.PORT) {
    activePort = requestedPort + 1;
    server.listen(activePort, '0.0.0.0');
    return;
  }
  throw error;
});

server.once('listening', announce);
server.listen(activePort, '0.0.0.0');
