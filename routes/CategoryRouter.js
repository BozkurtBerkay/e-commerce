const router = require('express').Router()
const CategoryController = require('../controllers/CategoryController')
const Auth = require('../middleware/Auth')
const AuthAdmin = require('../middleware/AuthAdmin')


router.route('/category')
    .get(CategoryController.getCategories)
    .post(Auth, AuthAdmin, CategoryController.createCategory)

router.route('/category/:id')
    .delete(Auth, AuthAdmin, CategoryController.deleteCategory)
    .put(Auth, AuthAdmin, CategoryController.updateCategory)


module.exports = router