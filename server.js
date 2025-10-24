const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000; 

// 服務根目錄中的所有靜態檔案
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Resume Website is Ready for Visitors!');
});