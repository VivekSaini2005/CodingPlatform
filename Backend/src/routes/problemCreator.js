const express = require('express')
const problemRouter = express.Router();
const adminMiddware = require("../middleware/adminMiddleware")
const userMiddleware = require("../middleware/userMiddleware")
const guestMiddleware = require("../middleware/guestMiddleware")
const { createProblem, deleteProblem, upload, updateProblem, getProblemById, getAllProblem, solvedAllProblemByUser, submittedProblem } = require("../controllers/userProblem")

// For Admin
problemRouter.post('/create', adminMiddware, createProblem);
problemRouter.put('/update/:id', adminMiddware, updateProblem);
problemRouter.put('/upload/:id',adminMiddware,upload);
problemRouter.delete('/delete/:id', adminMiddware, deleteProblem);

// For User
problemRouter.get('/problemById/:id', getProblemById);
problemRouter.get('/getAllProblem', getAllProblem);
problemRouter.get('/problemSolvedByUser', userMiddleware, solvedAllProblemByUser);
problemRouter.get("/submittedProblem/:pid", userMiddleware, submittedProblem);

module.exports = problemRouter;

