const router = require('express').Router();
const accountController = require('../../controller/admin/account.controller')

router.get('/login', accountController.login)
router.get('/register', accountController.register)
module.exports = router;