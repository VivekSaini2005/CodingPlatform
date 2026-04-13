const User = require("../models/user");

const getLeaderboard = async (req, res) => {
    try {

        const users = await User.find({})
            .select("firstName lastName score problemSolved profileImage")
            .sort({ score: -1 });

        const leaderboard = users.map((user, index) => ({
            rank: index + 1,
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            score: user.score || 0,
            solved: user.problemSolved?.length || 0,
            profileImage: user.profileImage
        }));

        res.json(leaderboard);

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch leaderboard",
            error: error.message
        });

    }
};

module.exports = { getLeaderboard };