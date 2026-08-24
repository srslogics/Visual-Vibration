const seedReferrals = [
  {id:'VV-260824-0184',customer:'Rohan Malhotra',mobile:'98••• 21490',partner:'Aarav Mehta',partnerType:'Architect',studio:'Studio Arc',vertical:'Modular kitchen',value:1450000,proof:2,status:'Pending',age:'12 min',city:'Nagpur',address:'Civil Lines, Nagpur'},
  {id:'VV-260824-0183',customer:'Vidit Kapoor',mobile:'99••• 08742',partner:'Naina Shah',partnerType:'Interior designer',studio:'Form & Hue',vertical:'Home automation',value:820000,proof:3,status:'Verified',age:'28 min',city:'Nagpur',address:'Dharampeth, Nagpur'},
  {id:'VV-260824-0179',customer:'Manan Joshi',mobile:'97••• 44218',partner:'Rhea Khanna',partnerType:'Customer advocate',studio:'Gold member',vertical:'Home theatre / AV',value:680000,proof:1,status:'Conflict',age:'1 hr',city:'Nagpur',address:'Ramdaspeth, Nagpur'},
  {id:'VV-250824-0171',customer:'Priya Bhandari',mobile:'93••• 11082',partner:'Devika Batra',partnerType:'Interior designer',studio:'Line & Loom',vertical:'Architectural lighting',value:520000,proof:3,status:'Converted',age:'Yesterday',city:'Nagpur',address:'Wardha Road, Nagpur'},
  {id:'VV-250824-0168',customer:'Ishaan Sethi',mobile:'88••• 67041',partner:'Kabir Jain',partnerType:'Architect',studio:'Bareform Studio',vertical:'Multiple verticals',value:2200000,proof:3,status:'Verified',age:'Yesterday',city:'Nagpur',address:'Bajaj Nagar, Nagpur'},
  {id:'VV-240824-0159',customer:'Sanya Agrawal',mobile:'91••• 78115',partner:'Aarav Mehta',partnerType:'Architect',studio:'Studio Arc',vertical:'Home automation',value:760000,proof:3,status:'Converted',age:'2 days',city:'Nagpur',address:'Pratap Nagar, Nagpur'},
  {id:'VV-230824-0152',customer:'Neel Deshmukh',mobile:'96••• 35008',partner:'Vikram Lalwani',partnerType:'Customer advocate',studio:'Silver member',vertical:'Modular kitchen',value:1120000,proof:2,status:'Pending',age:'3 days',city:'Nagpur',address:'Manish Nagar, Nagpur'},
  {id:'VV-220824-0146',customer:'Tanvi Wadhwa',mobile:'90••• 12884',partner:'Naina Shah',partnerType:'Interior designer',studio:'Form & Hue',vertical:'Architectural lighting',value:410000,proof:3,status:'Verified',age:'4 days',city:'Nagpur',address:'Shankar Nagar, Nagpur'}
];

const seedPartners = [
  {name:'Aarav Mehta',initials:'AM',type:'Architect',studio:'Studio Arc',tier:'Black',referrals:38,conversion:'56%',revenue:'₹42.8 L',points:86420,next:'Signature Retreat',progress:86,color:'#17362f'},
  {name:'Naina Shah',initials:'NS',type:'Interior designer',studio:'Form & Hue',tier:'Gold',referrals:31,conversion:'48%',revenue:'₹31.4 L',points:54800,next:'Black at 75K',progress:73,color:'#c59b55'},
  {name:'Devika Batra',initials:'DB',type:'Interior designer',studio:'Line & Loom',tier:'Gold',referrals:27,conversion:'44%',revenue:'₹24.1 L',points:46600,next:'Black at 75K',progress:62,color:'#a9844d'},
  {name:'Kabir Jain',initials:'KJ',type:'Architect',studio:'Bareform Studio',tier:'Gold',referrals:22,conversion:'50%',revenue:'₹28.8 L',points:41750,next:'Black at 75K',progress:56,color:'#6d744f'},
  {name:'Rhea Khanna',initials:'RK',type:'Customer advocate',studio:'Gold member',tier:'Gold',referrals:18,conversion:'39%',revenue:'₹18.6 L',points:38200,next:'Black at 75K',progress:51,color:'#824a4b'},
  {name:'Vikram Lalwani',initials:'VL',type:'Customer advocate',studio:'Silver member',tier:'Silver',referrals:11,conversion:'36%',revenue:'₹9.4 L',points:18400,next:'Gold at 30K',progress:61,color:'#7c8883'},
  {name:'Mira Kothari',initials:'MK',type:'Architect',studio:'Mira Kothari Studio',tier:'Silver',referrals:9,conversion:'33%',revenue:'₹8.7 L',points:14200,next:'Gold at 30K',progress:47,color:'#647b72'},
  {name:'Anay Kulkarni',initials:'AK',type:'Interior designer',studio:'Object & Space',tier:'Member',referrals:4,conversion:'25%',revenue:'₹3.2 L',points:6800,next:'Silver at 10K',progress:68,color:'#b9734d'}
];

const defaultProgramRules = {Silver:10000,Gold:30000,Black:75000,baseRate:1,automationMultiplier:1.2,crossBonus:5000};
const defaultFraudCases = [
  {icon:'!',title:'Duplicate ownership claim',copy:'Manan Joshi was registered by two partners within 46 minutes. The earlier claim has customer consent.',tags:['High confidence match','₹6.8 L opportunity'],id:'VV-260824-0179',status:'Open',evidence:['Customer mobile matched an earlier record','First claim timestamp: 24 Aug, 10:32','Customer consent recorded on the earlier claim']},
  {icon:'↔',title:'Project address overlap',copy:'Two customer records reference the same project site with different mobile numbers.',tags:['Address match 92%','Needs decision'],id:'VV-250824-0174',status:'Open',evidence:['Project address similarity: 92%','Customer mobile numbers are different','No consent received on the later claim']},
  {icon:'◎',title:'Potential self-referral',copy:'Partner and customer records share a household identifier.',tags:['Identity overlap','Points on hold'],id:'VV-240824-0161',status:'Open',evidence:['Partner and customer identity data overlap','Reward points are held','No payout has been released']}
];

const seedRewards = [
  {id:'reward-amc',code:'AMC',type:'Service',tier:'Silver',title:'Annual care upgrade',copy:'One complimentary annual maintenance visit across eligible installations.',points:12000,mark:'12',status:'Published',stock:null,validUntil:''},
  {id:'reward-mod',code:'MOD',type:'Voucher',tier:'Silver',title:'Modulinea service credit',copy:'₹5,000 service credit for the partner or a nominated client.',points:15000,mark:'M',status:'Published',stock:null,validUntil:''},
  {id:'reward-din',code:'DIN',type:'Experience',tier:'Gold',title:'Chef’s table experience',copy:'A curated dining experience for two at a partner destination.',points:32000,mark:'✦',status:'Published',stock:null,validUntil:''},
  {id:'reward-av',code:'AV',type:'Gadget',tier:'Gold',title:'Premium audio accessory',copy:'Choose from a curated catalogue of premium audio accessories.',points:38000,mark:'AV',status:'Published',stock:null,validUntil:''},
  {id:'reward-sty',code:'STY',type:'Service',tier:'Gold',title:'Design material library',copy:'An annual material and finish sample library for the studio.',points:45000,mark:'□',status:'Published',stock:null,validUntil:''},
  {id:'reward-ret',code:'RET',type:'Trip',tier:'Black',title:'Signature design retreat',copy:'Two-day invitation-only architecture and design experience.',points:80000,mark:'V',status:'Published',stock:null,validUntil:''},
  {id:'reward-prv',code:'PRV',type:'Experience',tier:'Black',title:'Private preview evening',copy:'Host a private Visual Vibrations preview for clients and guests.',points:85000,mark:'◇',status:'Published',stock:null,validUntil:''},
  {id:'reward-con',code:'CON',type:'Voucher',tier:'Black',title:'Partner experience credit',copy:'₹25,000 credit across curated partner experiences.',points:90000,mark:'₹',status:'Published',stock:null,validUntil:''}
];

const redemptionSeed = [
  {id:'RD-260824-048',partner:'Naina Shah',tier:'Gold',reward:'Chef’s table experience',points:32000,status:'Pending',date:'24 Aug'},
  {id:'RD-260824-047',partner:'Aarav Mehta',tier:'Black',reward:'Signature design retreat',points:80000,status:'Pending',date:'24 Aug'},
  {id:'RD-230824-044',partner:'Rhea Khanna',tier:'Gold',reward:'Premium audio accessory',points:38000,status:'Approved',date:'23 Aug'},
  {id:'RD-210824-039',partner:'Vikram Lalwani',tier:'Silver',reward:'Annual care upgrade',points:12000,status:'Issued',date:'21 Aug'},
  {id:'RD-190824-036',partner:'Devika Batra',tier:'Gold',reward:'Design material library',points:45000,status:'Issued',date:'19 Aug'}
];

let customReferrals = JSON.parse(localStorage.getItem('vantage_custom_referrals') || '[]');
let referralOverrides = JSON.parse(localStorage.getItem('vantage_referral_overrides') || '{}');
let referrals = [...customReferrals, ...seedReferrals].map(item => ({...item, ...(referralOverrides[item.id] || {})}));
let programmeRedemptions = JSON.parse(localStorage.getItem('vantage_redemptions') || 'null') || redemptionSeed;
let partnerRedemptions = JSON.parse(localStorage.getItem('vantage_partner_redemptions') || '[]');
let redemptions = [...partnerRedemptions, ...programmeRedemptions];
let customPartners = JSON.parse(localStorage.getItem('vantage_custom_partners') || '[]');
let partners = [...customPartners, ...seedPartners];
let customRewards = JSON.parse(localStorage.getItem('vantage_custom_rewards') || '[]').map(reward => ({type:'Other',status:'Published',stock:10,validUntil:'',mark:'V',...reward}));
let programRules = {...defaultProgramRules, ...(JSON.parse(localStorage.getItem('vantage_program_rules') || 'null') || {})};
let fraudCases = JSON.parse(localStorage.getItem('vantage_fraud_cases') || 'null') || defaultFraudCases;
let activeReferralFilter = 'all';
let activePartnerType = 'all';
let activeRewardFilter = 'all';
let activeRedemptionFilter = 'all';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const initials = name => name.split(/\s+/).slice(0,2).map(part => part[0]).join('').toUpperCase();
const statusClass = status => status.toLowerCase().replace(/\s+/g,'-');
const formatINR = value => value >= 100000 ? `₹${(value/100000).toFixed(value % 100000 ? 1 : 0)} L` : `₹${Number(value).toLocaleString('en-IN')}`;
const getRewards = () => [...customRewards, ...seedRewards];
const rewardMark = type => ({Trip:'✦',Gadget:'G',Experience:'◇',Service:'S',Voucher:'₹',Other:'V'}[type] || 'V');

function optimiseRewardImage(file) {
  const allowed = ['image/jpeg','image/png','image/webp'];
  if (!allowed.includes(file.type)) return Promise.reject(new Error('Use a JPG, PNG or WebP image.'));
  if (file.size > 10 * 1024 * 1024) return Promise.reject(new Error('Choose an image smaller than 10 MB.'));
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      try {
        const targetWidth = 1200;
        const targetHeight = 750;
        const targetRatio = targetWidth / targetHeight;
        const sourceRatio = image.naturalWidth / image.naturalHeight;
        let sourceX = 0;
        let sourceY = 0;
        let sourceWidth = image.naturalWidth;
        let sourceHeight = image.naturalHeight;
        if (sourceRatio > targetRatio) {
          sourceWidth = image.naturalHeight * targetRatio;
          sourceX = (image.naturalWidth - sourceWidth) / 2;
        } else {
          sourceHeight = image.naturalWidth / targetRatio;
          sourceY = (image.naturalHeight - sourceHeight) / 2;
        }
        const canvas = document.createElement('canvas');
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const context = canvas.getContext('2d');
        context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, targetWidth, targetHeight);
        const webp = canvas.toDataURL('image/webp', .82);
        resolve(webp.startsWith('data:image/webp') ? webp : canvas.toDataURL('image/jpeg', .84));
      } catch (error) {
        reject(error);
      } finally {
        URL.revokeObjectURL(objectUrl);
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('This image could not be opened.'));
    };
    image.src = objectUrl;
  });
}

function persistRedemptions() {
  partnerRedemptions = redemptions.filter(item => item.source === 'partner-app');
  programmeRedemptions = redemptions.filter(item => item.source !== 'partner-app');
  localStorage.setItem('vantage_partner_redemptions', JSON.stringify(partnerRedemptions));
  localStorage.setItem('vantage_redemptions', JSON.stringify(programmeRedemptions));
}

function showToast(title, message, symbol = '✓') {
  const toast = $('#toast');
  $('#toastTitle').textContent = title;
  $('#toastMessage').textContent = message;
  toast.querySelector(':scope > span').textContent = symbol;
  toast.classList.add('show');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
}

async function copyText(value) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
  const input = document.createElement('textarea');
  input.value = value;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  input.remove();
}

function openActionModal(content) {
  $('#actionModalContent').innerHTML = content;
  $('#actionModal').classList.add('open');
  $('#actionModal').setAttribute('aria-hidden','false');
  setTimeout(() => $('#actionModalContent input, #actionModalContent textarea, #actionModalContent select')?.focus(), 80);
}

function closeActionModal() {
  $('#actionModal').classList.remove('open');
  $('#actionModal').setAttribute('aria-hidden','true');
  $('#actionModalContent').innerHTML = '';
}

function applyProgramRules() {
  $$('[data-tier-threshold]').forEach(node => { node.textContent = Number(programRules[node.dataset.tierThreshold]).toLocaleString('en-IN'); });
  $$('[data-rule-output="base"]').forEach(node => { node.textContent = `${programRules.baseRate} pt / ₹100`; });
  $('[data-rule-output="automation"]').textContent = `${programRules.automationMultiplier}× points`;
  $('[data-rule-output="bonus"]').textContent = `+${Number(programRules.crossBonus).toLocaleString('en-IN')} pts`;
}

function switchView(viewId) {
  const target = document.getElementById(viewId);
  if (!target) return;
  $$('.view').forEach(view => view.classList.toggle('active', view.id === viewId));
  $$('.nav-link').forEach(link => link.classList.toggle('active', link.dataset.viewLink === viewId));
  const activeLink = $(`.nav-link[data-view-link="${viewId}"]`);
  $('#viewTitle').textContent = (activeLink?.textContent || 'Control centre').replace(/\d+/g,'').trim().toUpperCase();
  document.body.classList.remove('menu-open');
  window.scrollTo({top:0, behavior:'smooth'});
}

function proofBars(count) {
  return `<span class="mini-proof">${[1,2,3].map(n => `<i class="${n <= count ? 'on' : ''}"></i>`).join('')}</span><small>${count}/3 evidence checks</small>`;
}

function renderReferrals() {
  const query = ($('#referralSearch')?.value || '').trim().toLowerCase();
  const filtered = referrals.filter(item => {
    const matchesFilter = activeReferralFilter === 'all' || item.status === activeReferralFilter;
    const haystack = `${item.id} ${item.customer} ${item.partner} ${item.partnerType} ${item.vertical}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });
  $('#referralRows').innerHTML = filtered.length ? filtered.map(item => `
    <div class="table-row">
      <span><b>${escapeHtml(item.customer)}</b><small>${escapeHtml(item.id)} · ${escapeHtml(item.mobile)}</small></span>
      <span><b>${escapeHtml(item.partner)}</b><small>${escapeHtml(item.partnerType)} · ${escapeHtml(item.studio || '')}</small></span>
      <span><b>${escapeHtml(item.vertical)}</b><small>${formatINR(item.value)} estimated</small></span>
      <span>${proofBars(item.proof)}</span>
      <span><b class="status-badge ${statusClass(item.status)}">${escapeHtml(item.status).toUpperCase()}</b><small>${escapeHtml(item.age)}</small></span>
      <button class="row-open" data-open-referral="${escapeHtml(item.id)}" aria-label="Open referral">→</button>
    </div>`).join('') : '<div class="empty-state">No referrals match this view.</div>';
  $('#referralCount').textContent = referrals.length;
  $('#allReferralTotal').textContent = 240 + customReferrals.length + seedReferrals.length;
}

function renderVerification() {
  const items = referrals.filter(item => item.status === 'Conflict').slice(0,7);
  $('#verificationQueue').innerHTML = items.map(item => `
    <article class="verification-card flagged">
      <div class="verification-card-head"><div class="partner-avatar ${item.partnerType === 'Interior designer' ? 'ochre' : item.partnerType === 'Customer advocate' ? 'wine' : ''}">${initials(item.partner)}</div><div><h3>${escapeHtml(item.id)}</h3><p>${escapeHtml(item.vertical)} · ${formatINR(item.value)} · ${escapeHtml(item.city)}</p></div><time>${escapeHtml(item.age)}</time></div>
      <div class="verification-route"><div><small>REFERRED BY</small><b>${escapeHtml(item.partner)}</b><small>${escapeHtml(item.partnerType)} · ${escapeHtml(item.studio || '')}</small></div><span>→</span><div><small>CUSTOMER</small><b>${escapeHtml(item.customer)}</b><small>${escapeHtml(item.mobile)} · ${escapeHtml(item.address)}</small></div></div>
      <div class="verification-checks"><span>✓ Identity screened</span><span class="missing">! Automatic rule failed</span><span>◆ Points held safely</span></div>
      <div class="verification-actions"><button data-open-referral="${escapeHtml(item.id)}">Review exception evidence</button></div>
    </article>`).join('') || '<article class="panel empty-state">Automation cleared every referral. There are no exceptions for the director.</article>';
  const badge = $('.nav-link[data-view-link="verification"] .alert-count');
  if (badge) badge.textContent = String(items.length).padStart(2,'0');
}

function renderPartners() {
  const query = ($('#partnerSearch')?.value || '').trim().toLowerCase();
  const tier = $('#partnerTierFilter')?.value || 'all';
  const filtered = partners.filter(partner => (activePartnerType === 'all' || partner.type === activePartnerType) && (tier === 'all' || partner.tier === tier) && `${partner.name} ${partner.studio}`.toLowerCase().includes(query));
  $('#partnerGrid').innerHTML = filtered.map(partner => `
    <article class="partner-card" style="--partner-color:${partner.color}">
      <div class="partner-card-top"><div class="partner-avatar">${partner.initials}</div><div><h3>${escapeHtml(partner.name)}</h3><p>${escapeHtml(partner.studio)} · ${escapeHtml(partner.type)}</p></div><span class="tier-chip ${partner.tier.toLowerCase()}">${escapeHtml(partner.tier).toUpperCase()}</span></div>
      <div class="partner-card-metrics"><div><small>REFERRALS</small><b>${partner.referrals}</b></div><div><small>CONVERSION</small><b>${partner.conversion}</b></div><div><small>REVENUE</small><b>${partner.revenue}</b></div></div>
      <div class="partner-progress"><div><i style="width:${partner.progress}%"></i></div><span>${partner.points.toLocaleString('en-IN')} pts · ${escapeHtml(partner.next)}</span></div>
      <button data-partner-profile="${escapeHtml(partner.name)}">Open verified profile →</button>
    </article>`).join('') || '<div class="panel empty-state">No partners match this view.</div>';
}

function renderRewards() {
  const filtered = getRewards().filter(reward => activeRewardFilter === 'all' || reward.tier === activeRewardFilter);
  $('#rewardGrid').innerHTML = filtered.map(reward => {
    const inventory = reward.stock == null ? 'Open inventory' : `${Number(reward.stock).toLocaleString('en-IN')} available`;
    const validity = reward.validUntil ? `Until ${new Date(`${reward.validUntil}T00:00:00`).toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})}` : 'No expiry';
    const isCustom = customRewards.some(item => item.id === reward.id);
    const visual = reward.image ? `<img src="${escapeHtml(reward.image)}" alt="">` : escapeHtml(reward.mark);
    return `<article class="reward-card ${reward.status === 'Draft' ? 'draft' : ''}"><div class="reward-visual ${reward.image ? 'has-image' : ''}">${visual}<span class="reward-publish-state ${reward.status.toLowerCase()}">${escapeHtml(reward.status)}</span></div><span>${escapeHtml(reward.tier).toUpperCase()} · ${escapeHtml(reward.type)} · ${escapeHtml(reward.code)}</span><h3>${escapeHtml(reward.title)}</h3><p>${escapeHtml(reward.copy)}</p><div class="reward-card-meta"><span>${escapeHtml(inventory)}</span><span>${escapeHtml(validity)}</span></div><footer><strong>${Number(reward.points).toLocaleString('en-IN')} points</strong><div class="reward-card-actions"><button data-reward-info="${escapeHtml(reward.id)}">View rule</button>${isCustom ? `<button class="manage" data-manage-reward="${escapeHtml(reward.id)}">Manage</button>` : ''}</div></footer></article>`;
  }).join('') || '<div class="panel empty-state">No rewards match this tier.</div>';
}

function renderRedemptions() {
  const filtered = redemptions.filter(item => activeRedemptionFilter === 'all' || item.status === activeRedemptionFilter);
  $('#redemptionRows').innerHTML = filtered.map(item => `<div class="table-row"><span><b>${escapeHtml(item.id)}</b><small>${escapeHtml(item.date)}</small></span><span><b>${escapeHtml(item.partner)}</b><small>${escapeHtml(item.tier)} tier</small></span><span><b>${escapeHtml(item.reward)}</b><small>Catalogue reward</small></span><span><b>${item.points.toLocaleString('en-IN')}</b><small>points</small></span><span><small class="eligibility">Tier & balance confirmed</small></span><span class="table-action">${item.status === 'Pending' ? `<button data-reject-redemption="${item.id}">Hold</button><button class="approve" data-approve-redemption="${item.id}">Approve</button>` : `<b class="status-badge ${statusClass(item.status)}">${item.status.toUpperCase()}</b>`}</span></div>`).join('');
}

function renderFraudCases() {
  const openCases = fraudCases.filter(item => item.status === 'Open');
  $('#fraudCases').innerHTML = openCases.length ? openCases.map(item => `<article class="fraud-case"><span class="risk-icon">${item.icon}</span><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.copy)}</p><div class="fraud-case-tags">${item.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div></div><button data-resolve-case="${escapeHtml(item.id)}">Investigate →</button></article>`).join('') : '<article class="panel empty-state">No unresolved fraud cases.</article>';
  const fraudBadge = $('.nav-link[data-view-link="fraud"] .alert-count');
  if (fraudBadge) fraudBadge.textContent = String(openCases.length).padStart(2,'0');
  const riskPill = $('#fraud .risk-pill');
  if (riskPill) riskPill.textContent = `${openCases.length} OPEN`;
}

function saveReferralOverride(id, changes) {
  referralOverrides[id] = {...(referralOverrides[id] || {}), ...changes};
  localStorage.setItem('vantage_referral_overrides', JSON.stringify(referralOverrides));
}

function openReferral(id) {
  const item = referrals.find(referral => referral.id === id) || {id,customer:'Referral customer',partner:'Partner under review',partnerType:'Partner',studio:'',vertical:'Opportunity',value:0,proof:1,status:'Conflict',mobile:'—',address:'Evidence under review'};
  $('#drawerReferralId').textContent = item.id;
  $('#drawerContent').innerHTML = `
    <div class="drawer-profile"><div class="partner-avatar">${initials(item.partner)}</div><div><h3>${escapeHtml(item.partner)}</h3><p>${escapeHtml(item.partnerType)} · ${escapeHtml(item.studio || 'Verified partner')}</p></div><span class="tier-chip ${item.status === 'Conflict' ? 'member' : 'gold'}">${escapeHtml(item.status).toUpperCase()}</span></div>
    <div class="drawer-proof"><h3>${escapeHtml(item.partner)} → ${escapeHtml(item.customer)}</h3><div class="verification-checks"><span>✓ Partner identity</span><span class="${item.proof < 2 ? 'missing' : ''}">${item.proof >= 2 ? '✓' : '○'} Customer consent</span><span class="${item.proof < 3 ? 'missing' : ''}">${item.proof >= 3 ? '✓' : '○'} Opportunity match</span></div></div>
    <div class="drawer-timeline"><div class="timeline-event"><span>✓</span><p><b>Referral registered</b><small>${escapeHtml(item.partner)} created this referral with customer and project details.</small></p></div><div class="timeline-event ${item.proof < 2 ? 'pending' : ''}"><span>${item.proof >= 2 ? '✓' : '02'}</span><p><b>Customer consent</b><small>${item.proof >= 2 ? `${escapeHtml(item.customer)} confirmed through secure OTP.` : `Verification sent to ${escapeHtml(item.mobile)}. Awaiting response.`}</small></p></div><div class="timeline-event ${item.proof < 3 ? 'pending' : ''}"><span>${item.proof >= 3 ? '✓' : '03'}</span><p><b>Opportunity ownership</b><small>${item.proof >= 3 ? `${escapeHtml(item.vertical)} opportunity linked at ${formatINR(item.value)}.` : 'Lead and project match pending review.'}</small></p></div><div class="timeline-event pending"><span>04</span><p><b>Invoice & points</b><small>Points release after payment clearance and the 15-day cooling period.</small></p></div></div>
    <div class="drawer-actions"><button class="secondary-button" data-send-otp="${escapeHtml(item.id)}">Copy verification link</button>${item.proof >= 3 && item.status !== 'Verified' ? `<button class="primary-button" data-quick-verify="${escapeHtml(item.id)}">Approve & lock</button>` : `<button class="primary-button" data-view-link="referrals">Open registry</button>`}</div>`;
  $('#referralDrawer').classList.add('open');
  $('#referralDrawer').setAttribute('aria-hidden','false');
}

function openPartner(name) {
  const partner = partners.find(item => item.name === name);
  if (!partner) return;
  $('#drawerReferralId').textContent = 'PARTNER PROFILE';
  $('#drawerContent').innerHTML = `<div class="drawer-profile"><div class="partner-avatar">${partner.initials}</div><div><h3>${escapeHtml(partner.name)}</h3><p>${escapeHtml(partner.studio)} · ${escapeHtml(partner.type)}</p></div><span class="tier-chip ${partner.tier.toLowerCase()}">${partner.tier.toUpperCase()}</span></div><div class="summary-strip" style="grid-template-columns:repeat(3,1fr)"><div><small>REFERRALS</small><strong>${partner.referrals}</strong></div><div><small>CONVERSION</small><strong>${partner.conversion}</strong></div><div><small>REVENUE</small><strong>${partner.revenue}</strong></div></div><div class="drawer-proof"><h3>${partner.points.toLocaleString('en-IN')} available points</h3><div class="partner-progress"><div><i style="width:${partner.progress}%"></i></div><span>${partner.next}</span></div></div><div class="drawer-timeline"><div class="timeline-event"><span>✓</span><p><b>Identity and KYC verified</b><small>Mobile, email and partner identity validated.</small></p></div><div class="timeline-event"><span>✓</span><p><b>Reward account active</b><small>Points ledger reconciled with converted referrals.</small></p></div><div class="timeline-event pending"><span>→</span><p><b>${partner.next}</b><small>${Math.max(0,75000-partner.points).toLocaleString('en-IN')} points to the next signature tier where applicable.</small></p></div></div><div class="drawer-actions"><button class="secondary-button" data-view-link="referrals">View referrals</button><button class="primary-button" data-view-link="rewards">View rewards</button></div>`;
  $('#referralDrawer').classList.add('open');
  $('#referralDrawer').setAttribute('aria-hidden','false');
}

function openNotifications() {
  const conflicts = referrals.filter(item => item.status === 'Conflict').slice(0, 3);
  const pending = redemptions.filter(item => item.status === 'Pending').slice(0, 2);
  $('#drawerReferralId').textContent = 'NOTIFICATIONS';
  $('#drawerContent').innerHTML = `<div class="drawer-timeline notification-list">
    ${conflicts.map(item => `<button class="timeline-event" data-open-referral="${escapeHtml(item.id)}"><span>!</span><p><b>${escapeHtml(item.id)} needs review</b><small>${escapeHtml(item.customer)} · ${escapeHtml(item.exceptionReason || 'Ownership conflict')}</small></p></button>`).join('')}
    ${pending.map(item => `<button class="timeline-event" data-view-link="redemptions"><span>◇</span><p><b>${escapeHtml(item.id)} awaits approval</b><small>${escapeHtml(item.partner)} · ${escapeHtml(item.reward)}</small></p></button>`).join('')}
  </div>${conflicts.length + pending.length ? '' : '<div class="empty-state">You are all caught up.</div>'}`;
  $('#referralDrawer').classList.add('open');
  $('#referralDrawer').setAttribute('aria-hidden','false');
}

function openRewardRule(id) {
  const reward = getRewards().find(item => item.id === id);
  if (!reward) return;
  const eligible = partners.filter(partner => partner.points >= reward.points && ['Member','Silver','Gold','Black'].indexOf(partner.tier) >= ['Member','Silver','Gold','Black'].indexOf(reward.tier));
  $('#drawerReferralId').textContent = reward.code;
  const inventory = reward.stock == null ? 'No inventory limit' : `${Number(reward.stock).toLocaleString('en-IN')} redemptions available`;
  const validity = reward.validUntil ? `Available until ${new Date(`${reward.validUntil}T00:00:00`).toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'})}` : 'No expiry date';
  const isCustom = customRewards.some(item => item.id === reward.id);
  const drawerVisual = reward.image ? `<div class="partner-avatar reward-thumb"><img src="${escapeHtml(reward.image)}" alt=""></div>` : `<div class="partner-avatar">${escapeHtml(reward.mark)}</div>`;
  $('#drawerContent').innerHTML = `<div class="drawer-profile">${drawerVisual}<div><h3>${escapeHtml(reward.title)}</h3><p>${escapeHtml(reward.type)} · ${escapeHtml(reward.tier)} · ${Number(reward.points).toLocaleString('en-IN')} points</p></div><span class="tier-chip ${reward.tier.toLowerCase()}">${reward.tier.toUpperCase()}</span></div><div class="drawer-proof"><h3>Redemption rule</h3><div class="verification-checks"><span>✓ ${escapeHtml(reward.tier)} tier or above</span><span>✓ ${Number(reward.points).toLocaleString('en-IN')} available points</span><span>✓ No active account hold</span><span>◆ ${escapeHtml(inventory)}</span><span>◆ ${escapeHtml(validity)}</span></div></div><div class="drawer-proof"><h3>${eligible.length} eligible partners</h3><p>${eligible.length ? eligible.map(item => escapeHtml(item.name)).join(' · ') : 'No partner currently meets both requirements.'}</p></div><div class="drawer-actions"><button class="secondary-button" data-view-link="partners">View partners</button>${isCustom ? `<button class="primary-button" data-manage-reward="${escapeHtml(reward.id)}">Manage reward</button>` : ''}</div>`;
  $('#referralDrawer').classList.add('open');
  $('#referralDrawer').setAttribute('aria-hidden','false');
}

function openPartnerForm() {
  openActionModal(`<div class="modal-intro"><p class="eyebrow">NEW PARTNER</p><h2 id="actionModalTitle">Add a verified partner.</h2></div><form id="partnerForm"><div class="form-grid"><label>Full name<input name="name" required placeholder="Partner name"></label><label>Partner type<select name="type" required><option>Architect</option><option>Interior designer</option><option>Customer advocate</option></select></label><label>Studio / organisation<input name="studio" required placeholder="Studio or organisation"></label><label>Mobile number<input name="mobile" inputmode="numeric" pattern="[0-9]{10}" maxlength="10" required placeholder="10-digit mobile"></label><label class="span-2">Email address<input name="email" type="email" required placeholder="name@studio.com"></label></div><div class="form-footer"><button type="button" class="secondary-button" data-close-action-modal>Cancel</button><button class="primary-button" type="submit">Add partner</button></div></form>`);
  $('#partnerForm').addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const partner = {name:data.name,initials:initials(data.name),type:data.type,studio:data.studio,mobile:data.mobile,email:data.email,tier:'Member',referrals:0,conversion:'0%',revenue:'₹0',points:0,next:`Silver at ${Number(programRules.Silver).toLocaleString('en-IN')}`,progress:0,color:'#647b72'};
    customPartners.unshift(partner);
    partners.unshift(partner);
    localStorage.setItem('vantage_custom_partners', JSON.stringify(customPartners));
    renderPartners();
    closeActionModal();
    switchView('partners');
    showToast('Partner added', `${partner.name} now appears in the partner directory.`);
  });
}

function openRewardEditor(id = '') {
  const existing = customRewards.find(item => item.id === id);
  const type = existing?.type || 'Trip';
  const tier = existing?.tier || 'Gold';
  const status = existing?.status || 'Published';
  const today = new Date().toISOString().slice(0,10);
  let rewardImage = existing?.image || '';
  let imageProcessing = false;
  const option = (value, selected) => `<option${value === selected ? ' selected' : ''}>${value}</option>`;
  const preview = rewardImage ? `<img src="${escapeHtml(rewardImage)}" alt="Reward cover preview">` : `<span>${rewardMark(type)}</span>`;
  openActionModal(`<div class="modal-intro"><p class="eyebrow">${existing ? 'MANAGE REWARD' : 'NEW REWARD'}</p><h2 id="actionModalTitle">${existing ? 'Update catalogue reward.' : 'Create a reward partners can earn.'}</h2></div><form id="rewardForm"><div class="form-grid"><div class="reward-image-field span-2"><span class="reward-field-label">Reward cover image</span><div class="reward-image-uploader"><div class="reward-image-preview ${rewardImage ? 'has-image' : ''}" id="rewardImagePreview">${preview}</div><div class="reward-upload-copy"><b>Upload a premium cover</b><small>JPG, PNG or WebP · up to 10 MB</small></div><label class="reward-image-button" for="rewardImageInput">Choose image</label><input class="visually-hidden" id="rewardImageInput" type="file" accept="image/jpeg,image/png,image/webp"></div><button class="reward-image-remove" id="removeRewardImage" type="button" ${rewardImage ? '' : 'hidden'}>Remove image</button></div><label class="span-2">Reward name<input name="title" required maxlength="70" value="${escapeHtml(existing?.title || '')}" placeholder="Example: Dubai design experience"></label><label>Reward type<select name="type" required>${['Trip','Gadget','Experience','Service','Voucher','Other'].map(value => option(value,type)).join('')}</select></label><label>Eligible tier<select name="tier" required>${['Member','Silver','Gold','Black'].map(value => option(value,tier)).join('')}</select></label><label>Points required<input name="points" type="number" min="1" step="100" required value="${existing?.points || 30000}" placeholder="30,000"></label><label>Available quantity<input name="stock" type="number" min="1" step="1" required value="${existing?.stock || 10}" placeholder="10"></label><label>Available until<input name="validUntil" type="date" min="${today}" value="${escapeHtml(existing?.validUntil || '')}"></label><label>Catalogue status<select name="status" required>${['Published','Draft'].map(value => option(value,status)).join('')}</select></label><label class="span-2">What the partner receives<textarea name="copy" rows="4" maxlength="220" required placeholder="Describe the reward and fulfilment clearly.">${escapeHtml(existing?.copy || '')}</textarea></label></div><div class="form-footer"><button type="button" class="secondary-button" data-close-action-modal>Cancel</button><button class="primary-button" type="submit">${existing ? 'Save reward' : 'Add to catalogue'}</button></div></form>`);
  const renderImagePreview = () => {
    const previewNode = $('#rewardImagePreview');
    const selectedType = $('#rewardForm [name="type"]')?.value || type;
    previewNode.classList.toggle('has-image', Boolean(rewardImage));
    previewNode.innerHTML = rewardImage ? `<img src="${escapeHtml(rewardImage)}" alt="Reward cover preview">` : `<span>${rewardMark(selectedType)}</span>`;
    $('#removeRewardImage').hidden = !rewardImage;
  };
  $('#rewardImageInput').addEventListener('change', async event => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const submit = $('#rewardForm button[type="submit"]');
    const choose = $('.reward-image-button', $('#rewardForm'));
    imageProcessing = true;
    submit.disabled = true;
    choose.textContent = 'Preparing…';
    try {
      rewardImage = await optimiseRewardImage(file);
      renderImagePreview();
    } catch (error) {
      event.currentTarget.value = '';
      showToast('Image not added', error.message || 'Choose another image.','!');
    } finally {
      imageProcessing = false;
      submit.disabled = false;
      choose.textContent = rewardImage ? 'Replace image' : 'Choose image';
    }
  });
  $('#removeRewardImage').addEventListener('click', () => {
    rewardImage = '';
    $('#rewardImageInput').value = '';
    $('.reward-image-button', $('#rewardForm')).textContent = 'Choose image';
    renderImagePreview();
  });
  $('#rewardForm [name="type"]').addEventListener('change', () => { if (!rewardImage) renderImagePreview(); });
  $('#rewardForm').addEventListener('submit', event => {
    event.preventDefault();
    if (imageProcessing) return showToast('Image is still processing','Please wait a moment before saving.','!');
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.validUntil && data.validUntil < today) return showToast('Check reward validity','The availability date cannot be in the past.','!');
    const now = new Date().toISOString();
    const reward = {
      id: existing?.id || `reward-${Date.now()}`,
      code: existing?.code || `${data.type.slice(0,3).toUpperCase()}-${String(Date.now()).slice(-3)}`,
      type:data.type,
      tier:data.tier,
      title:data.title.trim(),
      copy:data.copy.trim(),
      points:Number(data.points),
      stock:Number(data.stock),
      validUntil:data.validUntil,
      status:data.status,
      mark:rewardMark(data.type),
      image:rewardImage,
      createdAt:existing?.createdAt || now,
      updatedAt:now
    };
    const nextRewards = existing ? customRewards.map(item => item.id === existing.id ? reward : item) : [reward, ...customRewards];
    try {
      localStorage.setItem('vantage_custom_rewards', JSON.stringify(nextRewards));
    } catch {
      return showToast('Image could not be saved','Choose a smaller image or remove older reward images.','!');
    }
    customRewards = nextRewards;
    renderRewards();
    closeActionModal();
    closeDrawer();
    switchView('rewards');
    showToast(existing ? 'Reward updated' : 'Reward added', `${reward.title} is ${reward.status === 'Published' ? 'live in the partner catalogue' : 'saved as a draft'}.`, reward.status === 'Published' ? '✓' : '◇');
  });
}

function openRuleEditor() {
  openActionModal(`<div class="modal-intro"><p class="eyebrow">PROGRAMME RULES</p><h2 id="actionModalTitle">Edit tiers and earning logic.</h2></div><form id="programRulesForm"><div class="form-grid"><label>Silver threshold<input name="Silver" type="number" min="1" step="1000" value="${programRules.Silver}" required></label><label>Gold threshold<input name="Gold" type="number" min="1" step="1000" value="${programRules.Gold}" required></label><label>Black threshold<input name="Black" type="number" min="1" step="1000" value="${programRules.Black}" required></label><label>Base points per ₹100<input name="baseRate" type="number" min="0.1" step="0.1" value="${programRules.baseRate}" required></label><label>Automation multiplier<input name="automationMultiplier" type="number" min="1" step="0.1" value="${programRules.automationMultiplier}" required></label><label>Cross-vertical bonus<input name="crossBonus" type="number" min="0" step="500" value="${programRules.crossBonus}" required></label></div><div class="form-footer"><button type="button" class="secondary-button" data-close-action-modal>Cancel</button><button class="primary-button" type="submit">Save rules</button></div></form>`);
  $('#programRulesForm').addEventListener('submit', event => {
    event.preventDefault();
    const values = Object.fromEntries([...new FormData(event.currentTarget)].map(([key,value]) => [key, Number(value)]));
    if (!(values.Silver < values.Gold && values.Gold < values.Black)) return showToast('Check tier thresholds','Silver, Gold and Black must increase in that order.','!');
    programRules = values;
    localStorage.setItem('vantage_program_rules', JSON.stringify(programRules));
    applyProgramRules();
    closeActionModal();
    showToast('Programme rules saved','Updated thresholds now apply across the director and partner apps.');
  });
}

function openRedemptionHold(id) {
  const item = redemptions.find(row => row.id === id);
  if (!item) return;
  openActionModal(`<div class="modal-intro"><p class="eyebrow">HOLD REDEMPTION</p><h2 id="actionModalTitle">Record the reason.</h2><p>${escapeHtml(item.id)} · ${escapeHtml(item.partner)} · ${escapeHtml(item.reward)}</p></div><form id="redemptionHoldForm"><label>Reason for hold<textarea name="reason" rows="4" required placeholder="Enter the specific reason"></textarea></label><div class="form-footer"><button type="button" class="secondary-button" data-close-action-modal>Cancel</button><button class="primary-button" type="submit">Place on hold</button></div></form>`);
  $('#redemptionHoldForm').addEventListener('submit', event => {
    event.preventDefault();
    item.status = 'On hold';
    item.holdReason = new FormData(event.currentTarget).get('reason').trim();
    item.heldAt = new Date().toISOString();
    persistRedemptions();
    renderRedemptions();
    closeActionModal();
    showToast('Redemption held', `${item.id} is on hold with a recorded reason.`,'!');
  });
}

function openFraudCase(id) {
  const item = fraudCases.find(row => row.id === id);
  if (!item) return;
  $('#drawerReferralId').textContent = item.id;
  $('#drawerContent').innerHTML = `<div class="drawer-profile"><div class="partner-avatar">${item.icon}</div><div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.copy)}</p></div><span class="tier-chip member">OPEN</span></div><div class="drawer-proof"><h3>Recorded evidence</h3><div class="verification-checks evidence-list">${item.evidence.map(value => `<span>◆ ${escapeHtml(value)}</span>`).join('')}</div></div><label class="case-note">Decision note<textarea id="caseDecisionNote" rows="3" placeholder="Optional internal note"></textarea></label><div class="drawer-actions"><button class="secondary-button" data-case-action="clear" data-case-id="${escapeHtml(item.id)}">Clear claim</button><button class="primary-button" data-case-action="block" data-case-id="${escapeHtml(item.id)}">Block claim</button></div>`;
  $('#referralDrawer').classList.add('open');
  $('#referralDrawer').setAttribute('aria-hidden','false');
}

function resolveFraudCase(id, action) {
  const item = fraudCases.find(row => row.id === id);
  if (!item) return;
  item.status = action === 'block' ? 'Blocked' : 'Cleared';
  item.decisionNote = $('#caseDecisionNote')?.value.trim() || '';
  item.resolvedAt = new Date().toISOString();
  localStorage.setItem('vantage_fraud_cases', JSON.stringify(fraudCases));
  const referral = referrals.find(row => row.id === id);
  if (referral) {
    const changes = action === 'block' ? {status:'Rejected',proof:1} : {status:'Verified',proof:3};
    Object.assign(referral, changes);
    saveReferralOverride(id, changes);
  }
  renderReferrals();
  renderVerification();
  renderFraudCases();
  closeDrawer();
  showToast(action === 'block' ? 'Claim blocked' : 'Claim cleared', `${id} was resolved and added to the audit history.`, action === 'block' ? '!' : '✓');
}

function closeDrawer() { $('#referralDrawer').classList.remove('open'); $('#referralDrawer').setAttribute('aria-hidden','true'); }
function openRegister() { $('#registerModal').classList.add('open'); $('#registerModal').setAttribute('aria-hidden','false'); setTimeout(() => $('#partnerName')?.focus(), 100); }
function closeModal() { $('#registerModal').classList.remove('open'); $('#registerModal').setAttribute('aria-hidden','true'); }

function downloadCsv(filename, rows) {
  const csv = rows.map(row => row.map(value => `"${String(value).replaceAll('"','""')}"`).join(',')).join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], {type:'text/csv'}));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

document.addEventListener('click', event => {
  const viewLink = event.target.closest('[data-view-link]');
  if (viewLink) { event.preventDefault(); switchView(viewLink.dataset.viewLink); closeDrawer(); return; }
  if (event.target.closest('[data-open-register]')) { openRegister(); return; }
  if (event.target.closest('[data-close-modal]')) { closeModal(); return; }
  if (event.target.closest('[data-close-action-modal]')) { closeActionModal(); return; }
  if (event.target.closest('[data-close-drawer]')) { closeDrawer(); return; }
  if (event.target.closest('[data-close-menu]')) { document.body.classList.remove('menu-open'); return; }
  const openButton = event.target.closest('[data-open-referral]');
  if (openButton) { openReferral(openButton.dataset.openReferral); return; }
  const partnerButton = event.target.closest('[data-partner-profile]');
  if (partnerButton) { openPartner(partnerButton.dataset.partnerProfile); return; }
  const verifyButton = event.target.closest('[data-quick-verify]');
  if (verifyButton) {
    const id = verifyButton.dataset.quickVerify;
    const item = referrals.find(referral => referral.id === id);
    if (item) { item.status = 'Verified'; item.proof = 3; saveReferralOverride(id,{status:'Verified',proof:3}); renderReferrals(); renderVerification(); closeDrawer(); showToast('Ownership verified', `${id} is now locked to ${item.partner}.`); }
    return;
  }
  const otpButton = event.target.closest('[data-send-otp]');
  if (otpButton) {
    const id = otpButton.dataset.sendOtp;
    const item = referrals.find(referral => referral.id === id);
    if (!item) return;
    if (!customReferrals.some(referral => referral.id === id)) {
      customReferrals.unshift(item);
      localStorage.setItem('vantage_custom_referrals', JSON.stringify(customReferrals));
    }
    const link = `${location.origin}/partner.html?confirm=${encodeURIComponent(id)}`;
    copyText(link).then(() => showToast('Verification link copied', `Share the link with ${item.customer}.`, '↗'));
    return;
  }
  const referralFilter = event.target.closest('[data-referral-filter]');
  if (referralFilter) { activeReferralFilter = referralFilter.dataset.referralFilter; $$('[data-referral-filter]').forEach(button => button.classList.toggle('active', button === referralFilter)); renderReferrals(); return; }
  const partnerFilter = event.target.closest('[data-partner-filter]');
  if (partnerFilter) { activePartnerType = partnerFilter.dataset.partnerFilter; $$('[data-partner-filter]').forEach(button => button.classList.toggle('active', button === partnerFilter)); renderPartners(); return; }
  const rewardFilter = event.target.closest('[data-reward-filter]');
  if (rewardFilter) { activeRewardFilter = rewardFilter.dataset.rewardFilter; $$('[data-reward-filter]').forEach(button => button.classList.toggle('active', button === rewardFilter)); renderRewards(); return; }
  const redemptionFilter = event.target.closest('[data-redemption-filter]');
  if (redemptionFilter) { activeRedemptionFilter = redemptionFilter.dataset.redemptionFilter; $$('[data-redemption-filter]').forEach(button => button.classList.toggle('active', button === redemptionFilter)); renderRedemptions(); return; }
  const approve = event.target.closest('[data-approve-redemption]');
  if (approve) { const item = redemptions.find(row => row.id === approve.dataset.approveRedemption); if(item){item.status='Approved';persistRedemptions();renderRedemptions();showToast('Redemption approved',`${item.reward} is ready for fulfilment.`);} return; }
  const hold = event.target.closest('[data-reject-redemption]');
  if (hold) { openRedemptionHold(hold.dataset.rejectRedemption); return; }
  const fraudCase = event.target.closest('[data-resolve-case]');
  if (fraudCase) { openFraudCase(fraudCase.dataset.resolveCase); return; }
  const caseAction = event.target.closest('[data-case-action]');
  if (caseAction) { resolveFraudCase(caseAction.dataset.caseId, caseAction.dataset.caseAction); return; }
  const manageReward = event.target.closest('[data-manage-reward]');
  if (manageReward) { openRewardEditor(manageReward.dataset.manageReward); return; }
  const rewardInfo = event.target.closest('[data-reward-info]');
  if (rewardInfo) { openRewardRule(rewardInfo.dataset.rewardInfo); return; }
  if (event.target.closest('#invitePartner')) { openPartnerForm(); return; }
  if (event.target.closest('#addReward')) { openRewardEditor(); return; }
  if (event.target.closest('#editRules') || event.target.closest('#editEarning')) { openRuleEditor(); return; }
  if (event.target.closest('#openNotifications')) { openNotifications(); return; }
  if (event.target.closest('#exportReferrals')) { downloadCsv('vantage-referrals.csv',[['Referral ID','Customer','Partner','Partner type','Vertical','Value','Proof','Status'],...referrals.map(r=>[r.id,r.customer,r.partner,r.partnerType,r.vertical,r.value,`${r.proof}/3`,r.status])]); showToast('Referral register exported','The complete referral register is downloading.','⇩'); return; }
  if (event.target.closest('#downloadSettlement')) { downloadCsv('vantage-settlement-report.csv',[['Request','Date','Partner','Tier','Reward','Points','Status','Hold reason'],...redemptions.map(r=>[r.id,r.date,r.partner,r.tier,r.reward,r.points,r.status,r.holdReason || ''])]); showToast('Settlement report downloaded','The current redemption register is in the CSV file.','⇩'); return; }
  if (event.target.closest('#downloadReport')) { const period = $('#reportPeriod').value; downloadCsv('vantage-programme-report.csv',[['Period','Metric','Value'],[period,'Referral-attributed revenue','₹4.82 Cr'],[period,'Partner ROI','8.4×'],[period,'Average referred project','₹9.6 L'],[period,'Fraud loss rate','0.18%'],[period,'Referral records',referrals.length],...partners.map(p=>[period,`${p.name} attributed revenue`,p.revenue])]); showToast('Programme report downloaded',`${period} report is in the CSV file.`,'⇩'); return; }
  if (event.target.closest('#exportAudit')) { downloadCsv('vantage-ownership-audit.csv',[['Time','Event','Record','Status'],['11:42','Customer confirmation and opportunity match','VV-260824-0183','Verified'],['11:18','Duplicate customer mobile detected','VV-260824-0179','Blocked'],['10:56','Customer confirmation received','VV-260824-0184','Locked'],...fraudCases.filter(item=>item.resolvedAt).map(item=>[new Date(item.resolvedAt).toLocaleString('en-IN'),item.decisionNote || item.title,item.id,item.status])]); showToast('Audit exported','The ownership history is in the CSV file.','⇩'); return; }
});

$('#menuButton').addEventListener('click', () => document.body.classList.toggle('menu-open'));
$('#referralSearch').addEventListener('input', renderReferrals);
$('#partnerSearch').addEventListener('input', renderPartners);
$('#partnerTierFilter').addEventListener('change', renderPartners);
$('#globalSearch').addEventListener('keydown', event => { if (event.key === 'Enter') { switchView('referrals'); $('#referralSearch').value = event.currentTarget.value; renderReferrals(); }});
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeModal(); closeActionModal(); closeDrawer(); document.body.classList.remove('menu-open'); }});
window.addEventListener('storage', event => {
  if (event.key === 'vantage_custom_rewards') {
    customRewards = JSON.parse(event.newValue || '[]').map(reward => ({type:'Other',status:'Published',stock:10,validUntil:'',mark:'V',...reward}));
    renderRewards();
  }
  if (event.key === 'vantage_partner_redemptions') {
    partnerRedemptions = JSON.parse(event.newValue || '[]');
    redemptions = [...partnerRedemptions, ...programmeRedemptions];
    renderRedemptions();
  }
});

$('#referralForm').addEventListener('submit', event => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.currentTarget));
  const rawPartner = data.partner.split('·').map(value => value.trim());
  const sequence = String(Date.now()).slice(-4);
  const now = new Date();
  const id = `VV-${String(now.getDate()).padStart(2,'0')}${String(now.getMonth()+1).padStart(2,'0')}${String(now.getFullYear()).slice(-2)}-${sequence}`;
  const referral = {id,customer:data.customer,mobile:data.mobile.replace(/(\d{2})\d+(\d{3})/,'$1••• $2'),partner:rawPartner[0],partnerType:data.partnerType,studio:rawPartner[1] || 'Verified partner',vertical:data.vertical,value:Number(data.value || 0),proof:1,status:'Pending',age:'Just now',city:data.city,address:data.address};
  customReferrals.unshift(referral);
  localStorage.setItem('vantage_custom_referrals', JSON.stringify(customReferrals));
  referrals.unshift(referral);
  event.currentTarget.reset();
  closeModal();
  renderReferrals();
  renderVerification();
  switchView('referrals');
  showToast('Referral registered', `${id} created. Customer verification is now pending.`);
  setTimeout(() => openReferral(id), 450);
});

const today = new Intl.DateTimeFormat('en-IN', {weekday:'long',day:'2-digit',month:'long',year:'numeric'}).format(new Date());
$('#todayLabel').textContent = today.toUpperCase();
renderReferrals();
renderVerification();
renderPartners();
renderRewards();
renderRedemptions();
renderFraudCases();
applyProgramRules();
