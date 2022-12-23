const express = require("express");
const router = express.Router();

const { navbar, main } = require("../controllers/main");

router.get("/navbar", navbar); // navbar 정보 조회
router.get("/", main); // main 정보 조회

module.exports = router;
