const bcrypt = require("bcrypt");
const { resStatus } = require("../lib/responseStatus");
const { User, Spaceship, Scoredata } = require("../models");

// mypage 페이지 들어가기 전 password 검사 페이지의 password-compare
exports.pwcompare = async (req, res, next) => {
  try {
    console.log("POST /mypage/pw-compare 진입");
    const { password } = req.body;
    console.log("password : ", password);
    const exUser = await User.findOne({ where: { id: req.decoded.id } });
    if (!exUser) {
      return res.status(resStatus.invalidu.code).json({
        // 404
        message: resStatus.invalidu.message, // no-user
      });
    } else {
      const result = await bcrypt.compare(password, exUser.password);
      console.log("result : ", result);
      if (!result) {
        return res.status(resStatus.invalidp.code).json({
          // 404
          message: resStatus.invalidp.message, // compare-result-false
        });
      } else {
        console.log("mypage 페이지 들어가기 전 password-compare 완료");
        return res.status(resStatus.success.code).json({
          // 200
          message: resStatus.success.message, // compare-result-true
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

/*
  프로필 : 
  사용자의 현재 우주선 img, 내가 구매한 우주선 list, nickname, cash, 
  순위조회(Scoredata DB에서 score 기준 1~100위 안에 있으면 순위 보여준다.) 
*/
exports.profile = async (req, res, next) => {
  try {
    console.log("GET /mypage 진입");
    const profile = await User.findOne({
      // where: { id: req.headers.userid },
      where: { id: req.decoded.id },
      include: [
        {
          model: Scoredata,
          order: [["score", "DESC"]],
          limit: 100, // Score DB에서 score 컬럼을 내림차순 정렬하고 100위 안에 used.id 일치하는 score 점수들을
        },
        {
          model: Spaceship,
          attributes: ["shipName"],
        },
      ],
    });
    console.log("프로필 정보 조회 완료");
    res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // success
      user: profile,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 닉네임 수정
exports.nickupdate = async (req, res, next) => {
  try {
    console.log("PUT /mypage/nick-update 진입");
    const { nick } = req.body;
    const sameNick = await User.findOne({ where: { nick: nick } });

    // 입력한 nick이 있다면
    if (nick) {
      // 입력한 nick이 DB에 일치하는 것이 없다면
      if (!sameNick) {
        await User.update({ nick: nick }, { where: { id: req.decoded.id } });
        await Scoredata.update(
          { nick: nick },
          { where: { userid: req.decoded.id } }
        );
        const user = await User.findOne(
          { where: { id: req.decoded.id } },
          { attribues: ["nick"] }
        );
        console.log("nick 수정 완료");
        return res.status(resStatus.success.code).json({
          // 200
          message: resStatus.success.message, // nick-update-success
          data: user,
        });
      }
      // 입력한 nick이 DB에 일치하는 것이 있다면
      else
        return res.status(resStatus.invalidn.code).json({
          // 404
          message: resStatus.invalidn.message, // unavailable nick
        });
    }
    // 입력한 nick이 없다면
    else {
      return res.status(resStatus.notenough.code).json({
        // 404
        message: resStatus.notenough.message, // no nick
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// password 수정
exports.pwupdate = async (req, res, next) => {
  try {
    console.log("PUT /mypage/pw-update 진입");
    const { password } = req.body;

    // 입력한 password가 있다면
    if (password) {
      const newPassword = await bcrypt.hash(password, 12);
      if (newPassword) {
        User.update(
          {
            password: newPassword,
          },
          { where: { id: req.decoded.id } }
        );
        console.log("password 수정 완료");
        return res.status(resStatus.success.code).json({
          // 201
          message: resStatus.success.message, // pw-update-success
        });
      } else {
        return res.status(resStatus.invalidp.code).json({
          // 404
          message: resStatus.invalidp.message, // pw-update-failure
        });
      }
    } else {
      return res.status(resStatus.notenough.code).json({
        // 404
        message: resStatus.notenough.message, // no password
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 회원탈퇴
exports.authdelete = async (req, res, next) => {
  try {
    await Spaceship.destroy({ where: { UserId: req.decoded.id } });
    await User.destroy({ where: { id: req.decoded.id } });
    console.log("회원탈퇴 완료");
    return res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
