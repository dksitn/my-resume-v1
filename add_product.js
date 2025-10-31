document.addEventListener('DOMContentLoaded', function() {
    // R6: 抓取 HTML 表單 和狀態訊息的「鉤子」
    const form = document.getElementById('add-product-form');
    const statusMessage = document.getElementById('status-message');

    // R6 關鍵：這是你(學員) V3.2 (Create) 的 n8n API 的「生產網址」！
    // ⚠️⚠️⚠️ R6 緊急提醒：請「立刻」把下面的 URL 換成你(學員)在 Turn 63 複製的 V3.2 Webhook Production URL！⚠️⚠️⚠️
    const apiUrl = "https://primary-production-76a77.up.railway.app/webhook/ecdf6ab1-35e5-4414-98f6-047fbb4a5e84"; // 例如：https://.../webhook/create-product

    // R6: 在表單上安裝一個「提交 (submit)」事件監聽器
    form.addEventListener('submit', function(event) {
        // R6: 阻止表單的「預設」提交行為 (這會導致頁面刷新)
        event.preventDefault(); 

        // R6: 顯示「處理中...」
        statusMessage.textContent = '正在新增商品...';
        statusMessage.style.color = 'orange';

        // R6: 從表單的欄位中「抓取」使用者輸入的值
        const formData = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            price: parseInt(document.getElementById('price').value, 10), // R6: 價格轉成數字
            image_url: document.getElementById('image_url').value,
            category_id: parseInt(document.getElementById('category_id').value, 10) // R6: ID 轉成數字
        };

        // R6 關鍵：使用 fetch() 呼叫 V3.2 API
        fetch(apiUrl, {
            method: 'POST', // R6 關鍵：我們(Gemini 團隊)要用 POST 發送資料
            headers: {
                'Content-Type': 'application/json' // R6 關鍵：告訴 n8n 我們(Gemini 團隊)發送的是 JSON
            },
            body: JSON.stringify(formData) // R6 關鍵：將 JS 物件轉換成 JSON 字串發送
        })
        .then(response => {
            // R7 偵錯：檢查 API 是否成功 (HTTP 狀態碼 200-299)
            if (!response.ok) {
                // 如果失敗，拋出錯誤，讓 .catch() 去接
                throw new Error(`API 請求失敗，狀態碼：${response.status}`);
            }
            // 如果成功，解析回傳的 JSON (應該是 [{"count":1}])
            return response.json(); 
        })
        .then(data => {
            // R6: 在前端顯示「新增成功」
            console.log('API 回應:', data); // R7: 在 F12 Console 印出 API 回應，方便偵錯
            statusMessage.textContent = '商品新增成功！';
            statusMessage.style.color = 'green';
            form.reset(); // R6: 清空表單
        })
        .catch(error => {
            // R7 偵錯：如果 fetch 或 API 失敗
            console.error('新增商品失敗:', error);
            statusMessage.textContent = `新增商品失敗：${error.message} (請檢查 n8n Executions)`;
            statusMessage.style.color = 'red';
        });
    });
});