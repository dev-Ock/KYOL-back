// const { response, resStatus } = require("../lib/responseStatus"); // response 라는 함수를 만들었는데 confirm 받고 사용여부 결정하기★★★
const { resStatus } = require("../lib/responseStatus");
const { Post, User, Comment, Recomment, PostLike } = require("../models");

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
    // title이나 content가 없다면
    if (title == null || content == null) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    } else {
      // 전제조건들을 만족하면
      await Post.create({
        title: title,
        content: content,
        nick: req.decoded.nick,
        UserId: req.decoded.id,
      });
      res.status(resStatus.success.code).json({
        meessage: resStatus.success.message,
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 수정 페이지 열 때
exports.beforeUpdatePost = async (req, res, next) => {
  try {
    console.log("GET /community/post/before-update/:PostId 진입");
    const post = await Post.findOne({
      where: { id: parseInt(req.params.PostId, 10) },
    });

    // post가 존재하지 않는다면
    if (!post[0]) {
    } else {
      const UserId = post.dataValues.UserId;
      // 로그인한 회원과 해당 게시글의 작성자가 불일치
      if (UserId !== req.decoded.id) {
        res.status(resStatus.different.code).json({
          meessage: resStatus.different.message,
        });
      } else {
        // 전제조건들을 만족하면
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
          data: { post },
        });
        // response(res, resStatus.success, {post}); // res 보낼 세 줄을 한 줄로 줄이는 함수 만듬
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 수정 적용하기
exports.afterUpdatePost = async (req, res, next) => {
  try {
    console.log("PUT /community/post/after-update/:PostId 진입");
    const PostId = parseInt(req.params.PostId, 10);
    const post = await Post.findOne({
      where: { id: PostId },
      attributes: ["UserId"],
    });
    const { title, content } = req.body;
    // 수정할 title, content 둘 중 하나조차 없는 경우
    if (!title || !content) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    } else {
      // PostId가 post 테이블에 없으면
      if (!post[0]) {
        res.status(resStatus.invalidi.code).json({
          meessage: resStatus.invalidi.message,
        });
      } else {
        const UserId = post.dataValues.UserId;
        // 로그인한 회원과 해당 게시글의 작성자가 불일치
        if (UserId !== req.decoded.id) {
          res.status(resStatus.different.code).json({
            meessage: resStatus.different.message,
          });
        } else {
          // 전제조건들을 만족하면
          const post = await Post.update(
            { title: title, content: content },
            {
              where: { id: PostId },
            }
          );
          res.status(resStatus.success.code).json({
            meessage: resStatus.success.message,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 조회
exports.readPost = async (req, res, next) => {
  try {
    console.log("GET /community/post/read/:PostId 진입");
    const PostId = parseInt(req.params.PostId, 10);
    const post = await Post.findOne({
      where: { id: PostId },
    });
    if (!post[0]) {
      // PostId가 post 테이블에 없으면
      res.status(resStatus.invalidi.code).json({
        meessage: resStatus.invalidi.message,
      });
    } else {
      const comment = await Comment.findAll({
        where: { PostId: PostId },
      });
      const replyNum = comment.length; // comment 개수
      const recomment = await Recomment.findAll({
        where: { PostId: PostId },
      });
      res.status(resStatus.success.code).json({
        meessage: resStatus.success.message,
        data: { post, comment, replyNum, recomment },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 게시글 삭제
exports.deletePost = async (req, res, next) => {
  try {
    console.log("DELETE /community/post/delete/:PostId 진입");
    const PostId = parseInt(req.params.PostId, 10);
    // console.log(PostId);
    const post = await Post.findOne({
      where: { id: PostId },
    });
    // console.log(post);
    if (!post[0]) {
      // PostId가 post 테이블에 없으면
      res.status(resStatus.invalidi.code).json({
        meessage: resStatus.invalidi.message,
      });
    } else {
      const UserId = post.dataValues.UserId;
      // 로그인한 회원과 해당 게시글의 작성자가 불일치
      if (UserId !== req.decoded.id) {
        res.status(resStatus.different.code).json({
          meessage: resStatus.different.message,
        });
      } else {
        // 전제조건들을 만족하면
        await PostLike.destroy({ where: { PostId: PostId } });
        await Recomment.destroy({ where: { PostId: PostId } });
        await Comment.destroy({ where: { PostId: PostId } });
        await Post.destroy({ where: { id: PostId } });
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 댓글 추가
exports.addComment = async (req, res, next) => {
  try {
    console.log("POST /community/comment/add/:PostId 진입");
    const { reply } = req.body;
    // reply가 없는 경우
    if (!reply) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    } else {
      const PostId = parseInt(req.params.PostId, 10);
      const post = await Post.findOne({
        where: { id: PostId },
      });
      // post가 없는 경우
      if (!post[0]) {
        res.status(resStatus.invalidi.code).json({
          meessage: resStatus.invalidi.message,
        });
      } else {
        // 전제조건들을 만족하면
        const comment = await Comment.create({
          UserId: req.decoded.id,
          reply: reply,
        });
        await post.addComment(comment);
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 댓글 수정
exports.updateComment = async (req, res, next) => {
  try {
    console.log("PUT /community/comment/update/:CommentId 진입");
    const { reply } = req.body;
    // reply가 없는 경우
    if (!reply) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    } else {
      const CommentId = parseInt(req.params.CommentId, 10);
      const comment = await Comment.findOne({
        where: { id: CommentId },
      });
      // comment 없는 경우
      if (!comment[0]) {
        res.status(resStatus.invalidi.code).json({
          meessage: resStatus.invalidi.message,
        });
      } else {
        const UserId = comment.dataValues.UserId;
        // 로그인한 회원과 해당 게시글의 작성자가 불일치
        if (UserId !== req.decoded.id) {
          res.status(resStatus.different.code).json({
            meessage: resStatus.different.message,
          });
        } else {
          // 전제조건들을 만족하면
          await Comment.update({ reply: reply }, { where: { id: CommentId } });
          res.status(resStatus.success.code).json({
            meessage: resStatus.success.message,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res, next) => {
  try {
    console.log("DELETE /community/comment/delete/:CommentId 진입");
    const CommentId = parseInt(req.params.CommentId, 10);
    const comment = await Comment.findOne({
      where: { id: CommentId },
    });
    if (!comment[0]) {
      res.status(resStatus.invalidi.code).json({
        meessage: resStatus.invalidi.message,
      });
    } else {
      const UserId = comment.dataValues.UserId;
      // 로그인한 회원과 해당 게시글의 작성자가 불일치
      if (UserId !== req.decoded.id) {
        res.status(resStatus.different.code).json({
          meessage: resStatus.different.message,
        });
      } else {
        await Recomment.destroy({
          CommentId: CommentId,
        });
        await Comment.destroy({
          id: CommentId,
        });
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 대댓글 추가
exports.addRecomment = async (req, res, next) => {
  try {
    console.log("POST /community/recomment/add/:PostId/:CommentId 진입");
    const { re_reply } = req.body;
    if (!re_reply) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message, // re_reply가 없는 경우
      });
    } else {
      const PostId = parseInt(req.params.PostId, 10);
      const CommentId = parseInt(req.params.CommentId, 10);
      // console.log(PostId);
      // console.log(CommentId);
      const post = await Post.findOne({
        where: { id: PostId },
      });
      const comment = await Comment.findOne({
        where: { id: CommentId },
      });
      if (!post[0] || !comment[0]) {
        // post가 없거나, comment가 없는 경우
        res.status(resStatus.invalidi.code).json({
          meessage: resStatus.invalidi.message,
        });
      } else {
        // 전제조건들을 만족하면
        const recomment = await Recomment.create({
          UserId: req.decoded.id,
          re_reply: re_reply,
        });
        await post.addRecomment(recomment);
        await comment.addRecomment(recomment);
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 대댓글 수정
exports.updateRecomment = async (req, res, next) => {
  try {
    console.log("PUT /community/recomment/update/:RecommentId 진입");
    const { re_reply } = req.body;
    // re_reply가 없는 경우
    if (!re_reply) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    } else {
      const RecommentId = parseInt(req.params.RecommentId, 10);
      const recomment = await Recomment.findOne({
        where: { id: RecommentId },
      });
      // recomment가 없는 경우
      if (!recomment[0]) {
        res.status(resStatus.invalidi.code).json({
          meessage: resStatus.invalidi.message,
        });
      } else {
        const UserId = recomment.dataValues.UserId;
        // 로그인한 회원과 해당 게시글의 작성자가 불일치
        if (UserId !== req.decoded.id) {
          res.status(resStatus.different.code).json({
            meessage: resStatus.different.message,
          });
        } else {
          // 전제조건들을 만족하면
          await Recomment.update(
            { re_reply: re_reply },
            { where: { id: RecommentId } }
          );
          res.status(resStatus.success.code).json({
            meessage: resStatus.success.message,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 대댓글 삭제
exports.deleteRecomment = async (req, res, next) => {
  try {
    console.log("DELETE /community/recomment/delete/:RecommentId 진입");

    const RecommentId = parseInt(req.params.RecommentId, 10);
    const recomment = await Recomment.findOne({
      where: { id: RecommentId },
    });
    if (!recomment[0]) {
      res.status(resStatus.invalidi.code).json({
        meessage: resStatus.invalidi.message,
      });
    } else {
      const UserId = recomment.dataValues.UserId;
      // 로그인한 회원과 해당 게시글의 작성자가 불일치
      if (UserId !== req.decoded.id) {
        res.status(resStatus.different.code).json({
          meessage: resStatus.different.message,
        });
      } else {
        await Recomment.destroy({
          id: RecommentId,
        });
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 좋아요 누를 때 (post -> 좋아요 수 증감 반영 / postlike -> 데이터 추가 혹은 삭제)
exports.likePost = async (req, res, next) => {
  try {
    console.log("POST /community/post/like/:PostId 진입");
    const { like_change } = req.body;
    // like_change 값이 1이나 -1이 아닌 경우
    if (!like_change || (like_change != 1 && like_change != -1)) {
      res.status(resStatus.notenough.code).json({
        meessage: resStatus.notenough.message,
      });
    } else {
      const PostId = parseInt(req.params.PostId, 10);
      // 좋아요 누름
      if (like_change == 1) {
        await Post.increment(
          {
            like: 1,
          },
          { where: { id: PostId } }
        );
        const postlike = await PostLike.create();
        await Post.addPostlike(postlike);
        await User.addPostlike(postlike);
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      } else {
        // 좋아요 취소
        await Post.increment(
          {
            like: -1,
          },
          {
            where: { id: PostId },
          }
        );
        await PostLike.destroy({ where: { PostId: PostId } });
        res.status(resStatus.success.code).json({
          meessage: resStatus.success.message,
        });
      }
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};
