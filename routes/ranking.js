const express = require('express');
const router = express.Router();

const { ranking } = require(`../controllers/ranking`);

router.get('/', ranking);

module.exports = router;
