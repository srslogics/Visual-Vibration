const baseCustomers = [
  {id:1,name:'Rohan & Meera Shah',initials:'RS',phone:'+91 98230 44192',email:'rohan.shah@email.com',city:'Civil Lines, Nagpur',since:'2019',verticals:['Modulinea','Automation','Lighting'],ltv:1840000,tier:'Black',points:28450,last:'Today, 09:42',purchases:[['Modulinea kitchen','₹12.6 L','Nov 2024'],['Architectural lighting','₹3.4 L','Jan 2025'],['Home automation','₹2.4 L','Jun 2025']],amc:'Automation Care · 28 Sep 2026',next:'Invite for a private home-theatre experience. Their automation usage and Black tier indicate strong AV affinity.'},
  {id:2,name:'Dr. Ananya Deshmukh',initials:'AD',phone:'+91 97654 11308',email:'ananya.d@email.com',city:'Ramdaspeth, Nagpur',since:'2021',verticals:['Automation','Audio / Video'],ltv:926000,tier:'Gold',points:12680,last:'Yesterday',purchases:[['Home theatre','₹6.8 L','Feb 2025'],['Home automation','₹2.46 L','Mar 2025']],amc:'AV Platinum Care · 15 Aug 2026',next:'AMC renewal is due this week. Offer a combined AV + automation health plan.'},
  {id:3,name:'Vikram Agrawal',initials:'VA',phone:'+91 93722 88631',email:'vikram.a@email.com',city:'Wardha Road, Nagpur',since:'2020',verticals:['Modulinea'],ltv:745000,tier:'Gold',points:9840,last:'3 days ago',purchases:[['Modulinea kitchen','₹7.45 L','Aug 2024']],amc:'Kitchen Care · 02 Dec 2026',next:'High-value single-vertical customer. Recommend architectural lighting consultation for kitchen and dining.'},
  {id:4,name:'Priya & Kunal Mehta',initials:'PM',phone:'+91 98224 70841',email:'priya.mehta@email.com',city:'Dharampeth, Nagpur',since:'2023',verticals:['Lighting','Automation'],ltv:612000,tier:'Silver',points:6210,last:'5 days ago',purchases:[['Architectural lighting','₹3.9 L','Jan 2026'],['Home automation','₹2.22 L','Feb 2026']],amc:'Automation Care · 18 Feb 2027',next:'New-home anniversary is approaching. Send a lighting scene refresh consultation.'},
  {id:5,name:'Sanjay Jain',initials:'SJ',phone:'+91 98901 33674',email:'sanjay.j@email.com',city:'Laxmi Nagar, Nagpur',since:'2018',verticals:['Audio / Video','Lighting'],ltv:1285000,tier:'Black',points:21750,last:'1 week ago',purchases:[['Reference theatre','₹10.8 L','Sep 2023'],['Accent lighting','₹2.05 L','Oct 2023']],amc:'Theatre Care · 22 Aug 2026',next:'Book the annual theatre calibration and demonstrate the latest automation control upgrade.'},
  {id:6,name:'Neha Bhandari',initials:'NB',phone:'+91 99231 99562',email:'neha.b@email.com',city:'Bajaj Nagar, Nagpur',since:'2024',verticals:['Modulinea'],ltv:486000,tier:'Silver',points:3890,last:'9 days ago',purchases:[['Modulinea kitchen','₹4.86 L','Dec 2025']],amc:'Kitchen Care · 12 Dec 2026',next:'Share the lighting-for-kitchens guide and offer a complimentary design review.'},
  {id:7,name:'Arjun Chawla',initials:'AC',phone:'+91 98227 40116',email:'arjun.c@email.com',city:'Koradi Road, Nagpur',since:'2025',verticals:['Automation'],ltv:238000,tier:'Member',points:1820,last:'12 days ago',purchases:[['Starter automation','₹2.38 L','May 2026']],amc:'Automation Care · 04 May 2027',next:'Usage suggests interest in entertainment scenes. Introduce a compact living-room AV package.'},
  {id:8,name:'Shalini Wadhwa',initials:'SW',phone:'+91 97640 29812',email:'shalini.w@email.com',city:'Sadar, Nagpur',since:'2022',verticals:['Lighting'],ltv:365000,tier:'Silver',points:4420,last:'2 weeks ago',purchases:[['Architectural lighting','₹3.65 L','Oct 2025']],amc:'Lighting Care · 30 Oct 2026',next:'Invite to the Modulinea experience centre; profile indicates a kitchen renovation window.'}
];

const baseLeads = [
  {id:1,name:'Joshi Residence',contact:'Nitin Joshi',vertical:'Modulinea',value:1850000,stage:'Discovery',owner:'SK',age:'2d'},
  {id:2,name:'Khandelwal Villa',contact:'Sakshi Khandelwal',vertical:'Automation',value:740000,stage:'Discovery',owner:'AK',age:'4d'},
  {id:3,name:'The Sound Room',contact:'Manish Batra',vertical:'Audio / Video',value:1260000,stage:'Proposal',owner:'RM',age:'6d'},
  {id:4,name:'Nagpur Heights · 1804',contact:'Ritu Sharma',vertical:'Lighting',value:580000,stage:'Proposal',owner:'NP',age:'3d'},
  {id:5,name:'Ahuja New Home',contact:'Dev Ahuja',vertical:'Multi-vertical',value:2480000,stage:'Negotiation',owner:'SK',age:'11d'},
  {id:6,name:'Dr. Rao Residence',contact:'Dr. Sameer Rao',vertical:'Automation',value:465000,stage:'Negotiation',owner:'AK',age:'8d'},
  {id:7,name:'Bajaj Penthouse',contact:'Manav Bajaj',vertical:'Audio / Video',value:1650000,stage:'Won',owner:'RM',age:'Today'},
  {id:8,name:'Kapoor Kitchen',contact:'Aditi Kapoor',vertical:'Modulinea',value:895000,stage:'Won',owner:'NP',age:'Yesterday'}
];

const store = {
  customers: JSON.parse(localStorage.getItem('vv-customers') || 'null') || baseCustomers,
  leads: JSON.parse(localStorage.getItem('vv-leads') || 'null') || baseLeads,
  remindersDone: JSON.parse(localStorage.getItem('vv-reminders') || '[]')
};

const e = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
const money = value => value >= 10000000 ? `₹${(value/10000000).toFixed(2)} Cr` : value >= 100000 ? `₹${(value/100000).toFixed(value%100000===0?0:1)} L` : `₹${value.toLocaleString('en-IN')}`;
const initials = name => name.split(/\s|&/).filter(Boolean).slice(0,2).map(word=>word[0]).join('').toUpperCase();
const persist = () => { localStorage.setItem('vv-customers',JSON.stringify(store.customers)); localStorage.setItem('vv-leads',JSON.stringify(store.leads)); localStorage.setItem('vv-reminders',JSON.stringify(store.remindersDone)); };
const verticalClass = name => name === 'Modulinea' ? 'kitchen' : name === 'Automation' ? 'automation' : name === 'Audio / Video' ? 'av' : name === 'Lighting' ? 'lighting' : 'automation';
const showToast = message => { const toast=document.getElementById('toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(showToast.timer); showToast.timer=setTimeout(()=>toast.classList.remove('show'),2600); };

const priorities = [
  {type:'amc',icon:'AMC',title:'Dr. Ananya Deshmukh',copy:'AV Platinum Care expires in 4 days',action:'Prepare renewal'},
  {type:'occasion',icon:'BD',title:'Rohan Shah’s birthday',copy:'Black member · 28,450 available points',action:'Send reward'},
  {type:'lead',icon:'48h',title:'Ahuja New Home',copy:'₹24.8 L proposal without a follow-up',action:'Open deal'},
  {type:'amc',icon:'SR',title:'Sanjay Jain',copy:'Theatre calibration service is overdue',action:'Schedule visit'}
];

const crossSell = [
  {name:'Vikram Agrawal',score:'86% fit',copy:'Modulinea customer with no lighting purchase. Recommend kitchen and dining lighting consultation.'},
  {name:'Neha Bhandari',score:'79% fit',copy:'Recently completed kitchen. High engagement with automation campaign content.'},
  {name:'Arjun Chawla',score:'74% fit',copy:'Automation customer using entertainment scenes frequently. Introduce compact AV package.'}
];

const rewards = [
  ['Private theatre calibration','8,000 pts'],['Modulinea design consultation','5,000 pts'],['Lighting scene refresh','3,500 pts'],['Annual automation health check','4,500 pts']
];

const renewals = [
  {day:'15',month:'AUG',name:'Dr. Ananya Deshmukh',plan:'AV Platinum Care',value:'₹42,000'},
  {day:'22',month:'AUG',name:'Sanjay Jain',plan:'Theatre Care',value:'₹58,000'},
  {day:'28',month:'AUG',name:'Rakesh Todi',plan:'Automation Care',value:'₹31,500'},
  {day:'03',month:'SEP',name:'Kavita Bisen',plan:'Kitchen Care',value:'₹18,000'},
  {day:'11',month:'SEP',name:'Amit Kukreja',plan:'Lighting Care',value:'₹24,500'}
];

const viewTitles = {dashboard:'Customer command centre',customers:'Customer CRM',leads:'Sales pipeline',loyalty:'Loyalty studio',service:'AMC & service',campaigns:'Customer engagement',analytics:'Management analytics',settings:'Workspace settings'};

function renderDashboard(){
  document.getElementById('priorityList').innerHTML=priorities.map((item,i)=>`<div class="priority-item"><span class="priority-icon ${item.type}">${e(item.icon)}</span><div><strong>${e(item.title)}</strong><small>${e(item.copy)}</small></div><button data-priority="${i}">${e(item.action)} →</button></div>`).join('');
  const months=['APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV']; const heights=[48,62,55,74,67,85,78,96];
  document.getElementById('revenueChart').innerHTML=months.map((m,i)=>`<div class="revenue-month"><div class="revenue-stack" style="--h:${heights[i]}"><i class="kitchen" style="--v:42"></i><i class="automation" style="--v:24"></i><i class="av" style="--v:19"></i><i class="lighting" style="--v:15"></i></div>${m}</div>`).join('');
  document.getElementById('recentCustomers').innerHTML=store.customers.slice(0,5).map(c=>`<button class="compact-customer" data-customer="${c.id}"><span class="avatar">${e(c.initials)}</span><div><strong>${e(c.name)}</strong><small>${e(c.city)}</small></div><span>${e(c.verticals.join(' · '))}</span><b>${money(c.ltv)}</b></button>`).join('');
  document.getElementById('crossSellList').innerHTML=crossSell.map((item,i)=>`<div class="opportunity"><div class="opportunity-head"><strong>${e(item.name)}</strong><span>${e(item.score)}</span></div><p>${e(item.copy)}</p><button data-cross-sell="${i}">CREATE FOLLOW-UP →</button></div>`).join('');
}

function renderCustomers(){
  const tiers=[['Member',126],['Silver',67],['Gold',38],['Black',17]];
  document.getElementById('segmentStrip').innerHTML=tiers.map(([tier,count])=>`<div class="segment-card"><div><span>${tier} members</span><strong>${count}</strong></div><i>${tier[0]}</i></div>`).join('');
  const query=document.getElementById('customerSearch')?.value.toLowerCase()||'';
  const vertical=document.getElementById('verticalFilter')?.value||'all';
  const tier=document.getElementById('tierFilter')?.value||'all';
  const list=store.customers.filter(c=>(c.name+' '+c.phone+' '+c.city).toLowerCase().includes(query)&&(vertical==='all'||c.verticals.includes(vertical))&&(tier==='all'||c.tier===tier));
  document.getElementById('customerCount').textContent=`${list.length === store.customers.length ? 248 + Math.max(0,store.customers.length-baseCustomers.length) : list.length} customers`;
  document.getElementById('customerNavCount').textContent=248+Math.max(0,store.customers.length-baseCustomers.length);
  document.getElementById('memberCount').textContent=248+Math.max(0,store.customers.length-baseCustomers.length);
  document.getElementById('customerTable').innerHTML=list.map(c=>`<tr><td><div class="customer-cell"><span class="avatar">${e(c.initials)}</span><div><strong>${e(c.name)}</strong><small>${e(c.phone)} · ${e(c.city)}</small></div></div></td><td>Since ${e(c.since)}</td><td><div class="vertical-chips" title="${e(c.verticals.join(', '))}">${c.verticals.map(v=>`<i class="vertical-chip ${verticalClass(v)}"></i>`).join('')}</div></td><td><strong>${money(c.ltv)}</strong></td><td><span class="tier-badge ${c.tier.toLowerCase()}">${e(c.tier)} · ${c.points.toLocaleString('en-IN')} pts</span></td><td>${e(c.last)}</td><td><button class="row-action" data-customer="${c.id}" aria-label="Open ${e(c.name)}">→</button></td></tr>`).join('')||`<tr><td colspan="7">No customers match these filters.</td></tr>`;
}

function renderKanban(){
  const stages=['Discovery','Proposal','Negotiation','Won'];
  document.getElementById('kanban').innerHTML=stages.map(stage=>{ const deals=store.leads.filter(l=>l.stage===stage); const total=deals.reduce((sum,d)=>sum+d.value,0); return `<div class="kanban-column"><div class="column-head"><strong>${stage} · ${deals.length}</strong><span>${money(total)}</span></div>${deals.map(deal=>`<article class="deal-card"><span>${e(deal.vertical.toUpperCase())}</span><h3>${e(deal.name)}</h3><p>${e(deal.contact)} · ${e(deal.age)}</p><div class="deal-meta"><strong>${money(deal.value)}</strong>${stage!=='Won'?`<button data-advance-lead="${deal.id}">Advance →</button>`:`<span class="status-badge">✓ Won</span>`}</div></article>`).join('')||'<div class="deal-card"><p>No deals in this stage.</p></div>'}</div>`; }).join('');
}

function renderLoyalty(){
  const tiers=[['Member','0–2,999 pts','126 members'],['Silver','3,000–7,999 pts','67 members'],['Gold','8,000–19,999 pts','38 members'],['Black','20,000+ pts','17 members']];
  document.getElementById('tierList').innerHTML=tiers.map(([name,range,count])=>`<div class="tier-row"><span class="tier-gem ${name.toLowerCase()}">${name[0]}</span><div><strong>${name}</strong><small>${range}</small></div><b>${count}</b></div>`).join('');
  document.getElementById('rewardList').innerHTML=rewards.map(([name,points])=>`<div class="reward-item"><div><strong>${name}</strong><small>Available across eligible member tiers</small></div><b>${points}</b></div>`).join('');
  document.getElementById('occasionList').innerHTML=[['Today','Rohan Shah · Birthday'],['14 Aug','Kunal Mehta · Anniversary'],['18 Aug','Neha Bhandari · Birthday']].map(([date,name],i)=>`<div class="occasion-row"><div><strong>${name}</strong><small>${date} · Reward ready</small></div><button data-occasion="${i}">SEND →</button></div>`).join('');
}

function renderService(){
  document.getElementById('renewalList').innerHTML=renewals.map((r,i)=>`<div class="renewal-row"><div class="renewal-date"><strong>${r.day}</strong><small>${r.month}</small></div><div><strong>${e(r.name)}</strong><small>${e(r.plan)}</small></div><div class="renewal-value"><strong>${e(r.value)}</strong><small>${store.remindersDone.includes(i)?'Reminder sent':'Renewal value'}</small></div><button data-reminder="${i}" ${store.remindersDone.includes(i)?'disabled':''}>${store.remindersDone.includes(i)?'✓ Sent':'Send reminder'}</button></div>`).join('');
  const timeline=[['Service completed','Shah Residence · Automation health check','Today, 10:18'],['Renewal accepted','Kavita Bisen · Kitchen Care','Yesterday, 16:42'],['Technician assigned','Jain Residence · Theatre calibration','Yesterday, 13:05'],['New request received','Priya Mehta · Lighting scene issue','10 Aug, 18:21']];
  document.getElementById('serviceTimeline').innerHTML=timeline.map(([title,copy,time])=>`<div class="timeline-item"><strong>${title}</strong><p>${copy}</p><small>${time}</small></div>`).join('');
}

function renderCampaigns(){
  const list=[['Kitchen Care Anniversary','WhatsApp','82%','14.8%','₹4.2 L'],['Black Member Preview','WhatsApp','91%','28.4%','₹8.6 L'],['AMC Renewal · August','SMS + WA','88%','41.2%','₹3.1 L'],['Lighting Edit Guide','WhatsApp','76%','9.7%','₹1.8 L']];
  document.getElementById('campaignList').innerHTML=list.map(([name,channel,open,reply,revenue])=>`<div class="campaign-row"><div><strong>${name}</strong><small>${channel} · Completed</small></div><span><b>${open}</b>Read</span><span><b>${reply}</b>Response</span><span><b>${revenue}</b>Revenue</span></div>`).join('');
}

function renderAnalytics(){
  const months=['APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC','JAN','FEB','MAR'], heights=[42,53,47,61,58,73,68,81,77,88,84,96];
  document.getElementById('monthlyChart').innerHTML=months.map((m,i)=>`<div class="month-bar"><i style="--h:${heights[i]}"></i>${m}</div>`).join('');
  const team=[['TEAM MEMBER','OPEN VALUE','WIN RATE','FOLLOW-UPS'],['Sameer Khanna','₹24.8 L','38%','3 due'],['Aarti Kale','₹18.4 L','34%','1 due'],['Rohan Mehta','₹17.2 L','29%','2 due'],['Nisha Patil','₹15.8 L','27%','On track']];
  document.getElementById('teamTable').innerHTML=team.map((row,i)=>`<div class="team-row">${i?`<div class="team-person"><span class="avatar">${initials(row[0])}</span><strong>${row[0]}</strong></div>`:`<span>${row[0]}</span>`}<span>${row[1]}</span><span>${row[2]}</span><span>${row[3]}</span></div>`).join('');
}

function openView(id){
  document.querySelectorAll('.view').forEach(view=>view.classList.toggle('active',view.id===id));
  document.querySelectorAll('.nav-item').forEach(item=>item.classList.toggle('active',item.dataset.view===id));
  document.getElementById('viewTitle').textContent=viewTitles[id]||'VV One';
  document.getElementById('sidebar').classList.remove('open'); document.getElementById('scrim').classList.remove('open');
  window.scrollTo({top:0,behavior:'smooth'});
}

function openCustomer(id){
  const c=store.customers.find(item=>item.id===Number(id)); if(!c)return;
  document.getElementById('customerDetail').innerHTML=`<div class="drawer-head"><div class="customer-identity"><span class="avatar">${e(c.initials)}</span><div><h2>${e(c.name)}</h2><p>${e(c.phone)} · ${e(c.email)}</p></div></div><button data-close-drawer aria-label="Close">×</button></div><div class="drawer-actions"><button class="primary-button" data-contact="WhatsApp">WhatsApp</button><button class="secondary-button" data-contact="Call">Call</button><button class="secondary-button" data-contact="Email">Email</button></div><div class="customer-score"><div><span>LIFETIME VALUE</span><strong>${money(c.ltv)}</strong></div><div><span>LOYALTY STATUS</span><strong>${e(c.tier)} · ${c.points.toLocaleString('en-IN')}</strong></div><div><span>RELATIONSHIP</span><strong>Since ${e(c.since)}</strong></div></div><div class="next-action"><span>NEXT BEST ACTION</span><strong>Recommended conversation</strong><p>${e(c.next)}</p></div><section class="drawer-section"><h3>Purchase history</h3>${c.purchases.map(([name,value,date])=>`<div class="purchase-item"><i class="dot ${verticalClass(name.includes('kitchen')?'Modulinea':name.includes('automation')?'Automation':name.includes('theatre')?'Audio / Video':'Lighting')}"></i><div><strong>${e(name)}</strong><small>${e(date)}</small></div><b>${e(value)}</b></div>`).join('')}</section><section class="drawer-section"><h3>AMC & service</h3><div class="purchase-item"><i class="dot automation"></i><div><strong>${e(c.amc)}</strong><small>Active · auto-reminder enabled</small></div><b>View →</b></div></section><section class="drawer-section"><h3>Customer context</h3><div class="purchase-item"><i class="dot kitchen"></i><div><strong>${e(c.city)}</strong><small>${e(c.verticals.join(' · '))}</small></div><b>${e(c.tier)}</b></div></section>`;
  document.getElementById('customerDrawer').classList.add('open'); document.getElementById('customerDrawer').setAttribute('aria-hidden','false'); document.getElementById('drawerScrim').classList.add('open');
}

function closeDrawer(){ document.getElementById('customerDrawer').classList.remove('open'); document.getElementById('customerDrawer').setAttribute('aria-hidden','true'); document.getElementById('drawerScrim').classList.remove('open'); }

const dialogConfigs={
  customer:{kicker:'NEW RELATIONSHIP',title:'Add customer',fields:`<label>Customer name<input name="name" required placeholder="Full name" /></label><label>Mobile number<input name="phone" required placeholder="+91" /></label><label>Email address<input name="email" type="email" placeholder="name@email.com" /></label><label>City / locality<input name="city" placeholder="Nagpur" /></label><label>Primary interest<select name="vertical"><option>Modulinea</option><option>Automation</option><option>Audio / Video</option><option>Lighting</option></select></label><label>Membership tier<select name="tier"><option>Member</option><option>Silver</option><option>Gold</option><option>Black</option></select></label><label class="full">Relationship note<textarea name="note" placeholder="Project context, preferences or next step"></textarea></label>`},
  lead:{kicker:'NEW OPPORTUNITY',title:'Add sales lead',fields:`<label>Project / opportunity<input name="name" required placeholder="e.g. Sharma Residence" /></label><label>Contact name<input name="contact" required placeholder="Customer name" /></label><label>Vertical<select name="vertical"><option>Modulinea</option><option>Automation</option><option>Audio / Video</option><option>Lighting</option><option>Multi-vertical</option></select></label><label>Estimated value<input name="value" type="number" min="0" required placeholder="Amount in ₹" /></label><label>Owner<select name="owner"><option>SK</option><option>AK</option><option>RM</option><option>NP</option></select></label><label>Stage<select name="stage"><option>Discovery</option><option>Proposal</option><option>Negotiation</option></select></label><label class="full">Next step<textarea name="note" placeholder="Consultation, site visit or proposal action"></textarea></label>`},
  campaign:{kicker:'NEW CAMPAIGN',title:'Create campaign',fields:`<label>Campaign name<input name="name" required placeholder="Campaign name" /></label><label>Channel<select name="channel"><option>WhatsApp</option><option>SMS</option><option>WhatsApp + SMS</option></select></label><label>Audience<select name="audience"><option>All eligible customers</option><option>Black & Gold members</option><option>AMC renewals due</option><option>Single-vertical customers</option></select></label><label>Schedule<input name="schedule" type="date" /></label><label class="full">Message<textarea name="message" required placeholder="Write the customer message…"></textarea></label>`}
};

function openDialog(type){ const config=dialogConfigs[type]||dialogConfigs.customer; const dialog=document.getElementById('formDialog'); dialog.dataset.type=type; document.getElementById('dialogKicker').textContent=config.kicker; document.getElementById('dialogTitle').textContent=config.title; document.getElementById('dialogFields').innerHTML=config.fields; dialog.showModal(); }

function saveDialog(event){
  event.preventDefault(); const dialog=document.getElementById('formDialog'); const form=document.getElementById('dynamicForm'); if(!form.reportValidity())return; const data=Object.fromEntries(new FormData(form));
  if(dialog.dataset.type==='customer'){
    const customer={id:Date.now(),name:data.name,initials:initials(data.name),phone:data.phone,email:data.email||'Not provided',city:data.city||'Nagpur',since:'2026',verticals:[data.vertical],ltv:0,tier:data.tier,points:0,last:'Just now',purchases:[],amc:'No active AMC',next:data.note||'Schedule a discovery call and capture project requirements.'}; store.customers.unshift(customer); persist(); renderCustomers(); renderDashboard(); showToast(`${data.name} added to Customer CRM`);
  } else if(dialog.dataset.type==='lead'){
    store.leads.push({id:Date.now(),name:data.name,contact:data.contact,vertical:data.vertical,value:Number(data.value),stage:data.stage,owner:data.owner,age:'Today'}); persist(); renderKanban(); showToast(`${data.name} added to the pipeline`);
  } else { showToast(`${data.name} campaign saved as a draft`); }
  dialog.close(); form.reset();
}

function exportCSV(){
  const rows=[['Customer','Phone','Email','City','Tier','Points','Lifetime Value','Verticals'],...store.customers.map(c=>[c.name,c.phone,c.email,c.city,c.tier,c.points,c.ltv,c.verticals.join(' | ')])];
  const csv=rows.map(row=>row.map(value=>`"${String(value).replace(/"/g,'""')}"`).join(',')).join('\n'); const link=document.createElement('a'); link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'})); link.download='visual-vibrations-customers.csv'; link.click(); URL.revokeObjectURL(link.href); showToast('Customer export downloaded');
}

function handleSearch(value){
  const target=document.getElementById('searchResults'); const query=value.trim().toLowerCase(); if(!query){target.classList.remove('open');return;} const results=store.customers.filter(c=>(c.name+' '+c.phone+' '+c.city).toLowerCase().includes(query)).slice(0,5); target.innerHTML=results.map(c=>`<button data-search-customer="${c.id}"><span class="avatar">${e(c.initials)}</span><div><strong>${e(c.name)}</strong><small>${e(c.phone)} · ${e(c.city)}</small></div></button>`).join('')||'<button><div><strong>No customer found</strong><small>Try another name or mobile number</small></div></button>'; target.classList.add('open');
}

document.addEventListener('click',event=>{
  const viewButton=event.target.closest('[data-view]'); if(viewButton){openView(viewButton.dataset.view);return;}
  const opener=event.target.closest('[data-open]'); if(opener){openDialog(opener.dataset.open);return;}
  const customer=event.target.closest('[data-customer]'); if(customer){openCustomer(customer.dataset.customer);return;}
  const searched=event.target.closest('[data-search-customer]'); if(searched){document.getElementById('searchResults').classList.remove('open');document.getElementById('globalSearch').value='';openCustomer(searched.dataset.searchCustomer);return;}
  if(event.target.closest('[data-close-drawer]')||event.target.id==='drawerScrim'){closeDrawer();return;}
  const lead=event.target.closest('[data-advance-lead]'); if(lead){const deal=store.leads.find(item=>item.id===Number(lead.dataset.advanceLead));const stages=['Discovery','Proposal','Negotiation','Won'];deal.stage=stages[Math.min(stages.indexOf(deal.stage)+1,3)];persist();renderKanban();showToast(`${deal.name} moved to ${deal.stage}`);return;}
  const reminder=event.target.closest('[data-reminder]'); if(reminder){store.remindersDone.push(Number(reminder.dataset.reminder));persist();renderService();showToast('Renewal reminder queued for WhatsApp');return;}
  if(event.target.closest('[data-priority]')){showToast('Follow-up opened and assigned');return;}
  if(event.target.closest('[data-cross-sell]')){showToast('Cross-sell follow-up added to today’s tasks');return;}
  if(event.target.closest('[data-occasion]')){showToast('Personal occasion reward queued for approval');return;}
  const contact=event.target.closest('[data-contact]'); if(contact){showToast(`${contact.dataset.contact} action ready for provider integration`);return;}
  if(event.target.id==='newReward'){showToast('Reward builder opened in draft mode');return;}
  if(event.target.id==='editTiers'){showToast('Tier rules are ready for configuration');return;}
  if(event.target.id==='copyReferral'){navigator.clipboard?.writeText('Join the Visual Vibrations Vantage Circle through my referral and receive 2,500 welcome points.');showToast('Referral message copied');return;}
  if(event.target.id==='calculateAudience'){const factors=[248,171,77,63];document.getElementById('audienceResult').textContent=`${factors[Math.floor(Math.random()*factors.length)]} customers`;showToast('Audience recalculated');return;}
  if(event.target.id==='useCampaign'){openDialog('campaign');return;}
  if(['pipelineReport','downloadReport'].includes(event.target.id)){showToast('Management report prepared');return;}
  if(['newService','notificationButton'].includes(event.target.id)){showToast(event.target.id==='newService'?'Service request form is ready for the service team':'5 notifications · 2 renewals need attention');return;}
  const integration=event.target.closest('.integration-list button'); if(integration){showToast('Integration setup requires provider credentials');return;}
  if(!event.target.closest('.global-search-wrap'))document.getElementById('searchResults').classList.remove('open');
});

document.getElementById('saveDialog').addEventListener('click',saveDialog);
document.getElementById('menuButton').addEventListener('click',()=>{document.getElementById('sidebar').classList.add('open');document.getElementById('scrim').classList.add('open');});
document.getElementById('scrim').addEventListener('click',()=>{document.getElementById('sidebar').classList.remove('open');document.getElementById('scrim').classList.remove('open');});
document.getElementById('globalSearch').addEventListener('input',event=>handleSearch(event.target.value));
document.getElementById('customerSearch').addEventListener('input',renderCustomers);
document.getElementById('verticalFilter').addEventListener('change',renderCustomers);
document.getElementById('tierFilter').addEventListener('change',renderCustomers);
document.getElementById('exportCustomers').addEventListener('click',exportCSV);
document.getElementById('customerExport').addEventListener('click',exportCSV);
document.addEventListener('keydown',event=>{ if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.getElementById('globalSearch').focus();} if(event.key==='Escape')closeDrawer(); });

renderDashboard(); renderCustomers(); renderKanban(); renderLoyalty(); renderService(); renderCampaigns(); renderAnalytics();
