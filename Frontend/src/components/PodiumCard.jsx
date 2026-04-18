import { Trophy, Medal, Award } from "lucide-react";

function PodiumCard({ user, rank }) {
    const isFirst = rank === 1;
    const isSecond = rank === 2;
    const isThird = rank === 3;

    // Define colors and styles based on rank
    const getCardStyle = () => {
        if (isFirst) {
            return "bg-white dark:bg-[#262626] border-yellow-500";
        }
        if (isSecond) {
            return "bg-white dark:bg-[#262626] border-[#4b5563]";
        }
        return "bg-white dark:bg-[#262626] border-orange-500/60";
    };

    const getIcon = () => {
        if (isFirst) return <Trophy className="w-16 h-16 text-yellow-500" />;
        if (isSecond) return <Medal className="w-12 h-12 text-slate-400" />;
        return <Award className="w-12 h-12 text-orange-500" />;
    };

    const getAvatarBorder = () => {
        if (isFirst) return "border-yellow-500";
        if (isSecond) return "border-slate-400";
        return "border-orange-500";
    };

    const getTextColor = () => {
        if (isFirst) return "text-yellow-600 dark:text-yellow-400";
        if (isSecond) return "text-slate-600 dark:text-slate-300";
        return "text-orange-800 dark:text-orange-600";
    };

    return (
        <div
            className={`
                relative flex flex-col items-center border rounded-xl p-6 text-center
                transition-all duration-300 hover:-translate-y-2
                ${getCardStyle()}
                ${isFirst ? "scale-110 z-10 mx-4" : "scale-100 z-0"}
            `}
        >
            {/* Rank Badge */}
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center rounded-full font-bold text-white border-2 border-[#1f1f1f]
                ${isFirst ? "bg-yellow-500" : isSecond ? "bg-slate-500" : "bg-orange-600"}
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
                    className={`object-cover rounded-full border-4 bg-white dark:bg-[#262626]
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