const express = require("express");
const User = require("../models/user");
const router = express.Router();

// 상점페이지로 들어가면, 구매할 수 있는 상품리스트와 현재 보유골드를 보여준다.
// => DB 를 조회해서 해당 값을 불러온다 (User)
router.get("/", async (req, res, next) => {
  console.log("GET /SHOP 완료");
  try {
    // const order = req.body.picked;
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
