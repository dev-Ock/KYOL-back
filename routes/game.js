const express = require("express");
// const verifyToken = require("./middlewares");
const Spaceship = require("../models/spaceship");
const User = require("../models/user");

const router = express.Router();

// 사용자 정보, 사용자가 보유하고 있는 우주선 목록 등 get
router.get("/", async (req, res, next) => {
  try {
    console.log("GET /game");
    const spaceshipList = await Spaceship.findAll({
      where: { id: req.user.id },
    });
    const userDetail = await User.findAll({
      where: { id: req.user.id },
    });
    res.status(200).json({
      success: true,
      data: [spaceshipList, userDetail],
      message: "success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 현재 장착하고 있는 우주선 img, 획득한 score, gold 등 post
router.post("/");

module.exports = router;
