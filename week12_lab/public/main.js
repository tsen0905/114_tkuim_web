const API = 'http://localhost:3000';
let token = '';

async function login() {
  const res = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: username.value,
      password: password.value
    })
  });

  const data = await res.json();
  if (!data.token) {
    alert('登入失敗');
    return;
  }

  token = data.token;
  document.getElementById('userArea').style.display = 'block';
  loadData();
}

async function loadData() {
  const res = await fetch(`${API}/api/signup`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();
  const list = document.getElementById('list');
  list.innerHTML = '';

  data.forEach(d => {
    const li = document.createElement('li');
    li.textContent = d.name;

    const btn = document.createElement('button');
    btn.textContent = '刪除';
    btn.onclick = () => deleteData(d._id);

    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function addData() {
  await fetch(`${API}/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      name: dataName.value
    })
  });

  dataName.value = '';
  loadData();
}

async function deleteData(id) {
  const res = await fetch(`${API}/api/signup/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (res.status === 403) {
    alert('權限不足');
  }

  loadData();
}

function logout() {
  token = '';
  document.getElementById('userArea').style.display = 'none';
}
