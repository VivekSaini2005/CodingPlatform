
const express = require('express');
const userMiddleware = require('../middleware/userMiddleware');
const guestMiddleware = require('../middleware/guestMiddleware');
const submitRouter = express.Router();
const { submitCode, runCode } = require("../controllers/userSubmission")

submitRouter.post('/submit/:id', userMiddleware, submitCode)
submitRouter.post('/run/:id', guestMiddleware, runCode);

module.exports = submitRouter;