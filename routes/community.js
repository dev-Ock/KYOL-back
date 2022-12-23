const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/middlewares");

const {
  wholeBoard,
  selectedUserBoard,
  someNicksBoard,
  someTitlesBoard,
  writePost,
  beforeUpdatePost,
  afterUpdatePost,
  readPost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
  addRecomment,
  updateRecomment,
  deleteRecomment,
  likePost,
} = require("../controllers/community");

router.get("/list", wholeBoard); // 전체 게시글 조회 (로그인 안 한 사람도 접근 가능)
router.get("/list/selected-user", selectedUserBoard); // 선택한 user의 게시글들만 조회 (로그인 안 한 사람도 접근 가능)
router.get("/list/some-nicks", someNicksBoard); // 검색한 word를 포함한 닉네임들이 쓴 게시글들만 조회 (로그인 안 한 사람도 접근 가능)
router.get("/list/some-titles", someTitlesBoard); // 검색한 word를 포함한 제목의 게시글들만 조회 (로그인 안 한 사람도 접근 가능)
router.post("/post/add", verifyToken, writePost); // 게시글 쓰기
router.get("/post/before-update/:PostId", verifyToken, beforeUpdatePost); // 게시글 수정 페이지 열 때
router.put("/post/after-update/:PostId", verifyToken, afterUpdatePost); // 게시글 수정 적용하기
router.get("/post/read/:PostId", readPost); // 게시글 조회 (로그인 안 한 사람도 접근 가능)
router.delete("/post/delete/:PostId", verifyToken, deletePost); // 게시글 삭제
router.post("/comment/add/:PostId", verifyToken, addComment); // 댓글 추가
router.put("/comment/update/:CommentId", verifyToken, updateComment); // 댓글 수정
router.delete("/comment/delete/:CommentId", verifyToken, deleteComment); // 댓글 삭제
router.post("/recomment/add/:PostId/:CommentId", verifyToken, addRecomment); // 대댓글 추가
router.put("/recomment/update/:RecommentId", verifyToken, updateRecomment); // 대댓글 수정
router.delete("/recomment/delete/:RecommentId", verifyToken, deleteRecomment); // 대댓글 삭제
router.post("/post/like/:PostId", verifyToken, likePost); // 좋아요 누를 때 (post -> 좋아요 수 증감 반영 / postlike -> 데이터 추가 혹은 삭제)

module.exports = router;
