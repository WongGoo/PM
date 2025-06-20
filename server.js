const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

// 初始化数据文件
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({
        products: [],
        registrations: []
    }, null, 2));
}

// 中间件
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 设置默认主页
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ui-code-2025-06-19T02-37-26-947Z.html'));
});

// API路由
app.get('/api/products', (req, res) => {
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    res.json(data.products);
});

app.post('/api/register', (req, res) => {
    const { name, phone, wechat } = req.body;
    const data = JSON.parse(fs.readFileSync(DATA_FILE));
    
    data.registrations.push({
        name,
        phone,
        wechat,
        date: new Date().toISOString()
    });
    
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true });
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});