const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Scoredata, Spaceship } = require("../models");

const router = express.Router();

/*
GET /game

1. nick
2. currentShipImage
3. 보유하고 있는 우주선
보내기

POST /game

1. currentShipImage
2. score
3. gold
*/
// 게임 시작할 때, 사용자 정보, 사용자가 보유하고 있는 우주선 목록 등 get
router.get("/gear", verifyToken, async (req, res, next) => {
  try {
    console.log("GET /game 진입");
    const user = await User.findOne({
      // where: { id: req.headers.userid },
      where: { id: req.decoded.id },
      attributes: ["nick", "currentShipImage"],
      include: [
        {
          model: Spaceship,
          attributes: ["shipName"],
        },
      ],
    });

    res.status(200).json({
      success: true,
      data: user,
      message: "get /game - success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 현재 장착하고 있는 우주선(spaceship), 획득한 score, gold 등 post
// spaceship을 User테이블 currentShipImage 컬럼과 Scoredata usedShip 컬럼에 각각 update해야 한다. Scoredata usedShip은 점수와 함께 남길 기록용. 한 사용자가 score 기록을 여러 번 남길 수 있다. User의 currentShipImage는 게임할 때, 상점 갈 때 필요.
router.put("/update", verifyToken, async (req, res, next) => {
  console.log("PUT /update 진입");
  // console.log("req.headers : ", req.headers);
  const { gold, usedship, score } = req.headers;
  console.log("req.header: ", req.headers);
  try {
    const oriGold = await User.findOne({
      where: { id: req.decoded.id },
      attributes: ["gold"],
    });

    const resultGold = parseInt(oriGold.dataValues.gold) + parseInt(gold);
    const realScore = parseInt(score);

    await User.update(
      { gold: resultGold, currentShipImage: usedship },
      { where: { id: req.decoded.id } }
    );

    console.log("realscore : ", realScore);
    console.log("resultgold : ", resultGold);
    console.log("usedship : ", usedship);
    console.log("req.decoded.nick : ", req.decoded.nick);
    console.log("req.decoded.id : ", req.decoded.id);

    await Scoredata.create({
      nick: req.decoded.nick,
      score: realScore,
      usedShip: usedship,
      UserId: req.decoded.id,
    });

    res.status(200).json({
      message: "game-update-success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
