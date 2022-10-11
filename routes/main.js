const express = require("express");
const { User, Domain } = require("../models");

const router = express.Router();

router.get("/main", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: (req.user && req.user.id) || null },
      include: { model: Domain },
    });

    res
      .status(200)
      .json({ success: true, data: { user, domains: user && user.Domains } });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;