// scripts.js - 包含溫度轉換器與猜數字遊戲（外部 JS 檔）
// 加了防禦檢查與一些 console.log 方便偵錯

function parseTempInput(s) {
    if (!s) return null;
    s = s.trim();
    var m = s.match(/^(-?\d+(\.\d+)?)(\s*([cCfF]))?$/);
    if (!m) return null;
    return { value: Number(m[1]), unit: (m[4] ? m[4].toUpperCase() : null) };
  }
  function cToF(c){ return c * 9/5 + 32; }
  function fToC(f){ return (f - 32) * 5/9; }
  
  // 小型 isInteger fallback（某些舊環境）
  var _isInteger = Number.isInteger || function(n){ return typeof n === 'number' && isFinite(n) && Math.floor(n) === n; };
  
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded - scripts.js loaded');
  
    var btnTemp = document.getElementById('btnTemp');
    var tempResult = document.getElementById('tempResult');
    var btnGuess = document.getElementById('btnGuess');
    var guessResult = document.getElementById('guessResult');
  
    if (!btnTemp) console.error('btnTemp not found in DOM');
    if (!btnGuess) console.error('btnGuess not found in DOM');
    if (!tempResult) console.warn('tempResult element not found (will not show textual result)');
    if (!guessResult) console.warn('guessResult element not found (will not show textual result)');
  
    // 只在按鈕存在時綁定
    if (btnTemp) {
      btnTemp.addEventListener('click', function(){
        try {
          var raw = prompt('請輸入溫度（可帶單位，例如 "25 C" 或 "77F"，或只輸入數字再選單位）：', '');
          if (raw === null) { if (tempResult) tempResult.textContent = '使用者取消'; return; }
  
          var parsed = parseTempInput(raw);
          var unit = null;
          if (!parsed) {
            var n = Number(raw);
            if (!Number.isFinite(n)) {
              alert('輸入格式錯誤，請輸入數字，例如 25 或 77F');
              if (tempResult) tempResult.textContent = '輸入錯誤';
              return;
            }
            parsed = { value: n, unit: null };
            unit = prompt('你輸入的是攝氏(C) 還是 華氏(F)？請輸入 C 或 F：', 'C');
            if (unit === null) { if (tempResult) tempResult.textContent = '使用者取消'; return; }
            unit = unit.trim().toUpperCase();
            if (unit !== 'C' && unit !== 'F') {
              alert('單位錯誤，請輸入 C 或 F');
              if (tempResult) tempResult.textContent = '單位錯誤';
              return;
            }
            parsed.unit = unit;
          } else if (!parsed.unit) {
            unit = prompt('你輸入的是攝氏(C) 還是 華氏(F)？請輸入 C 或 F：', 'C');
            if (unit === null) { if (tempResult) tempResult.textContent = '使用者取消'; return; }
            unit = unit.trim().toUpperCase();
            if (unit !== 'C' && unit !== 'F') {
              alert('單位錯誤，請輸入 C 或 F');
              if (tempResult) tempResult.textContent = '單位錯誤';
              return;
            }
            parsed.unit = unit;
          }
  
          var out = '';
          if (parsed.unit === 'C') {
            out = parsed.value + ' °C = ' + cToF(parsed.value).toFixed(2) + ' °F';
          } else {
            out = parsed.value + ' °F = ' + fToC(parsed.value).toFixed(2) + ' °C';
          }
  
          alert('轉換結果：' + out);
          if (tempResult) tempResult.textContent = out;
        } catch (e) {
          console.error('btnTemp handler error', e);
          alert('發生錯誤，請看 Console');
        }
      });
    }
  
    // ---------- 猜數字遊戲 ----------
    function playGuessGame() {
      var target = Math.floor(Math.random() * 100) + 1; // 1..100
      var attempts = 0;
      var history = [];
      while (true) {
        var raw = prompt('請猜一個 1 到 100 的數字（輸入 Cancel 結束）：', '');
        if (raw === null) {
          return { status: 'cancel', attempts: attempts, target: target, history: history };
        }
        var trimmed = raw.trim();
        var n = Number(trimmed);
        attempts++;
        if (!Number.isFinite(n) || !_isInteger(n) || n < 1 || n > 100) {
          alert('請輸入 1 到 100 的整數');
          history.push({ guess: raw, result: 'invalid' });
          continue;
        }
        if (n === target) {
          history.push({ guess: n, result: 'correct' });
          return { status: 'win', attempts: attempts, target: target, history: history };
        } else if (n < target) {
          alert('再大一點');
          history.push({ guess: n, result: 'too low' });
        } else {
          alert('再小一點');
          history.push({ guess: n, result: 'too high' });
        }
      }
    }
  
    if (btnGuess) {
      btnGuess.addEventListener('click', function(){
        try {
          var res = playGuessGame();
          if (res.status === 'cancel') {
            if (guessResult) guessResult.textContent = '遊戲取消（未猜中）。';
            return;
          }
          if (res.status === 'win') {
            var msg = '恭喜！你猜中了 ' + res.target + '，共猜 ' + res.attempts + ' 次。\n\n猜測記錄：\n';
            for (var i = 0; i < res.history.length; i++) {
              var h = res.history[i];
              msg += (i+1) + '. ' + h.guess + ' → ' + h.result + '\n';
            }
            alert('你猜中了！共 ' + res.attempts + ' 次');
            if (guessResult) guessResult.textContent = msg;
          }
        } catch (e) {
          console.error('btnGuess handler error', e);
          alert('遊戲發生錯誤，請看 Console');
        }
      });
    }
  
  });
  