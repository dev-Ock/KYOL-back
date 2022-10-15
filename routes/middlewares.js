const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.verifyToken = (req, res, next) => {
  // console.log("middleeware req.headers.userid: ", req.headers.userid);
  console.log("req.headers : ", req.headers);
  console.log("req.body : ", req.body);
  console.log("req.decoded : ", req.decoded);
  // console.log("req.headers.authorization : ", req.headers.authorization);
  try {
    console.log("middeleware 진입");
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    // console.log("req.decode : ", req.decoded);
    return next();
    // return res.status(200).json({
    //   message: "verifyToken success",
    // });
  } catch (error) {
    // console.log("error : ", error);
    // console.log("errorname : ", error.name);
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
