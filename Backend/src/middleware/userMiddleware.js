const User = require("../models/user");
const jwt = require("jsonwebtoken");
const redisClient = require("../config/redis")


const userMiddleware = async (req, res, next) => {
    try {

        const { token } = req.cookies;

        if (!token)
            throw new Error("Token is not Present");

        const payload = jwt.verify(token, process.env.JWT_KEY);

        const { _id } = payload;

        if (!_id) {
            throw new Error("Id is missing");
        }

        const result = await User.findById(_id);

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

        req.result = result;

        next();
    }
    catch (error) {
        res.status(400).send("Error: " + error);
    }
}

module.exports = userMiddleware;
