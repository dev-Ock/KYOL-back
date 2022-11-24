// const { resStatus } = require("../lib/responseStatus");
// const { User } = require("../models");

// // 팔로우 추가
// exports.addFollow = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ where: { id: req.headers.userid } });
//     await user.addFollowing(parseInt(req.params.id, 10));
//     res.status(resStatus.success.code).json({
//       message: resStatus.success.message, //success
//     });
//   } catch (error) {
//     console.error(error);
//     next(error);
//   }
// };
