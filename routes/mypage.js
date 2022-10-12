const express = require("express");

const verifyToken = require("./middlewares");
const { User, Spaceship, Score } = require("../models");

const router = express.Router();

router.get("/", verifyToken, async (req, res, next) => {
  const profile = await User.findOne({
    where: { id: req.user.id },
    include: [
      {
        model: Score, // Score DB에서 score 컬럼을 내림차순 정렬하고 100위 안에 used.id 일치하는 score 점수들을
      },
      {
        model: Spaceship,
        attribute: ["shipName"],
      },
    ],
  });
});

// router.post();

/*
  (1) 프로필 : 
  사용자의 현재 우주선 img, 
  nickname, 
  cash, 
  순위조회(score DB에서 score  기준 1~100위 안에 있으면 순위 보여준다. 100위 안에 없으면 ‘100위 안에 없습니다. 기다리고 있겠습니다.’ 글 보이게), 
  내가 구매한 우주선 list) 
*/

// (2) 회원정보수정(password, nickname) : nickname은 unique 조건

//  (3) 회원탈퇴 기능 : deletedAt
