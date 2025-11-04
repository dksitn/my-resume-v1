// 檔案名稱: i18n.js
// 職責: 專門處理靜態網頁內容的 i18n 本地化

// 1. 定義我們支援的語言 (確保 'zh-tw' 在這裡)
const SUPPORTED_LANGUAGES = ['en', 'zh-tw'];
const DEFAULT_LANGUAGE = 'en'; // 預設語言

/**
 * 2. 偵測瀏覽器語言
 * (R6 最佳實踐: 我們把它包裝成一個函式)
 */
function getBrowserLanguage() {
    // navigator.language 會回傳 'zh-TW', 'en-US', 'ja' 等
    let lang = navigator.language.toLowerCase();
    
    if (lang.includes('zh')) {
        return 'zh-tw'; // 統一處理 'zh-TW', 'zh-CN', 'zh-HK'
    }
    
    // 從 'en-us' 中取出 'en'
    const primaryLang = lang.split('-')[0];
    if (SUPPORTED_LANGUAGES.includes(primaryLang)) {
        return primaryLang;
    }
    
    // 如果都不支援，回傳預設語言
    return DEFAULT_LANGUAGE;
}

/**
 * 3. [核心] 載入語言包並更新頁面
 * (R6 最佳實踐: 這是我們的主要非同步函式)
 * @param {string} langCode - 要載入的語言代碼 (例如 'en' 或 'zh-tw')
 */
async function loadLanguage(langCode) {
    try {
        // 3.1. 使用 fetch() 去取得對應的 JSON 檔案
        const response = await fetch(`./locales/${langCode}.json`);
        if (!response.ok) {
            // R7 偵錯輔助: 如果檔案 404 找不到，會在這裡報錯
            throw new Error(`R7 偵錯: ${langCode}.json 檔案載入失敗 (404)`);
        }
        
        // 3.2. 將回應的文字 (Response) 轉為 JSON 物件
        const translations = await response.json();

        // 3.3. 找出所有帶有 [data-i18n-key] 屬性的 HTML 元素
        const elements = document.querySelectorAll('[data-i18n-key]');
        
        // 3.4. 遍歷 (Loop) 所有找到的元素
        elements.forEach(el => {
            // 讀取該元素的 'data-i18n-key' 屬性 (例如 "header.title")
            const key = el.dataset.i18nKey; 
            
            // 3.5. 從 JSON 物件中找出對應的翻譯文字
            const translation = translations[key];
            
            if (translation) {
                // 如果找到了翻譯，就更新 HTML 元素的內容
                el.textContent = translation;
            } else {
                // R7 偵錯輔U: 提醒你 HTML 和 JSON 之間的 'key' 對不上
                console.warn(`R7 警告: 在 ${langCode}.json 中找不到 '${key}' 的翻譯。`);
            }
        });

    } catch (error) {
        console.error('R7 錯誤: 無法載入語言包:', error);
        // R3 健壯性: 如果載入失敗 (例如 zh-tw.json 遺失)，就改載入預設的英文
        if (langCode !== DEFAULT_LANGUAGE) {
            console.warn(`R3 降級機制: 改為載入 ${DEFAULT_LANGUAGE} 語言包。`);
            loadLanguage(DEFAULT_LANGUAGE);
        }
    }
}

/**
 * 4. 程式啟動點 (Entry Point)
 */
function initializeI18n() {
    // 偵測語言
    const lang = getBrowserLanguage();
    // 執行載入
    loadLanguage(lang);
}

// 5. 監聽 DOM 載入完成事件，然後才啟動 i18n
// (R6 註: 這是為了確保 JavaScript 執行時，HTML 元素都已經準備好了)
document.addEventListener('DOMContentLoaded', initializeI18n);