const form = document.getElementById("signupForm");
const submitBtn = document.getElementById("submitBtn");
const loading = document.getElementById("loading");
const resultBox = document.getElementById("resultBox");
const getListBtn = document.getElementById("getListBtn");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const API = "http://localhost:3000/api/signup";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  submitBtn.disabled = true;
  loading.style.display = "inline";

  const body = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
    confirmPassword: confirmPasswordInput.value
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      alert("錯誤：" + data.message);
    } else {
      alert("報名成功！");
      form.reset();
    }
  } catch (err) {
    alert("伺服器錯誤，請稍後再試");
  }

  submitBtn.disabled = false;
  loading.style.display = "none";
});

getListBtn.addEventListener("click", async () => {
  const res = await fetch(API);
  const data = await res.json();
  resultBox.textContent = JSON.stringify(data, null, 2);
});

