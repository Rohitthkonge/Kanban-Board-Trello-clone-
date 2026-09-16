const STATUSES = ['todo', 'inprogress', 'done'];
let cards = JSON.parse(localStorage.getItem('kanbanCards')) || [];
let activeStatus = 'todo';
let draggedCardId = null;

const modalOverlay = document.getElementById('modalOverlay');
const cardTitleInput = document.getElementById('cardTitleInput');
const cardDescInput = document.getElementById('cardDescInput');

function save() {
  localStorage.setItem('kanbanCards', JSON.stringify(cards));
}

function render() {
  STATUSES.forEach(status => {
    const listEl = document.getElementById(`list-${status}`);
    const countEl = document.getElementById(`count-${status}`);
    const statusCards = cards.filter(c => c.status === status);
    countEl.textContent = statusCards.length;
    listEl.innerHTML = '';

    statusCards.forEach(card => {
      const el = document.createElement('div');
      el.className = 'task-card';
      el.draggable = true;
      el.dataset.id = card.id;
      el.innerHTML = `
        <div class="task-title">${escapeHtml(card.title)}</div>
        ${card.desc ? `<div class="task-desc">${escapeHtml(card.desc)}</div>` : ''}
        <div class="task-footer">
          <button class="delete-card" data-id="${card.id}">Delete</button>
        </div>
      `;
      listEl.appendChild(el);
    });
  });

  attachCardEvents();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function attachCardEvents() {
  document.querySelectorAll('.task-card').forEach(el => {
    el.addEventListener('dragstart', () => {
      draggedCardId = Number(el.dataset.id);
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });

  document.querySelectorAll('.delete-card').forEach(btn => {
    btn.addEventListener('click', () => {
      cards = cards.filter(c => c.id !== Number(btn.dataset.id));
      save();
      render();
    });
  });
}

document.querySelectorAll('.column').forEach(col => {
  col.addEventListener('dragover', e => {
    e.preventDefault();
    col.classList.add('drag-over');
  });
  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
  col.addEventListener('drop', () => {
    col.classList.remove('drag-over');
    const status = col.dataset.status;
    const card = cards.find(c => c.id === draggedCardId);
    if (card) {
      card.status = status;
      save();
      render();
    }
  });
});

document.querySelectorAll('.add-card-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activeStatus = btn.dataset.status;
    modalOverlay.classList.add('active');
    cardTitleInput.focus();
  });
});

document.getElementById('cancelBtn').addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });

function closeModal() {
  modalOverlay.classList.remove('active');
  cardTitleInput.value = '';
  cardDescInput.value = '';
}

document.getElementById('saveBtn').addEventListener('click', () => {
  const title = cardTitleInput.value.trim();
  if (!title) { cardTitleInput.focus(); return; }
  cards.push({
    id: Date.now(),
    title,
    desc: cardDescInput.value.trim(),
    status: activeStatus
  });
  save();
  render();
  closeModal();
});

render();
