// example3_script.js
// 延伸練習：使用 prompt 讀兩個數字、做加減乘除、餘數和比較，並輸出結果

(function() {
    // helper：反覆詢問直到拿到有效數字或使用者取消
    function askNumber(promptText, defaultVal) {
      while (true) {
        var s = prompt(promptText, defaultVal);
        if (s === null) return null; // 使用者按取消
        s = s.trim();
        if (s === '') { alert('請輸入數字（不能為空）'); continue; }
  
        // 用 Number() 轉型，接受整數或小數
        var n = Number(s);
        if (!Number.isFinite(n)) {
          alert('輸入錯誤，請輸入有效數字（例如 12 或 3.14）');
          continue;
        }
        return n;
      }
    }
  
    // 讀名字（可選）
    var name = prompt('請輸入你的名字（可留空）', '');
    if (!name) name = '同學';
  
    var a = askNumber('請輸入數字 A：', '12');
    if (a === null) { document.getElementById('result').textContent = '使用者取消'; return; }
  
    var b = askNumber('請輸入數字 B：', '5');
    if (b === null) { document.getElementById('result').textContent = '使用者取消'; return; }
  
    var sum = a + b;
    var diff = a - b;
    var prod = a * b;
    var div = null;
    if (b === 0) {
      div = '無法除以 0';
    } else {
      div = a / b;
    }
    // 餘數（mod）：a % b，回傳 a 除以 b 的剩餘部分（若 b 為 0，未定義）
    var mod = null;
    if (b === 0) {
      mod = '無法計算餘數（除數為 0）';
    } else {
      mod = a % b;
    }
  
    // 比較
    var gt = a > b;
    var eqLoose = a == b;   
    var eqStrict = a === b; 
  
    // 組成輸出字串（多行）
    var out = '';
    out += '哈囉，' + name + '！\n\n';
    out += 'A = ' + a + ', B = ' + b + '\n';
    out += 'A + B = ' + sum + '\n';
    out += 'A - B = ' + diff + '\n';
    out += 'A * B = ' + prod + '\n';
    out += 'A / B = ' + div + '\n';
    out += 'A % B (餘數) = ' + mod + '\n\n';
    out += 'A > B ? ' + gt + '\n';
    out += 'A == B ? (值相等) ' + eqLoose + '\n';
    out += 'A === B ? (值與型別相等) ' + eqStrict + '\n';
  
    // 顯示結果
    alert('計算完成，請查看頁面結果與 Console（F12）');
    console.log(out);
    var el = document.getElementById('result');
    if (el) {
      el.textContent = out;
    } else {
      console.error('#result element not found');
    }
  })();
  
