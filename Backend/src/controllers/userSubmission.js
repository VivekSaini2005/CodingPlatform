const User = require("../models/user");
const Problem = require("../models/problem");
const Submission = require("../models/submission");
const { getLanguageById, submitBatch, submitToken } = require("../utils/problemUtility");

const submitCode = async (req, res) => {

    try {

        const problemId = req.params.id;
        const userId = req.result._id;
        // console.log(userId);
        const { code, language } = req.body;

        if (!problemId || !userId || !code || !language) {
            return res.send("Some Field Missing");
        }

        // Fetch problems from the DB to see the hidden testcases
        const problem = await Problem.findById(problemId);
        // console.log(problem);

        // Sumit wala code phale DB mai store kara lo fir Jude0 ko bhejna 

        // DB mai kya kya store karana hai
        const submittedResult = await Submission.create({
            userId,
            problemId,
            code,
            language,
            status: 'pending',
            testCasesTotal: problem.hiddenTestCases.length
        })
        // baki sari cheeje hm jude0 ke answer lane ke baad karenge

        const languageId = await getLanguageById(language);
        // console.log(languageId)
        const submissions = problem.hiddenTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));
        // console.log(submissions)

        const submitResult = await submitBatch(submissions);
        console.log("afterbatch")
        //extract token
        const resultToken = submitResult.map((value) => value.token);
        //submit token
        const testResult = await submitToken(resultToken);

        let testCasesPassed = 0;
        let runtime = 0;
        let memory = 0;
        let status = 'accepted';
        let errorMessage = null;

        for (const test of testResult) {
            if (test.status_id == 3) {
                testCasesPassed++;
                runtime = runtime + parseFloat(test.time);
                memory = Math.max(memory, test.memory);
            }
            else {
                if (test.status_id == 4) {
                    status = 'Wrong Answer',
                        errorMessage = test.stderr;
                }
                else {
                    status = 'Error',
                        errorMessage = test.stderr;
                }
            }
        }

        submittedResult.status = status;
        submittedResult.testCasesPassed = testCasesPassed;
        submittedResult.errorMessage = errorMessage;
        submittedResult.runtime = runtime;
        submittedResult.memory = memory;

        await submittedResult.save();

        // If everything is perfect then i need to store this in my problemSolved in user schema

        // ProblemId ko insert karenge userSchema ke problemSolved mein if it is not persent there.

        // req.result == user Information
        // update solved problems if accepted
        if (status === "accepted") {

            const user = await User.findById(userId);

            // check already solved
            const alreadySolved =
                user.problemSolved.some(
                    id => id.toString() === problemId.toString()
                );

            if (!alreadySolved) {
                user.problemSolved.push(problemId);

                //important for ranking
                user.solvedCount += 1;

                // calculate the point of question
                const points = problem.difficulty === "easy" ? 3 : problem.difficulty === "medium" ? 5 : 7;
                user.score += points;

                await user.save();
            }
        }


        res.status(201).send({ ...submittedResult.toObject(), testResults: testResult });

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send("Internal Server Error" + err.errorMessage);
    }

}

const runCode = async (req, res) => {
    try {

        const problemId = req.params.id;
        const userId = req.result._id;
        // console.log(userId);
        const { code, language } = req.body;

        if (!problemId || !userId || !code || !language) {
            return res.send("Some Field Missing");
        }

        // Fetch problems from the DB to see the hidden testcases
        const problem = await Problem.findById(problemId);

        // baki sari cheeje hm jude0 ke answer lane ke baad karenge
        const languageId = await getLanguageById(language);

        const submissions = problem.visibleTestCases.map((testcase) => ({
            source_code: code,
            language_id: languageId,
            stdin: testcase.input,
            expected_output: testcase.output
        }));

        const submitResult = await submitBatch(submissions);
        //extract token
        const resultToken = submitResult.map((value) => value.token);
        //submit token
        const testResult = await submitToken(resultToken);

        res.status(201).send(testResult);

    }
    catch (err) {
        res.status(500).send("Internal Server Error" + err);
    }

}

module.exports = { submitCode, runCode };