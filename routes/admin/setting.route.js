const router = require('express').Router();
const settingController = require('../../controller/admin/setting.controller.js')

router.get('/list', settingController.list)
router.get('/website-info', settingController.websiteInfo)
router.get('/account-admin/list', settingController.accountAdminList)
router.get('/account-admin/create', settingController.accountAdminCreate)

module.exports = router;