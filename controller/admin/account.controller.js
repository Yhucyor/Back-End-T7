const AccountAdmin = require("../../models/account-admin.model");
const generateHelper = require("../../helpers/generate.helper");
const ForgotPassword = require("../../models/forgot-password.model");
const mailHelper = require("../../helpers/mail.helper");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) => {
  res.render('admin/pages/login', {
    pageTitle: "Đăng nhập"
  })
};

module.exports.loginPost = async (req, res) => {
  const {email, password, rememberPassword} = req.body;

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
  if(existAccount.status != "active"){
    res.json({
      code: "error",
      message: "Tài khoản chưa được kích hoạt"
    });
    return;
  }

  // Tạo JWT 
  const token = jwt.sign(
    {
      id: existAccount._id,
      email: existAccount.email
    },
    process.env.JWT_SECURITY, // chuỗi bảo mật để mã hóa thành token 
    {
      expiresIn: rememberPassword ? '30d' : '1d' // Token có thời hạn 1 ngày 
    }
  )

  // Lưu Token vào cookie 
  res.cookie("token", token, {
    maxAge: rememberPassword? (30 * 24 * 60 * 60 * 1000) : (24 * 60 * 60 * 1000), // Token hien luc 
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

module.exports.forgotPasswordPost = async (req, res) => {
  const {email} = req.body;
  console.log(email);
  //Các bước thực hiện đổi mật khẩu
  //1. Kiểm tra Email có tồn tại không 
  const existAccount = await AccountAdmin.findOne({
    email: email
  })
  if(!existAccount){
    res.json({
      code: "error",
      message: "Email không tồn tại trong hệ thống!"
    })
    return;
  }
  //2. Kiểm tra Email đã tồn tại trong Forgot Password chưa 
  const existEmailInForgotPassword = await ForgotPassword.findOne({
    email: email
  })

  if(existEmailInForgotPassword){
    res.json({
      code: "error",
      message: "Vui lòng gửi lại sau 5p"
    })
    return;
  }
  //3. Tạo mã OTP 
  const otp = generateHelper.generateRandomNumber(6);
  console.log(otp);
  //Lưu vào OTP và Database - sau 5 phút sẽ tự động xóa 
  const newRecord = new ForgotPassword({
    email: email,
    otp: otp,
    expireAt: Date.now() + 5 * 60 * 1000
  });

  await newRecord.save();

  //4. Gửi mã OTP cho người dùng tự động 
  const subject = "Mã lấy OTP để đổi mật khẩu";
  const content = `Mã OTP của bạn là: <b style="color: green;">${otp}</b>. Có hiệu lực trong 5 phút`;
  mailHelper.sendMail(email, subject, content);

  res.json({
    code: "success",
    message: "Đã gửi mã OTP qua Email"
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