const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 회원가입;
router.post("/join", async (req, res, next) => {
  console.log(req.body);
  console.log(req.body.email);

  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(303).json({
        message: "join-failure-not exist User",
      });
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.status(200).json({
      message: "join-success",
    });
  } catch (error) {
    console.error(error);
    // return next(error);
    return res.status(500).json({
      message: "join-failure-Server error",
    });
  }
});

// 로그인
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (!exUser) {
      return res.status(404).json({
        message: "login-failure-notUser",
      });
    }
    if (exUser) {
      const result = await bcrypt.compare(password, exUser.password);
      if (!result) {
        return res.status(400).json({
          message: "login-failure-wrongPassword",
        });
      }
    } else {
      return res.status(404).json({
        message: "login-failure-notUser",
      });
    }
    const token = jwt.sign(
      {
        id: exUser.email,
        nick: exUser.nick,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "60m", // 30분
        issuer: "KYOL",
      }
    );
    return res.status(201).json({
      message: "토큰이 발급되었습니다",
      token,
      user: exUser,
    });
  } catch (error) {
    console.error(error);
    // return next(error);
    return res.status(500).json({
      message: "login-failure",
    });
  }
});

// 로그아웃
router.get("/logout", (req, res) => {
  console.log(GET / auth / logout);
  req.logout();
  req.session.destroy();
  return res.status(200).json({
    message: "logout-success",
  });
});

module.exports = router;
