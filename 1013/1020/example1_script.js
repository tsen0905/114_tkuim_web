// example1_script.js

// 1) 顯示提示窗（頁面載入時會跳出）
alert('歡迎來到 JavaScript！');

// 2) 在 Console 顯示訊息
console.log('Hello JavaScript from console');

// 3) 在頁面指定區域輸出文字
var el = document.getElementById('result');
el.textContent = '這行文字是由外部 JS 檔案寫入的。';

var yourName = '劉姵岑';       
var yourStudentId = '412630930';

el.textContent += '\n姓名：' + yourName + '，學號：' + yourStudentId;

var btn = document.getElementById('myBtn');
if (btn) {
  btn.addEventListener('click', function() {
    console.log('button clicked');
    alert('你按了按鈕！');
  });
}










