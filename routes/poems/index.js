const router = require('express').Router()
const controller = require('./controller')

router.get('/retrieve', controller.retrieve)
router.post('/:id/comments', controller.addComment)

module.exports = router