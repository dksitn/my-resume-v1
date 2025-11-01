/* R9 V2.0 RWD 最終版 (整合) */
document.addEventListener('DOMContentLoaded', function() {
    
    // --- 漢堡選單 (Sidebar) 點擊邏輯 ---
    const menuIcon = document.getElementById('hamburger-icon');
    const sidebar = document.querySelector('.sidebar');

    // R7 偵錯: 確保這兩個元素都存在
    if (menuIcon && sidebar) {
        
        // R6: 監聽 ICON 的點擊事件
        menuIcon.addEventListener('click', function() {
            // R6: 切換 (Toggle) ICON 自身的 .open class (變成 X)
            menuIcon.classList.toggle('open');
            // R6: 切換 (Toggle) Sidebar 的 .open class (滑入/滑出)
            sidebar.classList.toggle('open');
        });

    } else {
        console.warn('R9 (V2.0) 警告：找不到 #hamburger-icon 或 .sidebar 元素。漢堡選單無法啟用。');
    }

    // --- 大頭貼點擊 (Profile Pic) 邏輯 ---
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        profilePic.addEventListener('click', function() {
            alert('訪客您好！這是沈廷翼的大頭照！');
        });
    } else {
        console.warn('R9 (V2.0) 警告：找不到 #profile-pic 元素。');
    }
    
}); // <-- DOMContentLoaded 結束