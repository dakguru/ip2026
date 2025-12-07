import { PlanItem, ProgressData } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface DashboardProps {
    plan: PlanItem[];
    progress: ProgressData;
}

export default function AnalyticsDashboard({ plan, progress }: DashboardProps) {
    // 1. Calculate Overall Completion
    // Filter out revision/mock for core syllabus tracking if desired, OR keep all.
    // Let's track "Core Topics" (Heavy/Light/Practice) separately from Mocks/Revision for syllabus coverage?
    // The user asked for "Syllabus Tracker", usually implies Study Topics.

    const studyItems = plan.filter(p => p.type !== 'revision');
    const totalItems = studyItems.length;
    const completedItems = studyItems.filter(p => progress[p.date]?.completed).length;
    const percentage = Math.round((completedItems / totalItems) * 100) || 0;

    // 2. Paper-wise Breakdown
    const getPaperProgress = (categoryStr: string) => {
        // Naive check: "Paper I", "Paper II", "Paper III" exist in title or category if mapped
        // Our planner output puts category in title like "Paper I: Post Office Act..."
        const items = studyItems.filter(p => p.title.includes(categoryStr));
        const done = items.filter(p => progress[p.date]?.completed).length;
        return { total: items.length, done, percent: Math.round((done / items.length) * 100) || 0 };
    };

    const p1 = getPaperProgress("Paper I");
    const p2 = getPaperProgress("Paper II"); // Note: Paper II is Drafting practice mostly
    const p3 = getPaperProgress("Paper III");

    // 3. Pie Chart Data: Completed vs Pending vs Overdue
    const today = new Date().toISOString().split('T')[0];

    let overdueCount = 0;
    let pendingFutureCount = 0;

    studyItems.forEach(p => {
        if (!progress[p.date]?.completed) {
            if (p.date < today) overdueCount++;
            else pendingFutureCount++;
        }
    });

    const chartData = [
        { name: 'Completed', value: completedItems, color: '#2563eb' }, // Blue
        { name: 'Overdue', value: overdueCount, color: '#ef4444' },     // Red
        { name: 'Pending', value: pendingFutureCount, color: '#e4e4e7' }, // Gray
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-zinc-100 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left: Progress Stats */}
                <div className="space-y-6">
                    <div>
                        <h3 className="text-zinc-500 text-xs font-bold uppercase tracking-wider mb-2">Overall Syllabus Coverage</h3>
                        <div className="flex items-end justify-between mb-2">
                            <span className="text-3xl font-bold text-zinc-900">{percentage}%</span>
                            <span className="text-sm text-zinc-500 mb-1">{completedItems} / {totalItems} User Slots</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                    </div>

                    <div className="space-y-4">
                        {/* Paper I */}
                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-zinc-700">Paper I (Dept. Rules)</span>
                                <span className="text-blue-600">{p1.percent}%</span>
                            </div>
                            <Progress value={p1.percent} className="h-1.5" />
                        </div>
                        {/* Paper III */}
                        <div>
                            <div className="flex justify-between text-xs font-semibold mb-1">
                                <span className="text-zinc-700">Paper III (General)</span>
                                <span className="text-blue-600">{p3.percent}%</span>
                            </div>
                            <Progress value={p3.percent} className="h-1.5" />
                        </div>
                    </div>
                </div>

                {/* Right: Pie Chart */}
                <div className="h-48 relative">
                    <h3 className="absolute top-0 left-0 text-zinc-500 text-xs font-bold uppercase tracking-wider">Status Distribution</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={70}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
