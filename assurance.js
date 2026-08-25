const signals = Object.fromEntries([...document.querySelectorAll('[data-assurance-signal]')].map(input => [input.dataset.assuranceSignal, input]));
const result = document.getElementById('decisionResult');
const code = document.getElementById('decisionCode');
const score = document.getElementById('riskScore');
const mark = document.getElementById('resultMark');
const title = document.getElementById('decisionTitle');
const copy = document.getElementById('decisionCopy');
const reasons = document.getElementById('decisionReasons');

function renderDecision() {
  const failures = [];
  let state = 'verified';
  let risk = 8;

  if (!signals.partner.checked) { failures.push('Partner identity is incomplete'); risk += 38; state = 'hold'; }
  if (signals.duplicate.checked) { failures.push('Competing ownership claim found'); risk += 34; state = 'hold'; }
  if (!signals.payment.checked) { failures.push('Payment or cooling evidence is pending'); risk += 22; state = 'hold'; }
  if (signals.existing.checked) { failures.push('Customer existed before this referral'); risk = Math.max(risk, 92); state = 'blocked'; }
  if (!signals.customer.checked) { failures.push('Customer did not confirm the referrer'); risk = Math.max(risk, 98); state = 'blocked'; }
  risk = Math.min(99, risk);

  const states = {
    verified:{code:'VERIFIED',mark:'✓',title:'Ownership verified.',copy:'All mandatory evidence is complete. The reward can enter the release queue.'},
    hold:{code:'HOLD',mark:'!',title:'Reward safely held.',copy:'Ownership and points remain frozen until the recorded exceptions are resolved.'},
    blocked:{code:'BLOCKED',mark:'×',title:'Claim blocked.',copy:'A decisive rule failed. No ownership or reward will be released.'}
  };
  const current = states[state];
  result.className = `decision-result ${state}`;
  code.textContent = current.code;
  score.textContent = `${String(risk).padStart(2,'0')} RISK`;
  mark.textContent = current.mark;
  title.textContent = current.title;
  copy.textContent = current.copy;
  reasons.innerHTML = failures.length ? failures.map(reason => `<span>! ${reason}</span>`).join('') : '<span>✓ Identity verified</span><span>✓ Customer confirmed</span><span>✓ Commercial evidence cleared</span>';
}

Object.values(signals).forEach(input => input.addEventListener('change', renderDecision));
document.getElementById('resetScenario').addEventListener('click', () => {
  signals.partner.checked = true;
  signals.existing.checked = false;
  signals.duplicate.checked = false;
  signals.customer.checked = true;
  signals.payment.checked = true;
  renderDecision();
});

renderDecision();
