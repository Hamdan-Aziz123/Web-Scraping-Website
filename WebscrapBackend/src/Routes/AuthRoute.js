const express = require('express');
const router = express.Router();

const authController = require('../Controllers/AuthController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.login);
router.post('/googlelogin', authController.googleLogin);
router.post('/signup', authController.signup);
router.post('/refresh-token', authMiddleware.refreshToken);
router.post('/forgetpassword', authController.forgetPassword);
router.put('/resetpassword', authController.resetPassword);

module.exports = router;