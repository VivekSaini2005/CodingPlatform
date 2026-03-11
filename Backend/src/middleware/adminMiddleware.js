const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis")


const adminMiddleware = async (req, res, next) => {
    try {

        // console.log(req.body);
        const { token } = req.cookies;
        // console.log('1');

        if (!token)
            throw new Error("Token is not Present");
        // console.log('2');
        const payload = jwt.verify(token, process.env.JWT_KEY);
        // console.log('3');
        const { _id } = payload;

        if (!_id) {
            throw new Error("Id is missing");
        }
        // console.log('4');
        if (payload.role != 'admin')
            throw new Error("Invalid Token");
        // console.log('5');
        const result = await User.findOne({ _id });

        if (!result)
            throw new Error("User does not exist");
        // console.log('6');
        // const IsBlocked = await redisClient.exists(`token:${token}`);
        // if (IsBlocked)
        //     throw new Error("Invalid Token");
        // console.log('7');
        // console.log(result);
        // console.log(req.body);
        req.result = result;
        // console.log('8');
        next();
    }
    catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

module.exports = adminMiddleware;
