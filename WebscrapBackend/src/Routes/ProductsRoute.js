const express = require('express');
const router = express.Router();

const productController = require('../Controllers/ProductsController');

router.get('/getProducts', productController.getProducts);
router.get('/getUsedItems', productController.getUsedItems);
router.get('/getProduct/:ProductId', productController.getProduct);

module.exports = router;