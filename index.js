const express = require('express');
const path = require('path'); // Thiết lập đường dẫn 
const mongoose = require('mongoose');

//Kết nối dữ liệu với MongoDB 
mongoose.connect('mongodb+srv://24110349_db_user:djnVF32osKamndlp@cluster0.hpshty4.mongodb.net/tour-management');
const Tour = mongoose.model("Tour", {
    name: String, // Trong bản ghi có phần nào thì trong này phải có phần đó 
    vehicle: String
}); 
const app = express();
const port = 3000; 

// Thiết lập views 
app.set("views", path.join(__dirname, "views")); //views ở trước không được sửa ./views chính là đường dẫn thiết lập views cho người dùng
// Chỉ định cho express engine biết templete engine mà bạn đang dùng 
app.set("view engine", "pug");

// Thiết lập các thư mục tĩnh cho dự án 
app.use(express.static(path.join(__dirname, "public")));

// app.get('/', (req, res) => {
//     res.send("Hello Trang chủ");
// })
app.get('/', (req, res) => {
    res.render("client/pages/home.pug", {
        titlePage: "Trang chủ" // Đây là 1 đối tượng 
    });
})

// app.get('/tours', (req, res) => {
//     res.send("Trang Tour du lịch"); 
// })
app.get('/tours', async (req, res) => {
    const tourList = await Tour.find({});
    console.log(tourList);
    res.render("client/pages/tour-list.pug", {
        titlePage: "Tour Du Lịch",
        tourList: tourList
    })
})

app.listen(port, () => {
    console.log("Đã nhận tính hiệu từ Web");
})

//1. Thiết lập dự án yarn init
//2. cài đặt express
//3. Cài đặt nodemon
//4. Thêm pug 
//5. Phân tách các Pug thành các thành phần với nhau 
//6. Thêm các file tĩnh vào trong dự án như css các kiểu thêm 1 thư mục là Public 
//7. Thiết lập kết nối với Database MongoDB truy cập trang Mongoose để có thể đọc tài liệu 