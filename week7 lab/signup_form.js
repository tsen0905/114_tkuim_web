// signup_form.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirm');
    const interestsWrap = document.getElementById('interests');
    const termsInput = document.getElementById('terms');
  
    const submitBtn = document.getElementById('submit-btn');
    const resetBtn = document.getElementById('reset-btn');
  
    const nameErr = document.getElementById('name-error');
    const emailErr = document.getElementById('email-error');
    const phoneErr = document.getElementById('phone-error');
    const passwordErr = document.getElementById('password-error');
    const confirmErr = document.getElementById('confirm-error');
    const interestsErr = document.getElementById('interests-error');
    const termsErr = document.getElementById('terms-error');
  
    const strengthBar = document.getElementById('password-strength');
    const strengthLabel = document.getElementById('strength-label');
  
    const STORAGE_KEY = 'signup:draft';
  
    // --- helpers ---
    function setError(el, msg) {
      el.setCustomValidity(msg);
      const id = el.id + '-error';
      const p = document.getElementById(id);
      if (p) p.textContent = msg;
    }
    function clearError(el) {
      setError(el, '');
    }
  
    function getSelectedInterests() {
      return Array.from(interestsWrap.querySelectorAll('input[name="interest"]:checked')).map(i => i.value);
    }
  
    // --- validations ---
    function validateName() {
      const v = nameInput.value.trim();
      if (!v) {
        setError(nameInput, '請輸入姓名');
        return false;
      }
      clearError(nameInput);
      return true;
    }
  
    function validateEmail() {
      const v = emailInput.value.trim();
      if (!v) {
        setError(emailInput, '請輸入 Email');
        return false;
      }
      // 基本格式檢查（如需限定 domain 可改此處）
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(v)) {
        setError(emailInput, 'Email 格式不正確');
        return false;
      }
      clearError(emailInput);
      return true;
    }
  
    function validatePhone() {
      const v = phoneInput.value.trim();
      if (!v) {
        setError(phoneInput, '請輸入手機號碼');
        return false;
      }
      if (!/^\d{10}$/.test(v)) {
        setError(phoneInput, '請輸入 10 碼數字，例如 0912345678');
        return false;
      }
      clearError(phoneInput);
      return true;
    }
  
    function validatePassword() {
      const v = passwordInput.value;
      if (!v) {
        setError(passwordInput, '請輸入密碼');
        updateStrength(0);
        return false;
      }
      if (v.length < 8) {
        setError(passwordInput, '密碼至少 8 碼');
        updateStrength(v);
        return false;
      }
      if (!/[A-Za-z]/.test(v) || !/\d/.test(v)) {
        setError(passwordInput, '密碼需包含英文字母與數字');
        updateStrength(v);
        return false;
      }
      clearError(passwordInput);
      updateStrength(v);
      return true;
    }
  
    function validateConfirm() {
      const v = confirmInput.value;
      if (!v) {
        setError(confirmInput, '請再次輸入密碼');
        return false;
      }
      if (v !== passwordInput.value) {
        setError(confirmInput, '兩次密碼不一致');
        return false;
      }
      clearError(confirmInput);
      return true;
    }
  
    function validateInterests() {
      const sel = getSelectedInterests();
      if (sel.length === 0) {
        interestsErr.textContent = '請至少勾選一項興趣';
        return false;
      }
      interestsErr.textContent = '';
      return true;
    }
  
    function validateTerms() {
      if (!termsInput.checked) {
        termsErr.textContent = '須同意服務條款才能註冊';
        return false;
      }
      termsErr.textContent = '';
      return true;
    }
  
    // --- password strength ---
    function updateStrength(val) {
      let score = 0;
      if (!val) {
        strengthBar.style.width = '0%';
        strengthBar.className = 'progress-bar';
        strengthLabel.textContent = '—';
        return;
      }
      if (val.length >= 8) score += 1;
      if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score += 1;
      if (/\d/.test(val)) score += 1;
      if (/[^A-Za-z0-9]/.test(val)) score += 1;
  
      let percent = (score / 4) * 100;
      strengthBar.style.width = percent + '%';
      strengthBar.classList.remove('bg-danger', 'bg-warning', 'bg-success');
      if (score <= 1) {
        strengthBar.classList.add('bg-danger');
        strengthLabel.textContent = '弱';
      } else if (score === 2 || score === 3) {
        strengthBar.classList.add('bg-warning');
        strengthLabel.textContent = '中';
      } else {
        strengthBar.classList.add('bg-success');
        strengthLabel.textContent = '強';
      }
    }
  
    // --- localStorage (debounce) ---
    let saveTimer = null;
    function saveDraft() {
      if (saveTimer) clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const draft = {
          name: nameInput.value,
          email: emailInput.value,
          phone: phoneInput.value,
          password: passwordInput.value,
          confirm: confirmInput.value,
          interests: getSelectedInterests(),
          terms: termsInput.checked
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        } catch (e) {
          // noop
        }
      }, 300);
    }
  
    function restoreDraft() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const d = JSON.parse(raw);
        if (d.name) nameInput.value = d.name;
        if (d.email) emailInput.value = d.email;
        if (d.phone) phoneInput.value = d.phone;
        if (d.password) passwordInput.value = d.password;
        if (d.confirm) confirmInput.value = d.confirm;
        if (Array.isArray(d.interests)) {
          interestsWrap.querySelectorAll('input[name="interest"]').forEach(i => {
            i.checked = d.interests.includes(i.value);
            toggleInterestLabel(i);
          });
        }
        termsInput.checked = !!d.terms;
        updateStrength(passwordInput.value);
      } catch (e) {
        // noop
      }
    }
  
    function clearDraft() {
      localStorage.removeItem(STORAGE_KEY);
    }
  
    // --- interest label styling via delegation ---
    function toggleInterestLabel(inputEl) {
      const label = inputEl.closest('.interest-item');
      if (!label) return;
      if (inputEl.checked) {
        label.classList.add('active', 'btn-tiffany-outline');
        label.classList.remove('btn-outline-secondary');
      } else {
        label.classList.remove('active', 'btn-tiffany-outline');
        label.classList.add('btn-outline-secondary');
      }
    }
  
    interestsWrap.addEventListener('click', (e) => {
      // 點擊 label 時切換隱藏的 checkbox
      const targetLabel = e.target.closest('.interest-item');
      if (!targetLabel) return;
      const cb = targetLabel.querySelector('input[name="interest"]');
      if (!cb) return;
      cb.checked = !cb.checked;
      toggleInterestLabel(cb);
      validateInterests();
      saveDraft();
    });
  
    // --- attach blur / input listeners ---
    [nameInput, emailInput, phoneInput, passwordInput, confirmInput].forEach(input => {
      input.addEventListener('blur', () => {
        // validate on blur
        switch (input.id) {
          case 'name': validateName(); break;
          case 'email': validateEmail(); break;
          case 'phone': validatePhone(); break;
          case 'password': validatePassword(); validateConfirm(); break;
          case 'confirm': validateConfirm(); break;
        }
      });
      input.addEventListener('input', () => {
        // live update; only show error if there was an error
        switch (input.id) {
          case 'name': if (nameInput.validationMessage) validateName(); break;
          case 'email': if (emailInput.validationMessage) validateEmail(); break;
          case 'phone': if (phoneInput.validationMessage) validatePhone(); break;
          case 'password': validatePassword(); if (confirmInput.value) validateConfirm(); break;
          case 'confirm': if (confirmInput.validationMessage) validateConfirm(); break;
        }
        saveDraft();
      });
    });
  
    // terms change
    termsInput.addEventListener('change', () => {
      validateTerms();
      saveDraft();
    });
  
    // interest checkboxes direct change (in case user manipulates input)
    interestsWrap.querySelectorAll('input[name="interest"]').forEach(cb => {
      cb.addEventListener('change', () => {
        toggleInterestLabel(cb);
        validateInterests();
        saveDraft();
      });
    });
  
    // submit handling
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
  
      // validate all
      const validators = [
        {fn: validateName, el: nameInput},
        {fn: validateEmail, el: emailInput},
        {fn: validatePhone, el: phoneInput},
        {fn: validatePassword, el: passwordInput},
        {fn: validateConfirm, el: confirmInput}
      ];
  
      // run validators and find first invalid
      let firstInvalidEl = null;
      for (const v of validators) {
        const ok = v.fn();
        if (!ok && !firstInvalidEl) firstInvalidEl = v.el;
      }
      if (!validateInterests() && !firstInvalidEl) {
        // focus first interest checkbox
        const first = interestsWrap.querySelector('input[name="interest"]');
        if (first) firstInvalidEl = first;
      }
      if (!validateTerms() && !firstInvalidEl) {
        firstInvalidEl = termsInput;
      }
  
      if (firstInvalidEl) {
        firstInvalidEl.focus();
        return;
      }
  
      // pass -> disable button, show loading
      submitBtn.disabled = true;
      const origLabel = submitBtn.textContent;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> 送出中...`;
  
      // simulate network
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      alert('註冊成功！感謝您的註冊。');
      // reset everything
      form.reset();
      updateStrength('');
      interestsWrap.querySelectorAll('input[name="interest"]').forEach(i => toggleInterestLabel(i));
      clearDraft();
      submitBtn.disabled = false;
      submitBtn.textContent = origLabel;
    });
  
    // reset button
    resetBtn.addEventListener('click', () => {
      form.reset();
      updateStrength('');
      interestsWrap.querySelectorAll('input[name="interest"]').forEach(i => toggleInterestLabel(i));
      // clear error messages
      [nameErr, emailErr, phoneErr, passwordErr, confirmErr, interestsErr, termsErr].forEach(p => p.textContent = '');
      clearDraft();
    });
  
    // initial restore
    restoreDraft();
  });
  