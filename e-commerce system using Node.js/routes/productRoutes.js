const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');


router.get('/products', ProductController.getAllProduct);
router.get('/products/productId', ProductController.getProductById);

module.exports = router;

