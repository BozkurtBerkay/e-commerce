const router = require('express').Router()
const ProductController = require('../controllers/ProductController')
const Auth = require('../middleware/Auth')
const AuthAdmin = require('../middleware/AuthAdmin')


router.route('/products')
    .get(ProductController.getProducts)
    .post(Auth, AuthAdmin, ProductController.createProduct)


router.route('/products/:id')
    .delete(Auth, AuthAdmin, ProductController.deleteProduct)
    .put(Auth, AuthAdmin, ProductController.updateProduct)



module.exports = router