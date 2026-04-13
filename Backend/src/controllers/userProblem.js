const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility")
const Problem = require("../models/problem")
const User = require("../models/user")
const Submission = require("../models/submission")
const mongoose = require("mongoose");


const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            tags,
            explainTestCase,
            visibleTestCases,
            hiddenTestCases,
            startCode,
            referenceSolution
        } = req.body;

        console.log(explainTestCase)

        // =========================
        // 1️⃣ Basic Validation
        // =========================
        console.log("checking info");
        if (!title || !description || !difficulty || !tags) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        // console.log("1");
        if (!Array.isArray(visibleTestCases) || visibleTestCases.length === 0) {
            return res.status(400).json({ message: "Visible test cases required" });
        }
        // console.log("2");

        if (!Array.isArray(hiddenTestCases) || hiddenTestCases.length === 0) {
            return res.status(400).json({ message: "Hidden test cases required" });
        }
        // console.log("3");

        if (!Array.isArray(referenceSolution) || referenceSolution.length === 0) {
            return res.status(400).json({ message: "Reference solution required" });
        }

        if (!Array.isArray(explainTestCase) || explainTestCase.lenght === 0) {
            return res.status(400).json({ message: "Explain Test Case Required" })
        }

        // =========================
        // 2️⃣ Run Judge Validation
        // =========================
        // console.log("info come perfect");
        for (const solution of referenceSolution) {
            // console.log(solution);
            const { language, completeSolution } = solution;

            if (!language || !completeSolution) {
                return res.status(400).json({
                    message: "Invalid reference solution format"
                });
            }

            const languageId = getLanguageById(language);

            if (!languageId) {
                return res.status(400).json({
                    message: `Unsupported language: ${language}`
                });
            }

            const submissions = visibleTestCases.map((testcase) => ({
                source_code: completeSolution,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));
            // console.log(submissions);
            // Call Judge0 batch
            const submitResult = await submitBatch(submissions);

            // 🚨 CRITICAL SAFETY CHECK
            if (!submitResult || !Array.isArray(submitResult)) {
                return res.status(502).json({
                    message: "Judge API failed or rate limited",
                    error: submitResult
                });
            }
            // console.log(submitResult);
            const resultToken = submitResult.map((value) => value.token);

            const testResult = await submitToken(resultToken);

            if (!testResult || !Array.isArray(testResult)) {
                return res.status(502).json({
                    message: "Failed to fetch Judge results"
                });
            }
            // console.log(testResult);
            for (const test of testResult) {
                if (test.status_id !== 3) {
                    return res.status(400).json({
                        message: "Reference solution failed test cases",
                        failedTest: test
                    });
                }
            }
        }
        console.log("judge0 proceed finish");
        // =========================
        // 3️⃣ Save to Database
        // =========================

        const newProblem = await Problem.create({
            title,
            description,
            difficulty,
            tags,
            explainTestCase,
            visibleTestCases,
            hiddenTestCases,
            startCode,
            referenceSolution,
            problemCreator: req.result._id
        });

        return res.status(201).json({
            message: "Problem created successfully",
            problemId: newProblem._id
        });

    } catch (error) {
        console.error("🔥 CREATE PROBLEM ERROR:", error);

        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};


// const updateProblem = async (req, res) => {

//     const { id } = req.params;
//     console.log(req.body);

//     try {

//         const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases, startCode, referenceSolution, problemCreator } = req.body;

//         if (!id) {
//             return res.status(400).send("Missing ID Field");
//         }

//         const DsaProblem = await Problem.findById(id);
//         if (!DsaProblem)
//             return res.status(404).send("Id is not present in server");

//         // console.log(referenceSolution);
//         for (const { language, completeSolution } of referenceSolution) {

//             // source_code:
//             // language_id:
//             // stdin: 
//             // expectedOutput:

//             const languageId = getLanguageById(language);
//             // console.log(languageId);

//             // I am creating Batch submission
//             const submissions = visibleTestCases.map((testcase) => ({
//                 source_code: completeSolution,
//                 language_id: languageId,
//                 stdin: testcase.input,
//                 expected_output: testcase.output
//             }));

//             const submitResult = await submitBatch(submissions);
//             // console.log(submitResult);

//             const resultToken = submitResult.map((value) => value.token);
//             // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
//             // console.log(resultToken);

//             const testResult = await submitToken(resultToken);
//             // console.log(testResult);

//             for (const test of testResult) {
//                 if (test.status_id != 3) {
//                     return res.status(400).send("Some Error Occured status_id != 3");
//                 }
//             }

//         }

//         const newProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });

//         res.status(200).send(newProblem);

//     }
//     catch (err) {
//         return res.status(500).send("Error " + err);
//     }

// }
const upload = async (req, res) => {
    const { id } = req.params;

    try {
        const { ytlink } = req.body;

        const updatedProblem = await Problem.findByIdAndUpdate(
            id,
            { ytlink: ytlink },
            { new: true }   // updated document return karega
        );

        if (!updatedProblem) {
            return res.status(404).send("Problem not found");
        }

        return res.send("Ytlink Updated");

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error: " + err.message);
    }
};


const updateProblem = async (req, res) => {

    const { id } = req.params;
    // console.log(req.body);

    try {

        const {
            title,
            description,
            difficulty,
            tags,
            explainTestCase,
            visibleTestCases,
            hiddenTestCases,
            startCode,
            referenceSolution,
            problemCreator
        } = req.body;

        // console.log(req.body);

        const parsedTags = Array.isArray(tags) ? tags.join(",") : tags;
        // console.log("1");
        if (!id) {
            return res.status(400).send("Missing ID Field");
        }
        // console.log("2");
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).send("Problem not found");
        }

        // Merge visible + hidden testcases
        const allTestCases = [
            ...(hiddenTestCases || [])
        ].filter(
            (test) => test && test.input !== undefined && test.output !== undefined
        );
        // console.log(allTestCases);
        // console.log("3");
        // Find C++ reference solution


        if (allTestCases.length !== 0) {
            const cppSolution = referenceSolution.find(
                (sol) => sol.language === "c++"
            );
            // console.log("4");
            if (!cppSolution) {
                return res.status(400).send("C++ reference solution is required");
            }
            // console.log("5");
            const { completeSolution } = cppSolution;

            const languageId = getLanguageById("c++");

            if (!languageId) {
                return res.status(400).send("C++ language id not found");
            }
            // console.log("before submissions");
            // Create Judge0 submissions
            const submissions = allTestCases.map((testcase) => ({
                source_code: completeSolution,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));
            const submitResult = await submitBatch(submissions);
            // console.log("after judge0");
            if (!submitResult || !Array.isArray(submitResult)) {
                return res.status(500).send("Judge0 submission failed");
            }

            const resultTokens = submitResult.map((value) => value.token);

            const testResults = await submitToken(resultTokens);
            // console.log("test result a gaya");
            // console.log(testResults);

            for (const test of testResults) {

                if (test.status_id !== 3) {
                    return res.status(400).json({
                        message: "C++ reference solution failed on testcases",
                        judgeResult: test
                    });
                }

            }
        }


        // Remove Mongo _id fields
        const cleanVisible = visibleTestCases
            ? visibleTestCases.map(({ _id, ...rest }) => rest)
            : problem.visibleTestCases;

        // const correctedCleanVisible = [...problem?.visibleTestCases, ...cleanVisible]

        const cleanHidden = hiddenTestCases
            ? hiddenTestCases.map(({ _id, ...rest }) => rest)
            : problem.hiddenTestCases;

        const correctedCleanHidden = [...problem?.hiddenTestCases, ...cleanHidden]

        const cleanStartCode = startCode
            ? startCode.map(({ _id, ...rest }) => rest)
            : problem.startCode;

        const cleanReference = referenceSolution
            ? referenceSolution.map(({ _id, ...rest }) => rest)
            : problem.referenceSolution;

        const cleanExample = explainTestCase
            ? explainTestCase.map(({ _id, ...rest }) => rest)
            : problem.explainTestCase;
        // console.log("before problem update");

        const updatedProblem = await Problem.findByIdAndUpdate(
            id,
            {
                title,
                description,
                difficulty,
                tags: parsedTags,
                explainTestCase: cleanExample,
                visibleTestCases: cleanVisible,
                hiddenTestCases: correctedCleanHidden,
                problemCreator
            },
            { new: true, runValidators: true }
        );

        if (problem.difficulty !== difficulty) {

            const oldPoints =
                problem.difficulty === "easy" ? 3 : problem.difficulty === "medium" ? 5 : 7;

            const newPoints =
                difficulty === "easy" ? 3 : difficulty === "medium" ? 5 : 7;

            const diff = newPoints - oldPoints;

            // Update users who solved this problem
            await User.updateMany(
                { problemSolved: problem._id },
                { $inc: { score: diff } }
            );
        }

        // console.log("updated Problem updatedProblem");

        return res.status(200).json(updatedProblem);

    } catch (err) {

        console.error(err);
        return res.status(500).send("Internal Server Error: " + err.message);

    }
};

const deleteProblem = async (req, res) => {
    const { id } = req.params;

    try {

        if (!id)
            return res.status(400).send("ID is Missing");

        // const problem = await Problem.findById(id);


        const deletedProblem = await Problem.findByIdAndDelete(id);

        const points = deletedProblem.difficulty === "easy" ? 3 : problem.difficulty === "medium" ? 5 : 7;

        if (!deletedProblem)
            return res.status(404).send("Problem Not Found");

        const submissions = await Submission.find({ problemId: id });

        const userIds = [...new Set(submissions.map(sub => sub.userId.toString()))];

        await Submission.deleteMany({ problemId: id });



        await User.updateMany(
            { _id: { $in: userIds } },
            {
                $pull: { problemSolved: id },
                $inc: {
                    solvedCount: -1,
                    score: -points
                }
            }
        );

        res.status(200).send("Problem and related data deleted successfully");

    } catch (error) {
        res.status(500).send("Error: " + error.message);
    }
};

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id)
            res.send("ID is Missing");

        // console.log(id);

        const getProblem = await Problem.findById(id).select('title description difficulty tags visibleTestCases startCode referenceSolution ytlink explainTestCase');
        // for not selection then do this .select('~hiddenTestCases');
        // console.log(getProblem)

        if (!getProblem)
            res.status(404).send("Problem is Missing");

        res.status(200).send(getProblem);
    }
    catch (error) {
        res.status(404).send("Error " + error);
    }
}

const getAllProblem = async (req, res) => {
    try {

        const getProblem = await Problem.find({}).select('_id title difficulty tags');

        if (getProblem.length == 0) {
            return res.status(200).send([]);
        }

        res.status(200).send(getProblem);
    }
    catch (error) {
        res.status(404).send("Error " + error);
    }
}

// const solvedAllProblemByUser = async (req, res) => {

//     try {
//         // const count = req.result.problemSolved.length;
//         // res.status(200).send(count);

//         const userId = req.result._id;
//         const user = await User.findById(userId).populate({
//             path: "problemSolved",
//             select: "_id title difficulty tags"
//         })

//         // console.log(user);

//         res.status(200).send(user.problemSolved);
//     }
//     catch (err) {
//         res.status(500).send("Server Error " + err);
//     }
// }

const solvedAllProblemByUser = async (req, res) => {
    try {

        const userId = new mongoose.Types.ObjectId(req.result._id);

        const solvedProblems = await Submission.aggregate([
            {
                $match: {
                    userId: userId,
                    status: "accepted"   // ✅ correct field
                }
            },
            {
                $sort: { createdAt: 1 }
            },
            {
                $group: {
                    _id: "$problemId",
                    solvedAt: { $first: "$createdAt" }
                }
            },
            {
                $lookup: {
                    from: "problems",   // collection name
                    localField: "_id",
                    foreignField: "_id",
                    as: "problem"
                }
            },
            {
                $unwind: "$problem"
            },
            {
                $project: {
                    _id: "$problem._id",
                    title: "$problem.title",
                    difficulty: "$problem.difficulty",
                    tags: "$problem.tags",
                    solvedAt: 1
                }
            },
            {
                $sort: { solvedAt: -1 }
            }
        ]);

        res.status(200).json(solvedProblems);

    } catch (err) {
        res.status(500).send("Server Error " + err.message);
    }
};
const submittedProblem = async (req, res) => {

    try {

        const userId = req.result._id;
        const problemId = req.params.pid;

        const ans = await Submission.find({ userId, problemId });

        return res.status(200).json(ans);
        // console.log(ans);

        // if (ans.length == 0)
        //     res.status(200).send("No Submission is persent");

        // res.status(200).send(ans);

    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { createProblem, updateProblem, upload, deleteProblem, getProblemById, getAllProblem, solvedAllProblemByUser, submittedProblem };

// const submissions = [
//     {
//       "language_id": 46,
//       "source_code": "echo hello from Bash",
//       stdin:23,
//       expected_output:43,
//     },
//     {
//       "language_id": 123456789,
//       "source_code": "print(\"hello from Python\")"
//     },
//     {
//       "language_id": 72,
//       "source_code": ""
//     }
//   ]