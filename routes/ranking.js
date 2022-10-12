const express = require("express");
const Score = require("../models/score");
const User = require("../models/user");
const router = express.Router();

// 랭킹을 조회하면 랭킹표에 나타낼 점수와 유저의 아이콘을 보여준다.
// => DB 를 조회해서 해당 값을 불러온다 (Score, User)
router.get("/", async (req, res, next) => {
  console.log("ranking get");
  try {
    // const getScore = await Score.findOne({
    //   where: { id: req.user.id },
    // });
    // const userDetail = await User.findAll({
    //   where: { id: req.user.id },
    // });
    // res.status(200).json({ success: true, data: getScore, message: "success" });
    // res
    //   .status(200)
    //   .json({ success: true, data: userDetail, message: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
