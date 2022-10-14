const express = require("express");
const { verifyToken } = require("./middlewares");
const Scoredata = require("../models/scoredata");
const User = require("../models/user");
const { sequelize } = require("../models");
const router = express.Router();

// 랭킹을 조회하면 랭킹표에 나타낼 점수와 유저의 아이콘을 보여준다.
// => DB 를 조회해서 해당 값을 불러온다 (Scoredata, User)
router.get("/", verifyToken, async (req, res, next) => {
  console.log("GET /ranking 완료");
  try {
    const topRanking = await Scoredata.findAll({
      order: [["score", "DESC"]],
      limit: 10,
      include: [
        {
          model: User,
          attributes: ["nick"],
        },
      ],
    });
    const weeklyRanking = await sequelize.query(
      "SELECT scoredatasRanking.score, scoredatasRanking.usedShip, scoredatasRanking.createdAt, users.nick FROM (SELECT * FROM scoredatas WHERE createdAt BETWEEN DATE_ADD (NOW(), INTERVAL -1 WEEK) AND DATE_ADD(NOW(), INTERVAL 9 HOUR) ORDER BY score desc LIMIT 10) scoredatasRanking JOIN users ON scoredatasRanking.UserId = users.id"
    );

    // const now_world_time = await sequelize.query("SELECT now()");
    // const now_seoul_time = await sequelize.query(
    //   "SELECT DATE_ADD(NOW(), INTERVAL 9 HOUR)"
    // );

    // console.log(now_world_time);
    // console.log(now_seoul_time);

    const result = { topRanking, weeklyRanking };

    res
      .status(200)
      .json({ success: true, data: result, message: "get /ranking - success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
