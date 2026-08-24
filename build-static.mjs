import { mkdirSync, readFileSync, rmSync, writeFileSync, cpSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = new URL('.', import.meta.url).pathname;
const dist = join(root, 'dist');
const serverDir = join(dist, 'server');
const clientDir = join(dist, 'client');

rmSync(dist, { recursive: true, force: true });
mkdirSync(serverDir, { recursive: true });
mkdirSync(clientDir, { recursive: true });

const files = {
  '/styles.css': ['text/css; charset=utf-8', readFileSync(join(root, 'styles.css')).toString('base64')],
  '/premium.css': ['text/css; charset=utf-8', readFileSync(join(root, 'premium.css')).toString('base64')],
  '/app.js': ['text/javascript; charset=utf-8', readFileSync(join(root, 'app.js')).toString('base64')],
  '/partner.css': ['text/css; charset=utf-8', readFileSync(join(root, 'partner.css')).toString('base64')],
  '/partner-app.css': ['text/css; charset=utf-8', readFileSync(join(root, 'partner-app.css')).toString('base64')],
  '/partner.js': ['text/javascript; charset=utf-8', readFileSync(join(root, 'partner.js')).toString('base64')],
  '/og.png': ['image/png', readFileSync(join(root, 'public/og.png')).toString('base64')],
};
const html = readFileSync(join(root, 'index.html'), 'utf8');
const partnerHtml = readFileSync(join(root, 'partner.html'), 'utf8');

const worker = `const HTML = ${JSON.stringify(html)};
const PARTNER_HTML = ${JSON.stringify(partnerHtml)};
const ASSETS = ${JSON.stringify(files)};
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

function decode(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405, headers: { Allow: 'GET, HEAD' } });
    }
    if (url.pathname === '/' || url.pathname === '/index.html') {
      const body = HTML.replaceAll('__SITE_ORIGIN__', url.origin);
      return new Response(request.method === 'HEAD' ? null : body, {
        headers: { ...securityHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' },
      });
    }
    if (url.pathname === '/partner' || url.pathname === '/partner.html') {
      const body = PARTNER_HTML.replaceAll('__SITE_ORIGIN__', url.origin);
      return new Response(request.method === 'HEAD' ? null : body, {
        headers: { ...securityHeaders, 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' },
      });
    }
    const asset = ASSETS[url.pathname];
    if (asset) {
      return new Response(request.method === 'HEAD' ? null : decode(asset[1]), {
        headers: { ...securityHeaders, 'Content-Type': asset[0], 'Cache-Control': 'public, max-age=86400' },
      });
    }
    return new Response('Not found', { status: 404, headers: { ...securityHeaders, 'Content-Type': 'text/plain; charset=utf-8' } });
  },
};
`;

writeFileSync(join(serverDir, 'index.js'), worker);
for (const file of ['index.html', 'styles.css', 'premium.css', 'app.js', 'partner.html', 'partner.css', 'partner-app.css', 'partner.js']) cpSync(join(root, file), join(clientDir, file));
cpSync(join(root, 'public/og.png'), join(clientDir, 'og.png'));
console.log(`Built Vantage Referral Intelligence to ${dist}`);
