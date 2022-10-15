const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Spaceship, Scoredata } = require("../models");

const router = express.Router();

/*
  프로필 : 
  사용자의 현재 우주선 img, 내가 구매한 우주선 list, nickname, cash, 
  순위조회(Scoredata DB에서 score 기준 1~100위 안에 있으면 순위 보여준다.) 
*/
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const profile = await User.findOne({
      // where: { id: req.headers.userid },
      where: { id: req.decoded.id },
      include: [
        {
          model: Scoredata,
          order: [["score", "DESC"]],
          limit: 100, // Score DB에서 score 컬럼을 내림차순 정렬하고 100위 안에 used.id 일치하는 score 점수들을
        },
        {
          model: Spaceship,
          attribute: ["shipName"],
        },
      ],
    });
    res.status(200).json({
      message: "get /mypage - success",
      user: profile,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
