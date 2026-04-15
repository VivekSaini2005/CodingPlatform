import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

const trendData = [
    { day: "Mon", rank: 50, avg: 65 },
    { day: "Tue", rank: 70, avg: 80 },
    { day: "Wed", rank: 90, avg: 80 },
    { day: "Thu", rank: 75, avg: 85 },
    { day: "Fri", rank: 65, avg: 78 },
    { day: "Sat", rank: 120, avg: 110 },
    { day: "Sun", rank: 110, avg: 100 },
];

export default function LeaderboardTrendChart() {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">Weekly Rank Progress</p>
                <span className="rounded-md bg-green-500/10 px-2 py-1 text-xs text-green-600 dark:text-green-400">↑ Improving</span>
            </div>

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white/60 p-5 shadow-lg backdrop-blur-xl transition duration-300 hover:shadow-xl dark:border-white/10 dark:bg-white/5 animate-[float_6s_ease-in-out_infinite]">
                <div className="relative z-10 h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={trendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="rankGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="avgGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2} />
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid stroke="rgba(148, 163, 184, 0.05)" vertical={false} />

                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: "#9ca3af", fontSize: 12 }}
                            />
                            <YAxis
                                hide={true}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "#020617",
                                    border: "none",
                                    borderRadius: "10px",
                                    color: "#fff",
                                }}
                                labelStyle={{ color: "#cbd5e1" }}
                                cursor={{ stroke: "rgba(148, 163, 184, 0.2)", strokeWidth: 1 }}
                            />

                            <Area
                                type="monotone"
                                dataKey="rank"
                                stroke="#6366f1"
                                fill="url(#rankGradient)"
                                strokeWidth={3}
                                dot={false}
                                activeDot={{
                                    r: 6,
                                    stroke: "#6366f1",
                                    strokeWidth: 2,
                                    fill: "#fff",
                                }}
                                filter="drop-shadow(0 0 6px rgba(99,102,241,0.5))"
                                isAnimationActive={true}
                                animationDuration={1500}
                            />

                            <Area
                                type="monotone"
                                dataKey="avg"
                                stroke="#22c55e"
                                fill="url(#avgGradient)"
                                strokeWidth={3}
                                dot={false}
                                activeDot={false}
                                isAnimationActive={true}
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
