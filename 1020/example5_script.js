// example5_script.js - quick fix (use padEnd to align columns)
(function() {
    function askInt(promptText, defaultVal) {
      while (true) {
        var s = prompt(promptText, defaultVal);
        if (s === null) return null;
        s = s.trim();
        var n = Number(s);
        if (!Number.isFinite(n) || !Number.isInteger(n) || n < 1 || n > 9) {
          alert('請輸入 1~9 的整數');
          continue;
        }
        return n;
      }
    }
  
    var start = askInt('請輸入起始乘法表（1~9），例如 2：', '2');
    if (start === null) { document.getElementById('result').textContent = '使用者取消'; return; }
    var end = askInt('請輸入結束乘法表（1~9），例如 5：', '5');
    if (end === null) { document.getElementById('result').textContent = '使用者取消'; return; }
    if (start > end) { var t = start; start = end; end = t; }
  
    var output = '';
    for (var i = start; i <= end; i++) {
      for (var j = 1; j <= 9; j++) {
        // 建立 "2x3 = 6" 這樣的字串，然後 padEnd 到固定寬度 (12)
        var cell = `${i}x${j} = ${i*j}`;
        output += cell.padEnd(12, ' ');
      }
      output += '\n';
    }
  
    var el = document.getElementById('result');
    el.textContent = output;
    console.log('顯示乘法表範圍: ' + start + ' ~ ' + end + '\n' + output);
  })();
  
  
