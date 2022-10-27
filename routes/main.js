const express = require('express');
const router = express.Router();

const { navbar, main } = require('../controllers/main');

router.get('/navbar', navbar);
router.get('/', main);

module.exports = router;
