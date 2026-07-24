const express = require('express');
const path = require('path'); // Thiết lập đường dẫn 

require('dotenv').config(); // Thêm thư viện DotENV để ẩn dữ liệu nhạy cảm 
const variableConfig = require('./config/variable');

const cookieParser = require('cookie-parser')

const app = express();
const port = 3000; 

// Thiết lập views 
app.set("views", path.join(__dirname, "views")); //views ở trước không được sửa ./views chính là đường dẫn thiết lập views cho người dùng
app.set("view engine", "pug"); // Chỉ định cho express engine biết templete engine mà bạn đang dùng 

// Thiết lập kết nối Database
const database = require('./config/database');
database.connect();

// Thiết lập các thư mục tĩnh cho dự án 
app.use(express.static(path.join(__dirname, "public")));

// Tạo biến toàn cục trong file PUG
app.locals.pathAdmin = variableConfig.pathAdmin;

// Tạo biến toàn cục trong file BackEnd 
global.pathAdmin = variableConfig.pathAdmin;

// Sử dụng Cookie-Parser
app.use(cookieParser());
// Thiết lập Route 
const adminRoutes = require('./routes/admin/index.route');
const routeClient = require('./routes/client/index.route');

// Cho phép gửi dữ liệu dạng json
app.use(express.json());

// app.get('/', routeClient); Sử dụng cái này thì bị lỗi 
app.use(`/${variableConfig.pathAdmin}`, adminRoutes);
app.use('/', routeClient);

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
//8. Thêm thư viện Dotenv và ẩn dữ liệu nhạy cảm
//9. Thực hiện tách theo mô hình MVC 
//10. Thực hiện tách theo mô hình Model 
//11. Thêm thư mục config là cấu hình cơ sở dữ liệu DataBase
// taskkill /F /IM node.exe
//12. Thêm tính năng đăng kí và kết nối DB
//13. BCrypt để mã hóa dữ liệu 
//14. Thêm thư viện Joi để Validate dữ liệu đầu vào
//15. Thêm tính năng đăng nhập compare bằng bcrypt
//16. Thêm thư viện jsonwebtoken để tăng bảo mật 
//17. Tính năng đăng nhập và đăng xuất Token
//18. Tạo đường dẫn bảo mật - cần thư viện Cookie Parser
// bên Backend có thể lấy mà không cần thư viện nhưng phải phân tách ra nên sử dụng thư viện cho nhanh 
