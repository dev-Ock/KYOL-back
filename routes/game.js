const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Scoredata, Spaceship } = require("../models");

const router = express.Router();

// 사용자 정보, 사용자가 보유하고 있는 우주선 목록 등 get
router.get("/", verifyToken, async (req, res, next) => {
  try {
    console.log("GET /game 완료");
    const spaceshipList = await Spaceship.findAll({
      where: { UserId: req.headers.userid },
    });
    const user = await User.findOne({
      where: { id: req.headers.userid },
    });
    const result = { spaceshipList, user };
    res.status(200).json({
      success: true,
      data: result,
      message: "get /game - success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 현재 장착하고 있는 우주선(spaceship), 획득한 score, gold 등 post
// spaceship을 User테이블 currentShipImage 컬럼과 Scoredata usedShip 컬럼에 각각 update해야 한다. Scoredata usedShip은 점수와 함께 남길 기록용. 한 사용자가 score 기록을 여러 번 남길 수 있다. User의 currentShipImage는 게임할 때, 상점 갈 때 필요.
router.put("/", verifyToken, async (req, res, next) => {
  const { gold, spaceship, score } = req.body;

  await User.update(
    { gold: gold, currentShipImage: spaceship },
    { whewre: { id: req.headers.userid } }
  );

  await Scoredata.update(
    { score: score, usedShip: spaceship },
    { whewre: { id: req.headers.userid } }
  );
});

module.exports = router;
