const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { shop, purchase } = require(`../controllers/shop`);

router.get("/", verifyToken, shop);
router.post("/purchase", verifyToken, purchase);

module.exports = router;
