const express = require('express');
const router = express.Router();

const checkoutController = require('../Controllers/checkoutController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/checkout', authMiddleware.verifyToken, checkoutController.checkout);

module.exports = router;