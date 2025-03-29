const express = require('express');
const router = express.Router();

const ConatctController = require('../Controllers/ContactController');


router.post('/saveMessage', ConatctController.saveMessage);

module.exports = router;