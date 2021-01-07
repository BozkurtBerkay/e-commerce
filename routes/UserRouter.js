const router = require('express').Router()
const UserController = require('../controllers/UserController')
const Auth = require('../middleware/Auth')

router.post('/register', UserController.register)

router.post('/login', UserController.login)

router.get('/logout', UserController.logout)

router.get('/infor', Auth,  UserController.getUser)

router.patch('/addcart', Auth, UserController.addCart)

router.get('/history', Auth, UserController.history)

router.get('/refresh_token', UserController.refreshToken)

module.exports = router