// example_array_stats.js
// 讀取以逗號分隔的數字，計算總和、平均、最大、最小並顯示

(function() {
    var raw = prompt('請輸入多個數字（以逗號分隔，例如: 3, 4.5, 7）:','');
    var result = '';
  
    if (!raw) {
      result = '未輸入資料或使用者取消';
      document.getElementById('result').textContent = result;
      console.log(result);
      return;
    }
  
    // 拆字串、去掉空白並嘗試轉數字
    var parts = raw.split(',');
    var nums = [];
    for (var i = 0; i < parts.length; i++) {
      var s = parts[i].trim();
      if (s === '') continue;
      var n = Number(s); // 支援整數與小數
      if (Number.isFinite(n)) {
        nums.push(n);
      } else {
        // 非數字的項目會被忽略；可以視需求記錄錯誤項目
        console.warn('忽略非數字項目:', parts[i]);
      }
    }
  
    if (nums.length === 0) {
      result = '沒有可用的數字';
      document.getElementById('result').textContent = result;
      console.log(result);
      return;
    }
  
    // 計算總和、平均
    var sum = 0;
    for (var j = 0; j < nums.length; j++) sum += nums[j];
    var avg = sum / nums.length;
  
    // 找最大、最小（用迴圈，避免 spread 在極大陣列下問題）
    var max = nums[0];
    var min = nums[0];
    for (var k = 1; k < nums.length; k++) {
      if (nums[k] > max) max = nums[k];
      if (nums[k] < min) min = nums[k];
    }
  
    // 組字串輸出（數字用 toFixed 視需要格式化，這裡保留原數值）
    result = '有效數字: ' + nums.join(', ') + '\n'
           + '總和: ' + sum + '\n'
           + '平均: ' + avg + '\n'
           + '最大值: ' + max + '\n'
           + '最小值: ' + min;
  
    // 顯示
    document.getElementById('result').textContent = result;
    console.log(result);
  })();
  
