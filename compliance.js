const filterButtons = [...document.querySelectorAll('[data-law-filter]')];
const lawCards = [...document.querySelectorAll('[data-law-phase]')];
const checklist = [...document.querySelectorAll('#documentChecklist input[type="checkbox"]')];

filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  const filter = button.dataset.lawFilter;
  lawCards.forEach(card => {
    card.hidden = filter !== 'all' && !card.dataset.lawPhase.split(' ').includes(filter);
  });
}));

function updateChecklist() {
  document.getElementById('completedDocuments').textContent = checklist.filter(item => item.checked).length;
}

checklist.forEach(item => item.addEventListener('change', updateChecklist));
document.getElementById('printChecklist').addEventListener('click', () => window.print());
updateChecklist();
