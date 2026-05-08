
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    Save, Send, X, ArrowLeft, Loader2,
    FileText, Info, BookOpen, Zap,
    Link as LinkIcon, Image as ImageIcon, Calendar, Tag
} from "lucide-react";
import Link from "next/link";

interface DakSutraFormProps {
    initialData?: any;
    isEdit?: boolean;
}

const ACT_NAMES = [
    "Post Office Guide Part I",
    "Post Office Guide Part II",
    "Postal Manual Volume II",
    "Postal Manual Volume IV",
    "Postal Manual Volume V",
    "Postal Manual Volume VI",
    "Postal Manual Volume VII",
    "SB Orders",
    "Post Office Act 2023",
    "PMLA Act",
    "GDS Conduct & Engagement Rules",
    "DFPR 2024"
];

const EXAM_TAGS = ["LDCE IP", "PS Group B", "GDS"];

export default function DakSutraForm({ initialData, isEdit }: DakSutraFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        rule_number: "",
        act_name: ACT_NAMES[0],
        category: "Rule",
        effective_date: "",
        exam_tags: [] as string[],
        official_text: "",
        guru_explanation: "",
        practical_example: "",
        exam_insight: "",
        document_url: "",
        featured_image: "",
        status: "draft"
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                effective_date: initialData.effective_date ? new Date(initialData.effective_date).toISOString().split('T')[0] : ""
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagToggle = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            exam_tags: prev.exam_tags.includes(tag)
                ? prev.exam_tags.filter(t => t !== tag)
                : [...prev.exam_tags, tag]
        }));
    };

    const handleSubmit = async (statusOverride?: 'draft' | 'published') => {
        setIsLoading(true);
        const submissionData = {
            ...formData,
            status: statusOverride || formData.status
        };

        try {
            const url = isEdit ? `/api/admin/dak-sutra/${initialData._id}` : '/api/admin/dak-sutra';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submissionData)
            });

            if (res.ok) {
                router.push('/admin/dak-sutra');
                router.refresh();
            } else {
                alert("Failed to save entry");
            }
        } catch (error) {
            console.error("Submit error", error);
            alert("Error saving entry");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            {/* Action Bar */}
            <div className="sticky top-0 z-10 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/dak-sutra" className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 italic">
                        {isEdit ? 'Edit Dak Sutra' : 'New Dak Sutra Entry'}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleSubmit('draft')}
                        disabled={isLoading}
                        className="px-4 py-2 text-sm font-semibold text-zinc-600 dark:text-zinc-400 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl hover:bg-zinc-50 transition-all flex items-center gap-2"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        Save Draft
                    </button>
                    <button
                        onClick={() => handleSubmit('published')}
                        disabled={isLoading}
                        className="px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 active:scale-95"
                    >
                        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        {isEdit ? 'Update Entry' : 'Publish Now'}
                    </button>
                </div>
            </div>

            {/* Basic Info */}
            <section className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-6">
                <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <Info className="w-5 h-5" />
                    <h3 className="font-bold">Basic Information</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Title (Required)</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Leave Rules for GDS"
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-3 text-lg font-bold outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Rule / Section Number</label>
                        <input
                            type="text"
                            name="rule_number"
                            value={formData.rule_number}
                            onChange={handleChange}
                            placeholder="e.g. Rule 4 of GDS 2020"
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Act / Manual Name</label>
                        <select
                            name="act_name"
                            value={formData.act_name}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                        >
                            {ACT_NAMES.map(act => <option key={act} value={act}>{act}</option>)}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                        >
                            <option value="Rule">Rule</option>
                            <option value="Section">Section</option>
                            <option value="Regulation">Regulation</option>
                            <option value="Circular">Circular</option>
                            <option value="Explanation">Explanation</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1">Effective Date</label>
                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                            <input
                                type="date"
                                name="effective_date"
                                value={formData.effective_date}
                                onChange={handleChange}
                                className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Tag className="w-4 h-4" /> Exam Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {EXAM_TAGS.map(tag => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => handleTagToggle(tag)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border
                                    ${formData.exam_tags.includes(tag)
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20'
                                        : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-500'
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Blocks */}
            <div className="space-y-8">
                {/* Official Text */}
                <section className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800 space-y-4">
                    <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100">
                        <div className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg">
                            <FileText className="w-5 h-5 text-zinc-500" />
                        </div>
                        <h3 className="font-bold">Official Text / Provision</h3>
                    </div>
                    <textarea
                        name="official_text"
                        value={formData.official_text}
                        onChange={handleChange}
                        placeholder="Paste the official text exactly as per manual..."
                        className="w-full bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-4 min-h-[200px] font-serif leading-relaxed outline-none focus:ring-2 focus:ring-zinc-500/20 transition-all"
                        required
                    />
                </section>

                {/* Dak Guru Explanation */}
                <section className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 p-6 rounded-3xl shadow-sm border border-blue-100 dark:border-blue-900/40 space-y-4">
                    <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                        <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold">Dak Guru Explanation</h3>
                    </div>
                    <textarea
                        name="guru_explanation"
                        value={formData.guru_explanation}
                        onChange={handleChange}
                        placeholder="Simplify the rule for students..."
                        className="w-full bg-white/80 dark:bg-zinc-900/50 border border-blue-200 dark:border-blue-800 rounded-2xl px-4 py-4 min-h-[200px] outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                        required
                    />
                </section>

                {/* Practical Example */}
                <section className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 p-6 rounded-3xl shadow-sm border border-amber-100 dark:border-amber-900/40 space-y-4">
                    <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                        <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                            <Info className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="font-bold">Practical Example (Optional)</h3>
                    </div>
                    <textarea
                        name="practical_example"
                        value={formData.practical_example}
                        onChange={handleChange}
                        placeholder="Provide a real-world scenario or calculation..."
                        className="w-full bg-white/80 dark:bg-zinc-900/50 border border-amber-200 dark:border-amber-800 rounded-2xl px-4 py-4 min-h-[150px] outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                    />
                </section>

                {/* LDCE Exam Insight */}
                <section className="bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 p-6 rounded-3xl shadow-sm border border-emerald-100 dark:border-emerald-900/40 space-y-4">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm">
                            <Zap className="w-5 h-5 text-emerald-500" />
                        </div>
                        <h3 className="font-bold">LDCE Exam Insight (Optional)</h3>
                    </div>
                    <textarea
                        name="exam_insight"
                        value={formData.exam_insight}
                        onChange={handleChange}
                        placeholder="Important points for exams, frequency of questions, etc..."
                        className="w-full bg-white/80 dark:bg-zinc-900/50 border border-emerald-200 dark:border-emerald-800 rounded-2xl px-4 py-4 min-h-[150px] outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                    />
                </section>


            </div>

            {/* Attachments */}
            <section className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <LinkIcon className="w-3 h-3" /> Original Document (PDF Link)
                        </label>
                        <input
                            type="url"
                            name="document_url"
                            value={formData.document_url}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                            <ImageIcon className="w-3 h-3" /> Featured Image URL
                        </label>
                        <input
                            type="url"
                            name="featured_image"
                            value={formData.featured_image}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/50 rounded-2xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

