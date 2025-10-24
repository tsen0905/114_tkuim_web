// example7_script.js
// 以函式封裝 BMI 計算、等級判斷，並新增 isIdeal 判斷是否為理想體位

function calcBMI(heightCm, weightKg) {
    // 轉公尺
    var h = heightCm / 100;
    var bmi = weightKg / (h * h);
    return bmi;
  }
  
  function bmiLevel(bmi) {
    var level = '';
    if (bmi < 18.5) {
      level = '過輕';
    } else if (bmi < 24) {
      level = '正常';
    } else if (bmi < 27) {
      level = '過重';
    } else if (bmi < 30) {
      level = '輕度肥胖';
    } else if (bmi < 35) {
      level = '中度肥胖';
    } else {
      level = '重度肥胖';
    }
    return level;
  }
  
  // 新增函式：判斷是否在理想範圍（含 18.5，不含 24）
  function isIdeal(bmi) {
    return bmi >= 18.5 && bmi < 24;
  }
  
  var hStr = prompt('請輸入身高（公分）：');
  var wStr = prompt('請輸入體重（公斤）：');
  var hNum = parseFloat(hStr);
  var wNum = parseFloat(wStr);
  
  var text = '';
  if (isNaN(hNum) || isNaN(wNum) || hNum <= 0 || wNum <= 0) {
    text = '輸入不正確（請輸入正確的身高與體重）';
  } else {
    var bmi = calcBMI(hNum, wNum);
    var ideal = isIdeal(bmi) ? '是' : '否';
    text = '身高：' + hNum + ' cm\n'
         + '體重：' + wNum + ' kg\n'
         + 'BMI：' + bmi.toFixed(2) + '\n'
         + '等級：' + bmiLevel(bmi) + '\n'
         + '是否理想（18.5–24）: ' + ideal;
  }
  
  document.getElementById('result').textContent = text;
  