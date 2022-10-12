const express = require("express");

const verifyToken = require("./middlewares");
const { User, Spaceship, Score } = require("../models");

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  const profile = await User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: Spaceship,
        attribute: [],
      },
    ],
  });
});
/*
  (1) 프로필 : 
  사용자의 현재 우주선 img, // 현재 선택한 우주선을 DB에 저장을 해야할까? 게임할 때 선택한 우주선에 대한 정보를 req.
  nickname, 
  cash, 
  순위조회(score DB에서 score  기준 1~100위 안에 있으면 순위 보여준다. 100위 안에 없으면 ‘100위 안에 없습니다. 기다리고 있겠습니다.’ 글 보이게), 
  내가 구매한 우주선 list) 
*/

// (2) 회원정보수정(password, nickname) : nickname은 unique 조건

//  (3) 회원탈퇴 기능 : deletedAt
