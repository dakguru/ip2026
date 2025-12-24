"use client";

import React, { useState, useEffect, useMemo, useRef } from 'react';
import HomeHeader from '@/components/HomeHeader';
import TopicCompletionDialog from '@/components/TopicCompletionDialog';
import {
    Calendar,
    CheckCircle2,
    BookOpen,
    Award,
    Search,
    Filter,
    Download,
    ChevronRight,
    Target,
    Clock,
    Zap,
    Coffee,
    PieChart,
    ArrowDownCircle,
    Printer,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

// --- DATA: Full Schedule based on the final optimizations ---
const FULL_SCHEDULE = [
    { date: "14-01-2026", day: "Wednesday", paper: "Paper I", topic: "Acts", subTopic: "The Post Office Act, 2023", duration: "1 Day" },
    { date: "15-01-2026", day: "Thursday", paper: "Paper I", topic: "Acts", subTopic: "Government Savings Promotion Act-1873", duration: "1 Day" },
    { date: "16-01-2026", day: "Friday", paper: "Paper I", topic: "Acts", subTopic: "PMLA Act, 2002 & Amendments", duration: "Day 1 of 2" },
    { date: "17-01-2026", day: "Saturday", paper: "Paper I", topic: "Acts", subTopic: "PMLA Act, 2002 & Amendments", duration: "Day 2 of 2" },
    { date: "18-01-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision of topics covered this week", duration: "-" },
    { date: "19-01-2026", day: "Monday", paper: "Paper I", topic: "Acts", subTopic: "Consumer Protection Act, 2019", duration: "Day 1 of 2" },
    { date: "20-01-2026", day: "Tuesday", paper: "Paper I", topic: "Acts", subTopic: "Consumer Protection Act, 2019", duration: "Day 2 of 2" },
    { date: "21-01-2026", day: "Wednesday", paper: "Paper I", topic: "Acts", subTopic: "Information Technology Act, 2000", duration: "1 Day" },
    { date: "22-01-2026", day: "Thursday", paper: "Paper I", topic: "Rules", subTopic: "PO Rules 2024 & PO Regulations 2024", duration: "Day 1 of 2" },
    { date: "23-01-2026", day: "Friday", paper: "Paper I", topic: "Rules", subTopic: "PO Rules 2024 & PO Regulations 2024", duration: "Day 2 of 2" },
    { date: "24-01-2026", day: "Saturday", paper: "Paper I", topic: "Rules", subTopic: "Government Savings Promotion Rules, 2018", duration: "1 Day" },
    { date: "25-01-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "26-01-2026", day: "Monday", paper: "Paper I", topic: "Rules", subTopic: "PO Savings Account Scheme, 2019", duration: "1 Day" },
    { date: "27-01-2026", day: "Tuesday", paper: "Paper I", topic: "Rules", subTopic: "National Savings Recurring Deposit Scheme", duration: "1 Day" },
    { date: "28-01-2026", day: "Wednesday", paper: "Paper I", topic: "Rules", subTopic: "National Savings Time Deposit Scheme", duration: "1 Day" },
    { date: "29-01-2026", day: "Thursday", paper: "Paper I", topic: "Rules", subTopic: "MIS Scheme, 2019", duration: "1 Day" },
    { date: "30-01-2026", day: "Friday", paper: "Paper I", topic: "Rules", subTopic: "SCSS Scheme, 2019", duration: "1 Day" },
    { date: "31-01-2026", day: "Saturday", paper: "Paper I", topic: "Rules", subTopic: "NSC (VIII Issue) Scheme", duration: "1 Day" },
    { date: "01-02-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "02-02-2026", day: "Monday", paper: "Paper I", topic: "Rules", subTopic: "KVP Scheme, 2019", duration: "1 Day" },
    { date: "03-02-2026", day: "Tuesday", paper: "Paper I", topic: "Rules", subTopic: "PPF Scheme, 2019", duration: "1 Day" },
    { date: "04-02-2026", day: "Wednesday", paper: "Paper I", topic: "Rules", subTopic: "SSA Scheme, 2019", duration: "1 Day" },
    { date: "05-02-2026", day: "Thursday", paper: "Paper I", topic: "PLI", subTopic: "PO Life Insurance Rules, 2011", duration: "Day 1 of 2" },
    { date: "06-02-2026", day: "Friday", paper: "Paper I", topic: "PLI", subTopic: "PO Life Insurance Rules, 2011", duration: "Day 2 of 2" },
    { date: "07-02-2026", day: "Saturday", paper: "Paper I", topic: "PLI", subTopic: "Guidelines for PLI/RPLI", duration: "1 Day" },
    { date: "08-02-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "09-02-2026", day: "Monday", paper: "Paper I", topic: "PLI", subTopic: "RPLI Rules", duration: "Day 1 of 2" },
    { date: "10-02-2026", day: "Tuesday", paper: "Paper I", topic: "PLI", subTopic: "RPLI Rules", duration: "Day 2 of 2" },
    { date: "11-02-2026", day: "Wednesday", paper: "Paper I", topic: "PLI", subTopic: "Guidelines for PLI/RPLI (RPLI Focus)", duration: "1 Day" },
    { date: "12-02-2026", day: "Thursday", paper: "Paper I", topic: "PLI", subTopic: "Core Insurance Solution (CIS)", duration: "1 Day" },
    { date: "13-02-2026", day: "Friday", paper: "Paper I", topic: "Philately", subTopic: "Philately Policy, PDA, My Stamp, SPARSH, Dhai Akhar", duration: "1 Day" },
    { date: "14-02-2026", day: "Saturday", paper: "Paper I", topic: "Mails Ops", subTopic: "Postal Manual Volume V", duration: "Day 1 of 2" },
    { date: "15-02-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "16-02-2026", day: "Monday", paper: "Paper I", topic: "Mails Ops", subTopic: "Postal Manual Volume V", duration: "Day 2 of 2" },
    { date: "17-02-2026", day: "Tuesday", paper: "Paper I", topic: "Mails Ops", subTopic: "Postal Manual Volume VII", duration: "Day 1 of 2" },
    { date: "18-02-2026", day: "Wednesday", paper: "Paper I", topic: "Mails Ops", subTopic: "Postal Manual Volume VII", duration: "Day 2 of 2" },
    { date: "19-02-2026", day: "Thursday", paper: "Paper I", topic: "Jansuraksha", subTopic: "Jansuraksha Schemes", duration: "1 Day" },
    { date: "20-02-2026", day: "Friday", paper: "Paper I", topic: "Inland/For.", subTopic: "Post Office Guide Part-I", duration: "Day 1 of 2" },
    { date: "21-02-2026", day: "Saturday", paper: "Paper I", topic: "Inland/For.", subTopic: "Post Office Guide Part-I", duration: "Day 2 of 2" },
    { date: "22-02-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "23-02-2026", day: "Monday", paper: "Paper I", topic: "Inland/For.", subTopic: "Post Office Guide Part-II", duration: "Day 1 of 2" },
    { date: "24-02-2026", day: "Tuesday", paper: "Paper I", topic: "Inland/For.", subTopic: "Post Office Guide Part-II", duration: "Day 2 of 2" },
    { date: "25-02-2026", day: "Wednesday", paper: "Paper I", topic: "Inland/For.", subTopic: "Domestic/Foreign Post Guidelines", duration: "1 Day" },
    { date: "26-02-2026", day: "Thursday", paper: "Paper I", topic: "DIGIPIN", subTopic: "Basic understanding of DIGIPIN", duration: "1 Day" },
    { date: "27-02-2026", day: "Friday", paper: "Paper I", topic: "Network Opt", subTopic: "Mail/Parcel Network Optimization", duration: "Day 1 of 2" },
    { date: "28-02-2026", day: "Saturday", paper: "Paper I", topic: "Network Opt", subTopic: "Mail/Parcel Network Optimization", duration: "Day 2 of 2" },
    { date: "01-03-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "02-03-2026", day: "Monday", paper: "Paper I", topic: "Network Opt", subTopic: "Centralized Delivery Policy", duration: "1 Day" },
    { date: "03-03-2026", day: "Tuesday", paper: "Paper I", topic: "Network Opt", subTopic: "Dak Ghar Niryat Kendra (DNKs)", duration: "1 Day" },
    { date: "04-03-2026", day: "Wednesday", paper: "Paper I", topic: "Consolidation", subTopic: "Product Consolidation Guidelines", duration: "1 Day" },
    { date: "05-03-2026", day: "Thursday", paper: "Paper I", topic: "Savings Bank", subTopic: "PO SB Manual Vol I, II & III", duration: "Day 1 of 2" },
    { date: "06-03-2026", day: "Friday", paper: "Paper I", topic: "Savings Bank", subTopic: "PO SB Manual Vol I, II & III", duration: "Day 2 of 2" },
    { date: "07-03-2026", day: "Saturday", paper: "Paper I", topic: "Savings Bank", subTopic: "POSB (CBS) Manual", duration: "Day 1 of 2" },
    { date: "08-03-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "09-03-2026", day: "Monday", paper: "Paper I", topic: "Savings Bank", subTopic: "POSB (CBS) Manual", duration: "Day 2 of 2" },
    { date: "10-03-2026", day: "Tuesday", paper: "Paper I", topic: "Reports", subTopic: "Annual Reports & Book of Information", duration: "1 Day" },
    { date: "11-03-2026", day: "Wednesday", paper: "Paper I", topic: "IT", subTopic: "APT Knowledge (IT 2.0)", duration: "1 Day" },
    { date: "12-03-2026", day: "Thursday", paper: "Paper I", topic: "IT", subTopic: "Core Banking Solutions, PLI-CIS", duration: "1 Day" },
    { date: "13-03-2026", day: "Friday", paper: "Paper I", topic: "IPPB", subTopic: "India Post Payments Bank", duration: "1 Day" },
    { date: "14-03-2026", day: "Saturday", paper: "Paper I", topic: "Records", subTopic: "Preservation of Records", duration: "1 Day" },
    { date: "15-03-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "16-03-2026", day: "Monday", paper: "Paper I", topic: "Conduct Rules", subTopic: "CCS (Conduct) Rules, 1964", duration: "1 Day" },
    { date: "17-03-2026", day: "Tuesday", paper: "Paper I", topic: "CCA Rules", subTopic: "CCS (CCA) Rules, 1965", duration: "Day 1 of 2" },
    { date: "18-03-2026", day: "Wednesday", paper: "Paper I", topic: "CCA Rules", subTopic: "CCS (CCA) Rules, 1965", duration: "Day 2 of 2" },
    { date: "19-03-2026", day: "Thursday", paper: "Paper I", topic: "Temp Service", subTopic: "CCS (Temporary Service) Rules", duration: "1 Day" },
    { date: "20-03-2026", day: "Friday", paper: "Paper III", topic: "Constitution", subTopic: "Preamble to Constitution", duration: "1 Day" },
    { date: "21-03-2026", day: "Saturday", paper: "Paper III", topic: "Constitution", subTopic: "Fundamental Rights", duration: "1 Day" },
    { date: "22-03-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "23-03-2026", day: "Monday", paper: "Paper III", topic: "Constitution", subTopic: "Directive Principles of State Policy", duration: "1 Day" },
    { date: "24-03-2026", day: "Tuesday", paper: "Paper III", topic: "Constitution", subTopic: "Fundamental Duties", duration: "1 Day" },
    { date: "25-03-2026", day: "Wednesday", paper: "Paper III", topic: "Constitution", subTopic: "Articles 124-147", duration: "1 Day" },
    { date: "26-03-2026", day: "Thursday", paper: "Paper III", topic: "Constitution", subTopic: "Articles 214- 232", duration: "1 Day" },
    { date: "27-03-2026", day: "Friday", paper: "Paper III", topic: "Constitution", subTopic: "Article 311", duration: "1 Day" },
    { date: "28-03-2026", day: "Saturday", paper: "Paper III", topic: "Constitution", subTopic: "Articles 338, 338(a), 338(b)", duration: "1 Day" },
    { date: "29-03-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "30-03-2026", day: "Monday", paper: "Paper III", topic: "BNSS 2023", subTopic: "Sections 1, 2, 84 (Combined)", duration: "1 Day" },
    { date: "31-03-2026", day: "Tuesday", paper: "Paper III", topic: "CAT Act", subTopic: "CAT Act, 1985", duration: "1 Day" },
    { date: "01-04-2026", day: "Wednesday", paper: "Paper III", topic: "Revenue Rec", subTopic: "Revenue Recovery Act, 1890", duration: "1 Day" },
    { date: "02-04-2026", day: "Thursday", paper: "Paper III", topic: "POCA", subTopic: "Prevention of Corruption Act, 1988", duration: "Day 1 of 2" },
    { date: "03-04-2026", day: "Friday", paper: "Paper III", topic: "POCA", subTopic: "Prevention of Corruption Act, 1988", duration: "Day 2 of 2" },
    { date: "04-04-2026", day: "Saturday", paper: "Paper III", topic: "RTI", subTopic: "RTI Act, 2005 & Rules", duration: "Day 1 of 2" },
    { date: "05-04-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "06-04-2026", day: "Monday", paper: "Paper III", topic: "RTI", subTopic: "RTI Act, 2005 & Rules", duration: "Day 2 of 2" },
    { date: "07-04-2026", day: "Tuesday", paper: "Paper III", topic: "Procurement", subTopic: "Manual on Procurement of Goods", duration: "Day 1 of 2" },
    { date: "08-04-2026", day: "Wednesday", paper: "Paper III", topic: "Procurement", subTopic: "Manual on Procurement of Goods", duration: "Day 2 of 2" },
    { date: "09-04-2026", day: "Thursday", paper: "Paper III", topic: "Procurement", subTopic: "Manual on Procurement of Works", duration: "Day 1 of 2" },
    { date: "10-04-2026", day: "Friday", paper: "Paper III", topic: "Procurement", subTopic: "Manual on Procurement of Works", duration: "Day 2 of 2" },
    { date: "11-04-2026", day: "Saturday", paper: "Paper III", topic: "Procurement", subTopic: "Manual on Consultancy Services", duration: "Day 1 of 2" },
    { date: "12-04-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "13-04-2026", day: "Monday", paper: "Paper III", topic: "Procurement", subTopic: "Manual on Consultancy Services", duration: "Day 2 of 2" },
    { date: "14-04-2026", day: "Tuesday", paper: "Paper III", topic: "CCS GPF", subTopic: "CCS (GPF) Rules, 1961", duration: "1 Day" },
    { date: "15-04-2026", day: "Wednesday", paper: "Paper III", topic: "CCS Pension", subTopic: "CCS (Pension) Rules, 2021", duration: "Day 1 of 2" },
    { date: "16-04-2026", day: "Thursday", paper: "Paper III", topic: "CCS Pension", subTopic: "CCS (Pension) Rules, 2021", duration: "Day 2 of 2" },
    { date: "17-04-2026", day: "Friday", paper: "Paper III", topic: "CCS Commut", subTopic: "CCS (Commutation of Pension) Rules", duration: "1 Day" },
    { date: "18-04-2026", day: "Saturday", paper: "Paper III", topic: "Sexual Harass", subTopic: "Prevention of Sexual Harassment Act", duration: "1 Day" },
    { date: "19-04-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "20-04-2026", day: "Monday", paper: "Paper III", topic: "NPS", subTopic: "Implementation of NPS Rules", duration: "1 Day" },
    { date: "21-04-2026", day: "Tuesday", paper: "Paper III", topic: "NPS", subTopic: "Payment of Gratuity under NPS", duration: "1 Day" },
    { date: "22-04-2026", day: "Wednesday", paper: "Paper III", topic: "GFR", subTopic: "Chapter 2 and 6 of GFR, 2017", duration: "Day 1 of 2" },
    { date: "23-04-2026", day: "Thursday", paper: "Paper III", topic: "GFR", subTopic: "Chapter 2 and 6 of GFR, 2017", duration: "Day 2 of 2" },
    { date: "24-04-2026", day: "Friday", paper: "Paper III", topic: "FR & SR", subTopic: "FR and SR", duration: "Day 1 of 2" },
    { date: "25-04-2026", day: "Saturday", paper: "Paper III", topic: "FR & SR", subTopic: "FR and SR", duration: "Day 2 of 2" },
    { date: "26-04-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "27-04-2026", day: "Monday", paper: "Paper III", topic: "Casual Labor", subTopic: "Brochure on casual labourers", duration: "1 Day" },
    { date: "28-04-2026", day: "Tuesday", paper: "Paper III", topic: "APAR", subTopic: "Maintenance of APAR", duration: "1 Day" },
    { date: "29-04-2026", day: "Wednesday", paper: "Paper III", topic: "Service Disch", subTopic: "Service Discharge Benefit Scheme", duration: "1 Day" },
    { date: "30-04-2026", day: "Thursday", paper: "Paper III", topic: "Financial Pwr", subTopic: "Schedule of Financial Powers", duration: "1 Day" },
    { date: "01-05-2026", day: "Friday", paper: "Paper III", topic: "Welfare", subTopic: "Welfare measures for Employees/GDS", duration: "Day 1 of 2" },
    { date: "02-05-2026", day: "Saturday", paper: "Paper III", topic: "Welfare", subTopic: "Welfare measures for Employees/GDS", duration: "Day 2 of 2" },
    { date: "03-05-2026", day: "Sunday", paper: "Revision", topic: "REVISION", subTopic: "Weekly Revision", duration: "-" },
    { date: "04-05-2026", day: "Monday", paper: "Paper III", topic: "FHB", subTopic: "P&T FHB Volume I", duration: "Day 1 of 2" },
    { date: "05-05-2026", day: "Tuesday", paper: "Paper III", topic: "FHB", subTopic: "P&T FHB Volume I", duration: "Day 2 of 2" },
    { date: "06-05-2026", day: "Wednesday", paper: "Paper III", topic: "FHB", subTopic: "Postal FHB Volume II", duration: "Day 1 of 2" },
    { date: "07-05-2026", day: "Thursday", paper: "Paper III", topic: "FHB", subTopic: "Postal FHB Volume II", duration: "Day 2 of 2" },
    { date: "08-05-2026", day: "Friday", paper: "End", topic: "Completion", subTopic: "Buffer Day / Final Revision", duration: "1 Day" },
];

export default function StudyPlanner() {
    const [schedule, setSchedule] = useState(FULL_SCHEDULE);
    const [filterPaper, setFilterPaper] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [completedDays, setCompletedDays] = useState<Record<string, boolean>>({});
    const [activeTab, setActiveTab] = useState('overview');
    const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
    const [completionDialog, setCompletionDialog] = useState<{ open: boolean; date: string | null; topic: string }>({
        open: false,
        date: null,
        topic: ''
    });

    const todayRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);

    // Initialize open months to have only the first one open by default, or current
    useEffect(() => {
        // Find current month key e.g., "Jan 2026"
        const now = new Date();
        // Just for demo, assuming 2026 date if real date is before start
        // Set all to open initially for search visibility
        const allMonths = {};
        // Group logic needs to be consistent
    }, []);

    // Load progress from local storage
    useEffect(() => {
        const saved = localStorage.getItem('ldce2026_progress');
        if (saved) {
            setCompletedDays(JSON.parse(saved));
        }

    }, []);

    // Scroll to today logic
    const scrollToToday = () => {
        // In real app, match current date. For demo, finding first uncompleted.
        // Assuming today is 14-01-2026 as per user metadata or similar? 
        // We'll just scroll to the first unfinished item for utility
        if (todayRef.current) {
            todayRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            // Find first uncompleted and scroll there
            const firstUncompleted = filteredSchedule.find(item => !completedDays[item.date] && item.paper !== 'Revision');
            if (firstUncompleted) {
                const id = `date-${firstUncompleted.date}`;
                const el = document.getElementById(id);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handlePrint = () => {
        window.print();
    };

    // Save progress
    const toggleDay = (date: string, topicName: string = '') => {
        const isCurrentlyCompleted = completedDays[date];

        if (!isCurrentlyCompleted) {
            // If marking as complete, show dialog
            setCompletionDialog({
                open: true,
                date: date,
                topic: topicName
            });
        } else {
            // If unmarking, just do it
            const updated = { ...completedDays, [date]: false };
            setCompletedDays(updated);
            localStorage.setItem('ldce2026_progress', JSON.stringify(updated));
        }
    };

    const confirmCompletion = () => {
        if (completionDialog.date) {
            const updated = { ...completedDays, [completionDialog.date]: true };
            setCompletedDays(updated);
            localStorage.setItem('ldce2026_progress', JSON.stringify(updated));
        }
        setCompletionDialog(prev => ({ ...prev, open: false }));
    };

    // Filter Logic
    const filteredSchedule = useMemo(() => {
        return schedule.filter(item => {
            const matchesPaper = filterPaper === 'All' || item.paper === filterPaper || (filterPaper === 'Revision' && item.paper === 'Revision');
            const matchesSearch = item.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.subTopic.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesPaper && matchesSearch;
        });
    }, [schedule, filterPaper, searchQuery]);

    // Grouping by Month
    const groupedSchedule = useMemo(() => {
        const groups: Record<string, typeof filteredSchedule> = {};
        filteredSchedule.forEach(item => {
            // Parse date "14-01-2026"
            const [d, m, y] = item.date.split('-');
            const dateObj = new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
            const monthKey = dateObj.toLocaleString('default', { month: 'long', year: 'numeric' });
            if (!groups[monthKey]) groups[monthKey] = [];
            groups[monthKey].push(item);
        });
        return groups;
    }, [filteredSchedule]);

    // Auto-open current month / first month
    useEffect(() => {
        if (Object.keys(openMonths).length === 0 && Object.keys(groupedSchedule).length > 0) {
            const keys = Object.keys(groupedSchedule);
            // Default open all for better search UX, or just first
            const initial: Record<string, boolean> = {};
            keys.forEach(k => initial[k] = true);
            setOpenMonths(initial);
        }
    }, [groupedSchedule]);

    const toggleMonth = (month: string) => {
        setOpenMonths(prev => ({ ...prev, [month]: !prev[month] }));
    };

    // Statistics
    const totalTasks = schedule.filter(i => i.paper !== 'Revision' && i.paper !== 'End').length;
    const completedTasks = schedule.filter(i => i.paper !== 'Revision' && i.paper !== 'End' && completedDays[i.date]).length;
    const progress = Math.round((completedTasks / totalTasks) * 100) || 0;

    return (
        <div ref={topRef} className="min-h-screen bg-slate-50 font-sans text-slate-800 print:bg-white">
            <HomeHeader isLoggedIn={true} membershipLevel="silver" />

            {/* --- HERO SECTION (Hidden in Print) --- */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white pb-24 pt-16 px-6 print:hidden">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800/50 rounded-full border border-blue-500/30 mb-6 backdrop-blur-sm">
                        <Target className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-medium text-blue-100 tracking-wide">TARGET: SEPTEMBER 2026</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                        <span className="text-red-500">Mission</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">"IP 2026"</span> 🎯
                    </h1>
                    <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your comprehensive, day-by-day strategic roadmap to crack the Inspector Posts Exam through self-study.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setActiveTab('planner')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl flex items-center justify-center gap-2 ${activeTab === 'planner'
                                ? 'bg-white text-blue-900'
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                                }`}
                        >
                            <Calendar className="w-5 h-5" /> Start Studying
                        </button>
                        <button
                            onClick={() => setActiveTab('overview')}
                            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all border-2 flex items-center justify-center gap-2 ${activeTab === 'overview'
                                ? 'bg-white text-blue-900 border-white'
                                : 'border-white/30 hover:bg-white/10 text-white'
                                }`}
                        >
                            <BookOpen className="w-5 h-5" /> View Strategy
                        </button>
                    </div>
                </div>
            </div>

            {/* --- STATS BAR --- */}
            <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10 print:hidden">
                <div className="bg-white rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Duration</p>
                            <p className="text-xl font-bold text-slate-900">128 Days</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Start Date</p>
                            <p className="text-xl font-bold text-slate-900">Jan 14, 2026</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Daily Goal</p>
                            <p className="text-xl font-bold text-slate-900">2-3 Hours</p>
                        </div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-semibold text-slate-600">Your Progress</span>
                            <span className="text-sm font-bold text-blue-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div
                                className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTENT AREA --- */}
            <div className="max-w-7xl mx-auto px-6 py-12 print:px-0 print:py-0">

                {activeTab === 'overview' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-2 h-10 bg-blue-600 rounded-full"></div>
                                <h2 className="text-3xl font-bold text-slate-900">Strategic Roadmap</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <PieChart className="w-5 h-5 text-blue-500" /> Plan Overview
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed">
                                        Success in LDCE IP requires a disciplined approach. This <strong>128-Day Intensive Schedule</strong> is designed specifically for working aspirants. By dedicating 2-3 hours daily, you will complete the entire Paper I & III syllabus by May 2026, leaving 4 solid months for revision and mock tests before the September exam.
                                    </p>

                                    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                                        <h4 className="font-bold text-blue-900 mb-3">Key Features</h4>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-blue-800 text-sm"><strong>Smart Allocation:</strong> 2 days for vast manuals (Vol V, FHB), 1 day for specific Acts.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-blue-800 text-sm"><strong>Consolidated Learning:</strong> Related topics like Philately and BNSS are grouped for efficiency.</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                                <span className="text-blue-800 text-sm"><strong>Sunday Reset:</strong> Dedicated entirely to revising the week's topics. No new study.</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                                        <Award className="w-5 h-5 text-amber-500" /> Execution Strategy
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200">01</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">The Daily Routine</h4>
                                                <p className="text-sm text-slate-600 mt-1">Hour 1: Read Bare Acts/Manuals. Hour 2: Make Notes. Hour 3: MCQs.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200">02</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">The Weekly Consolidations</h4>
                                                <p className="text-sm text-slate-600 mt-1">Use Sundays to recite short notes. Catch up on any missed topics.</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                            <div className="font-bold text-3xl text-slate-200">03</div>
                                            <div>
                                                <h4 className="font-bold text-slate-800">The Post-May Advantage</h4>
                                                <p className="text-sm text-slate-600 mt-1">Finish syllabus by May. Use June-September exclusively for Mock Tests and Past Papers.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 flex justify-center">
                                <button
                                    onClick={() => setActiveTab('planner')}
                                    className="px-8 py-3 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2"
                                >
                                    View Full Schedule <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'planner' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* --- CONTROLS SECTION (Sticky) --- */}
                        <div className="sticky top-0 z-30 bg-slate-50/95 backdrop-blur-md py-4 -mx-6 px-6 border-b border-slate-200 mb-8 transition-all print:hidden">
                            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-slate-200 shadow-sm">
                                    <button
                                        onClick={() => setFilterPaper('All')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === 'All' ? 'bg-slate-100 text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        All
                                    </button>
                                    <button
                                        onClick={() => setFilterPaper('Paper I')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === 'Paper I' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        Paper I
                                    </button>
                                    <button
                                        onClick={() => setFilterPaper('Paper III')}
                                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filterPaper === 'Paper III' ? 'bg-red-50 text-red-700' : 'text-slate-500 hover:text-slate-900'}`}
                                    >
                                        Paper III
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 w-full md:w-auto">
                                    <div className="relative w-full md:w-auto flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            type="text"
                                            placeholder="Search topics..."
                                            className="w-full md:w-64 pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button
                                        onClick={scrollToToday}
                                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm tooltip"
                                        title="Jump to Today's Task"
                                    >
                                        <ArrowDownCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={handlePrint}
                                        className="p-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors shadow-sm"
                                        title="Print Schedule"
                                    >
                                        <Printer className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* --- TIMELINE (Grouped) --- */}
                        <div className="space-y-8">
                            {Object.entries(groupedSchedule).map(([month, items]) => (
                                <div key={month} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                                    {/* Month Header */}
                                    <button
                                        onClick={() => toggleMonth(month)}
                                        className="w-full flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer border-b border-slate-100"
                                    >
                                        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                            {month}
                                            <span className="text-sm font-normal text-slate-400 ml-2">({items.length} tasks)</span>
                                        </h3>
                                        {openMonths[month] ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                                    </button>

                                    {/* Month Items (Collapsible) */}
                                    <div className={`transition-all duration-300 ${openMonths[month] ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                        <div className="p-4 grid gap-4">
                                            {items.map((item, index) => {
                                                const isCompleted = completedDays[item.date];
                                                const isRevision = item.paper === 'Revision';

                                                return (
                                                    <div
                                                        key={index}
                                                        id={`date-${item.date}`}
                                                        onClick={() => !isRevision && toggleDay(item.date, item.subTopic)}
                                                        className={`group relative rounded-xl p-4 border transition-all cursor-pointer
                                                            ${isRevision
                                                                ? 'bg-amber-50/50 border-amber-100'
                                                                : isCompleted
                                                                    ? 'bg-emerald-50/30 border-emerald-100 opacity-60'
                                                                    : 'bg-white border-slate-100 hover:border-blue-300 hover:shadow-md hover:translate-x-1'}
                                                        `}
                                                    >
                                                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                                                            {/* Date & Tag */}
                                                            <div className="flex items-center gap-4 min-w-[150px]">
                                                                <div className={`p-2 rounded-lg text-center min-w-[50px] ${isRevision ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                                                    <div className="text-xs font-bold uppercase">{item.day.substring(0, 3)}</div>
                                                                    <div className="text-lg font-bold">{item.date.split('-')[0]}</div>
                                                                </div>
                                                                <div className="flex flex-col">
                                                                    <span className="text-xs text-slate-400 font-medium">{item.date.substring(3)}</span>
                                                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full w-fit mt-1 tracking-wider uppercase
                                                                        ${item.paper === 'Paper I' ? 'bg-blue-100 text-blue-700' :
                                                                            item.paper === 'Paper III' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}
                                                                    `}>
                                                                        {item.paper}
                                                                    </span>
                                                                </div>
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1">
                                                                <h4 className={`text-base font-bold ${isCompleted ? 'text-slate-500 line-through decoration-slate-400' : 'text-blue-950'}`}>
                                                                    {item.subTopic}
                                                                </h4>
                                                                <p className={`text-sm mt-0.5 ${isCompleted ? 'text-slate-400' : 'text-slate-600'}`}>
                                                                    {item.topic}
                                                                </p>
                                                            </div>

                                                            {/* Status/Duration */}
                                                            <div className="flex items-center gap-4 min-w-[120px] justify-between md:justify-end w-full md:w-auto mt-2 md:mt-0">
                                                                {!isRevision && (
                                                                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                                        {item.duration}
                                                                    </span>
                                                                )}

                                                                {!isRevision && (
                                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                                                                        ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' : 'bg-slate-100 text-slate-300 group-hover:bg-blue-100 group-hover:text-blue-500'}
                                                                    `}>
                                                                        <CheckCircle2 className="w-5 h-5" />
                                                                    </div>
                                                                )}

                                                                {isRevision && (
                                                                    <div className="flex items-center gap-2 text-amber-600 bg-amber-100/50 px-3 py-1 rounded-full text-xs font-bold border border-amber-100">
                                                                        <Coffee className="w-3 h-3" /> Weekly Break
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {filteredSchedule.length === 0 && (
                            <div className="text-center py-20">
                                <Search className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                                <p className="text-slate-400 font-medium">No topics found matching your filters.</p>
                            </div>
                        )}

                        {/* Bottom Spacer */}
                        <div className="h-20"></div>

                        <TopicCompletionDialog
                            open={completionDialog.open}
                            onOpenChange={(open) => setCompletionDialog(prev => ({ ...prev, open }))}
                            onMarkComplete={confirmCompletion}
                            topicName={completionDialog.topic}
                        />
                    </div>
                )}
            </div>

            {/* --- FOOTER (Hidden in Print) --- */}
            <div className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 print:hidden">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="mb-4">Designed for the 2026 LDCE Inspector Posts Examination.</p>
                    <p className="max-w-4xl mx-auto text-sm font-bold italic opacity-80 mt-6 leading-relaxed">
                        Disclaimer: This schedule covers the theoretical syllabus for Paper I and Paper III based on standard notifications. Aspirants are advised to practice Drafting/Noting/Major Charge Sheet (Paper II) and General knowledge & Current Affairs/Reasoning/Aptitude/English language (Paper III) continuously alongside this schedule, perhaps on weekends. Best Wishes..!!!
                    </p>

                </div>
            </div>
        </div>
    );
}
