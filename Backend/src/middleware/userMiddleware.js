const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis")


const userMiddleware = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        // console.log(token);

        if (!token)
            throw new Error("Token is not Present");

        const payload = jwt.verify(token, process.env.JWT_KEY);

        // console.log(payload);
        const { _id } = payload;

        if (!_id) {
            throw new Error("Id is missing");
        }
        // console.log(_id);
        const result = await User.findById(_id);

        // console.log(result);
        if (!result)
            throw new Error("User does not exist");

        // let IsBlocked = false;
        // try {
        //     IsBlocked = await redisClient.exists(`token:${token}`);
        // } catch (err) {
        //     console.error("Redis check failed, skipping blocklist check:", err.message);
        // }

        // if (IsBlocked)
        //     throw new Error("Invalid Token");
        // console.log(result);
        req.result = result;
        // console.log("next pauch gaya ");
        next();
    }
    catch (error) {
        res.status(400).send("Error: " + error);
    }
}

module.exports = userMiddleware;
