export interface PaperInfo {
    num: number;
    label: string;
    topicId: string | null;
    subjects: string;
    type?: 'mcq' | 'descriptive';
}

export interface YearInfo {
    year: string;
    pattern: 'old' | 'new';
    papers: PaperInfo[];
}

export const IP_PYQ_YEARS: YearInfo[] = [
    {
        year: '2025',
        pattern: 'new',
        papers: [
            {
                num: 1, label: 'Paper I', topicId: 'p1-29',
                subjects: 'Post Office Act 2023, SB/SC Schemes, POLI, Postal Manuals, AML/CFT, IT Act, Consumer Protection Act',
            },
            {
                num: 2, label: 'Paper II', topicId: null, type: 'descriptive',
                subjects: 'Noting (15 Marks) + Drafting (15 Marks) + Major Penalty Charge Sheet (20 Marks) — Descriptive',
            },
            {
                num: 3, label: 'Paper III', topicId: 'p3-20',
                subjects: 'Constitution, BNSS 2023, RTI, CAT Act, Service Rules, GFR, NPS, Pension, Aptitude, GK & CA',
            },
        ],
    },
    {
        year: '2024',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2023',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2021',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2019',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2016',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2014',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2013',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2012',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
    {
        year: '2011',
        pattern: 'old',
        papers: [
            { num: 1, label: 'Paper I', topicId: null, subjects: 'Post Office Acts, Rules & Manuals' },
            { num: 2, label: 'Paper II', topicId: null, subjects: 'SB/SC Schemes, POLI & Allied Subjects' },
            { num: 3, label: 'Paper III', topicId: null, subjects: 'General English & Service Regulations' },
            { num: 4, label: 'Paper IV', topicId: null, subjects: 'GK, Current Affairs, Aptitude & Reasoning' },
        ],
    },
];

export const PAPER_COLORS: Record<number, { gradient: string; accent: string; badge: string; text: string }> = {
    1: {
        gradient: 'from-cyan-600 via-cyan-700 to-blue-700',
        accent: 'bg-cyan-500/20',
        badge: 'bg-cyan-500/30 text-cyan-200',
        text: 'text-cyan-300',
    },
    2: {
        gradient: 'from-violet-600 via-violet-700 to-purple-800',
        accent: 'bg-violet-500/20',
        badge: 'bg-violet-500/30 text-violet-200',
        text: 'text-violet-300',
    },
    3: {
        gradient: 'from-emerald-600 via-emerald-700 to-teal-700',
        accent: 'bg-emerald-500/20',
        badge: 'bg-emerald-500/30 text-emerald-200',
        text: 'text-emerald-300',
    },
    4: {
        gradient: 'from-amber-600 via-amber-700 to-orange-700',
        accent: 'bg-amber-500/20',
        badge: 'bg-amber-500/30 text-amber-200',
        text: 'text-amber-300',
    },
};
