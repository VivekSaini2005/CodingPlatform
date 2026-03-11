const User = require("../models/user");


const getUserRank = async (req, res) => {
    try {

        const userId = req.result._id;

        const currentUser = await User.findById(userId);

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Count users with higher score
        const betterUsers = await User.countDocuments({
            score: { $gt: currentUser.score }
        });

        const rank = betterUsers + 1;

        const totalUsers = await User.countDocuments();

        const topPercent = ((rank / totalUsers) * 100).toFixed(2);

        console.log(rank, topPercent, totalUsers);

        res.json({
            rank,
            topPercent,
            score: currentUser.score
        });

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
};

// const getUserRank = async (req, res) => {
//     try {

//         // console.log(req.result);
//         const userId = req.result._id;
//         // console.log("yah bhi chal raha hai")
//         const currentUser =
//             await User.findById(userId);

//         const betterUsers =
//             await User.countDocuments({
//                 solvedCount: {
//                     $gt: currentUser.solvedCount
//                 }
//             });

//         // console.log(betterUsers);

//         // const betterUsers = 5;

//         const rank = betterUsers + 1;

//         const totalUsers = await User.countDocuments();

//         // console.log(totalUsers)
//         // const totalUsers = 10;
//         const topPercent =
//             ((rank / totalUsers) * 100).toFixed(2);

//         console.log(rank, topPercent, totalUsers);
//         res.json({
//             rank,
//             topPercent,
//             solved:
//                 currentUser.solvedCount
//         });

//     } catch (err) {
//         res.status(500).json({
//             error: err.message
//         });
//     }
// };

module.exports = getUserRank;