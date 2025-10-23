
// (R6.2.5 DOM 操作：選取)
// 步驟一：告訴 JS (大腦)，去「抓取」那個 id 叫做 'profile-pic' 的 HTML 元素
//         並把它存在一個叫做「profilePic」的「變數 (盒子)」裡。
const profilePic = document.getElementById('profile-pic');

// (R6.2.5 事件監聽)
// 步驟二：在「profilePic」(大頭貼) 上，安裝一個「事件監聽器」
//         告訴它：「嘿！請你開始『監聽 (listen)』一個『點擊 (click)』事件...」
profilePic.addEventListener('click', function() {
    // 步驟三：「...一旦『點擊』真的發生了，就執行『這個匿名函數 (function)』裡面的程式碼...」
    // (R6.2) 彈出一個「警告 (alert)」視窗，內容是 '你好！'
    alert('訪客您好！這是沈廷翼的大頭照！');
}); // <--- addEventListener 結束
