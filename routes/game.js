const express = require('express');
const { verifyToken } = require('./middlewares');
const { apiLimiter } = require('./middlewares');
const { gearPage, gameResultUpdate } = require('../controllers/game');

const router = express.Router();

router.get('/gear', verifyToken, apiLimiter, gearPage);
router.put('/update', verifyToken, gameResultUpdate);

module.exports = router;
