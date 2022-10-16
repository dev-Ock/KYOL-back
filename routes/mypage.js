const express = require("express");
const { verifyToken } = require("./middlewares");
const { User, Spaceship, Scoredata } = require("../models");

const router = express.Router();

/*
  프로필 : 
  사용자의 현재 우주선 img, 내가 구매한 우주선 list, nickname, cash, 
  순위조회(Scoredata DB에서 score 기준 1~100위 안에 있으면 순위 보여준다.) 
*/
router.get("/", verifyToken, async (req, res, next) => {
  try {
    const profile = await User.findOne({
      // where: { id: req.headers.userid },
      where: { id: req.decoded.id },
      include: [
        {
          model: Scoredata,
          order: [["score", "DESC"]],
          limit: 100, // Score DB에서 score 컬럼을 내림차순 정렬하고 100위 안에 used.id 일치하는 score 점수들을
        },
        {
          model: Spaceship,
          attribute: ["shipName"],
        },
      ],
    });
    res.status(200).json({
      message: "get /mypage - success",
      user: profile,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});


// 회원정보수정(user테이블 전체에서 nickname 중복되는 게 없다면,  password)
router.put("/auth-update", verifyToken, async (req, res, next) => {
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
router.delete("/auth-delete", verifyToken, async (req, res, next) => {
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

module.exports = router;
