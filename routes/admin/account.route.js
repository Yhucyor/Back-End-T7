const router = require('express').Router();
const accountController = require('../../controller/admin/account.controller')
const accountValidate = require('../../validates/account.validate')

router.get('/login', accountController.login)
router.get('/register', accountController.register)
router.post('/login', accountValidate.loginPost, accountController.loginPost) 
router.post('/register', accountValidate.registerPost, accountController.registerPost) 
// Chạy hàm trước trước khi chạy hàm accountController 
router.get('/register-initial', accountController.registerPostInitial)
router.get('/forgot-password', accountController.forgotPassword);
// OTP 
router.post('/forgot-password', accountController.forgotPasswordPost);
router.get('/otp-password', accountController.otpPassword);
router.get('/reset-password', accountController.resetPassword);

router.post('/logout', accountValidate.loginPost, accountController.logoutPost) 

module.exports = router;