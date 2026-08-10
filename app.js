const indices=[['NIFTY 50',24847.15,0.74],['SENSEX',81625.32,0.62],['BANK NIFTY',55410.80,-0.18],['NIFTY IT',37284.65,1.26]];
let stocks=JSON.parse(localStorage.getItem('orbit-watchlist')||'null')||[
 {symbol:'RELIANCE',name:'Reliance Industries',price:1417.80,change:1.12,volume:'8.4M',signal:'Bullish'},
 {symbol:'HDFCBANK',name:'HDFC Bank',price:1992.40,change:-0.36,volume:'6.1M',signal:'Hold'},
 {symbol:'TCS',name:'Tata Consultancy',price:3094.10,change:1.84,volume:'3.8M',signal:'Breakout'},
 {symbol:'ICICIBANK',name:'ICICI Bank',price:1476.50,change:.67,volume:'4.2M',signal:'Bullish'}
];
const scannerData=[...stocks,{symbol:'INFY',name:'Infosys',price:1485.2,change:2.18,volume:'9.7M',signal:'Breakout'},{symbol:'SUNPHARMA',name:'Sun Pharma',price:1698.4,change:1.43,volume:'5.1M',signal:'Bullish'},{symbol:'TATAMOTORS',name:'Tata Motors',price:712.8,change:.94,volume:'11.2M',signal:'Oversold'}].map((x,i)=>({...x,rsi:[64,49,71,57,68,62,35][i]||55}));
const losers=[['COALINDIA','-2.14%'],['ONGC','-1.62%'],['SBILIFE','-1.21%'],['MARUTI','-0.89%']];
const gainers=[['INFY','+2.18%'],['TCS','+1.84%'],['SUNPHARMA','+1.43%'],['RELIANCE','+1.12%']];
const alerts=[['RELIANCE','Price crosses ₹1,425','₹1,417.80','Active'],['TCS','RSI moves above 70','RSI 68.4','Near trigger'],['NIFTY 50','Falls below 24,700','24,847.15','Active']];
const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
function showToast(t){const el=$('#toast');el.textContent=t;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function renderIndices(target){$(target).innerHTML=indices.map(([n,p,c])=>`<article class="index-card"><header><span>${n}</span><span>INDIA</span></header><strong>${p.toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong><footer class="${c>=0?'up':'down'}">${c>=0?'+':''}${c.toFixed(2)}% today</footer></article>`).join('')}
function renderWatch(){
 $('#watchStocks').innerHTML=stocks.slice(0,4).map(s=>`<div class="stock-row"><div class="stock-name"><strong>${s.symbol}</strong><small>${s.name}</small></div><strong>₹${s.price.toLocaleString('en-IN')}</strong><span class="stock-change ${s.change<0?'down':'up'}">${s.change>0?'+':''}${s.change}%</span></div>`).join('');
 $('#watchTable').innerHTML=stocks.map((s,i)=>`<tr><td><strong>${s.symbol}</strong><small>${s.name}</small></td><td>₹${s.price.toLocaleString('en-IN')}</td><td class="${s.change>=0?'up':'down'}">${s.change>0?'+':''}${s.change}%</td><td>${s.volume}</td><td><span class="signal">${s.signal}</span></td><td><button class="text-button remove-stock" data-index="${i}">Remove</button></td></tr>`).join('');
 $$('.remove-stock').forEach(b=>b.onclick=()=>{stocks.splice(+b.dataset.index,1);localStorage.setItem('orbit-watchlist',JSON.stringify(stocks));renderWatch();showToast('Removed from watchlist')});
}
function renderMovers(type='gainers'){const data=type==='gainers'?gainers:losers;$('#moversList').innerHTML=data.map(([s,c],i)=>`<div class="mover-row"><div><strong>${s}</strong><small>NSE · Large cap</small></div><span>₹${[1485.2,3094.1,1698.4,1417.8,382.1,241.4,1842.6,12640][i+(type==='losers'?4:0)].toLocaleString('en-IN')}</span><span class="${type==='gainers'?'up':'down'}">${c}</span></div>`).join('')}
function renderScanner(data=scannerData){$('#scannerTable').innerHTML=data.map(s=>`<tr><td><strong>${s.symbol}</strong><small>${s.name}</small></td><td>₹${s.price.toLocaleString('en-IN')}</td><td class="${s.change>=0?'up':'down'}">${s.change>0?'+':''}${s.change}%</td><td>${s.rsi}</td><td>${s.volume}</td><td><span class="signal">${s.signal}</span></td></tr>`).join('');$('#resultCount').textContent=`${data.length} matches`}
function renderAlerts(){$('#alertList').innerHTML=alerts.map((a,i)=>`<article class="alert-card"><header><span class="signal">${a[0]}</span><button class="text-button delete-alert" data-index="${i}">×</button></header><h3>${a[1]}</h3><p>Current: ${a[2]}</p><footer><span class="alert-state">● ${a[3]}</span><span>In-app</span></footer></article>`).join('');$$('.delete-alert').forEach(b=>b.onclick=()=>{alerts.splice(+b.dataset.index,1);renderAlerts();$('#alertBadge').textContent=alerts.length})}
function drawChart(){const c=$('#marketChart'),ctx=c.getContext('2d'),ratio=devicePixelRatio||1,w=c.clientWidth,h=230;c.width=w*ratio;c.height=h*ratio;ctx.scale(ratio,ratio);const points=[35,52,48,66,61,88,79,98,92,116,105,129,123,145,151,139,164,158,184,176,198];ctx.clearRect(0,0,w,h);ctx.strokeStyle='rgba(255,255,255,.08)';ctx.lineWidth=1;for(let y=35;y<220;y+=42){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}const step=w/(points.length-1);const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,'rgba(78,181,139,.28)');grad.addColorStop(1,'rgba(78,181,139,0)');ctx.beginPath();points.forEach((p,i)=>{const x=i*step,y=220-p*.88;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.closePath();ctx.fillStyle=grad;ctx.fill();ctx.beginPath();points.forEach((p,i)=>{const x=i*step,y=220-p*.88;i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.strokeStyle='#63c29b';ctx.lineWidth=2.2;ctx.stroke()}
function showView(id){$$('.view').forEach(v=>v.classList.toggle('active',v.id===id));$$('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.view===id));$('#sidebar').classList.remove('open');document.body.classList.remove('nav-open');$('#menuButton').setAttribute('aria-expanded','false');window.scrollTo({top:0,behavior:'smooth'});if(id==='dashboard')requestAnimationFrame(drawChart)}
renderIndices('#indexStrip');renderIndices('#marketIndices');renderWatch();renderMovers();renderScanner();renderAlerts();
$('#sectorGrid').innerHTML=[['IT',2.14],['Pharma',1.47],['FMCG',.66],['Auto',.41],['Bank',-.18],['Metal',-.73],['Energy',.28],['Realty',1.06]].map(([n,c])=>`<div class="sector ${c<0?'down-sector':''}"><strong>NIFTY ${n}</strong><span class="${c>=0?'up':'down'}">${c>0?'+':''}${c}%</span></div>`).join('');
$('#optionTable').innerHTML=[[184,62.4,24600,18.5,96],[226,41.8,24700,34.1,174],[318,25.6,24800,61.8,352],[176,13.2,24900,104.6,241],[138,7.1,25000,161.2,398]].map(r=>`<tr>${r.map((v,i)=>`<td>${i===2?'₹':''}${v}${i===0||i===4?'K':''}</td>`).join('')}</tr>`).join('');
function closeNavigation(){document.body.classList.remove('nav-open');$('#sidebar').classList.remove('open');$('#menuButton').setAttribute('aria-expanded','false')}
function toggleNavigation(){const open=!$('#sidebar').classList.contains('open');$('#sidebar').classList.toggle('open',open);document.body.classList.toggle('nav-open',open);$('#menuButton').setAttribute('aria-expanded',String(open))}
$$('.nav-item').forEach(b=>b.onclick=()=>{showView(b.dataset.view);closeNavigation()});$$('[data-jump]').forEach(b=>b.onclick=()=>showView(b.dataset.jump));$('#menuButton').onclick=toggleNavigation;$('#navScrim').onclick=closeNavigation;
$$('[data-movers]').forEach(b=>b.onclick=()=>{$$('[data-movers]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderMovers(b.dataset.movers)});
$('#runScan').onclick=()=>{const p=+$('#minPrice').value,c=+$('#minChange').value,s=$('#signalFilter').value;const data=scannerData.filter(x=>x.price>=p&&x.change>=c&&(s==='Any'||x.signal===s));renderScanner(data);showToast(`Scanner complete: ${data.length} matches`)};
$('#addStock').onclick=()=>$('#stockDialog').showModal();$('#saveStock').onclick=e=>{e.preventDefault();const symbol=$('#symbolInput').value.trim().toUpperCase(),name=$('#nameInput').value.trim();if(!symbol||!name)return showToast('Enter a symbol and company name');stocks.push({symbol,name,price:Math.round((300+Math.random()*2500)*10)/10,change:Math.round((Math.random()*4-1)*100)/100,volume:'1.2M',signal:'Watch'});localStorage.setItem('orbit-watchlist',JSON.stringify(stocks));renderWatch();$('#stockDialog').close();showToast(`${symbol} added to watchlist`)};
$('#newAlert').onclick=()=>{alerts.unshift(['NEW','New custom alert','Awaiting condition','Active']);renderAlerts();$('#alertBadge').textContent=alerts.length;showToast('New alert created')};
let currentPlan=localStorage.getItem('orbit-plan')||'Pro',billingCycle=localStorage.getItem('orbit-billing')||'monthly';
function renderSubscription(){
  $('#currentPlanName').textContent=currentPlan;
  $('#profilePlan').textContent=`${currentPlan} workspace`;
  $$('.price-card').forEach(card=>card.classList.toggle('current',card.dataset.plan===currentPlan));
  $$('.choose-plan').forEach(button=>{
    const active=button.dataset.plan===currentPlan;
    button.textContent=active?'Current plan':button.dataset.plan==='Elite'?'Upgrade to Elite':`Choose ${button.dataset.plan}`;
    button.className=active?'primary-button choose-plan':'secondary-button choose-plan';
  });
  $$('[data-billing]').forEach(button=>button.classList.toggle('active',button.dataset.billing===billingCycle));
  $$('.price strong[data-monthly]').forEach(price=>{const value=price.dataset[billingCycle];price.textContent=`₹${Number(value).toLocaleString('en-IN')}`});
  const selected=$(`.price-card[data-plan="${currentPlan}"] .price strong`),amount=selected?selected.dataset[billingCycle]:'0';
  $('#renewalCopy').textContent=currentPlan==='Starter'?'Free plan · No renewal date':`Renews on September 11, 2026 · ₹${Number(amount).toLocaleString('en-IN')}/${billingCycle==='annual'?'month, billed annually':'month'}`;
}
$$('[data-billing]').forEach(button=>button.onclick=()=>{billingCycle=button.dataset.billing;localStorage.setItem('orbit-billing',billingCycle);renderSubscription()});
$$('.choose-plan').forEach(button=>button.onclick=()=>{if(button.dataset.plan===currentPlan)return showToast(`${currentPlan} is already your active plan`);currentPlan=button.dataset.plan;localStorage.setItem('orbit-plan',currentPlan);renderSubscription();showToast(`${currentPlan} plan selected for this demo`)});
$('#manageBilling').onclick=()=>showToast('Billing portal will connect to the payment gateway');
$$('.download-invoice').forEach(button=>button.onclick=()=>showToast('Invoice download prepared'));
renderSubscription();
$$('.tour-trigger').forEach(button=>button.onclick=()=>$('#tourDialog').showModal());
$('.start-tour').onclick=()=>{showView('dashboard');showToast('Tour started — explore the highlighted action centre')};
$('#refreshMarket').onclick=()=>{indices.forEach(x=>{x[1]+=Math.random()*8-4;x[2]+=Math.random()*.04-.02});renderIndices('#indexStrip');renderIndices('#marketIndices');drawChart();showToast('Market snapshot refreshed')};
$$('.range-tabs button').forEach(button=>button.onclick=()=>{$$('.range-tabs button').forEach(x=>x.classList.remove('active'));button.classList.add('active');drawChart();showToast(`${button.textContent} chart loaded`)});
$('.notification-button').onclick=()=>showView('alerts');
$('.top-actions button[aria-label="Settings"]').onclick=()=>showToast('Workspace settings are ready for backend connection');
$('#globalSearch').addEventListener('input',e=>{const q=e.target.value.toUpperCase();if(q.length>1){const s=scannerData.find(x=>x.symbol.includes(q)||x.name.toUpperCase().includes(q));if(s)showToast(`${s.symbol} · ₹${s.price.toLocaleString('en-IN')} · ${s.change>0?'+':''}${s.change}%`)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNavigation();if(e.key==='/'&&document.activeElement.tagName!=='INPUT'){e.preventDefault();$('#globalSearch').focus()}});
function tick(){const now=new Date(),hour=+now.toLocaleString('en-US',{timeZone:'Asia/Kolkata',hour:'numeric',hour12:false});$('#clock').textContent=now.toLocaleTimeString('en-IN',{timeZone:'Asia/Kolkata',hour12:false})+' IST';$('#greeting').textContent=`Good ${hour<12?'morning':hour<17?'afternoon':'evening'}, Deepak.`}tick();setInterval(tick,1000);
setInterval(()=>{indices.forEach(x=>{x[1]+=Math.random()*2.6-1.3;x[2]+=Math.random()*.012-.006});renderIndices('#indexStrip');renderIndices('#marketIndices')},2000);
addEventListener('resize',drawChart);requestAnimationFrame(drawChart);

let deferredInstallPrompt=null;
const installButton=$('#installApp');
addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  installButton.hidden=false;
});
installButton.onclick=async()=>{
  if(!deferredInstallPrompt)return;
  deferredInstallPrompt.prompt();
  const {outcome}=await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null;
  installButton.hidden=true;
  showToast(outcome==='accepted'?'Orbit Signal installed':'Installation cancelled');
};
addEventListener('appinstalled',()=>{deferredInstallPrompt=null;installButton.hidden=true;showToast('Orbit Signal is ready on your device')});
if('serviceWorker' in navigator){addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}))}
