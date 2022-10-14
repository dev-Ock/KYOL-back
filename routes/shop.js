const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Spaceship } = require("../models");

const router = express.Router();

// 상점페이지로 들어가면, 현재 보유한 골드량과 우주선 목록을 보여주고, 상점의 우주선 상품 리스트를 띄어준다. 이를 위해 로그인한 사용자의 정보와 관계커리를 이용한 보유 우주선 목록(shipName)을 srver에서 보내준다.
router.get("/", verifyToken, async (req, res) => {
  console.log("GET /SHOP 완료");
  try {
    const user = await User.findOne({
      where: { id: req.headers.userid },
      include: [
        {
          model: Spaceship,
          attribute: ["shipName"],
        },
      ],
    });

    res
      .status(200)
      .json({ success: true, data: user, message: "GET /shop - success" });
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

module.exports = router;
