import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const workerUrl = new URL('../dist/server/index.js', import.meta.url);
workerUrl.searchParams.set('test', `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const request = (path = '/', method = 'GET') => worker.fetch(new Request(`https://visual-vibrations.example${path}`, { method }));

test('serves the complete Vantage referral product shell', async () => {
  const response = await request('/');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
  const html = await response.text();
  assert.match(html, /Vantage · Referral Control Centre/);
  assert.match(html, /Every referral/);
  assert.match(html, /Automation handles the routine/);
  assert.match(html, /Tiers & rewards/);
  assert.match(html, /Fraud watch/);
  assert.match(html, /Create the first proof/);
  assert.match(html, /https:\/\/visual-vibrations\.example\/og\.png/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__|codex-preview|taking shape/i);
});

test('serves the self-service partner registration and referral app', async () => {
  const response = await request('/partner');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
  const html = await response.text();
  assert.match(html, /Your introductions/);
  assert.match(html, /CREATE YOUR PARTNER PROFILE/);
  assert.match(html, /Automatic verification/);
  assert.match(html, /SECURE REFERRAL CONFIRMATION/);
  assert.match(html, /Points wallet/);
  assert.match(html, /partner-app\.css/);
});

test('serves application assets with correct content types', async () => {
  const [css, js, partnerCss, partnerJs, image] = await Promise.all([request('/styles.css'), request('/app.js'), request('/partner-app.css'), request('/partner.js'), request('/og.png')]);
  assert.match(css.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(js.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.match(partnerCss.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(partnerJs.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.equal(image.headers.get('content-type'), 'image/png');
  assert.ok((await image.arrayBuffer()).byteLength > 50_000);
});

test('returns safe responses for unsupported routes and methods', async () => {
  assert.equal((await request('/missing')).status, 404);
  assert.equal((await request('/', 'POST')).status, 405);
  const head = await request('/', 'HEAD');
  assert.equal(head.status, 200);
  assert.equal(await head.text(), '');
});

test('includes a Render static-site blueprint', async () => {
  const blueprint = await readFile(new URL('../render.yaml', import.meta.url), 'utf8');
  assert.match(blueprint, /runtime:\s*static/);
  assert.match(blueprint, /staticPublishPath:\s*\.\/dist\/client/);
  assert.match(blueprint, /source:\s*\/partner/);
  assert.match(blueprint, /destination:\s*\/partner\.html/);
});
