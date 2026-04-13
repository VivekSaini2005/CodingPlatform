import { Trophy, Medal, Award } from "lucide-react";

function PodiumCard({ user, rank }) {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    // Define colors and styles based on rank
    const getCardStyle = () => {
        if (isFirst) {
            return "bg-gradient-to-b from-yellow-50 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/20 border-yellow-400 dark:border-yellow-400 shadow-[0_0_25px_rgba(234,179,8,0.6)]";
        }
        if (isSecond) {
            return "bg-gradient-to-b from-slate-50 to-gray-100 dark:from-slate-800/40 dark:to-gray-900/20 border-slate-300 dark:border-slate-500 shadow-[0_0_10px_rgba(148,163,184,0.3)]";
        }
        return "bg-gradient-to-b from-orange-50/50 to-amber-50/50 dark:from-orange-900/10 dark:to-amber-900/5 border-orange-300/50 dark:border-orange-800/50 shadow-sm";
    };

    const getIcon = () => {
        if (isFirst) return <Trophy className="w-16 h-16 text-yellow-500 drop-shadow-[0_0_12px_rgba(234,179,8,0.8)]" />;
        if (isSecond) return <Medal className="w-12 h-12 text-slate-400 drop-shadow-[0_0_6px_rgba(148,163,184,0.4)]" />;
        return <Award className="w-12 h-12 text-orange-700 dark:text-orange-600 drop-shadow-sm" />;
    };

    const getAvatarBorder = () => {
        if (isFirst) return "border-yellow-400 ring-4 ring-yellow-400/50";
        if (isSecond) return "border-slate-300 ring-2 ring-slate-400/30";
        return "border-orange-300 dark:border-orange-700 ring-1 ring-orange-400/20";
    };

    const getTextColor = () => {
        if (isFirst) return "text-yellow-600 dark:text-yellow-400";
        if (isSecond) return "text-slate-600 dark:text-slate-300";
        return "text-orange-800 dark:text-orange-600";
    };

    return (
        <div
            className={`
                relative flex flex-col items-center border rounded-2xl p-6 text-center
                transition-all duration-300 hover:-translate-y-2
                ${getCardStyle()}
                ${isFirst ? "scale-110 z-10 mx-4" : "scale-100 z-0"}
            `}
        >
            {/* Rank Badge */}
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full font-bold text-white shadow-md border-2 border-white dark:border-gray-800
                ${isFirst ? "bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.8)]" : isSecond ? "bg-slate-400" : "bg-orange-700"}
            `}>
                #{rank}
            </div>

            <div className="flex justify-center mb-6 mt-2">
                {getIcon()}
            </div>

            <div className="relative mb-4">
                <img
                    src={user.profileImage || "/default-avatar.png"}
                    alt={`${user.firstName}'s avatar`}
                    className={`object-cover rounded-full border-4 bg-white dark:bg-gray-800
                    ${isFirst ? "w-24 h-24" : "w-20 h-20"} 
                    ${getAvatarBorder()}`}
                />
            </div>

            <h3 className={`font-bold text-xl truncate w-full px-2 ${getTextColor()}`}>
                {user.firstName} {user.lastName}
            </h3>

            <div className={`text-3xl font-black mt-3 ${getTextColor()}`}>
                {user.solved}
            </div>

            <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
                Solved
            </div>

        </div>
    );
}

export default PodiumCard;