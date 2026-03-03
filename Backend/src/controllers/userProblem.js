const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility")
const Problem = require("../models/problem")
const User = require("../models/user")
const Submission = require("../models/submission")


const createProblem = async (req, res) => {
    const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases, startCode, referenceSolution, problemCreator } = req.body;

    try {

        // console.log(referenceSolution);
        for (const { language, completeSolution } of referenceSolution) {

            // source_code:
            // language_id:
            // stdin: 
            // expectedOutput:



            const languageId = getLanguageById(language);
            // console.log(languageId);

            // I am creating Batch submission
            const submissions = visibleTestCases.map((testcase) => ({
                source_code: completeSolution,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

            const submitResult = await submitBatch(submissions);
            // console.log(submitResult);

            const resultToken = submitResult.map((value) => value.token);
            // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
            // console.log(resultToken);

            const testResult = await submitToken(resultToken);
            // console.log(testResult);

            for (const test of testResult) {
                if (test.status_id != 3) {
                    return res.status(400).send("Some Error Occured");
                }
            }

        }

        // If the code run properly then we need to store it into database
        const userProblem = await Problem.create({
            ...req.body,
            problemCreator: req.result._id
        })

        res.status(201).send("Problem Create Successfully")

    }
    catch (error) {
        res.status(400).send("Error" + error);
    }
}

const updateProblem = async (req, res) => {

    const { id } = req.params;

    try {

        const { title, description, difficulty, tags, visibleTestCases, hiddenTestCases, startCode, referenceSolution, problemCreator } = req.body;

        if (!id) {
            return res.status(400).send("Missing ID Field");
        }

        const DsaProblem = await Problem.findById(id);
        if (!DsaProblem)
            return res.status(404).send("Id is not present in server");

        // console.log(referenceSolution);
        for (const { language, completeSolution } of referenceSolution) {

            // source_code:
            // language_id:
            // stdin: 
            // expectedOutput:

            const languageId = getLanguageById(language);
            // console.log(languageId);

            // I am creating Batch submission
            const submissions = visibleTestCases.map((testcase) => ({
                source_code: completeSolution,
                language_id: languageId,
                stdin: testcase.input,
                expected_output: testcase.output
            }));

            const submitResult = await submitBatch(submissions);
            // console.log(submitResult);

            const resultToken = submitResult.map((value) => value.token);
            // ["db54881d-bcf5-4c7b-a2e3-d33fe7e25de7","ecc52a9b-ea80-4a00-ad50-4ab6cc3bb2a1","1b35ec3b-5776-48ef-b646-d5522bdeb2cc"]
            // console.log(resultToken);

            const testResult = await submitToken(resultToken);
            // console.log(testResult);

            for (const test of testResult) {
                if (test.status_id != 3) {
                    return res.status(400).send("Some Error Occured status_id != 3");
                }
            }

        }

        const newProblem = await Problem.findByIdAndUpdate(id, { ...req.body }, { runValidators: true, new: true });

        res.status(200).send(newProblem);

    }
    catch (err) {
        return res.status(500).send("Error " + err);
    }

}

const deleteProblem = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id)
            res.send("ID is Missing");

        const deletedProblem = await Problem.findByIdAndDelete(id);

        if (!deletedProblem)
            res.status(404).send("Problem is Missing");

        res.status(200).send("Problem Successfully Deleted")
    }
    catch (error) {
        res.status(404).send("Error " + error);
    }
}

const getProblemById = async (req, res) => {
    const { id } = req.params;
    try {

        if (!id)
            res.send("ID is Missing");

        // console.log(id);

        const getProblem = await Problem.findById(id).select('title description difficulty tags visibleTestCases startCode referenceSolution');
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

const solvedAllProblemByUser = async (req, res) => {

    try {
        // const count = req.result.problemSolved.length;
        // res.status(200).send(count);

        const userId = req.result._id;
        const user = await User.findById(userId).populate({
            path: "problemSolved",
            select: "_id title difficulty tags"
        })

        res.status(200).send(user.problemSolved);
    }
    catch (err) {
        res.status(500).send("Server Error " + err);
    }
}

const submittedProblem = async (req, res) => {

    try {

        const userId = req.result._id;
        const problemId = req.params.pid;

        const ans = await Submission.find({ userId, problemId });

        if (ans.length == 0)
            res.status(200).send("No Submission is persent");

        res.status(200).send(ans);

    }
    catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { createProblem, updateProblem, deleteProblem, getProblemById, getAllProblem, solvedAllProblemByUser, submittedProblem };

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