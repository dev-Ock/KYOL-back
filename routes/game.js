const express = require("express");
const Spaceship = require("../models/spaceship");
const User = require("../models/user");
const router = express.Router();

router.get("/", async (req, res, next) => {
  console.log("game get");
  try {
    const spaceshipList = await Spaceship.findAll({
      where: { id: req.user.id },
    });
    const userDetail = await User.findAll({
      where: { id: req.user.id },
    });
    res
      .status(200)
      .json({ success: true, data: spaceshipList, message: "success" });
    res
      .status(200)
      .json({ success: true, data: userDetail, message: "success" });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
