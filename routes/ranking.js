const express = require("express");
const { verifyToken } = require("./middlewares");
const Score = require("../models/score");
const User = require("../models/user");
const router = express.Router();

// 랭킹을 조회하면 랭킹표에 나타낼 점수와 유저의 아이콘을 보여준다.
// => DB 를 조회해서 해당 값을 불러온다 (Score, User)
router.get("/", verifyToken, async (req, res, next) => {
  console.log("GET /ranking 완료");
  try {
    const topRanking = await Score.findAll({
      order: [["score", "DESC"]],
      limit: 10,
    });
    const weeklyRanking = await Score.findAll({});

    const userDetail = await User.findAll({
      where: { id: req.headers.userid },
    });
    const result = { getScore, userDetail };
    res
      .status(200)
      .json({ success: true, data: result, message: "get /ranking - success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
