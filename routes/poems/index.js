const router = require('express').Router()
const controller = require('./controller')

router.get('/retrieve', controller.retrieve)
router.post('/comments', controller.addComment)

module.exports = router