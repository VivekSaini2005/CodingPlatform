import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { Trophy, Medal, Award } from "lucide-react";
import PodiumCard from "../components/PodiumCard";
import LeaderboardTrendChart from "../components/LeaderboardTrendChart";

export default function LeaderboardPage() {

    const [users, setUsers] = useState([]);

    console.log("user ka data", users);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        const { data } = await axiosInstance.get("user/leaderboard");
        setUsers(data);
    };

    const getRankIcon = (rank) => {
        switch (rank) {
            case 1:
                return <Trophy className="w-7 h-7 text-yellow-500 drop-shadow-md" />;
            case 2:
                return <Medal className="w-7 h-7 text-slate-400 drop-shadow-md" />;
            case 3:
                return <Award className="w-7 h-7 text-orange-600 drop-shadow-sm" />;
            default:
                return <span className="text-lg font-bold text-gray-500 dark:text-gray-400">#{rank}</span>;
        }
    };

    const top3 = users.slice(0, 3);

    return (
        <>
            <section className="relative overflow-hidden w-full py-12 md:py-16 px-6 md:px-12 bg-linear-to-b from-white via-gray-50 to-transparent dark:from-[#020617] dark:via-[#020617] dark:to-transparent border-b border-gray-200 dark:border-white/10">
                <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                    <div className="w-full md:w-1/2 max-w-xl text-center md:text-left space-y-3">
                        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                            Global Leaderboard
                        </h1>
                        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto md:mx-0">
                            Compete with top programmers and climb the ranks
                        </p>
                    </div>

                    <div className="w-full md:w-112.5">
                        <LeaderboardTrendChart />
                    </div>
                </div>
            </section>

            <div className="max-w-6xl mx-auto px-6 py-8">

            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold mb-3 text-gray-900 dark:text-white tracking-tight">Leaderboard</h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    Top coders on the platform
                </p>
            </div>

            {/* Top 3 Podium */}

            {top3.length === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto items-end">

                    {/* Second Place */}
                    <div className="order-2 md:order-1 h-full flex flex-col justify-end">
                        <PodiumCard user={top3[1]} rank={2} />
                    </div>

                    {/* First Place */}
                    <div className="order-1 md:order-2 h-full flex flex-col justify-end">
                        <PodiumCard user={top3[0]} rank={1} />
                    </div>

                    {/* Third Place */}
                    <div className="order-3 md:order-3 h-full flex flex-col justify-end">
                        <PodiumCard user={top3[2]} rank={3} />
                    </div>

                </div>
            )}

            {/* Leaderboard Table */}

            <div className="bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 shadow-sm rounded-xl overflow-hidden backdrop-blur-sm">

                <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">

                        <thead className="bg-gray-50/80 dark:bg-gray-900/40 border-b border-gray-200 dark:border-gray-700/50">

                            <tr>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-24 text-center">Rank</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Solved</th>
                                <th className="px-6 py-5 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider text-right">Score</th>
                            </tr>

                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">

                            {users.map((user) => (

                                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200 group">

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center h-full">
                                            {getRankIcon(user.rank)}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4">

                                        <div className="flex items-center gap-4">

                                            <div className="relative">
                                                <img
                                                    src={user.profileImage || "/default-avatar.png"}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-blue-500 transition-colors duration-200"
                                                    alt={`${user.firstName}'s avatar`}
                                                />
                                            </div>

                                            <div>
                                                <div className="font-bold text-gray-900 dark:text-gray-100 text-base">
                                                    {user.firstName} {user.lastName}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    @{user.username || user.firstName.toLowerCase()}
                                                </div>
                                            </div>

                                        </div>

                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="inline-flex items-center justify-end font-bold text-lg text-orange-600 dark:text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
                                            {user.solved}
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-right">
                                        <div className="font-extrabold text-xl text-blue-600 dark:text-blue-500 font-mono">
                                            {user.score}
                                        </div>
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>
                </div>

            </div>

            </div>
        </>
    );
}