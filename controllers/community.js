const { resStatus } = require("../lib/responseStatus");
const { Post, User } = require("../models");

// 전체 게시글 조회
exports.wholeBoard = async (req, res, next) => {
  try {
    console.log("GET /community/list 진입");
    const post = await Post.findAll();
    res.status(resStatus.success.code).json({
      data: post,
      meessage: resStatus.success.message,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 선택한 user의 게시글들만 조회
exports.selectedUserBoard = async (req, res, next) => {
  try {
    console.log("GET /community/list/selected-user 진입");
    const { UserId } = req.body;
    const post = await Post.findAll({ where: { UserId: UserId } });
    res.status(resStatus.success.code).json({
      data: post,
      meessage: resStatus.success.message,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 검색한 word를 포함한 닉네임들이 쓴 게시글들만 조회
exports.someNicksBoard = async (req, res, next) => {
  try {
    console.log("GET /community/list/some-nicks 진입");
    const { nickKeyword } = req.body;
    const allNick = await User.findAll({
      attributes: ["nick"],
    });
    const arr = [];
    for (i = 0; i < allNick.length; i++) {
      const nick = allNick[i].dataValues.nick;
      if (nick.includes(nickKeyword)) {
        arr.push(nick);
      }
    }

    const post = await Post.findAll({
      where: { nick: arr },
    });
    res.status(resStatus.success.code).json({
      data: post,
      meessage: resStatus.success.message,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 검색한 word를 포함한 제목의 게시글들만 조회
exports.someTitlesBoard = async (req, res, next) => {
  try {
    console.log("GET /community/list/some-titles 진입");
    const { titleKeyword } = req.body;
    const allTitle = await Post.findAll({
      attributes: ["title"],
    });
    const arr = [];
    allTitle.map((x) => {
      const title = x.dataValues.title;
      if (title.includes(titleKeyword)) {
        arr.push(title);
      }
    });
    const post = await Post.findAll({
      where: { title: arr },
    });
    res.status(resStatus.success.code).json({
      data: post,
      meessage: resStatus.success.message,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 쓰기
exports.writePost = async (req, res, next) => {
  try {
    console.log("POST /community/post/write 진입");
    const { title, content } = req.body;
    if (title !== null && content !== null) {
      await Post.create({
        title: title,
        content: content,
        nick: req.decoded.nick,
        UserId: req.decoded.id,
      });
      res.status(resStatus.success.code).json({
        meessage: resStatus.success.message,
      });
    } else {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
