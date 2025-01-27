const express = require('express')
const router = express.Router()
const { AdminRoutes } = require('./admin/admin')
const { userRoutes } = require('./user/user')

router.use('/admin', AdminRoutes)
router.use('/user', userRoutes)


module.exports = router