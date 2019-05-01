const router = require('express').Router()
const controller = require('./controller')

router.get('/retrieve', controller.retrieve)

module.exports = router