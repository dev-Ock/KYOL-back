const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    console.log("hi");
    res.status(200);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;