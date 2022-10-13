const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = (req, res, next) => {
  try {
    const checkAlive = User.findOne({ where: { id: req.decoded.id } });
    if (checkAlive.deletedAt === null) {
      req.decoded = jwt.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
      );
      return next();
    }
    return res.status(400).json({
      message: "Dead ID",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        code: 419,
        message: "토큰이 만료되었습니다",
      });
    }
    return res.status(401).json({
      code: 401,
      message: "유효하지 않은 토큰입니다",
    });
  }
};
