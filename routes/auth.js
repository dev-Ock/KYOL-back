const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// 회원가입;
// 1. emaail 중복 검사
router.post("/join/email-check", async (req, res, next) => {
  const { email } = req.body;
  try {
    console.log("POST /join/email-check 진입");
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(303).json({
        message: "email-check-failure-duplicated",
      });
    } else {
      return res.status(202).json({
        message: "email-check-succeess",
      });
    }
  } catch (err) {
    console.error(error);
    return res.status(500).json({
      message: "email-check-failure-Server error",
    });
  }
});

// 2. nick 중복 검사
router.post("/join/nick-check", async (req, res, next) => {
  const { nick } = req.body;
  try {
    console.log("POST /join/nick-check 진입");
    const exUser = await User.findOne({ where: { nick } });
    if (exUser) {
      return res.status(303).json({
        message: "nick-check-failure-duplicated",
      });
    } else {
      return res.status(202).json({
        message: "nick-check-succeess",
      });
    }
  } catch (err) {
    console.error(error);
    return res.status(500).json({
      message: "nick-check-failure-Server error",
    });
  }
});

// 3. 최종 검사(email, nick) 후, User 모델에 저장
router.post("/join", async (req, res, next) => {
  // console.log("POST /join req.body : ", req.body);
  // console.log("POST /join req.body.email : ", req.body.email);
  const { email, nick, password } = req.body;
  try {
    console.log("POST /join 최종 진입");
    const exUser1 = await User.findOne({ where: { email } });
    const exUser2 = await User.findOne({ where: { nick } });
    if (exUser1) {
      return res.status(303).json({
        message: "email-check-failure-duplicated",
      });
    }
    if (exUser2) {
      return res.status(303).json({
        message: "nick-check-failure-duplicated",
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
      return res.status(401).json({
        // 401 Unauthorized(권한 없음)
        message: "login-failure",
      });
    } else {
      const result = await bcrypt.compare(password, exUser.password);
      if (!result) {
        return res.status(401).json({
          message: "login-failure",
        });
      } else {
        const token = jwt.sign(
          {
            id: exUser.id,
            email: exUser.email,
            nick: exUser.nick,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "6000000m",
            issuer: "KYOL",
          }
        );
        return res.status(201).json({
          message: "토큰이 발급되었습니다",
          token,
          user: exUser,
        });
      }
    }
  } catch (error) {
    console.error(error);
    // return next(error);
    return res.status(500).json({
      message: "login-failure",
    });
  }
});

// 로그아웃
// router.get("/logout", (req, res) => {
//   console.log(GET / auth / logout);
//   req.logout();
//   req.session.destroy();
//   return res.status(200).json({
//     message: "logout-success",
//   });
// });

module.exports = router;
