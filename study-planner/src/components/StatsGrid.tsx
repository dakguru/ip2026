import { Clock, Layers, FileText, RefreshCw } from "lucide-react";

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex items-start gap-4">
                <div className="p-2.5 bg-yellow-50 rounded-lg text-yellow-600">
                    <Clock className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-zinc-500 mb-0.5">Daily Goal</p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-0.5">2.5 Hours</h3>
                    <p className="text-[10px] text-zinc-400">Consistent small chunks</p>
                </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex items-start gap-4">
                <div className="p-2.5 bg-blue-50 rounded-lg text-blue-600">
                    <Layers className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-zinc-500 mb-0.5">Syllabus Cycles</p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-0.5">2.0x Cycles</h3>
                    <p className="text-[10px] text-zinc-400">92 Study Slots total</p>
                </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex items-start gap-4">
                <div className="p-2.5 bg-purple-50 rounded-lg text-purple-600">
                    <FileText className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-zinc-500 mb-0.5">Mock Tests</p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-0.5">8 Tests</h3>
                    <p className="text-[10px] text-zinc-400">Last Saturday of month</p>
                </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-zinc-100 flex items-start gap-4">
                <div className="p-2.5 bg-red-50 rounded-lg text-red-600">
                    <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs font-medium text-zinc-500 mb-0.5">Revision Days</p>
                    <h3 className="text-xl font-bold text-zinc-900 mb-0.5">35 Sundays</h3>
                    <p className="text-[10px] text-zinc-400">Review weekly notes</p>
                </div>
            </div>
        </div>
    );
}
