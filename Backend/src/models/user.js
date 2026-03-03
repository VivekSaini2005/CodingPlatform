const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type: String,
        required : true,
        minLength : 3,
        maxLength : 20
    },
    lastName:{
        type: String,
        minLength : 3,
        maxLength : 20,
    },
    age:{
        type: Number,
        min : 5,
        max : 80,
    },
    emailId:{
        type: String,
        required: true,
        unique : true,
        trim : true,
        lowercase : true,
        immutable : true,
    },
    role:{
        type : String,
        enum : ['user','admin','superadmin'],
        default : 'user',
    },
    problemSolved:{
        type:[{
            type:Schema.Types.ObjectId,
            ref:'problem'
        }],
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps : true,
})

const User = mongoose.model("user",userSchema);

module.exports = User;