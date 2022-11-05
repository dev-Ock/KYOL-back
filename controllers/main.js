const { resStatus } = require('../lib/responseStatus');
const { User } = require('../models');

exports.navbar = async (req, res, next) => {
  try {
    console.log('GET /main/navbar 진입');
    const user = await User.findOne({
      where: { id: req.headers.userid },
    });
    res.status(resStatus.success.code).json({
      // 200
      data: user,
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.main = async (req, res, next) => {
  try {
    console.log('GET /main 진입');
    const user = await User.findOne({
      where: { id: req.headers.userid || null },
    });
    res
      .status(resStatus.success.code) // 200
      .json({ data: user, message: resStatus.success.message }); // success
  } catch (error) {
    console.error(error);
    next(error);
  }
};
