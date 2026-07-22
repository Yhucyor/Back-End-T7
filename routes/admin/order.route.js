const router = require('express').Router();
const orderController = require('../../controller/admin/order.controller.js')

router.get('/list', orderController.list)
router.get('/edit', orderController.edit)

module.exports = router;