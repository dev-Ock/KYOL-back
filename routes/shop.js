const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Spaceship } = require("../models");

const router = express.Router();

// 상점페이지로 들어가면, 구매할 수 있는 상품리스트와 현재 보유골드를 보여준다.
// => DB 를 조회해서 해당 값을 불러온다 (User)
router.get("/", verifyToken, async (req, res) => {
  console.log("GET /SHOP 완료");
  try {
    // const order = req.body.picked;
    // const getScore = await Scoredata.findOne({
    //   where: { id: req.user.id },
    // });
    // const userDetail = await User.findAll({
    //   where: { id: req.user.id },
    // });
    const user = await User.findOne({
      where: { id: req.headers.userid },
    });
    const spaceship = await Spaceship.findAll({
      where: { id: req.headers.userid },
    });
    const result = { user, spaceship };

    res
      .status(200)
      .json({ success: true, data: result, message: "GET /shop - success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/* shop에서 구매할 우주선을 선택하면 사용자의 현재 gold와 선택한 우주선의 금액 그리고 그 둘의 차를 계산한 금액이 모달창으로 뜨고, 모달창에서 '구매'버튼을 클릭하면, POST('/shop') request 옴.  
1. User테이블의 gold는 update 
2. Spaceship테이블에는 내역 추가 
*/
router.post("/", verifyToken, async (req, res, next) => {
  const gold = User.findOne({ where: { id: req.headers.userid } });
  const { selectedShip } = req.body;
});

/*

사용자가 상점에서 구매할 아이템을 선택했을 때, 현재 가지고 있는 


*/

module.exports = router;
