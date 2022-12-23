const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/middlewares");

const {
  pwcompare,
  profile,
  nickupdate,
  pwupdate,
  authdelete,
} = require("../controllers/mypage");

router.post("/pw-compare", verifyToken, pwcompare); // password 확인
router.get("/", verifyToken, profile); // 회원정보 조회
router.put("/nick-update", verifyToken, nickupdate); // nickname update
router.put("/pw-update", verifyToken, pwupdate); // password update
router.delete("/auth-delete", verifyToken, authdelete); // 회원 삭제

module.exports = router;
