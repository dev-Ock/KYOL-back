const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const requestUser = req.body;
  try {
    const checkUser = await User.findOne({
      where: { email: requestUser.email },
    });
    if (!checkUser) {
      return res.status(401).json({
        code: 401,
        message: "failure-notUser",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser.id,
        nick: checkUser.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30m", // 30분
        issuer: "KYOL",
      }
    );
    return res.json({
      code: 200,
      message: "토큰이 발급되었습니다",
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "서버 에러",
    });
  }
});

module.exports = router;
