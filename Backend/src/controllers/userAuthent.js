const validate = require('../utils/validator')
const bcrypt = require('bcrypt');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const redisClient = require('../config/redis');
const Submission = require('../models/submission')
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {

    try {

        // validate the user
        validate(req.body);
        const { firstName, emailId, password } = req.body;

        // bcrypt the password
        req.body.password = await bcrypt.hash(password, 10);

        req.body.role = 'user';

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            res.status(400).send("Error: Email already registered.");
            return;
        }

        const user = await User.create(req.body);

        const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });

        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
            sameSite: 'none', // Allow cross-site requests
            secure: true      // Required when sameSite is 'none'
        });
        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

const login = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password)
            throw new Error("Invalid Credentials");

        // find user
        const user = await User.findOne({ emailId })
        if (!user) throw new Error("Invalid Credentials");

        // match password
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new Error("Invalid Credentials");

        // create token for cookie
        const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });
        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
            sameSite: 'none', // Allow cross-site requests
            secure: true      // Required when sameSite is 'none'
        });
        res.status(200).json({
            message: "Login Successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                role: user.role
            }
        });
    }
    catch (error) {
        res.status(400).send("Error: " + error.message);
    }
}

const logout = async (req, res) => {
    try {
        const { token } = req.cookies;
        const payload = jwt.decode(token);

        // try {
        //     await redisClient.set(`token:${token}`, 'Blocked');
        //     await redisClient.expireAt(`token:${token}`, payload.exp);
        // } catch (err) {
        //     console.error("Redis logout tracking failed:", err.message);
        // }

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            path: '/'
        });
        res.send("Logged Out Successfully");
    }
    catch (error) {
        console.error("Logout Error: " + error);
        res.status(500).send("Logout Error: " + error);
    }
}

const adminRegister = async (req, res) => {
    try {
        validate(req.body);
        const { emailId, password } = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        req.body.role = 'admin';

        const existingUser = await User.findOne({ emailId });
        if (existingUser) {
            res.status(400).send("Error: Email already registered.");
            return;
        }

        const user = await User.create(req.body);
        const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });

        res.cookie('token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
            sameSite: 'none', // Allow cross-site requests
            secure: true      // Required when sameSite is 'none'
        });
        res.status(201).send("Admin registered successfully");
    }
    catch (error) {
        res.status(400).send("Error: " + error);
    }
}

const deleteProfile = async (req, res) => {
    try {
        const userId = req.result._id;
        await User.findByIdAndDelete(userId);
        await Submission.deleteMany({ userId });
        res.status(200).send("Delete Successfully");
    }
    catch (err) {
        res.status(400).send("Internal Server Error");
    }
}
const getProfile = async (req, res) => {
    try {
        // console.log(req.result);
        res.status(200).json(req.result);
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
}

const googleAuth = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            throw new Error("Invalid Google token provided");
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;

        let user = await User.findOne({ emailId: email });

        if (!user) {
            // User does not exist, create a new one with a random password
            const randomPassword = crypto.randomBytes(16).toString('hex');
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = await User.create({
                firstName: given_name || email.split('@')[0], // Fallback if given_name is not available
                lastName: family_name || '',
                emailId: email,
                password: hashedPassword,
                role: 'user',
                profileImage: picture || "https://res.cloudinary.com/diq2vbfgs/image/upload/v1772708785/defaultProfile_eo9p4m.png"
            });
        }

        // Login user
        const jwtToken = jwt.sign(
            { _id: user._id, emailId: user.emailId, role: user.role },
            process.env.JWT_KEY,
            { expiresIn: '7d' }
        );

        res.cookie('token', jwtToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            path: '/',
            sameSite: 'none',
            secure: true
        });

        res.status(200).json({
            message: "Google Login Successfully",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                emailId: user.emailId,
                role: user.role,
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        res.status(400).send("Error validating Google token: " + error.message);
    }
}

module.exports = { register, login, logout, adminRegister, deleteProfile, getProfile, googleAuth };

// const validate = require('../utils/validator')
// const bcrypt = require('bcrypt');
// const User = require('../models/user')
// const jwt = require('jsonwebtoken');
// const redisClient = require('../config/redis');
// const Submission = require('../models/submission')

// const register = async (req, res) => {

//     try {

//         // validate the user
//         validate(req.body);
//         const { firstName, emailId, password } = req.body;

//         // bcrypt the password
//         req.body.password = await bcrypt.hash(password, 10);

//         req.body.role = 'user';

//         const existingUser = await User.findOne({ emailId });
//         if (existingUser) {
//             res.status(400).send("Error: Email already registered.");
//             return;
//         }

//         const user = await User.create(req.body);

//         const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });

//         res.cookie('token', token, {
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             httpOnly: true,
//             path: '/',
//             sameSite: 'none', // Allow cross-site requests
//             secure: true      // Required when sameSite is 'none'
//         });
//         res.status(201).json({
//             message: "User Registered Successfully",
//             user: {
//                 _id: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 emailId: user.emailId,
//                 role: user.role
//             }
//         });
//     }
//     catch (error) {
//         res.status(400).send("Error: " + error.message);
//     }
// }

// // const login = async (req, res) => {
// //     try {
// //         const { emailId, password } = req.body;
// //         // console.log(emailId, password);
// //         if (!emailId || !password)
// //             throw new Error("Invalid Credentials");

// //         // find user
// //         const user = await User.findOne({ emailId })
// //         if (!user) throw new Error("Invalid Credentials");
// //         // console.log(user);
// //         // match password
// //         const match = await bcrypt.compare(password, user.password);
// //         if (!match)
// //             throw new Error("Invalid Credentials");
// //         // console.log(match);
// //         // create token for cookie
// //         const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });
// //         res.cookie('token', token, {
// //             maxAge: 7 * 24 * 60 * 60 * 1000,
// //             httpOnly: true,
// //             path: '/',
// //             sameSite: 'none', // Allow cross-site requests
// //             secure: true      // Required when sameSite is 'none'
// //         });
// //         res.status(200).json({
// //             message: "Login Successfully",
// //             user: {
// //                 _id: user._id,
// //                 firstName: user.firstName,
// //                 lastName: user.lastName,
// //                 emailId: user.emailId,
// //                 role: user.role
// //             }
// //         });
// //     }
// //     catch (error) {
// //         res.status(400).send("Error: " + error.message);
// //     }
// // }

// const login = async (req, res) => {
//     try {
//         const { emailId, password } = req.body;

//         if (!emailId || !password)
//             throw new Error("Invalid Credentials");

//         const user = await User.findOne({ emailId });
//         if (!user) throw new Error("Invalid Credentials");

//         // console.log("Password from request:", password);
//         // console.log("Password from DB:", user.password);

//         const match = await bcrypt.compare(password, user.password);

//         if (!match)
//             throw new Error("Invalid Credentials");

//         const token = jwt.sign(
//             { _id: user._id, emailId: user.emailId, role: user.role },
//             process.env.JWT_KEY,
//             { expiresIn: "7d" }
//         );

//         res.cookie("token", token, {
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             httpOnly: true,
//             path: "/",
//             sameSite: "none",
//             secure: true
//         });

//         res.status(200).json({
//             message: "Login Successfully",
//             user: {
//                 _id: user._id,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 emailId: user.emailId,
//                 role: user.role
//             }
//         });

//     } catch (error) {
//         res.status(400).send("Error: " + error.message);
//     }
// };

// const logout = async (req, res) => {
//     try {
//         const { token } = req.cookies;
//         const payload = jwt.decode(token);

//         // try {
//         //     await redisClient.set(`token:${token}`, 'Blocked');
//         //     await redisClient.expireAt(`token:${token}`, payload.exp);
//         // } catch (err) {
//         //     console.error("Redis logout tracking failed:", err.message);
//         // }

//         res.cookie("token", null, {
//             expires: new Date(Date.now()),
//             httpOnly: true,
//             path: '/'
//         });
//         res.send("Logged Out Successfully");
//     }
//     catch (error) {
//         console.error("Logout Error: " + error);
//         res.status(500).send("Logout Error: " + error);
//     }
// }

// const adminRegister = async (req, res) => {
//     try {
//         validate(req.body);
//         const { emailId, password } = req.body;
//         req.body.password = await bcrypt.hash(password, 10);
//         req.body.role = 'admin';

//         const existingUser = await User.findOne({ emailId });
//         if (existingUser) {
//             res.status(400).send("Error: Email already registered.");
//             return;
//         }

//         const user = await User.create(req.body);
//         const token = jwt.sign({ _id: user._id, emailId: user.emailId, role: user.role }, process.env.JWT_KEY, { expiresIn: '7d' });

//         res.cookie('token', token, {
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             httpOnly: true,
//             path: '/',
//             sameSite: 'none', // Allow cross-site requests
//             secure: true      // Required when sameSite is 'none'
//         });
//         res.status(201).send("Admin registered successfully");
//     }
//     catch (error) {
//         res.status(400).send("Error: " + error);
//     }
// }

// const deleteProfile = async (req, res) => {
//     try {
//         const userId = req.result._id;
//         await User.findByIdAndDelete(userId);
//         await Submission.deleteMany({ userId });
//         res.status(200).send("Delete Successfully");
//     }
//     catch (err) {
//         res.status(400).send("Internal Server Error");
//     }
// }
// const getProfile = async (req, res) => {
//     try {
//         res.status(200).json(req.result);
//     } catch (err) {
//         res.status(400).send("Error: " + err.message);
//     }
// }

// module.exports = { register, login, logout, adminRegister, deleteProfile, getProfile };

