const router = require('express').Router()
const controller = require('./controller')

router.post('/', controller.create)
router.get('/', controller.retrieve)
router.patch('/:id', controller.update)
router.post('/:id/comments', controller.addComment)
router.delete('/:gallery_id/comments/:id', controller.removeComment)

module.exports = router