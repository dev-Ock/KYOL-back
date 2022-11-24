const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/middlewares");

const {
  wholeBoard,
  selectedUserBoard,
  someNicksBoard,
  someTitlesBoard,
  writePost,
} = require("../controllers/community");

router.get("/list", wholeBoard);
router.get("/list/selected-user", selectedUserBoard);
router.get("/list/some-nicks", someNicksBoard);
router.get("/list/some-titles", someTitlesBoard);
router.post("/post/write", verifyToken, writePost);

module.exports = router;
