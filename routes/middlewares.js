const jwt = require("jsonwebtoken");
// const RateLimit = require("express-rate-limit");

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    return res.status(303).json({
      message: "already logged in",
    });
  }
};

exports.verifyToken = (req, res, next) => {
  try {
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    return next();
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

// exports.apiLimiter = new RateLimit({
//   windowMs: 60 * 1000, // 1분
//   max: 10,
//   delayMs: 0,
//   handler(req, res) {
//     res.status(this.statusCode).json({
//       code: this.statusCode, // 기본값 429
//       message: "1분에 한 번만 요청할 수 있습니다.",
//     });
//   },
// });

// exports.deprecated = (req, res) => {
//   res.status(410).json({
//     code: 410,
//     message: "새로운 버전이 나왔습니다. 새로운 버전을 사용하세요.",
//   });
// };

// const errorHandler = (err, req, res, next) => {
//   let error = {
//     ...err,
//   };

//   error.message = err.message;

//   // console.log(err.stack.red);
//   console.log(err);

//   // Mongoose bad ObjectId
//   if (err.name === "CastError") {
//     // const message = `Resource not found with id of ${err.value}`;
//     const message = `Resource not found`;
//     error = new ErrorResponse(message, 404);
//   }
//   // console.log(err.name);

//   // Mongoose duplicate key
//   if (err.code === 11000) {
//     const message = "Duplicate field value entered";
//     console.log(err);
//     error = new ErrorResponse(message, 400);
//   }

//   // Mongoose validation error`
//   if (err.name === "ValidationError") {
//     const message = [];
//     Object.values(err.errors).forEach((errr) => {
//       message.push({
//         field: errr.properties.path,
//         message: errr.message,
//       });
//     });
//     error = new ErrorResponse(null, 400, message);
//   }

//   res.status(error.statusCode || 500).json({
//     success: false,
//     error: error.messageWithField || error.message || "Server Error",
//   });
// };

// module.exports = errorHandler;
