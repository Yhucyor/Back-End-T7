const express = require('express')
const app = express()
const port = 3000;

app.get('/', (req, res) => {
    res.send("Trang chủ");
});

app.get('/tours', (req, res) => {
    res.send("Trang Tour du lịch");
})
app.listen(port, () => {
    console.log("Đa nhận đươc tín hiệu từ máy chủ");
})