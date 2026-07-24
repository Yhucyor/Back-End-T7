const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  res.render('admin/pages/login', {
    pageTitle: "Đăng nhập"
  })
};

module.exports.loginPost = async (req, res) => {
  const {email, password} = req.body;

  const existAccount = await AccountAdmin.findOne({
    email: email
  })
  
  // Kiểm tra Email có tồn tại trong hệ thống không 
  if(!existAccount){
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    });
    return;
  }

  // Kiểm tra mật khẩu có khớp không 
  const isPassword = await bcrypt.compare(password, existAccount.password);
  if(isPassword == false){
    res.json({
      code: "error", 
      message: "Mật khẩu không đúng!"
    });
    return;
  }

  // Kiểm tra trạng thái tài khoản active thì mới cho đăng nhập
  if(existAccount.status == "active"){
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt"
    });
    return;
  }

  // Tạo JWT 
  const token = jwt.sign(
    {
      id: existAccount.id,
      email: existAccount.email
    },
    process.env.JWT_SECURITY, // chuỗi bảo mật để mã hóa thành token 
    {
      expiresIn: '1d' // Token có thời hạn 1 ngày 
    }
  )

  // Lưu Token vào cookie 
  res.cookie("token", token, {
    maxAge: 24 * 60 * 60 * 1000, // Token hien luc 
    httpOnly: true,
    sameSite: "strict" // Đúng tên miền 
  })

  console.log(email);
  console.log(password);
  
  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công"
  });
}

module.exports.register = async (req, res) => {
  res.render('admin/pages/register', {
    pageTitle: "Đăng ký"
  })
}

module.exports.registerPost = async (req, res) => {
  const {fullName, email, password} = req.body;
  console.log(req.body);
  const existAccount = await AccountAdmin.findOne({
    email: email
  })

  if (existAccount){
    res.json({
      code: "error",
      message: "Email đã tồn tại trong hệ thống!"
    })
    return;
  }

  // Mã hóa dữ liệu với Bcrypt 
  const salt = await bcrypt.genSalt(10); // Tạo ra chuổi ngẫu nhiên 
  const hashedPassword = await bcrypt.hash(password, salt);

  // Store hash in your password DB
  const newAcount = new AccountAdmin({
    fullName: fullName, 
    email: email, 
    password: hashedPassword, 
    status: "initial"
  })

  // Lưu vào Database
  await newAcount.save();
  res.json({
    code: "success",
    message: "Đăng ký tài khoản thành công"
  });
}

module.exports.registerPostInitial = async (req, res) => {
  res.render('admin/pages/register-initial', {
    pageTitle: "Tài khoản đã được khởi tạo"
  })
}
module.exports.forgotPassword = async (req, res) => {
  res.render('admin/pages/forgot-password', {
    pageTitle: "Quên mật khẩu"
  })
}

module.exports.otpPassword = async (req, res) => {
  res.render('admin/pages/otp-password', {
    pageTitle: "Nhập mã OTP"
  })
}

module.exports.resetPassword = async (req, res) => {
  res.render('admin/pages/reset-password', {
    pageTitle: "Đặt lại mật khẩu"
  })
}

module.exports.logoutPost = async (req, res) => {
  res.clearCookie("token");
  res.json({
    code: "success",
    message: "Đăng xuất thành công!"
  })
}