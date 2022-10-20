const express = require("express");
const bcrypt = require("bcrypt");
const { verifyToken } = require("./middlewares");
const { User, Spaceship, Scoredata } = require("../models");

const router = express.Router();

// mypage 페이지 들어가기 전 password 검사 페이지의 password-compare 
router.post("/pw-compare", verifyToken, async(req,res,next)=>{
  try{
    console.log("POST /mypage/pw-compare 진입")
    const {password} = req.body
    console.log("password : ",password)
    const exUser = await User.findOne({where:{id:req.decoded.id}})
    if (!exUser) {
      return res.status(401).json({
        message: "no-user",
      });
    } else {
      const result = await bcrypt.compare(password, exUser.password);
      console.log("result : ",result)
      if (!result) {
        return res.status(401).json({
          message: "compare-result-false",
        })}else{
          console.log("mypage 페이지 들어가기 전 password-compare 완료")
          return res.status(200).json({
            message: "compare-result-true"
          })
        };
  }}catch(err){
    console.error(err);
    next(err);
  }
})


/*
  프로필 : 
  사용자의 현재 우주선 img, 내가 구매한 우주선 list, nickname, cash, 
  순위조회(Scoredata DB에서 score 기준 1~100위 안에 있으면 순위 보여준다.) 
*/
router.get("/", verifyToken, async (req, res, next) => {
  try {
    console.log("GET /mypage 진입");
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
          attributes: ["shipName"],
        },
      ],
    });
    console.log("프로필 정보 조회 완료")
    res.status(200).json({
      message: "get /mypage - success",
      user: profile,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 닉네임 수정
router.put("/nick-update", verifyToken, async (req, res, next) => {
  try {
    console.log("PUT /mypage/nick-update 진입");
    const {nick} = req.body;
    const sameNick = await User.findOne({ where: { nick: nick } });

      // 입력한 nick이 있다면
      if (nick) {
        // 입력한 nick이 DB에 일치하는 것이 없다면
        if (!sameNick) {
          await User.update(
            { nick: nick },
            { where: { id: req.decoded.id } }
          );
          const user = await User.findOne(
            { where: { id: req.decoded.id } },
            { attribues: ["nick"] }
          );
          console.log("nick 수정 완료")
          return res.status(201).json({
            message: "nick-update-success",
            data: user,
            })}
        // 입력한 nick이 DB에 일치하는 것이 있다면
        else
          return res.status(400).json({
            message: "unavailable nick",
          });
        }
    // 입력한 nick이 없다면
    else{
      return res.status(400).json({
        message: "no nick",
      });}
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "nick-update-server-error",
    });
  }
});

// password 수정
router.put("/pw-update", verifyToken, async (req, res, next) => {
  try {
    console.log("PUT /mypage/pw-update 진입");
    const { password } = req.body;

    // 입력한 password가 있다면
    if (password) {
      const newPassword = await bcrypt.hash(password, 12);
      User.update(
        {
          password: newPassword,
        },
        { where: { id: req.decoded.id } }
      );
      console.log("password 수정 완료")
      return res.status(201).json({
        message: "pw-update-success",
      });
    }else{
      return res.status(400).json({
        message: "no password",
      });
    }
  }catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "pw-update-server-error",
    });
  }})

  
// 회원탈퇴
router.delete("/auth-delete", verifyToken, async (req, res, next) => {
  try {
    // await User.destroy({ where: { id: req.headers.userid } });
    // const user = await User.findOne({ where: { id: req.decoded.id } });
    // await Scoredata.destroy({ where: { UserId: req.decoded.id } });
    await Spaceship.destroy({ where: { UserId: req.decoded.id } });
    await User.destroy({ where: { id: req.decoded.id } });
    console.log("회원탈퇴 완료")
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
