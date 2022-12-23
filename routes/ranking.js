const express = require("express");
const router = express.Router();

const { ranking } = require(`../controllers/ranking`);

router.get("/", ranking); // 랭킹 조회

module.exports = router;
