import { Topic } from '@/lib/types';

export const SYLLABUS_DATA: Topic[] = [
    // --- PAPER I (250 Marks) ---
    // Acts
    {
        id: 'p1-act-1',
        title: 'The Post Office Act, 2023',
        category: 'Paper I',
        type: 'heavy',
        duration: 2,
        tips: ["Compare with Act of 1898.", "Read Sec 3 (DG Powers) & Sec 4 (Interception).", "Understand new Penalties."]
    },
    {
        id: 'p1-act-2',
        title: 'Government Savings Promotion Act, 1873',
        category: 'Paper I',
        type: 'heavy',
        duration: 1,
        tips: ["Definitions of Depositor & Minor.", "Rules on Nomination/Payment on death.", "Amendments by Finance Act 2018."]
    },
    {
        id: 'p1-act-3',
        title: 'PMLA 2002 & Amendments',
        category: 'Paper I',
        type: 'heavy',
        duration: 3,
        tips: ["Sec 3 (Offense of ML).", "Sec 12 (Reporting Obligations).", "Proceeds of Crime definition."]
    },
    {
        id: 'p1-act-4',
        title: 'Consumer Protection Act, 2019',
        category: 'Paper I',
        type: 'heavy',
        duration: 2,
        tips: ["New definition of Consumer (E-commerce).", "Jurisdiction levels (DCDRC, SCDRC, NCDRC).", "Product Liability."]
    },
    {
        id: 'p1-act-5',
        title: 'Information Technology Act, 2000',
        category: 'Paper I',
        type: 'heavy',
        duration: 2,
        tips: ["Sec 43, 66 (Cyber Crimes).", "Digital vs Electronic Signature.", "Certifying Authorities."]
    },

    // Rules
    { id: 'p1-rules-1', title: 'Post Office Rules & Regulations, 2024', category: 'Paper I', type: 'heavy', duration: 3, tips: ["New transmission rules.", "Prohibited articles list.", "Powers of Circle Heads."] },
    { id: 'p1-rules-2', title: 'Govt Savings Promotion Rules, 2018', category: 'Paper I', type: 'light', duration: 1, tips: ["Common provisions for all schemes.", "Minor account operation rules."] },

    // Savings Schemes (2019)
    { id: 'p1-scheme-1', title: 'PO Savings Account Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Min balance & Cheque rules."] },
    { id: 'p1-scheme-2', title: 'Recurring Deposit Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Default/Revival rules.", "Loan against RD."] },
    { id: 'p1-scheme-3', title: 'Time Deposit Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Interest Rates & Premature closure."] },
    { id: 'p1-scheme-4', title: 'Monthly Income Account Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Limits (Single/Joint).", "Closure conditions."] },
    { id: 'p1-scheme-5', title: 'Senior Citizens Savings Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Eligibility", "Extension rules."] },
    { id: 'p1-scheme-6', title: 'NSC (VIII Issue) Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Transferability", "Pledging."] },
    { id: 'p1-scheme-7', title: 'Kisan Vikas Patra Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Doubling period", "Encashment rules."] },
    { id: 'p1-scheme-8', title: 'Public Provident Fund Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Min/Max limits", "Loan/Withdrawal timeline."] },
    { id: 'p1-scheme-9', title: 'Sukanya Samriddhi Account Scheme 2019', category: 'Paper I', type: 'light', duration: 1, tips: ["Age limits", "Operation", "Closure rules."] },

    // Postal Manuals & Regulations
    { id: 'p1-man-1', title: 'POLI Scheme 2011 (SANKALAN)', category: 'Paper I', type: 'heavy', duration: 2, tips: ["Whole Life vs Endowment.", "Claim settlement norms."] },
    { id: 'p1-man-2', title: 'Book of BO Rules', category: 'Paper I', type: 'heavy', duration: 2, tips: ["BPM duties", "Cash handling", "Account Bag."] },
    { id: 'p1-man-3', title: 'Postal Manual Vol II', category: 'Paper I', type: 'heavy', duration: 2, tips: ["Organization", "Powers of Circle Heads", "Stock Depot."] },
    { id: 'p1-man-4', title: 'Postal Manual Vol III', category: 'Paper I', type: 'heavy', duration: 2, tips: ["Discipline & Appeal rules specific to Dept.", "Supervision."] },
    { id: 'p1-man-5', title: 'Postal Manual Vol IV', category: 'Paper I', type: 'heavy', duration: 3, tips: ["Establishment", "Leave Rules", "Appointments."] },
    { id: 'p1-man-6', title: 'Postal Manual Vol V (Except Appx-1)', category: 'Paper I', type: 'heavy', duration: 3, tips: ["Mail Bag", "Registered/Insured Articles", "Compensation."] },
    { id: 'p1-man-7', title: 'Postal Manual Vol VI (Part I, II, III)', category: 'Paper I', type: 'heavy', duration: 4, tips: ["MO rules", "SB Control", "Sub-accounts."] },
    { id: 'p1-man-8', title: 'Postal Manual Vol VII', category: 'Paper I', type: 'heavy', duration: 3, tips: ["RMS working", "Sorting Cases", "Due Mail Lists."] },
    { id: 'p1-man-9', title: 'Postal Manual Vol VIII', category: 'Paper I', type: 'heavy', duration: 2, tips: ["SRO duties", "Transit Sections."] },
    { id: 'p1-man-10', title: 'Mail Operations & Money Remittances', category: 'Paper I', type: 'heavy', duration: 3, tips: ["MNOP/PNOP KPIs", "eMO, iMO procedures."] },

    // Schemes & Guidelines
    { id: 'p1-misc-1', title: 'Jansuraksha Schemes', category: 'Paper I', type: 'light', duration: 1, tips: ["PMJJBY", "PMSBY", "APY details."] },
    { id: 'p1-misc-2', title: 'Inland/Foreign Post (PO Guide I & II)', category: 'Paper I', type: 'heavy', duration: 4, tips: ["Tariff rules", "Prohibitions", "Customs forms.", "Foreign Post categories."] },
    { id: 'p1-misc-3', title: 'DIGIPIN Guidelines', category: 'Paper I', type: 'light', duration: 1, tips: ["Structure of DIGIPIN", "Grid system."] },
    { id: 'p1-misc-4', title: 'Network Optimization (MNOP, PNOP, DNKs)', category: 'Paper I', type: 'heavy', duration: 2, tips: ["Nodal delivery", "Export facilitation via DNK."] },
    { id: 'p1-misc-5', title: 'Consolidation of Products', category: 'Paper I', type: 'light', duration: 1, tips: ["Merger of services", "New product portfolio."] },

    // Savings Bank
    { id: 'p1-sb-1', title: 'POSB Manuals (Vol I, II, III) & SB Orders', category: 'Paper I', type: 'heavy', duration: 5, tips: ["General SB rules", "Specific scheme procedures", "Recent SB orders."] },
    { id: 'p1-sb-2', title: 'POSB (CBS) Manual', category: 'Paper I', type: 'heavy', duration: 3, tips: ["Finacle menu codes", "SOL ID", "Role of Makers/Checkers."] },
    { id: 'p1-sb-3', title: 'Annual Reports & Book of Info', category: 'Paper I', type: 'light', duration: 1, tips: ["Key stats of Dept", "Vision/Mission."] },

    // Tech & Records
    { id: 'p1-tech-1', title: 'IT Knowledge (CSI, PLI-CIS, IPPB)', category: 'Paper I', type: 'heavy', duration: 3, tips: ["Core Banking Solutions", "PLI software workflow", "IPPB products."] },
    { id: 'p1-tech-2', title: 'Preservation & Disposal of Records', category: 'Paper I', type: 'light', duration: 1, tips: ["Retention periods for different files."] },

    // Service & Conduct Rules
    { id: 'p1-serv-1', title: 'CCS (Conduct) Rules, 1964', category: 'Paper I', type: 'heavy', duration: 2, tips: ["Integrity", "Asset declaration", "Political neutrality."] },
    { id: 'p1-serv-2', title: 'CCS (CCA) Rules, 1965', category: 'Paper I', type: 'heavy', duration: 3, tips: ["Penalties (Major/Minor)", "Suspension", "Appeal process."] },
    { id: 'p1-serv-3', title: 'CCS (Temporary Service) Rules, 1965', category: 'Paper I', type: 'light', duration: 1, tips: ["Termination", "Quasi-permanency."] },
    { id: 'p1-serv-4', title: 'GDS (Conduct & Engagement) Rules, 2020', category: 'Paper I', type: 'heavy', duration: 2, tips: ["Engagement conditions", "Penalties for GDS."] },


    // --- PAPER II (50 Marks) ---
    // Note: Noting/Drafting/ChargeSheet are usually handled as Practice items in the planner, 
    // but we can list specific study topics here too for 'Reading' about them.
    { id: 'p2-1', title: 'Noting & Drafting Principles', category: 'Paper II', type: 'light', duration: 2, tips: ["Format of Note", "Drafting Official Letters/DO Letters."] },
    { id: 'p2-2', title: 'Drafting Major Penalty Charge Sheet', category: 'Paper II', type: 'heavy', duration: 2, tips: ["Article of Charge", "Statement of Imputation", "List of Documents/Witnesses."] },


    // --- PAPER III (300 Marks) ---
    // Legal & Constitutional
    { id: 'p3-leg-1', title: 'Constitution: Preamble, FR, DPSP, Duties', category: 'Paper III', type: 'heavy', duration: 3, tips: ["Art 12-35 (FR)", "Art 36-51 (DPSP)", "Art 51A (Duties)."] },
    { id: 'p3-leg-2', title: 'Constitution: Judiciary & Services (sel. Art)', category: 'Paper III', type: 'heavy', duration: 2, tips: ["Art 124-147 (SC)", "Art 214-232 (HC)", "Art 311 (Dismissal), 338 (SC/ST Comm)."] },
    { id: 'p3-leg-3', title: 'Bharatiya Nagarik Suraksha Sanhita 2023', category: 'Paper III', type: 'heavy', duration: 3, tips: ["Sec 1, 2 (Definitions)", "Sec 84 (Proclamations)."] },
    { id: 'p3-leg-4', title: 'CAT Act 1985', category: 'Paper III', type: 'light', duration: 1, tips: ["Jurisdiction of CAT", "Application process."] },
    { id: 'p3-leg-5', title: 'Revenue Recovery Act 1890', category: 'Paper III', type: 'light', duration: 1, tips: ["Recovery of public dues."] },
    { id: 'p3-leg-6', title: 'Prevention of Corruption Act 1988', category: 'Paper III', type: 'heavy', duration: 2, tips: ["Public Servant definition", "Offenses & Penalties."] },
    { id: 'p3-leg-7', title: 'RTI Act 2005 & Rules 2012', category: 'Paper III', type: 'heavy', duration: 2, tips: ["Exemptions", "Time limits", "Appellate Authorities."] },
    { id: 'p3-leg-8', title: 'Sexual Harassment Act 2013', category: 'Paper III', type: 'light', duration: 1, tips: ["ICC formation", "Inquiry process."] },

    // Financial & Procurement
    { id: 'p3-fin-1', title: 'Manuals on Procurement (Goods, Works, Services)', category: 'Paper III', type: 'heavy', duration: 3, tips: ["GeM", "Tendering types", "Consultancy contracts."] },
    { id: 'p3-fin-2', title: 'General Financial Rules 2017 (Ch 2 & 6)', category: 'Paper III', type: 'heavy', duration: 2, tips: ["Financial propriety", "Procurement rules."] },
    { id: 'p3-fin-3', title: 'Schedule of Financial Powers (Div/Circle)', category: 'Paper III', type: 'light', duration: 1, tips: ["SOP limits for recurring/non-recurring exp."] },
    { id: 'p3-fin-4', title: 'P&T FHB Vol I & Postal FHB Vol II', category: 'Paper III', type: 'heavy', duration: 3, tips: ["Budgeting", "Accounting", "DDO responsibilities."] },

    // Establishment & Pensions
    { id: 'p3-est-1', title: 'CCS (GPF) Rules 1961', category: 'Paper III', type: 'light', duration: 1, tips: ["Subscription", "Advances", "Withdrawals."] },
    { id: 'p3-est-2', title: 'CCS (Pension) Rules 2021', category: 'Paper III', type: 'heavy', duration: 3, tips: ["Qualifying service", "Superannuation", "Family Pension."] },
    { id: 'p3-est-3', title: 'CCS (Commutation of Pension) Rules 1981', category: 'Paper III', type: 'light', duration: 1, tips: ["Table of commutation", "Restoration after 15 yrs."] },
    { id: 'p3-est-4', title: 'NPS Rules 2021 & Gratuity Rules', category: 'Paper III', type: 'heavy', duration: 2, tips: ["Govt contribution (14%)", "Exit options."] },
    { id: 'p3-est-5', title: 'Fundamental Rules (FR) & Supplementary Rules (SR)', category: 'Paper III', type: 'heavy', duration: 3, tips: ["Pay fixation", "Joining time", "TA/DA rules."] },
    { id: 'p3-est-6', title: 'Casual Labourers (Brochure)', category: 'Paper III', type: 'light', duration: 1, tips: ["Grant of temp status", "Wage calculation."] },
    { id: 'p3-est-7', title: 'Maintenance of APAR', category: 'Paper III', type: 'light', duration: 1, tips: ["Reporting/Reviewing timeline", "Grading system."] },
    { id: 'p3-est-8', title: 'Service Discharge Benefit Scheme 2010', category: 'Paper III', type: 'light', duration: 1, tips: ["For GDS", "Contribution details."] },
    { id: 'p3-est-9', title: 'Welfare Measures (Dept & GDS)', category: 'Paper III', type: 'light', duration: 1, tips: ["Scholarships", "Medical assistance", "Circle Welfare Fund."] },

    // General Aptitude
    { id: 'p3-gen-1', title: 'English Language', category: 'Paper III', type: 'light', duration: 1, tips: ["Grammar", "Precis", "Vocab."] },
    { id: 'p3-gen-2', title: 'GK & Current Affairs', category: 'Paper III', type: 'light', duration: 1, tips: ["Economy", "Polity", "Culture", "Sports."] },
    { id: 'p3-gen-3', title: 'Aptitude & Ethics', category: 'Paper III', type: 'light', duration: 1, tips: ["Reasoning", "Math", "Interpersonal skills", "Ethics."] },
];
