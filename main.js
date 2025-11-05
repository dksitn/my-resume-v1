/* ----- R9 V7.0 (RWD/Sidebar) 最終版 ----- */
// (R9 註：我已「刪除」所有 V5.0 混淆的 Supabase 程式碼)

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 漢堡選單 (Sidebar) 點擊邏輯 (R9 V2.0 RWD) ---
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

    // --- 大頭貼點擊 (Profile Pic) 邏輯 (R9 V2.0 RWD) ---
    const profilePic = document.getElementById('profile-pic');
    if (profilePic) {
        profilePic.addEventListener('click', function() {
            alert('訪客您好！這是沈廷翼的大頭照！');
        });
    } else {
        console.warn('R9 (V2.0) 警告：找不到 #profile-pic 元素。');
    }

    // --- SPRINT-10.2: 啟動 Headless CMS 內容載入 (R9 註：這是 V2.0 的功能，予以保留) ---
    // R7: 檢查當前頁面是否有對應的內容容器，並呼叫載入函式
    
    // (R9 註：這段 Supabase 程式碼是「乾淨」且「獨立」的，但它也犯了 V5.0 的語法錯誤)
    // (R9 註：我將「一併修正」第 13 行 的 Bug)

    // 1. 初始化 Supabase Client (❗❗ R9 V7.0 語法修正 ❗❗)
    const SUPABASE_URL = 'https://rxsmiinxcciiboxjngux.supabase.co';     // <-- 請替換為您的 Project URL
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4c21paW54Y2NpaWJveGpuZ3V4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5Nzk2MDIsImV4cCI6MjA3NzU1NTYwMn0.icPAhASfz4BK0hSFDOSc2D2bMRv_NxfTKKZUl4Pwq2Y';   // <-- 請替換為您的 anon key
    
    // 🟢 R9 修正版：使用「解構賦值」來取得 createClient 函式
    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


    /**
     * [核心功能] 動態載入 Supabase 內容的函式
     * @param {string} slug - 要抓取的文章 slug (e.g., 'methods', 'debug_log', 'pd_methods')
     * @param {string} elementId - 要將內容填入的 HTML 元素 ID (e.g., 'methods-content')
     */
    async function loadPostContent(slug, elementId) {
        const contentElement = document.getElementById(elementId);
        if (!contentElement) {
            console.warn(`R7 警告: 找不到 ID 為 ${elementId} 的內容容器。`);
            return;
        }

        contentElement.innerHTML = '<p class="loading-message">載入中，請稍候...</p>'; // 載入提示

        try {
            // 呼叫 Supabase API：從 posts 表格中，根據 slug 抓取單一紀錄
            // (❗❗ R9 V7.0 語法修正：改用 supabaseClient)
            const { data, error } = await supabaseClient
                .from('posts')
                .select('title, content')
                .eq('slug', slug)
                .single();

            if (error && error.code !== 'PGRST116') { // PGRST116: 找不到資料
                throw error;
            }

            if (data) {
                // 成功後，將標題和內容動態渲染到 HTML
                let htmlContent = `<h1>${data.title}</h1><div class="post-content">${data.content}</div>`;
                contentElement.innerHTML = htmlContent;
            } else {
                // R7 偵錯訊息: 找不到資料時的錯誤提示
                contentElement.innerHTML = `<p class="error-message">錯誤: 找不到 slug 為 <strong>${slug}</strong> 的文章內容。</p>`;
            }

        } catch (error) {
            console.error('R7 錯誤: 抓取 Supabase 資料時發生例外:', error.message);
            contentElement.innerHTML = '<p class="fatal-error-message">內容載入失敗。請檢查 RLS、金鑰或網路連線。</p>';
        }
    }

    
    // methods.html
    if (document.getElementById('methods-content')) {
        loadPostContent('methods', 'methods-content');
    }
    
    // debug_log.html
    if (document.getElementById('debug-log-content')) {
        loadPostContent('debug_log', 'debug-log-content');
    }
    
    // pd_methods.html (您的擴展頁面)
    if (document.getElementById('pd-methods-content')) { 
        loadPostContent('pd_methods', 'pd-methods-content');
    }

}); // <-- DOMContentLoaded 結束