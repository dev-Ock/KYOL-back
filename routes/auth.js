const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { verifyToken } = require("./middlewares");

const router = express.Router();

// 회원가입;
router.post("/join", async (req, res, next) => {
  // console.log("POST /join req.body : ", req.body);
  // console.log("POST /join req.body.email : ", req.body.email);
  const { email, nick, password } = req.body;
  try {
    console.log("회원가입 POST /join 진입");
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

// 회원정보수정(user테이블 전체에서 nickname 중복되는 게 없다면,  password)
router.put("/update", verifyToken, async (req, res, next) => {
  try {
    console.log("PUT /auth/update 진입");
    const { nick, password } = req.body;
    const sameNick = await User.findOne({ where: { nick: nick } });
    // 입력한 nick이나 password가 있다면
    if (nick || password) {
      // 입력한 nick이 있다면
      if (nick) {
        // 입력한 nick이 DB에 일치하는 것이 없다면
        if (!sameNick) {
          await User.update(
            { nick: nick },
            // { where: { id: req.headers.userid } }
            { where: { id: req.decoded.id } }
          );
        }
        // 입력한 nick이 DB에 일치하는 것이 있다면
        else
          return res.status(400).json({
            message: "unavailable nickname",
          });
      }
      if (password) {
        const newPassword = await bcrypt.hash(password, 12);
        User.update(
          {
            password: newPassword,
          },
          // { where: { id: req.headers.userid } }
          { where: { id: req.decoded.id } }
        );
      }
      const user = await User.findOne(
        { where: { id: req.decoded.id } },
        { attribues: ["nick"] }
      );
      return res.status(201).json({
        message: "update-success",
        data: user,
      });
    }
    // 입력한 nick이나 password가 없다면
    else
      return res.status(400).json({
        message: "no nick & no password",
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "update-failure",
    });
  }
});

// 회원탈퇴
router.delete("/delete", verifyToken, async (req, res, next) => {
  try {
    // await User.destroy({ where: { id: req.headers.userid } });
    await User.destroy({ where: { id: req.decoded.id } });
    return res.status(200).json({
      message: "delete-success",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "delete-failure",
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
