const mongoose = require('mongoose');
const { Schema } = mongoose;

const problemSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    tags: {
        type: String,
        enum: ['Array', 'LinkList', 'Graph', 'DP', 'Math', 'math', 'array'],
        required: true
    },
    explainTestCase: [{
        input: {
            type: String,
            default: "",
            required: true
        },
        output: {
            type: String,
            default: "",
            required: true
        },
        explanation: {
            type: String,
            default: "",
            required: true
        }
    }],
    visibleTestCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        },
        explanation: {
            type: String,
            required: true
        }
    }],
    hiddenTestCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }],
    startCode: [{
        language: {
            type: String,
            required: true
        },
        initialCode: {
            type: String,
            required: true
        }
    }],
    referenceSolution: [{
        language: {
            type: String,
            required: true
        },
        completeSolution: {
            type: String,
            required: true
        }
    }],
    problemCreator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    ytlink: {
        type: String,
        default: ""
    }

})

const Problem = mongoose.model('problem', problemSchema);

module.exports = Problem;