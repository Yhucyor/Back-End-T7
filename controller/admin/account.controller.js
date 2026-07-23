const AccountAdmin = require("../../models/account-admin.model");
const bcrypt = require('bcryptjs');

module.exports.login = async (req, res) => {
  res.render('admin/pages/login', {
    pageTitle: "Đăng nhập"
  })
};

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

