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
  assert.match(html, /Vantage · Private Referral Intelligence/);
  assert.match(html, /Every referral/);
  assert.match(html, /Automation handles the routine/);
  assert.match(html, /Tiers & rewards/);
  assert.match(html, /visual-vibrations-logo\.jpg/);
  assert.match(html, /Fraud watch/);
  assert.match(html, /Create the first proof/);
  assert.match(html, /https:\/\/visual-vibrations\.example\/og\.png/);
  assert.match(html, /href="\/manifest\.webmanifest"/);
  assert.match(html, /apple-mobile-web-app-capable/);
  assert.match(html, /src="pwa\.js"/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__|codex-preview|taking shape/i);
});

test('serves the self-service partner registration and referral app', async () => {
  const response = await request('/partner');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
  const html = await response.text();
  assert.match(html, /Your introductions/);
  assert.match(html, /Choose your role\./);
  assert.match(html, /Automatic verification/);
  assert.match(html, /SECURE REFERRAL CONFIRMATION/);
  assert.match(html, /Points wallet/);
  assert.match(html, /visual-vibrations-logo\.jpg/);
  assert.match(html, /partner-app\.css/);
  assert.match(html, /href="\/partner\.webmanifest"/);
  assert.match(html, /apple-mobile-web-app-title" content="Vantage Circle"/);
});

test('explains the complete referral assurance decision model', async () => {
  const response = await request('/assurance');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
  const html = await response.text();
  assert.match(html, /Every reward/);
  assert.match(html, /100%/);
  assert.match(html, /Four gates\. One protected owner/);
  assert.match(html, /INTERACTIVE DECISION ENGINE/);
  assert.match(html, /data-assurance-signal="duplicate"/);
  assert.match(html, /No proof/);
  assert.doesNotMatch(html, /__SITE_ORIGIN__/);
  const [css, js] = await Promise.all([request('/assurance.css'), request('/assurance.js')]);
  assert.match(css.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(js.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.match(await js.text(), /function renderDecision/);
});

test('provides an India legal and compliance readiness centre', async () => {
  const response = await request('/compliance');
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') ?? '', /^text\/html/);
  const html = await response.text();
  assert.match(html, /India · Legal Readiness Centre/i);
  assert.match(html, /Do not launch referral-linked rewards for registered architects/);
  assert.match(html, /DPDP ACT 2023 \+ DPDP RULES 2025/);
  assert.match(html, /TRAI TCCCPR/);
  assert.match(html, /INCOME-TAX ACT §194R/);
  assert.match(html, /RBI PPI/);
  assert.match(html, /ANTI-BRIBERY \+ PUBLIC-OFFICIAL CONTROLS/);
  assert.match(html, /COPYRIGHT \+ TRADE MARKS \+ MEDIA RIGHTS/);
  assert.match(html, /All controls <i>14<\/i>/);
  assert.match(html, /Launch document register/);
  assert.match(html, /data-law-filter="incident"/);
  const [css, js] = await Promise.all([request('/compliance.css'), request('/compliance.js')]);
  assert.match(css.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(js.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.match(await js.text(), /window\.print/);
});

test('serves application assets with correct content types', async () => {
  const [css, premiumCss, js, partnerCss, partnerJs, pwa, serviceWorker, manifest, icon, image, logo] = await Promise.all([
    request('/styles.css'), request('/premium.css'), request('/app.js'), request('/partner-app.css'), request('/partner.js'),
    request('/pwa.js'), request('/sw.js'), request('/manifest.webmanifest'), request('/icon-192.png'), request('/og.png'), request('/visual-vibrations-logo.jpg')
  ]);
  assert.match(css.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(premiumCss.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(js.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.match(partnerCss.headers.get('content-type') ?? '', /^text\/css/);
  assert.match(partnerJs.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.match(pwa.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.match(serviceWorker.headers.get('content-type') ?? '', /^text\/javascript/);
  assert.equal(serviceWorker.headers.get('cache-control'), 'no-cache');
  assert.match(manifest.headers.get('content-type') ?? '', /^application\/manifest\+json/);
  assert.equal(icon.headers.get('content-type'), 'image/png');
  assert.ok((await icon.arrayBuffer()).byteLength > 1_000);
  assert.equal(image.headers.get('content-type'), 'image/png');
  assert.ok((await image.arrayBuffer()).byteLength > 50_000);
  assert.equal(logo.headers.get('content-type'), 'image/jpeg');
  assert.ok((await logo.arrayBuffer()).byteLength > 100_000);
});

test('provides installable director and partner PWA identities', async () => {
  const directorManifest = await (await request('/manifest.webmanifest')).json();
  const partnerManifest = await (await request('/partner.webmanifest')).json();
  const serviceWorker = await (await request('/sw.js')).text();
  assert.equal(directorManifest.name, 'Vantage Referral Intelligence');
  assert.equal(directorManifest.start_url, '/');
  assert.equal(partnerManifest.name, 'Vantage Circle');
  assert.equal(partnerManifest.start_url, '/partner.html');
  assert.ok(directorManifest.icons.some(icon => icon.sizes === '512x512' && icon.purpose === 'maskable'));
  assert.match(serviceWorker, /caches\.open\(CACHE_NAME\)/);
  assert.match(serviceWorker, /request\.mode === 'navigate'/);
});

test('does not use explanatory popups as substitute actions', async () => {
  const [directorHtml, partnerHtml, directorJs, partnerJs] = await Promise.all([
    (await request('/')).text(),
    (await request('/partner')).text(),
    (await request('/app.js')).text(),
    (await request('/partner.js')).text()
  ]);
  const source = [directorHtml, partnerHtml, directorJs, partnerJs].join('\n');
  assert.doesNotMatch(source, /Eligibility rule|Partner invitation ready|Programme rules protected|Case opened|Report prepared|Protected change requested|View eligibility/);
  assert.match(directorJs, /openPartnerForm\(\)/);
  assert.match(directorJs, /openRedemptionHold/);
  assert.match(directorJs, /resolveFraudCase/);
  assert.match(directorJs, /vantage-programme-report\.csv/);
  assert.match(partnerHtml, /id="profileEditForm"/);
  assert.match(partnerHtml, /id="ledgerFilter"/);
  assert.match(partnerJs, /activeLedgerFilter/);
});

test('lets the owner create and publish rewards to the partner catalogue', async () => {
  const [directorHtml, directorJs, partnerJs] = await Promise.all([
    (await request('/')).text(),
    (await request('/app.js')).text(),
    (await request('/partner.js')).text()
  ]);
  assert.match(directorHtml, /id="addReward"/);
  assert.match(directorHtml, /data-reward-filter="Member"/);
  assert.match(directorJs, /function openRewardEditor/);
  assert.match(directorJs, /vantage_custom_rewards/);
  assert.match(directorJs, /Available quantity/);
  assert.match(directorJs, /Catalogue status/);
  assert.match(directorJs, /function optimiseRewardImage/);
  assert.match(directorJs, /accept="image\/jpeg,image\/png,image\/webp"/);
  assert.match(directorJs, /image:rewardImage/);
  assert.match(partnerJs, /CUSTOM_REWARD_KEY/);
  assert.match(partnerJs, /availableRewards\(\)/);
  assert.match(partnerJs, /reward\.image/);
  assert.match(partnerJs, /vantage_partner_redemptions/);
});

test('provides director-managed employee access control', async () => {
  const [directorHtml, directorJs] = await Promise.all([
    (await request('/')).text(),
    (await request('/app.js')).text()
  ]);
  assert.match(directorHtml, /data-view-link="team"/);
  assert.match(directorHtml, /Create employee account/);
  assert.match(directorHtml, /id="staffLoginForm"/);
  assert.match(directorHtml, /View, add and edit are granted separately/);
  assert.match(directorJs, /const accessModules =/);
  assert.match(directorJs, /function canAccess/);
  assert.match(directorJs, /function requirePermission/);
  assert.match(directorJs, /function applyAccessControl/);
  assert.match(directorJs, /async function hashAccessCode/);
  assert.match(directorJs, /STAFF_STORAGE_KEY/);
  assert.match(directorJs, /currentStaffUser\.isDirector/);
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
  assert.match(blueprint, /source:\s*\/assurance/);
  assert.match(blueprint, /destination:\s*\/assurance\.html/);
  assert.match(blueprint, /source:\s*\/compliance/);
  assert.match(blueprint, /destination:\s*\/compliance\.html/);
});
