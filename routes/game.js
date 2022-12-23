const express = require("express");
const { verifyToken } = require("../controllers/middlewares");
// const { apiLimiter } = require("../controllers/middlewares");
const { gearPage, gameResultUpdate } = require("../controllers/game");

const router = express.Router();

router.get("/gear", verifyToken, gearPage); // gear 페이지 조회(닉네임, 현재 우주선, 보유한 우주선 목록)
// router.get('/gear', verifyToken, apiLimiter, gearPage);
router.put("/update", verifyToken, gameResultUpdate); // game 종료 후 update

module.exports = router;
