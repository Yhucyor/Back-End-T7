const router = require('express').Router();
const multer  = require('multer');
const upload = multer();

const categoryController = require('../../controller/admin/category.controller.js')
router.get('/list', categoryController.list)
router.get('/create', categoryController.create)
router.post('/create', upload.single('avatar'), categoryController.createPost)
module.exports = router;