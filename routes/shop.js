const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Shipdata, Spaceship } = require("../models");
// const { sequelize } = require("../models");

const router = express.Router();

// 상점페이지로 들어가면, 현재 보유한 골드량과 우주선 목록을 보여주고, 상점의 우주선 상품 리스트를 띄어준다. 이를 위해 로그인한 사용자의 정보와 관계커리를 이용한 보유 우주선 목록(shipName)을 srver에서 보내준다.
router.get("/", verifyToken, async (req, res) => {
  console.log("req.decoded : ", req.decoded);

  try {
    console.log("GET /SHOP 진입");
    const user = await User.findOne({
      // where: { id: req.headers.userid },
      where: { id: req.decoded.id },
      attributes: ["gold"],
      include: [
        {
          model: Spaceship,
          attributes: ["shipName"],
        },
      ],
    });

    // 1. 보유하고 있는 우주선인지 확인을 통해 보유하고 있지 않아서 구매가능하면 true, 이미 보유하고 있으면 불가로 false
    // (1) 로그인한 사용자의 보유한 우주선의 이름들이 포함되어있는 array
    const userShipData = await Spaceship.findAll({
      where: { userid: req.decoded.id },
      attributes: ["shipName"],
    });
    console.log("check1 : ", userShipData);

    // 로그인한 사용자의 보유한 우주선의 이름들
    const userShipName = [];

    for (i = 0; i < userShipData.length; i++) {
      userShipName.push(userShipData[i].dataValues.shipName);
    }

    // (2) Shipdata의 모든 우주선의 이름들이 포함되어있는 array
    const allShipData = await Shipdata.findAll({
      attributes: ["shipName"],
    });

    // 모든 우주선의 이름들
    const allShipName = [];

    for (i = 0; i < allShipData.length; i++) {
      allShipName.push(allShipData[i].dataValues.shipName);
    }

    // shop에 있는 우주선을 보유한 우주선 중에서 찾아서 없으면 구매가능하여 true, 불가하면 false
    // true, false를 array에 담을 예정
    const availableShip = [];

    //둘 다 array로 가정하면
    for (i = 0; i < allShipData.length; i++) {
      if (userShipName.indexOf(allShipName[i]) == -1) {
        availableShip.push(true);
      } else {
        availableShip.push(false);
      }
    }

    /////////////////////////////////////////////////////////////////////

    // 2. 보유gold와 우주선 가격을 비교하여 구매가능하면 true, 불가하면 false

    const gold = await User.findOne({
      // 로그인한 사용자의 gold량
      where: { id: req.decoded.id },
      attributes: ["gold"],
    });

    const userGold = gold.dataValues.gold;

    const allShipCostData = await Shipdata.findAll({
      // Shipdata의 모든 우주선들의 cost. 배열로 나오나??
      attributes: ["cost"],
    });

    const allShipCost = [];
    for (i = 0; i < allShipData.length; i++) {
      allShipCost.push(allShipCostData[i].dataValues.cost);
    }

    console.log("allshipcost: ", allShipCost);

    // 보유gold와 우주선 가격을 비교하여 구매가능하면 true, 불가하면 false
    // true, false를 array에 담을 예정
    const availableGold = [];

    // 각각의 경우에 대해 for문
    for (i = 0; i < allShipData.length; i++) {
      if (userGold >= allShipCost[i]) {
        await availableGold.push(true);
      } else {
        await availableGold.push(false);
      }
    }

    /////////////////////////////////////////////////////////////////////

    // 3. 보유하고 있는 우주선이 아니고(true), 살 gold도 있으면(true) -> true && true -> 결과적으로 구매가능하면 true, 그 이외의 경우는 true

    const availableResult = [];

    for (i = 0; i < allShipData.length; i++) {
      if (availableGold[i] == true && availableShip[i] == true) {
        availableResult.push(true);
      } else {
        availableResult.push(false);
      }
    }

    console.log("22###############");
    console.log("availableGold : ", availableGold); // value가 4개인지 확인하기
    console.log("availableShip : ", availableShip); // value가 4개인지 확인하기
    console.log("availableResult : ", availableResult); // value가 4개인지 확인하기
    console.log("11@@@@@@@@@@@@@");
    /////////////////////////////////////////////////////////////////////

    res.status(200).json({
      success: true,
      data: { user, availableGold, availableShip, availableResult },
      message: "GET /shop - success",
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////

/* front로부터 받아야 할 것: selectiedShip, selectedCost (shop에서 구매할 우주선 / 그 우주선의 가격)
shop에서 구매할 우주선(selectedShip)을 선택하면 사용자의 현재 gold(gold)와 선택한 우주선의 금액(selectedCost) 그리고 그 둘의 차를 계산한 금액이 모달창으로 뜨고, 모달창에서 '구매'버튼을 클릭하면, POST('/shop') request 옴.  
1. User테이블의 gold는 update 
2. Spaceship테이블에는 내역 추가 (speed,bulletNumber는 front에 각 우주선에 대한 speed, bulletNumber 정보가 있으므로 DB에 저장할 필요 없음)
*/

router.post("/purchase", verifyToken, async (req, res) => {
  try {
    // const gold = User.findOne({ where: { id: req.headers.userid } });
    const goldData = await User.findOne({
      where: { id: req.decoded.id },
      attributes: ["gold"],
    });
    const gold = goldData.dataValues.gold;
    console.log("gold: ", gold);
    const { selectedShip, selectedCost } = req.body;
    console.log("POST /purchase 진입: ", selectedCost, selectedShip);
    const afterGold = parseInt(gold) - parseInt(selectedCost); // 우주선 구매 후 남은 gold
    console.log("afterGold : ", afterGold);
    console.log("typeof afterGold", typeof afterGold);
    console.log("req.decoded.id : ", req.decoded.id);
    if (afterGold >= 0) {
      await User.update({ gold: afterGold }, { where: { id: req.decoded.id } });
      await Spaceship.create({
        shipName: selectedShip,
        UserId: req.decoded.id,
      });
      res.status(200).json({
        success: true,
        message: "purchase - success",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "purchase - failure",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
