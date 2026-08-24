const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const PROFILE_KEY = 'vantage_partner_profile';
const SESSION_KEY = 'vantage_partner_session';
const REFERRAL_KEY = 'vantage_custom_referrals';
const PARTNER_REFERRAL_KEY = 'vantage_partner_referrals';
const OVERRIDE_KEY = 'vantage_referral_overrides';
const LEDGER_KEY = 'vantage_partner_ledger';
const PREVIEW_OTP = '246810';

const rewards = [
  {tier:'Member',title:'Design consultation credit',copy:'A private consultation for you or a nominated customer.',points:5000,mark:'DC'},
  {tier:'Silver',title:'Annual care upgrade',copy:'One complimentary annual maintenance visit on an eligible installation.',points:12000,mark:'12'},
  {tier:'Silver',title:'Modulinea service credit',copy:'₹5,000 service credit for you or a nominated client.',points:15000,mark:'M'},
  {tier:'Gold',title:'Chef’s table experience',copy:'A curated dining experience for two at a partner destination.',points:32000,mark:'✦'},
  {tier:'Gold',title:'Premium audio accessory',copy:'Choose from a curated premium audio accessory catalogue.',points:38000,mark:'AV'},
  {tier:'Black',title:'Signature design retreat',copy:'Two-day invitation-only architecture and design experience.',points:80000,mark:'V'}
];
const savedProgramRules = readJson('vantage_program_rules', {});
const tierThresholds = {Member:0,Silver:Number(savedProgramRules.Silver || 10000),Gold:Number(savedProgramRules.Gold || 30000),Black:Number(savedProgramRules.Black || 75000)};
const viewTitles = {home:'HOME',referrals:'MY REFERRALS',rewards:'REWARDS',wallet:'POINTS WALLET',profile:'MY PROFILE'};

let selectedRole = 'Architect';
let profile = readJson(PROFILE_KEY, null);
let partnerReferrals = readJson(PARTNER_REFERRAL_KEY, []);
let ledger = readJson(LEDGER_KEY, []);
let activeReferralFilter = 'all';
let activeLedgerFilter = 'all';
let latestConfirmationId = '';
let otpTimerHandle;

function readJson(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; }
  catch { return fallback; }
}
function writeJson(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function digits(value) { return String(value || '').replace(/\D/g, ''); }
function escapeHtml(value) { return String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char])); }
function initials(name) { return String(name || 'Partner').split(/\s+/).slice(0,2).map(part => part[0]).join('').toUpperCase(); }
function maskMobile(mobile) { const value = digits(mobile).slice(-10); return value.length === 10 ? `${value.slice(0,2)}••• ${value.slice(-5)}` : 'Mobile protected'; }
function displayMobile(mobile) { const value = digits(mobile).slice(-10); return value.length === 10 ? `+91 ••••• ${value.slice(-5)}` : 'Verified'; }
function formatPoints(value) { return Number(value || 0).toLocaleString('en-IN'); }
function formatINR(value) {
  const number = Number(value || 0);
  return number >= 100000 ? `₹${(number / 100000).toFixed(number % 100000 ? 1 : 0)} L` : `₹${number.toLocaleString('en-IN')}`;
}
function currentTier(points) {
  if (points >= tierThresholds.Black) return 'Black';
  if (points >= tierThresholds.Gold) return 'Gold';
  if (points >= tierThresholds.Silver) return 'Silver';
  return 'Member';
}
function nextTier(points) {
  if (points < tierThresholds.Silver) return {name:'Silver',remaining:tierThresholds.Silver - points,progress:(points / tierThresholds.Silver) * 100};
  if (points < tierThresholds.Gold) return {name:'Gold',remaining:tierThresholds.Gold - points,progress:((points - tierThresholds.Silver) / (tierThresholds.Gold - tierThresholds.Silver)) * 100};
  if (points < tierThresholds.Black) return {name:'Black',remaining:tierThresholds.Black - points,progress:((points - tierThresholds.Gold) / (tierThresholds.Black - tierThresholds.Gold)) * 100};
  return {name:'Black',remaining:0,progress:100};
}
function tierRank(tier) { return ['Member','Silver','Gold','Black'].indexOf(tier); }
function showScreen(id) {
  ['entryScreen','otpScreen','profileScreen','confirmScreen','partnerApp'].forEach(screenId => {
    const element = document.getElementById(screenId);
    if (element) element.hidden = screenId !== id;
  });
  document.body.classList.toggle('portal-active', id === 'partnerApp');
  window.scrollTo({top:0});
}
function showToast(title, message, symbol = '✓') {
  $('#portalToastTitle').textContent = title;
  $('#portalToastMessage').textContent = message;
  $('#portalToast > span').textContent = symbol;
  $('#portalToast').classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => $('#portalToast').classList.remove('show'), 3400);
}
function modalState(element, open) {
  element.classList.toggle('open', open);
  element.setAttribute('aria-hidden', String(!open));
}
function copyText(value) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
  const input = document.createElement('textarea');
  input.value = value;
  document.body.append(input);
  input.select();
  document.execCommand('copy');
  input.remove();
  return Promise.resolve();
}
function otpCountdown(seconds = 28) {
  clearInterval(otpTimerHandle);
  const button = $('#resendOtp');
  button.disabled = true;
  let remaining = seconds;
  const tick = () => {
    $('#otpTimer').textContent = `00:${String(remaining).padStart(2, '0')}`;
    if (remaining <= 0) {
      clearInterval(otpTimerHandle);
      button.disabled = false;
      button.innerHTML = 'Resend code';
      return;
    }
    remaining -= 1;
  };
  button.innerHTML = 'Resend code in <span id="otpTimer">00:28</span>';
  tick();
  otpTimerHandle = setInterval(tick, 1000);
}
function beginOtp(mobile, isSignIn = false) {
  sessionStorage.setItem('vantage_onboarding', JSON.stringify({mobile,role:selectedRole,signIn:isSignIn}));
  $('#otpMobile').textContent = displayMobile(mobile);
  $$('.otp-boxes input').forEach(input => { input.value = ''; });
  showScreen('otpScreen');
  otpCountdown();
  setTimeout(() => $('.otp-boxes input')?.focus(), 80);
}

function showPortal() {
  if (!profile) return showScreen('entryScreen');
  sessionStorage.setItem(SESSION_KEY, 'active');
  showScreen('partnerApp');
  renderPortal();
}
function switchPartnerView(view) {
  if (!viewTitles[view]) return;
  $$('.partner-view').forEach(item => item.classList.toggle('active', item.id === `partner-${view}`));
  $$('[data-partner-view]').forEach(button => button.classList.toggle('active', button.dataset.partnerView === view));
  $('#partnerViewTitle').textContent = viewTitles[view];
  $('#partnerApp').classList.remove('menu-open');
  $('#partnerMenu')?.setAttribute('aria-expanded', 'false');
  window.scrollTo({top:0,behavior:'smooth'});
}
function referralJourney(referral) {
  const count = referral.status === 'Converted' ? 4 : referral.status === 'Verified' ? 3 : referral.proof || 1;
  const copy = referral.status === 'Conflict' ? 'Automatically paused · exception created' : referral.status === 'Pending' ? 'Customer confirmation pending' : referral.status === 'Verified' ? 'Ownership locked automatically' : 'Converted · points processed';
  return `<div class="referral-journey-wrap"><div class="referral-journey">${[1,2,3,4].map(step => `<span class="${step <= count ? 'on' : ''}"></span>`).join('')}</div><p class="referral-journey-copy">${copy}</p></div>`;
}
function emptyReferralState() {
  return '<div class="portal-empty"><span>↗</span><h3>No referrals yet.</h3><button class="new-referral-button" data-open-partner-referral>Register referral</button></div>';
}
function renderReferrals() {
  const visible = partnerReferrals.filter(item => activeReferralFilter === 'all' || item.status === activeReferralFilter);
  $('#myReferralCount').textContent = partnerReferrals.length;
  $('#myReferralList').innerHTML = visible.length ? visible.map(item => `<article class="my-referral-card"><span>${initials(item.customer)}</span><div><h3>${escapeHtml(item.customer)}</h3><p>${escapeHtml(item.id)} · ${escapeHtml(item.vertical)} · ${formatINR(item.value)}</p></div>${referralJourney(item)}<div class="my-referral-actions"><span class="portal-status ${item.status.toLowerCase()}">${escapeHtml(item.status)}</span><button data-copy-confirmation="${escapeHtml(item.id)}">Share link</button></div></article>`).join('') : emptyReferralState();
  const latest = partnerReferrals.slice(0, 4);
  $('#homeReferralList').innerHTML = latest.length ? latest.map(item => `<article class="portal-referral-row"><span>${initials(item.customer)}</span><p><b>${escapeHtml(item.customer)}</b><small>${escapeHtml(item.vertical)} · ${escapeHtml(item.age || 'Just now')}</small></p><span class="portal-status ${item.status.toLowerCase()}">${escapeHtml(item.status)}</span><button data-partner-view="referrals">→</button></article>`).join('') : emptyReferralState();
  $('#activeReferralMetric').textContent = partnerReferrals.filter(item => item.status === 'Pending' || item.status === 'Verified').length;
  $('#conversionMetric').textContent = partnerReferrals.filter(item => item.status === 'Converted').length;
}
function renderRewards() {
  const points = Number(profile.points || 0);
  const tier = currentTier(points);
  $('#rewardBalance').textContent = `${formatPoints(points)} pts`;
  $('#rewardTier').textContent = `${tier.toUpperCase()} PARTNER`;
  $('#portalRewardGrid').innerHTML = rewards.map(reward => {
    const unlocked = points >= reward.points && tierRank(tier) >= tierRank(reward.tier);
    const action = unlocked ? `<button data-redeem-reward="${escapeHtml(reward.title)}">Redeem</button>` : `<span class="reward-lock">Need ${formatPoints(Math.max(0,reward.points - points))} pts</span>`;
    return `<article class="portal-reward-card ${unlocked ? '' : 'locked'}"><div class="portal-reward-art">${escapeHtml(reward.mark)}</div><span>${escapeHtml(reward.tier).toUpperCase()} ${unlocked ? '· AVAILABLE' : '· LOCKED'}</span><h3>${escapeHtml(reward.title)}</h3><p>${escapeHtml(reward.copy)}</p><footer><strong>${formatPoints(reward.points)} points</strong>${action}</footer></article>`;
  }).join('');
}
function renderLedger() {
  $('#walletPoints').textContent = formatPoints(profile.points || 0);
  const visible = ledger.filter(item => activeLedgerFilter === 'all' || item.type === activeLedgerFilter);
  $('#pointsLedger').innerHTML = visible.length ? visible.map(item => `<div class="ledger-row ${item.type === 'debit' ? 'debit' : ''}"><span>${item.type === 'debit' ? '−' : '+'}</span><p><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.date)} · ${escapeHtml(item.source)}</small></p><strong>${item.type === 'debit' ? '−' : '+'}${formatPoints(item.points)} pts</strong></div>`).join('') : '<div class="portal-empty compact"><h3>No matching activity.</h3><p>Choose another activity type to view your ledger.</p></div>';
}
function renderPortal() {
  profile.points = Number(profile.points || 0);
  profile.tier = currentTier(profile.points);
  writeJson(PROFILE_KEY, profile);
  const firstName = profile.name.split(/\s+/)[0];
  const identifier = profile.identifier || 'Not provided';
  const tierState = nextTier(profile.points);
  const date = new Intl.DateTimeFormat('en-IN',{weekday:'long',day:'2-digit',month:'long'}).format(new Date()).toUpperCase();
  $('#partnerDate').textContent = date;
  $('#greetingName').textContent = `${firstName}.`;
  $('#sidebarInitials').textContent = initials(profile.name);
  $('#sidebarName').textContent = profile.name;
  $('#sidebarRole').textContent = `${profile.role} · ${profile.tier}`;
  $('#homeTier').textContent = `${profile.tier} Partner`;
  $('#homePartnerType').textContent = `${profile.role} · Vantage Circle`;
  $('#homePoints').textContent = formatPoints(profile.points);
  $('#tierOrb').textContent = profile.tier[0];
  $('#tierProgressText').textContent = tierState.remaining ? `${formatPoints(tierState.remaining)} pts to ${tierState.name}` : 'Highest tier unlocked';
  $('#tierProgressBar').style.width = `${Math.max(2, Math.min(100, tierState.progress))}%`;
  $('#profileInitials').textContent = initials(profile.name);
  $('#profileName').textContent = profile.name;
  $('#profileStudio').textContent = `${profile.studio || 'Independent professional'} · ${profile.role}`;
  $('#profileMobile').textContent = displayMobile(profile.mobile);
  $('#profileEmail').textContent = profile.email;
  $('#profileIdentifier').textContent = identifier.length > 7 ? `${identifier.slice(0,4)}••${identifier.slice(-3)}` : identifier;
  renderReferrals();
  renderRewards();
  renderLedger();
}

function createReferral(form) {
  const data = Object.fromEntries(new FormData(form));
  const mobile = digits(data.mobile).slice(-10);
  const allReferrals = readJson(REFERRAL_KEY, []);
  const selfReferral = mobile === digits(profile.mobile).slice(-10);
  const duplicate = allReferrals.find(item => digits(item.rawMobile || item.mobile).slice(-10) === mobile);
  const addressMatch = allReferrals.find(item => item.address && item.address.trim().toLowerCase() === data.address.trim().toLowerCase());
  const conflict = selfReferral || duplicate || addressMatch;
  const now = new Date();
  const id = `VV-${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getFullYear()).slice(-2)}-${String(Date.now()).slice(-6)}`;
  const referral = {
    id,customer:data.customer,rawMobile:mobile,mobile:maskMobile(mobile),partner:profile.name,partnerMobile:profile.mobile,
    partnerType:profile.role,studio:profile.studio || 'Independent',vertical:data.vertical,value:Number(data.value || 0),
    proof:conflict ? 1 : 2,status:conflict ? 'Conflict' : 'Pending',age:'Just now',city:profile.city,address:data.address,
    registeredAt:now.toISOString(),ownershipTimestamp:now.toISOString(),automaticChecks:{identity:true,duplicate:!duplicate,selfReferral:!selfReferral,address:!addressMatch},
    exceptionReason:selfReferral ? 'Partner and customer mobile numbers match' : duplicate ? `Customer already exists on ${duplicate.id}` : addressMatch ? `Project address matches ${addressMatch.id}` : ''
  };
  allReferrals.unshift(referral);
  partnerReferrals.unshift(referral);
  writeJson(REFERRAL_KEY, allReferrals);
  writeJson(PARTNER_REFERRAL_KEY, partnerReferrals);
  return referral;
}
function showAutomaticResult(referral) {
  latestConfirmationId = referral.id;
  const passed = referral.status !== 'Conflict';
  $('#resultIcon').textContent = passed ? '✓' : '!';
  $('#resultIcon').classList.toggle('failed', !passed);
  $('#resultEyebrow').textContent = passed ? 'AUTOMATIC CHECKS PASSED' : 'AUTOMATIC HOLD APPLIED';
  $('#resultTitle').textContent = passed ? 'Your timestamp is protected.' : 'This referral needs attention.';
  $('#resultCopy').textContent = passed ? 'The customer confirmation is ready. Ownership locks automatically when they confirm.' : `${referral.exceptionReason}. No ownership or points will be released until the conflict is resolved.`;
  $('#autoResultList').innerHTML = [
    ['Partner identity verified',true],['Duplicate customer check',referral.automaticChecks.duplicate],['Self-referral check',referral.automaticChecks.selfReferral],['Project address check',referral.automaticChecks.address],['Attribution timestamp created',true]
  ].map(([label,pass]) => `<span class="${pass ? '' : 'failed'}">${pass ? '✓' : '!'} ${label}</span>`).join('');
  const link = `${location.origin}${location.pathname.replace(/partner\.html$/, 'partner.html')}?confirm=${encodeURIComponent(referral.id)}`;
  $('#verificationLink').value = link;
  $('.verification-link').hidden = !passed;
  $('#openConfirmation').hidden = !passed;
  modalState($('#resultModal'), true);
  renderPortal();
}
function updateReferral(id, changes) {
  const allReferrals = readJson(REFERRAL_KEY, []);
  const index = allReferrals.findIndex(item => item.id === id);
  if (index >= 0) allReferrals[index] = {...allReferrals[index],...changes};
  writeJson(REFERRAL_KEY, allReferrals);
  const partnerIndex = partnerReferrals.findIndex(item => item.id === id);
  if (partnerIndex >= 0) partnerReferrals[partnerIndex] = {...partnerReferrals[partnerIndex],...changes};
  writeJson(PARTNER_REFERRAL_KEY, partnerReferrals);
  const overrides = readJson(OVERRIDE_KEY, {});
  overrides[id] = {...(overrides[id] || {}),...changes};
  writeJson(OVERRIDE_KEY, overrides);
}
function openConfirmation(id) {
  const referral = readJson(REFERRAL_KEY, []).find(item => item.id === id);
  if (!referral) {
    showScreen('entryScreen');
    return showToast('Link unavailable','This confirmation link is invalid or has expired.','!');
  }
  latestConfirmationId = id;
  $('#confirmPartner').textContent = referral.partner;
  $('#confirmCustomer').textContent = referral.customer;
  $('#confirmVertical').textContent = `${referral.vertical} · ${referral.address}`;
  $('#customerConsent').checked = false;
  $('#confirmReferral').disabled = false;
  $('#rejectReferral').disabled = false;
  showScreen('confirmScreen');
}

$$('[data-role]').forEach(button => button.addEventListener('click', () => {
  selectedRole = button.dataset.role;
  $$('[data-role]').forEach(item => item.classList.toggle('active', item === button));
}));
$('#entryForm').addEventListener('submit', event => {
  event.preventDefault();
  const mobile = digits(new FormData(event.currentTarget).get('mobile')).slice(-10);
  if (mobile.length !== 10) return showToast('Check mobile number','Enter a valid 10-digit Indian mobile number.','!');
  if (profile && mobile === digits(profile.mobile).slice(-10)) return beginOtp(mobile, true);
  beginOtp(mobile, false);
});
$('#signInButton').addEventListener('click', () => {
  const mobileInput = $('input[name="mobile"]');
  const mobile = digits(mobileInput.value || profile?.mobile).slice(-10);
  if (mobile.length !== 10) { mobileInput.focus(); return showToast('Check mobile number','Enter your registered 10-digit mobile number.','!'); }
  mobileInput.value = mobile;
  beginOtp(mobile, true);
});
$$('[data-back-entry]').forEach(button => button.addEventListener('click', () => showScreen('entryScreen')));
$$('.otp-boxes input').forEach((input,index,inputs) => {
  input.addEventListener('input', () => { input.value = digits(input.value).slice(-1); if (input.value && inputs[index + 1]) inputs[index + 1].focus(); });
  input.addEventListener('keydown', event => { if (event.key === 'Backspace' && !input.value && inputs[index - 1]) inputs[index - 1].focus(); });
  input.addEventListener('paste', event => {
    const code = digits(event.clipboardData.getData('text')).slice(0, 6);
    if (code.length === 6) { event.preventDefault(); inputs.forEach((box,i) => { box.value = code[i]; }); inputs[5].focus(); }
  });
});
$('#otpForm').addEventListener('submit', event => {
  event.preventDefault();
  const code = $$('.otp-boxes input').map(input => input.value).join('');
  if (code !== PREVIEW_OTP) return showToast('Code not recognised','Use the product preview code 246810.','!');
  clearInterval(otpTimerHandle);
  const pending = JSON.parse(sessionStorage.getItem('vantage_onboarding') || '{}');
  if (pending.signIn) {
    if (!profile || digits(profile.mobile).slice(-10) !== digits(pending.mobile).slice(-10)) {
      showScreen('entryScreen');
      return showToast('No profile found','Create a partner profile with this mobile number first.','!');
    }
    return showPortal();
  }
  showScreen('profileScreen');
});
$('#resendOtp').addEventListener('click', () => {
  if ($('#resendOtp').disabled) return;
  otpCountdown();
  showToast('New code sent','For this preview, the code remains 246810.','→');
});
$('#profileForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const pending = JSON.parse(sessionStorage.getItem('vantage_onboarding') || '{}');
  profile = {name:data.name,studio:data.studio,city:data.city,identifier:data.identifier,email:data.email,mobile:pending.mobile,role:pending.role || selectedRole,verified:true,points:0,tier:'Member',joinedAt:new Date().toISOString()};
  writeJson(PROFILE_KEY, profile);
  ledger = [];
  writeJson(LEDGER_KEY, ledger);
  showPortal();
  showToast('Profile activated','You can now register and track referrals without calling the director.');
});

document.addEventListener('click', event => {
  const viewButton = event.target.closest('[data-partner-view]');
  if (viewButton) { event.preventDefault(); switchPartnerView(viewButton.dataset.partnerView); return; }
  if (event.target.closest('[data-open-partner-referral]')) { modalState($('#partnerReferralModal'), true); setTimeout(() => $('#partnerReferralForm input')?.focus(), 80); return; }
  if (event.target.closest('[data-close-partner-modal]')) { modalState($('#partnerReferralModal'), false); return; }
  if (event.target.closest('[data-close-result]')) { modalState($('#resultModal'), false); return; }
  if (event.target.closest('[data-close-profile-edit]')) { modalState($('#profileEditModal'), false); return; }
  const filter = event.target.closest('[data-my-filter]');
  if (filter) { activeReferralFilter = filter.dataset.myFilter; $$('[data-my-filter]').forEach(button => button.classList.toggle('active', button === filter)); renderReferrals(); return; }
  const share = event.target.closest('[data-copy-confirmation]');
  if (share) {
    const link = `${location.origin}${location.pathname.replace(/partner\.html$/, 'partner.html')}?confirm=${encodeURIComponent(share.dataset.copyConfirmation)}`;
    copyText(link).then(() => showToast('Confirmation link copied','Share it with the customer to lock attribution.','↗'));
    return;
  }
  const redeem = event.target.closest('[data-redeem-reward]');
  if (redeem) {
    const reward = rewards.find(item => item.title === redeem.dataset.redeemReward);
    const tier = currentTier(profile.points);
    if (!reward || profile.points < reward.points || tierRank(tier) < tierRank(reward.tier)) return;
    profile.points -= reward.points;
    writeJson(PROFILE_KEY, profile);
    ledger.unshift({type:'debit',title:reward.title,date:new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}),source:'Reward redemption',points:reward.points});
    writeJson(LEDGER_KEY, ledger);
    renderPortal();
    showToast('Redemption requested','Points are reserved and fulfilment is now visible to the programme team.','◇');
  }
});
$('#partnerMenu').addEventListener('click', () => {
  const isOpen = $('#partnerApp').classList.toggle('menu-open');
  $('#partnerMenu').setAttribute('aria-expanded', String(isOpen));
});
$('#partnerReferralForm').addEventListener('submit', event => {
  event.preventDefault();
  const referral = createReferral(event.currentTarget);
  event.currentTarget.reset();
  modalState($('#partnerReferralModal'), false);
  showAutomaticResult(referral);
});
$('#copyVerificationLink').addEventListener('click', event => { event.preventDefault(); copyText($('#verificationLink').value).then(() => showToast('Link copied','Send it to the customer by WhatsApp or SMS.','↗')); });
$('#openConfirmation').addEventListener('click', () => { modalState($('#resultModal'), false); openConfirmation(latestConfirmationId); history.replaceState({},'',`?confirm=${encodeURIComponent(latestConfirmationId)}`); });
$('#confirmReferral').addEventListener('click', () => {
  if (!$('#customerConsent').checked) return showToast('Confirmation required','Tick the customer confirmation before continuing.','!');
  updateReferral(latestConfirmationId,{status:'Verified',proof:3,ownershipLocked:true,verifiedAt:new Date().toISOString(),exceptionReason:''});
  $('#confirmCopy').textContent = 'Thank you. Your confirmation has been timestamped and the partner’s ownership is now locked automatically.';
  $('#confirmReferral').textContent = 'Referral confirmed ✓';
  $('#confirmReferral').disabled = true;
  $('#rejectReferral').disabled = true;
  showToast('Attribution locked','No manual approval is required for this verified referral.');
});
$('#rejectReferral').addEventListener('click', () => {
  updateReferral(latestConfirmationId,{status:'Conflict',proof:1,ownershipLocked:false,rejectedAt:new Date().toISOString(),exceptionReason:'Customer denied the referral relationship'});
  $('#confirmCopy').textContent = 'This referral has been paused automatically. The programme team will only review the recorded exception.';
  $('#confirmReferral').disabled = true;
  $('#rejectReferral').disabled = true;
  showToast('Referral paused','No points or ownership will be released.','!');
});
$('#signOut').addEventListener('click', () => { sessionStorage.removeItem(SESSION_KEY); showScreen('entryScreen'); showToast('Signed out','Your verified profile remains ready for the next sign-in.','→'); });
$('#editProfile').addEventListener('click', () => {
  const form = $('#profileEditForm');
  form.elements.studio.value = profile.studio || '';
  form.elements.city.value = profile.city || '';
  form.elements.email.value = profile.email || '';
  modalState($('#profileEditModal'), true);
  setTimeout(() => form.elements.studio.focus(), 80);
});
$('#profileEditForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  profile = {...profile,studio:data.studio.trim(),city:data.city.trim(),email:data.email.trim()};
  writeJson(PROFILE_KEY, profile);
  modalState($('#profileEditModal'), false);
  renderPortal();
  showToast('Profile updated','Your studio, city and email were saved.');
});
$('#ledgerFilter').addEventListener('change', event => { activeLedgerFilter = event.currentTarget.value; renderLedger(); });
$('#downloadStatement').addEventListener('click', () => {
  const rows = [['Date','Activity','Source','Points'],...ledger.map(item => [item.date,item.title,item.source,`${item.type === 'debit' ? '-' : '+'}${item.points}`])];
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"','""')}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  link.download = 'vantage-points-statement.csv';
  link.click();
  URL.revokeObjectURL(link.href);
  showToast('Statement downloaded','Your transparent points ledger is ready.','⇩');
});
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  modalState($('#partnerReferralModal'), false);
  modalState($('#resultModal'), false);
  modalState($('#profileEditModal'), false);
  $('#partnerApp').classList.remove('menu-open');
  $('#partnerMenu')?.setAttribute('aria-expanded', 'false');
});

const confirmationId = new URLSearchParams(location.search).get('confirm');
if (confirmationId) openConfirmation(confirmationId);
else if (profile && sessionStorage.getItem(SESSION_KEY) === 'active') showPortal();
else showScreen('entryScreen');
