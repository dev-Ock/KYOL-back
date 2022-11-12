const express = require("express");
const { verifyToken } = require("../controllers/middlewares");
const { apiLimiter } = require("../controllers/middlewares");
const { gearPage, gameResultUpdate } = require("../controllers/game");

const router = express.Router();

router.get("/gear", verifyToken, gearPage);
// router.get('/gear', verifyToken, apiLimiter, gearPage);
router.put("/update", verifyToken, gameResultUpdate);

module.exports = router;
