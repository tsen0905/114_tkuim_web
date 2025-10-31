// example2_script.js
// 驗證 Email 與手機欄位，拋出自訂訊息後再提示使用者
const form = document.getElementById('contact-form');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const o365Regex = /^[A-Za-z0-9._%+-]+@o365\.tku\.edu\.tw$/i;

function showValidity(input) {

  input.setCustomValidity('');
  if (input.validity.valueMissing) {
    input.setCustomValidity('這個欄位必填');
  }
  else if (input === email) {
    if (input.validity.typeMismatch) {
      input.setCustomValidity('請輸入有效的電子郵件格式，例如 name@o365.tku.edu.tw');
    } else if (!o365Regex.test(input.value.trim())) {
      input.setCustomValidity('請使用 o365.tku.edu.tw 的信箱，例如 user@o365.tku.edu.tw');
    }
  }
  else if (input.validity.typeMismatch) {
    input.setCustomValidity('格式不正確，請確認輸入內容');
  }
  else if (input.validity.patternMismatch) {
    input.setCustomValidity(input.title || '格式不正確');
  } else {
    input.setCustomValidity('');
  }

  return input.reportValidity();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const emailOk = showValidity(email);
  const phoneOk = showValidity(phone);
  if (emailOk && phoneOk) {
    alert('表單驗證成功，準備送出資料');
    form.reset();
  }
});

email.addEventListener('blur', () => {
  showValidity(email);
});
