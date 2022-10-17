const express = require("express");
const { User } = require("../models");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("GET /main 진입");
    const user = await User.findOne({
      where: { id: req.headers.userid || null },
    });
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
