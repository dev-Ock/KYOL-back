const express = require("express");

const { joinServiceEmailCheck } = require("../controller/auth");
const { joinServiceNickCheck } = require("../controller/auth");
const { joinService } = require("../controller/auth");
const { loginService } = require("../controller/auth");

const router = express.Router();

// 회원가입;
// 1. email 중복 검사
router.post("/join/email-check", joinServiceEmailCheck);
// 2. nick 중복 검사
router.post("/join/nick-check", joinServiceNickCheck);
// 3. 최종 검사(email, nick) 후, User 모델에 저장
router.post("/join", joinService);
// 로그인
router.post("/login", loginService);

module.exports = router;

// 회원가입;
// 1. email 중복 검사
// router.post("/join/email-check", async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     console.log("POST /join/email-check 진입");
//     const exUser = await User.findOne({ where: { email } });
//     if (exUser) {
//       return res.status(303).json({
//         message: "email-check-failure-duplicated",
//       });
//     } else {
//       return res.status(202).json({
//         message: "email-check-success",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       message: "email-check-failure-Server error",
//     });
//   }
// });

// 2. nick 중복 검사
// router.post("/join/nick-check", async (req, res, next) => {
//   const { nick } = req.body;
//   try {
//     if (!nick) {
//       return res.status(400).json({
//         message: "no-nick",
//       });
//     }
//     let blank = /\s/g;
//     if (nick.match(blank)) {
//       return res.status(400).json({
//         message: "nick-is-null",
//       });
//     }
//     const exUser = await User.findOne({ where: { nick } });
//     if (exUser) {
//       return res.status(400).json({
//         message: "nick-check-failure-duplicated",
//       });
//     } else {
//       return res.status(202).json({
//         message: "nick-check-succeess",
//       });
//     }
//   } catch (err) {
//     console.error(error);
//     return res.status(500).json({
//       message: "nick-check-failure-Server error",
//     });
//   }
// });

// 3. 최종 검사(email, nick) 후, User 모델에 저장
// router.post("/join", async (req, res, next) => {
//   const { email, nick, password } = req.body;
//   try {
//     console.log("POST /join 최종 진입");
//     const exUser1 = await User.findOne({ where: { email } });
//     const exUser2 = await User.findOne({ where: { nick } });
//     if (exUser1) {
//       return res.status(303).json({
//         message: "email-check-failure-duplicated",
//       });
//     }
//     if (exUser2) {
//       return res.status(303).json({
//         message: "nick-check-failure-duplicated",
//       });
//     }

//     const hash = await bcrypt.hash(password, 12);
//     const user = await User.create({
//       email,
//       nick,
//       password: hash,
//     });
//     // 가입할 때 currentShipImage로 rocket0.png을 default로 받으므로 Spaceship 모델에 관계커리로 추가한다.
//     const spaceship = await Spaceship.create({
//       shipName: user.currentShipImage,
//     });
//     await user.addSpaceship(spaceship);
//     return res.status(200).json({
//       message: "join-success",
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "join-failure-Server error",
//     });
//   }
// });

// 로그인
// router.post("/login", async (req, res, next) => {
//   const { email, password } = req.body;
//   try {
//     const exUser = await User.findOne({ where: { email } });
//     if (!exUser) {
//       return res.status(401).json({
//         // 401 Unauthorized(권한 없음)
//         message: "login-failure",
//       });
//     } else {
//       const result = await bcrypt.compare(password, exUser.password);
//       if (!result) {
//         return res.status(401).json({
//           message: "login-failure",
//         });
//       } else {
//         const token = jwt.sign(
//           {
//             id: exUser.id,
//             email: exUser.email,
//             nick: exUser.nick,
//           },
//           process.env.JWT_SECRET,
//           {
//             expiresIn: "6000000m",
//             issuer: "KYOL",
//           }
//         );
//         return res.status(201).json({
//           message: "토큰이 발급되었습니다",
//           token,
//           user: exUser,
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "login-failure",
//     });
//   }
// });
