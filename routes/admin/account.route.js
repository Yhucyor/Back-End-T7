const router = require('express').Router();
const accountController = require('../../controller/admin/account.controller')
const accountValidate = require('../../validates/account.validate')

router.get('/login', accountController.login)
router.get('/register', accountController.register)
router.post('/register', accountValidate.registerPost, accountController.registerPost) 
// Chạy hàm trước trước khi chạy hàm accountController 
router.get('/register-initial', accountController.registerPostInitial)
router.get('/forgot-password', accountController.forgotPassword);
router.get('/otp-password', accountController.otpPassword);
router.get('/reset-password', accountController.resetPassword);

module.exports = router;