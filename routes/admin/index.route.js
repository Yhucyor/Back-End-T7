const router = require('express').Router();
const accountRoutes = require("./account.route");
const dashboardRoutes = require("./dashboard.route");
const categoryRoutes = require("./category.route");
const tourRoutes = require("./tour.route");
const orderRoutes = require("./order.route");
const userRoutes = require("./user.route");
const contactRoutes = require("./contact.route");
const settingRoutes = require("./setting.route");
const profileRoutes = require("./profile.route");

// Ham trung gian 
const authMiddleware = require('../../middlewares/admin/auth.middleware')

router.use('/account', accountRoutes)
router.use('/dashboard', authMiddleware.verifyToken, dashboardRoutes)
router.use('/category', categoryRoutes)
router.use('/tour', tourRoutes)
router.use('/order', orderRoutes)
router.use('/user', userRoutes)
router.use('/contact', contactRoutes)
router.use('/setting', settingRoutes)
router.use('/profile', profileRoutes)
router.get("/*path", authMiddleware.verifyToken, (req, res) => {
    res.render("admin/pages/error-404"), {
        pageTitle: "404 Not Found"
    }
})

module.exports = router;