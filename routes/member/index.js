const router = require('express').Router()
const controller = require('./controller')

router.post('/login', controller.login)
router.post('/register', controller.register)
router.post('/profile', controller.profile)
router.put('/profile', controller.editProfile)

module.exports = router