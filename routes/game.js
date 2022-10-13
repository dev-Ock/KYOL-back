const express = require("express");
const { verifyToken } = require("./middlewares");
const Spaceship = require("../models/spaceship");
const User = require("../models/user");

const router = express.Router();

// 사용자 정보, 사용자가 보유하고 있는 우주선 목록 등 get
router.get("/", verifyToken, async (req, res, next) => {
  try {
    console.log("GET /game 완료");
    const spaceshipList = await Spaceship.findAll({
      where: { UserId: req.headers.userid },
    });
    const userDetail = await User.findAll({
      where: { id: req.headers.userid },
    });
    const result = { spaceshipList, userDetail };
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

// 현재 장착하고 있는 우주선 img, 획득한 score, gold 등 post
/* router.post("/",verifyToken,(req,res,next)=>{

});
*/
module.exports = router;
