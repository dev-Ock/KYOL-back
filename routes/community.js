const express = require("express");
const router = express.Router();

// const { verifyToken } = require("../controllers/middlewares");

const {
  wholeBoard,
  selectedUserBoard,
  someNicksBoard,
  someTitlesBoard,
} = require("../controllers/community");

router.get("/", wholeBoard);
router.get("/selected-user", selectedUserBoard);
router.get("/some-nicks", someNicksBoard);
router.get("/some-titles", someTitlesBoard);

module.exports = router;
