const express = require('express')
const router = express.Router()
const postController = require('../controllers/post.controller')
const checkAuthMiddleware = require('../middleware/check-auth')

router.post('/', postController.createPost)
router.get('/', postController.fetchPosts)
router.put('/:id', postController.updatePost)
router.get('/:id', postController.fetchPostById)
router.delete('/:id', postController.deletePost)


router.post('/save-post', checkAuthMiddleware.checkAuth, postController.createPost)
//router.post('/saving-post', checkAuthMiddleware.checkAuth, postController.savingPost)
//router.post('/create-post', checkAuthMiddleware.checkAuth, postController.savingPost)
// router.put('/update-post', checkAuthMiddleware.checkAuth, postController.login)
// router.patch('/patch-post', checkAuthMiddleware.checkAuth, postController.signingUp)

module.exports = router

