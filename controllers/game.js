const User = require("../models/user");
const { Spaceship } = require("../models");
const { Scoredata } = require("../models");

exports.gearPage = async (req, res, next) => {
  try {
    console.log("GET /game/gear 진입");
    const user = await User.findOne({
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.gameResultUpdate = async (req, res, next) => {
  console.log("PUT /game/update 진입");
  const { gold, usedship, score } = req.headers;
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
  } catch (error) {
    console.error(error);
    next(error);
  }
};
