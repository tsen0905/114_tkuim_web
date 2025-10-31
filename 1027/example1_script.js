// example1_script.js
// 統一在父層監聽點擊與送出事件，處理清單項目新增/刪除

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => {
    return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m];
  });
}

function createListItem(value) {
  const item = document.createElement('li');
  item.className = 'list-group-item d-flex justify-content-between align-items-center';
  item.innerHTML = `
    <span class="todo-text">${escapeHTML(value)}</span>
    <div>
      <button type="button" class="btn btn-sm btn-outline-success me-2" data-action="complete">完成</button>
      <button type="button" class="btn btn-sm btn-outline-danger" data-action="remove">刪除</button>
    </div>
  `;
  return item;
}

function addItemFromInput() {
  const value = input.value.trim();
  if (!value) return false;
  const item = createListItem(value);
  list.appendChild(item);
  input.value = '';
  input.focus();
  return true;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  addItemFromInput();
});

input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    if (typeof form.requestSubmit === 'function') {
      form.requestSubmit();
    } else {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }
});

list.addEventListener('click', (event) => {
  const btn = event.target.closest('button[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  const item = btn.closest('li');
  if (!item) return;

  if (action === 'remove') {
    item.remove();
    return;
  }

  if (action === 'complete') {
   
    const isDone = item.classList.toggle('list-group-item-success');

    btn.classList.toggle('btn-success', isDone);
    btn.classList.toggle('btn-outline-success', !isDone);
    btn.textContent = isDone ? '取消' : '完成';
  }
});

