const axios = require('axios');

const getLanguageById = (lang) => {

    const language = {
        "c++": 54,
        // "cpp": 54,
        "java": 62,
        "javascript": 63,
        "python": 71
    };

    return language[String(lang).toLowerCase()];
}

const submitBatch = async (submissions) => {

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            base64_encoded: 'false'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            submissions
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error("Error O" + error);
        }
    }

    return await fetchData();


}

const waiting = (timer) => new Promise((resolve) => setTimeout(resolve, timer));

const submitToken = async (resultToken) => {

    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
        params: {
            tokens: resultToken.join(','),
            base64_encoded: 'false',
            fields: '*'
        },
        headers: {
            'x-rapidapi-key': process.env.JUDGE0_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    async function fetchData() {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error("Error Occured" + error.message);
        }
    }

    while (true) {

        const result = await fetchData();

        const IsResultObtained = result.submissions.every((r) => r.status_id > 2);

        if (IsResultObtained)
            return result.submissions;

        await waiting(1000);
    }
}

module.exports = { getLanguageById, submitBatch, submitToken };


