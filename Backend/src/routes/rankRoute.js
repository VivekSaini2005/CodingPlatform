const express = require("express");
const router = express.Router();

const getUserRank = require("../controllers/rankController");
const userMiddleware = require("../middleware/userMiddleware");

// console.log('hello');

router.get("/rank", userMiddleware, getUserRank);

module.exports = router;