const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis")


const adminMiddleware = async(req,res,next)=>{
    try{

        const {token} = req.cookies;
        // console.log(req.body)

        if(!token)
            throw new Error("Token is not Present");

        const payload = jwt.verify(token,process.env.JWT_KEY);
        
        const {_id} = payload;

        if(!_id){
            throw new Error("Id is missing");
        }

        if(payload.role != 'admin')
            throw new Error("Invalid Token");

        const result = await User.findOne({_id});

        if(!result)
            throw new Error("User does not exist");

        const IsBlocked = await redisClient.exists(`token:${token}`);
        if(IsBlocked)
            throw new Error("Invalid Token");

        req.result = result;

        next();
    }
    catch(error){
        res.status(400).send("Error: " + error);
    }
}

module.exports = adminMiddleware;
