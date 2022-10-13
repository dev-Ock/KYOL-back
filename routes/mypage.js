const express = require("express");
const verifyToken = require("./middlewares");
const { User, Spaceship, Score } = require("../models");

const router = express.Router();

/*
  (1) 프로필 : 
  사용자의 현재 우주선 img, 
  nickname, 
  cash, 
  순위조회(score DB에서 score  기준 1~100위 안에 있으면 순위 보여준다. 100위 안에 없으면 ‘100위 안에 없습니다. 기다리고 있겠습니다.’ 글 보이게), 
  내가 구매한 우주선 list) 
*/

router.get("/", async (req, res, next) => {
  try {
    console.log(GET / mypage);
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
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 회원정보수정(user테이블 전체에서 nickname 중복되는 게 없다면,  password) // nickname은 unique 조건
router.post("/");

// 회원탈퇴
router.delete("/");

module.exports = router;
