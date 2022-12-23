const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { shop, purchase } = require(`../controllers/shop`);

router.get("/", verifyToken, shop); // 상점 페이지 회원정보 조회
router.post("/purchase", verifyToken, purchase); // 구매한 사항 update

module.exports = router;
