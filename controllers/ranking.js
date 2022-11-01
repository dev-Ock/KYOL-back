const { sequelize } = require('../models');
const { Scoredata } = require('../models');

// 랭킹을 조회하면 랭킹표에 나타낼 점수와 유저의 아이콘을 보여준다.
// => DB 를 조회해서 해당 값을 불러온다 (Scoredata, User)
// router.get("/", verifyToken, async (req, res, next) => {
exports.ranking = async (req, res, next) => {
  try {
    console.log('GET /ranking 진입');

    const topRanking = await Scoredata.findAll({
      order: [['score', 'DESC']],
      limit: 10,
    });

    const weeklyRanking = await sequelize.query(
      'SELECT * FROM (SELECT * FROM scoredatas WHERE createdAt BETWEEN DATE_ADD (NOW(), INTERVAL -1 WEEK) AND DATE_ADD(NOW(), INTERVAL 9 HOUR) ORDER BY score desc LIMIT 10) scoredatasRanking'
    );

    console.log(weeklyRanking);
    const result = { topRanking, weeklyRanking };
    res
      .status(200)
      .json({ success: true, data: result, message: 'get /ranking - success' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
