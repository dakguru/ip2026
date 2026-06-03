"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Upload, X, AlertTriangle, CheckCircle2, Loader2, Camera, ImageIcon } from 'lucide-react';

// --- All topics from Paper I & Paper III (Notes section) ---
const IP_TOPICS_DATA: Record<string, string[]> = {
    "Paper I": [
        "The PO Regulations, 2024",
        "The Post Office Act, 2023",
        "Government Savings Promotion Act, 1873",
        "PMLA Act, 2002",
        "Consumer Protection Act, 2019",
        "Information Technology Act, 2000",
        "PO Small Savings Schemes",
        "Government Savings Promotion Rules, 2018",
        "Post Office Life Insurance Scheme, 2011",
        "Book of BO Rules",
        "Postal Manual Volume II",
        "Postal Manual Volume III",
        "Postal Manual Volume IV",
        "Postal Manual Volume VIII",
        "Postal Manual Volume V",
        "Postal Manual Volume VI",
        "Postal Manual Volume VII",
        "Jansuraksha Schemes",
        "Post Office Guide Part-I",
        "Post Office Guide Part-II",
        "DIGIPIN",
        "MNOP & PNOP Guidelines",
        "Consolidation of Products & Centralized Delivery Policy",
        "Dak Ghar Niryat Kendra (DNKs)",
        "POSB (CBS) Manual",
        "SB Manual Vol I, II & III",
        "Annual Reports & Book of Information",
        "APT Knowledge (IT 2.0)",
        "Core Banking Solutions (Working knowledge of CBS)",
        "India Post Payments Bank",
        "Preservation of Records",
        "CCS (Conduct) Rules, 1964",
        "CCS (CCA) Rules, 1965",
        "CCS (Temporary Service) Rules, 1965",
        "GDS (Conduct & Engagement) Rules, 2020",
    ],
    "Paper III": [
        "Constitution of India",
        "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
        "Central Administrative Tribunal Act, 1985",
        "Revenue Recovery Act, 1890",
        "Prevention of Corruption Act, 1988",
        "RTI Act, 2005 and RTI Rules, 2012",
        "Manual for Procurement of Goods & Services",
        "CCS (Leave) Rules, 1972",
        "CCS (GPF) Rules, 1960",
        "CCS (Pension) Rules, 2021",
        "CCS (Commutation of Pension) Rules, 1981",
        "Sexual Harassment of Women at Workplace Act, 2013",
        "CCS (Implementation of NPS) Rules, 2021",
        "CCS (Payment of Gratuity under NPS) Rules, 2021",
        "General Financial Rules, 2017",
        "Fundamental Rules (FR) and Supplementary Rules (SR)",
        "Brochure on Casual Labourers",
        "Maintenance of APAR",
        "Service Discharge Benefit Scheme, 2010",
        "Schedule of Financial Powers",
        "Welfare Measures",
        "P&T FHB Vol I",
        "Postal FHB Vol II",
    ]
};

const PSGB_TOPICS_DATA: Record<string, string[]> = {
    "Paper I": [
        "Consumer Protection Act, 2019",
        "PMLA Act, 2002",
        "The Post Office Act, 2023",
        "The PO Regulations, 2024",
        "Post Office Guide Part-I",
        "Post Office Guide Part-II",
        "Book of BO Rules",
        "Postal Manual Volume V",
        "Postal Manual Volume II",
        "MNOP & PNOP Guidelines",
        "Government Savings Promotion Rules, 2018",
        "PO Small Savings Schemes",
        "POSB (CBS) Manual",
        "Post Office Life Insurance Scheme, 2011",
        "Citizen Charter of D/o Posts",
        "Complaint & Grievance Handling",
        "Handbook on Philately",
        "Manual of Office Procedure",
        "Annual Reports & Book of Information",
        "Manual for Procurement of Goods & Services",
        "Postal Manual Volume IV",
        "Maintenance of APAR",
        "Schedule of Financial Powers",
        "Welfare Measures",
        "Establishment and Administration (DoPT)",
        "Recruitment Rules of DOP",
        "Establishment Norms"
    ],
    "Paper II": [
        "CCS (Conduct) Rules, 1964",
        "CCS (CCA) Rules, 1965",
        "CCS (Temporary Service) Rules, 1965",
        "Brochure on Casual Labourers",
        "CCS (Pension) Rules, 2021",
        "CCS (Implementation of NPS) Rules, 2021",
        "CCS (Payment of Gratuity under NPS) Rules, 2021",
        "CCS (Commutation of Pension) Rules, 1981",
        "CCS (Leave) Rules, 1972",
        "CCS (Joining Time) Rules, 1979",
        "CCS (GPF) Rules, 1960",
        "CS (Medical Attendance) Rules, 1944",
        "FR & SR - General Rules",
        "FR & SR - TA Rules",
        "FR & SR - DA, DR & HRA Rules",
        "CCS (LTC) Rules, 1988",
        "CCS (Revised Pay) Rules, 2016",
        "Children Education Allowance",
        "CGEGIS, 1980",
        "CCS (Recognition of Service Association) Rules, 1993",
        "Postal Manual Volume III",
        "P&T FHB Vol I",
        "Postal FHB Vol II",
        "General Financial Rules 2017",
        "Interface with IPPB",
        "Preservation of Records",
        "Swatchh Bharat",
        "Inspection Questionnaires",
        "GDS (Conduct & Engagement) Rules, 2020",
        "CAT Act, 1985",
        "RTI Act, 2005",
        "Sexual Harassment of Women at Workplace Act, 2013",
        "Public Accountants Default Act, 1850",
        "Revenue Recovery Act, 1890",
        "Prevention of Corruption Act, 1988",
        "Goods and Services Tax (GST) Act, 2017"
    ]
};

const COURSES = ["LDCE IP", "PS Gr B"];
const CATEGORIES = ["PDF Notes", "MCQs", "Mock Tests", "FlashCards", "Other"];

interface ErrorReportFormProps {
    user: { name: string; role?: string; email?: string } | null;
    onLoginRedirect: () => void;
    onSuccess?: () => void;
}

export default function ErrorReportForm({ user, onLoginRedirect, onSuccess }: ErrorReportFormProps) {
    const [course, setCourse] = useState("LDCE IP");
    const [category, setCategory] = useState("");
    const [topic, setTopic] = useState("");
    const [topicSearch, setTopicSearch] = useState("");
    const [description, setDescription] = useState("");
    const [screenshot, setScreenshot] = useState<string>("");
    const [screenshotName, setScreenshotName] = useState("");

    const [isCourseOpen, setIsCourseOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isTopicOpen, setIsTopicOpen] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const courseRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<HTMLDivElement>(null);
    const topicRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (courseRef.current && !courseRef.current.contains(e.target as Node)) {
                setIsCourseOpen(false);
            }
            if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) {
                setIsCategoryOpen(false);
            }
            if (topicRef.current && !topicRef.current.contains(e.target as Node)) {
                setIsTopicOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Get topics based on selected course
    const currentTopicsData = course === "LDCE IP" ? IP_TOPICS_DATA : PSGB_TOPICS_DATA;
    const allTopicsForCourse = Object.entries(currentTopicsData).flatMap(([group, topics]) =>
        topics.map(t => ({ label: t, group }))
    );

    const filteredTopics = allTopicsForCourse.filter(t =>
        t.label.toLowerCase().includes(topicSearch.toLowerCase())
    );

    const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert("File size must be under 5 MB.");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setScreenshot(reader.result as string);
            setScreenshotName(file.name);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async () => {
        if (!user) {
            onLoginRedirect();
            return;
        }

        if (!category || !topic || !description.trim()) {
            alert("Please fill in all required fields: Category, Topic, and Description.");
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const res = await fetch("/api/community/error-reports", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    course,
                    category,
                    topic,
                    screenshot,
                    description: description.trim(),
                    reportedBy: user.name,
                    reportedByEmail: user.email || "",
                }),
            });

            if (res.ok) {
                setSubmitStatus("success");
                setCategory("");
                setTopic("");
                setTopicSearch("");
                setDescription("");
                setScreenshot("");
                setScreenshotName("");
                onSuccess?.();
                setTimeout(() => setSubmitStatus("idle"), 5000);
            } else {
                setSubmitStatus("error");
            }
        } catch {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-4 md:p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                        <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Report an Error</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Help us improve our content by reporting errors or corrections</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                {/* 0. Course Field */}
                <div ref={courseRef} className="relative">
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Course <span className="text-red-500">*</span>
                    </label>
                    <button
                        onClick={() => setIsCourseOpen(!isCourseOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <span className={course ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}>
                            {course || "Select course..."}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isCourseOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isCourseOpen && (
                        <div className="absolute z-30 mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            {COURSES.map(c => (
                                <button
                                    key={c}
                                    onClick={() => {
                                        setCourse(c);
                                        setTopic("");
                                        setIsCourseOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${course === c ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold" : "text-zinc-700 dark:text-zinc-300"}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 1. Error Found In (Category) */}
                <div ref={categoryRef} className="relative">
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Error Found In <span className="text-red-500">*</span>
                    </label>
                    <button
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <span className={category ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}>
                            {category || "Select category..."}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isCategoryOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => { setCategory(cat); setIsCategoryOpen(false); }}
                                    className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${category === cat ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold" : "text-zinc-700 dark:text-zinc-300"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 2. Topic (Searchable) */}
                <div ref={topicRef} className="relative">
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Topic <span className="text-red-500">*</span>
                    </label>
                    <button
                        onClick={() => setIsTopicOpen(!isTopicOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <span className={`truncate ${topic ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}`}>
                            {topic || "Select topic..."}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform shrink-0 ${isTopicOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isTopicOpen && (
                        <div className="absolute z-20 mt-1 w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                            {/* Search Box */}
                            <div className="sticky top-0 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 p-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-2.5 w-4 h-4 text-zinc-400" />
                                    <input
                                        type="text"
                                        value={topicSearch}
                                        onChange={(e) => setTopicSearch(e.target.value)}
                                        placeholder="Search topics..."
                                        className="w-full pl-9 pr-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        autoFocus
                                    />
                                </div>
                            </div>
                            {/* Topic List */}
                            <div className="max-h-60 overflow-y-auto">
                                {(() => {
                                    const groups = Object.keys(currentTopicsData);
                                    return (
                                        <>
                                            {groups.map(group => {
                                                const groupTopics = filteredTopics.filter(t => t.group === group);
                                                if (groupTopics.length === 0) return null;
                                                
                                                return (
                                                    <React.Fragment key={group}>
                                                        <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider sticky top-0 ${group === "Paper I" ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/10" : "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10"}`}>
                                                            {group}
                                                        </div>
                                                        {groupTopics.map(t => (
                                                            <button
                                                                key={t.label}
                                                                onClick={() => { setTopic(t.label); setIsTopicOpen(false); setTopicSearch(""); }}
                                                                className={`w-full text-left px-4 py-2.5 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors ${topic === t.label ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold" : "text-zinc-700 dark:text-zinc-300"}`}
                                                            >
                                                                {t.label}
                                                            </button>
                                                        ))}
                                                    </React.Fragment>
                                                );
                                            })}
                                            {filteredTopics.length === 0 && (
                                                <div className="px-4 py-6 text-center text-sm text-zinc-400">No topics found</div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </div>

                {/* 3. Screenshot Upload */}
                <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Screenshot <span className="text-zinc-400 text-xs font-normal">(optional, max 5 MB)</span>
                    </label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleScreenshotUpload}
                        className="hidden"
                    />
                    {!screenshot ? (
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full flex items-center justify-center gap-3 px-4 py-6 bg-zinc-50 dark:bg-zinc-950 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl text-sm text-zinc-500 dark:text-zinc-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all cursor-pointer"
                        >
                            <ImageIcon className="w-5 h-5" />
                            <span>Tap to upload screenshot</span>
                        </button>
                    ) : (
                        <div className="relative bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl p-3">
                            <div className="flex items-center gap-3">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                                    <img src={screenshot} alt="Screenshot preview" className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 truncate">{screenshotName}</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-0.5">
                                        <CheckCircle2 className="w-3 h-3" /> Uploaded
                                    </p>
                                </div>
                                <button
                                    onClick={() => { setScreenshot(""); setScreenshotName(""); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                    className="p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 text-zinc-400 hover:text-red-500 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 4. Error/Correction Description */}
                <div>
                    <label className="block text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1.5">
                        Error / Correction Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe the error you found and the correct information (if known)..."
                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-700 rounded-xl text-sm min-h-[120px] resize-y transition-all hover:border-blue-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none"
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !category || !topic || !description.trim()}
                    className="w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white shadow-red-500/20 active:scale-[0.98]"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                        </>
                    ) : (
                        "Submit Error Report"
                    )}
                </button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                    <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-green-700 dark:text-green-300">Thank you!</p>
                            <p className="text-xs text-green-600 dark:text-green-400">Your error report has been submitted. We&apos;ll review and fix it soon.</p>
                        </div>
                    </div>
                )}
                {submitStatus === "error" && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl animate-in fade-in slide-in-from-top-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                        <div>
                            <p className="text-sm font-bold text-red-700 dark:text-red-300">Submission Failed</p>
                            <p className="text-xs text-red-600 dark:text-red-400">Something went wrong. Please try again.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
