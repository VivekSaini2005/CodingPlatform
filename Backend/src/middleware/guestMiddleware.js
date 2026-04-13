const jwt = require("jsonwebtoken");
const User = require("../models/user");
const redisClient = require("../config/redis");

const guestMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        // If no token, assign guest role
        if (!token) {
            req.result = { _id: "guest", role: "guest" };
            return next();
        }

        // If token exists, try to verify it (like userMiddleware)
        const payload = jwt.verify(token, process.env.JWT_KEY);
        const { _id } = payload;

        if (!_id) {
            // Invalid payload, treat as guest
            req.result = { _id: "guest", role: "guest" };
            return next();
        }

        const result = await User.findById(_id);
        if (!result) {
            // User not found, treat as guest
            req.result = { _id: "guest", role: "guest" };
            return next();
        }

        let IsBlocked = false;
        try {
            IsBlocked = await redisClient.exists(`token:${token}`);
        } catch (err) {
            console.error("Redis check failed in guestMiddleware, proceeding as partial guest:", err.message);
        }

        if (IsBlocked) {
            // Token blocked, treat as guest
            req.result = { _id: "guest", role: "guest" };
            return next();
        }

        // Valid user
        req.result = result;
        next();

    } catch (error) {
        // Any error in verification -> treat as guest
        // console.log("Guest Middleware: Token verification failed, proceeding as guest.", error.message);
        req.result = { _id: "guest", role: "guest" };
        next();
    }
}

module.exports = guestMiddleware;
