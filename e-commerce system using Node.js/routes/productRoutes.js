const express = require('express');
const router = express.Router();
const ProductController = require('../controller/productController');


router.post('/products', ProductController.createProduct);
router.put('/products/:productId', ProductController.updateProduct);
router.delete('/products/:productId', ProductController.deleteProduct);

router.post('/products/:productId/variants', ProductController.addvariant);
router.put('/products/:productId/variants/:variantId', ProductController.updatevariant);
router.delete('/products/:productId/variants/:variantId', ProductController.deletevariant);

router.get('/products', ProductController.getAllProduct);
router.get('/products/productId', ProductController.getProductById);

module.exports = router;

