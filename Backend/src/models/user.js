const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 20,
    },
    age: {
        type: Number,
        min: 5,
        max: 80,
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    problemSolved: [{
        type: Schema.Types.ObjectId,
        ref: "problem"
    }],
    solvedCount: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        required: true,
        // select: false
    },
    score: {
        type: Number,
        default: 0
    },
    profileImage: {
        type: String,
        default: "https://res.cloudinary.com/diq2vbfgs/image/upload/v1772708785/defaultProfile_eo9p4m.png"
    },
    coverImage: {
        type: String,
        default: "https://res.cloudinary.com/diq2vbfgs/image/upload/v1772708785/defaultCover_dpdodu.png"
    }
}, {
    timestamps: true,
})

const User = mongoose.model("user", userSchema);

module.exports = User;