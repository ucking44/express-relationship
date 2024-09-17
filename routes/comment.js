const express = require('express')
const router = express.Router()
const commentController = require('../controllers/comment.controller')

router.post('/', commentController.createComment)
router.get('/', commentController.fetchComments)
router.put('/:id', commentController.updateComment)
router.get('/:id', commentController.singleComment)
router.delete('/:id', commentController.deleteComment)

//router.post('/', postController.createPost)

module.exports = router

