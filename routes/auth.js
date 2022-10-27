const express = require('express');

const {
  joinServiceEmailCheck,
  joinServiceNickCheck,
  joinService,
  loginService,
} = require('../controllers/auth');

const router = express.Router();

// 회원가입;
// 1. email 중복 검사
router.post('/join/email-check', joinServiceEmailCheck);
// 2. nick 중복 검사
router.post('/join/nick-check', joinServiceNickCheck);
// 3. 최종 검사(email, nick) 후, User 모델에 저장
router.post('/join', joinService);
// 로그인
router.post('/login', loginService);

module.exports = router;
