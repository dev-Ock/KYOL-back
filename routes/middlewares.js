const express = require('express');
const jwt = require('jsonwebtoken');
const RateLimit = require('express-rate-limit');

const router = express.Router();

// token 유효성 검사
exports.verifyToken = (req, res, next) => {
  try {
    console.log('middeleware 진입');
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    console.log('req.decode : ', req.decoded);
    return next();
    // return res.status(200).json({
    //   message: "verifyToken success",
    // });
  } catch (error) {
    console.log('error : ', error);
    // console.log("errorname : ", error.name);
    if (error.name === 'TokenExpiredError') {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: '토큰이 만료되었습니다',
      });
    }
    return res.status(401).json({
      code: 401,
      message: '유효하지 않은 토큰입니다',
    });
  }
};

// game/gear 페이지 요청 횟수 제한(user type에 따라) (DoS 방지)
exports.apiLimiter = router.use(async (req, res, next) => {
  if (req.decoded.type === 'premium') {
    premiumApiLimiter(req, res, next);
  } else {
    freeApiLimiter(req, res, next);
  }
});

const premiumApiLimiter = RateLimit({
  windowMs: 60 * 1000, // 1분당
  max: 100, // 최대 100번까지
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: 'premium limit',
    });
  },
});

const freeApiLimiter = RateLimit({
  windowMs: 60 * 1000, // 1분당
  max: 5, // 최대 5번까지
  handler(req, res) {
    res.status(this.statusCode).json({
      code: this.statusCode,
      message: 'free limit',
    });
  },
});
