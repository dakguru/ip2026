import { RawQuestion } from '../quizzes';

// =====================================================================================
// POSTAL MANUAL VOLUME VIII — Inspection & Administrative Standards
// Source: "Postal Manual Volume VIII — Inspection & Administrative Standards" (Dak Guru
//          Study Material, Edition 2026) — read in full, all 76 pages / 10 chapters.
// Coverage (chapter by chapter):
//   Ch.1  Heads of Circles (Rules 1–89)            — personal duties, complaints, records,
//                                                     inspection periodicities, statistics, sanctions
//   Ch.2  Superintendents (Rules 112–239)          — control, cash balances, sorting orders,
//                                                     diaries, inspection standards & day-counts
//   Ch.3  Inspectors of Post Offices (Rules 260–300)
//   Ch.4  Town Inspectors & Overseer-Postmen (Rules 303–313)
//   Ch.5  Assistant Superintendents & Inspectors, RMS (Rules 320–335)
//   Ch.6  Omitted (no content in the manual)
//   Ch.7  Overseers (Rules 343 onward)
//   Ch.8  Stock Depots (Rules 357–390)
//   Ch.9  Returned Letter Offices — RLO (Rules 389–434)
//   Ch.10 Breaks and Accidents
// Integrated for the LDCE IP course mode: topic p1-13 "Postal Manual Volume VIII".
// All form numbers, rule numbers, periodicities, monetary limits and deadlines are drawn
// strictly from the source booklet. Answer index "a" is 0-based.
// =====================================================================================

// -------------------------------------------------------------------------------------
// SET 1 — Chapter 1: Heads of Circles — Personal Duties (Rules 1–11)
// -------------------------------------------------------------------------------------
export const pm_vol8_set1: RawQuestion[] = [
  {
    q: "Under Rule 1 of Volume VIII, who is the \"Head of a Circle\"?",
    o: ["The senior-most Superintendent of the Circle", "The chief officer of a Postal Circle, including the Postmaster General and Directors in independent charge of a Circle", "The Director General of Posts", "The Chief Postmaster of the GPO"],
    a: 1,
    e: "The Head of a Circle is the chief officer of a Postal Circle and includes the Postmaster General and Directors in independent charge of a Circle; all Superintendents, Inspectors and Postmasters are subordinate to him."
  },
  {
    q: "Wherever the term \"Superintendent\" is used in Volume VIII, it also includes:",
    o: ["Senior Superintendent", "Inspector of Posts", "Assistant Superintendent", "Postmaster General"],
    a: 0,
    e: "Note 1 to Rule 1 states that 'Superintendent' wherever used includes 'Senior Superintendent'."
  },
  {
    q: "For the Army Postal Service, all the powers of a Head of Circle are exercised by:",
    o: ["The Adjutant General", "The Chief Postmaster General, Delhi", "The Director, Army Postal Services", "The Field Postmaster"],
    a: 2,
    e: "Note 3 to Rule 1 provides that for the Army Postal Service, the Director, Army Postal Services exercises all the powers of a Head of Circle."
  },
  {
    q: "Under Rule 2, the FIRST inspection of the Stock Depot (half-year ending 30th September), together with physical verification of all stores and stock, is carried out by:",
    o: ["The APMG / Assistant Director in charge of the Stock Depot", "The Head of the Circle or the Director Postal Services", "The Stock Depot Manager", "The Senior Superintendent of Post Offices"],
    a: 1,
    e: "Rule 2: the first inspection (half-year ending 30 Sep), with physical verification of all articles of stores and stock, is done by the Head of the Circle or the Director Postal Services."
  },
  {
    q: "Under Rule 2, the SECOND inspection of the Stock Depot (half-year ending 31st March) is carried out by:",
    o: ["The Head of the Circle himself", "The Director General's inspecting officer", "The APMG / Assistant Director in charge of the Stock Depot", "The Postmaster of the nearest HO"],
    a: 2,
    e: "The second inspection (half-year ending 31 Mar) is done by the APMG / Assistant Director in charge of the Stock Depot, who checks compliance with the first inspection's orders and reconciliation of discrepancies."
  },
  {
    q: "At the three Central Forms Stores (PSD Aligarh, PSD Kolkata, PSD Nasik Road), the physical verification of forms is carried out during which inspection each year?",
    o: ["The first (September) inspection", "The second (March) inspection", "A special monsoon inspection", "Every quarter"],
    a: 1,
    e: "For the three Central Forms Stores, the physical verification of forms is done during the second (March) inspection each year."
  },
  {
    q: "Under Rule 2-A, the Head of the Circle inspects his own office (self-inspection) how often?",
    o: ["Once every two years", "Twice a year", "Once a year", "Once every six months"],
    a: 2,
    e: "Rule 2-A: the Head of the Circle inspects his own office once a year and submits the Inspection Report to the Director General, Posts."
  },
  {
    q: "After the Circle Office self-inspection under Rule 2-A, a complete report on action taken is sent to the Directorate after:",
    o: ["Three months", "Six months", "One month", "One year"],
    a: 1,
    e: "A further complete report on action taken is sent to the Directorate after six months."
  },
  {
    q: "Under Rule 3, a Postmaster General should, if possible, visit every station serving as district headquarters at least once in:",
    o: ["One year", "Two years", "Three years", "Six months"],
    a: 1,
    e: "Rule 3: a Postmaster General should, if possible, visit every district headquarters station at least once in two years."
  },
  {
    q: "Under Rule 5, on which form does the Head of the Circle examine the diaries of Superintendents?",
    o: ["Form APP-32(a)", "Form Genl-2", "Form Genl-1", "Form Est-52"],
    a: 2,
    e: "Rule 5: the Head of the Circle personally examines the Superintendents' diaries (Form Genl-1) to check idleness and unduly long halts and to ensure inspections do not fall into arrears."
  },
  {
    q: "Under Rule 6, the punishment registers submitted by subordinate offices to the Head of the Circle are maintained on which form?",
    o: ["Form APP-32(a)", "Form Genl-1", "Form CPT-3", "Form Est-52"],
    a: 0,
    e: "Rule 6: the Head of the Circle examines the copies of punishment registers (Form APP-32(a)) submitted by subordinate offices."
  },
  {
    q: "Under Rule 7, the Head of the Circle must accelerate any pension or gratuity case that has been pending for:",
    o: ["One month or more", "Two months or more", "Three months or more", "Six months or more"],
    a: 2,
    e: "Rule 7: the Head of the Circle scrutinises the monthly consolidated return (compiled from Form Est-52) and accelerates any case pending three months or more."
  },
  {
    q: "Under Rule 8, the Head of the Circle or Director Postal Services must inspect the Returned Letter Office (RLO):",
    o: ["Once every year (period ending 30th September)", "Twice a year", "Once in two years", "Once every six months"],
    a: 0,
    e: "Rule 8: the Head of the Circle or DPS inspects the RLO once every year (period ending 30 Sep); the APMG/ADPS additionally inspects for the period ending 31 Mar."
  },
  {
    q: "Under Rule 10, the balances of the Mumbai, Kolkata and Chennai GPOs and the Delhi HO must be verified how many times a year?",
    o: ["Two times (both by the City Superintendent)", "Three times", "Four times — one by the Director Postal Services and three by the City Superintendent", "Six times"],
    a: 2,
    e: "Rule 10: these balances are verified four times a year — one verification by the Director Postal Services and three by the City Superintendent of Post Offices."
  },
  {
    q: "Under Rule 4, who must personally dispose of all copies of order-book remarks submitted in respect of inspections and verifications of accounts?",
    o: ["The Superintendent", "The Head of the Circle", "The Inspector of Posts", "The Audit Officer"],
    a: 1,
    e: "Rule 4: the Head of the Circle personally disposes of all copies of order-book remarks and calls for and examines the inspection/verification notes held in Superintendents' offices."
  },
  {
    q: "Under Rule 11, who is personally responsible for proper postal arrangements for the public at the Circle headquarters?",
    o: ["The Head Postmaster at HQ", "The Superintendent of Post Offices", "The Head of the Circle", "The Director General"],
    a: 2,
    e: "Rule 11: the Head of the Circle is personally responsible for proper postal arrangements for the public at his headquarters and must be thoroughly acquainted with the working of the HQ office(s)."
  }
];

// -------------------------------------------------------------------------------------
// SET 2 — Chapter 1: Registers, Complaints, Loss/Fraud & Records (Rules 12–31)
// -------------------------------------------------------------------------------------
export const pm_vol8_set2: RawQuestion[] = [
  {
    q: "Under Rule 12, Assistant Postmasters-General (APMGs) are attached to the Head of the Circle's office to assist personally in:",
    o: ["Accounts compilation and audit", "Inspection, investigation and supervision", "Recruitment and training", "Public relations only"],
    a: 1,
    e: "Rule 12: APMGs assist personally in inspection, investigation and supervision, and should be freely deputed away from headquarters, especially in serious cases of robbery, abstraction or fraud."
  },
  {
    q: "Under Rule 13, the Register of Lines and Stages is maintained on which form?",
    o: ["Form M-162", "Form Bgt-14", "Form M-40", "Form Capt-1"],
    a: 2,
    e: "Rule 13: the Register of lines and stages is kept on Form M-40; the register of weighment-system despatches is on Form M-162."
  },
  {
    q: "Under Rule 14, into how many categories is each complaint in the Register of Complaints classified?",
    o: ["Three", "Four", "Five", "Seven"],
    a: 1,
    e: "Rule 14: complaints are classified into four categories — A (service fault), B (beyond the Department's control), C (human delinquency) and D (groundless)."
  },
  {
    q: "In the complaint classification under Rule 14, Category 'A' denotes a complaint due to:",
    o: ["Reasons beyond the control of the Department", "Service fault", "Human delinquency", "Groundless reasons"],
    a: 1,
    e: "Category A = due to service fault. (B = beyond control; C = human delinquency; D = groundless.)"
  },
  {
    q: "In the complaint classification under Rule 14, Category 'C' denotes a complaint due to:",
    o: ["Service fault", "Reasons beyond the control of the Department", "Human delinquency (service falling below prescribed norms)", "Groundless reasons"],
    a: 2,
    e: "Category C = due to human delinquency, i.e. service falling below prescribed norms."
  },
  {
    q: "The statement of complaints submitted by subordinate units to the Head of the Circle is on which form?",
    o: ["Form CPT-1", "Form CPT-3", "Form MS-6", "Form Pa-19"],
    a: 1,
    e: "The statement of complaints from subordinate units is Form CPT-3; the register of complaints itself is maintained in manuscript on proforma CPT-1."
  },
  {
    q: "Under Rule 14, the Head of the Circle takes serious notice of complaint cases pending over:",
    o: ["One month", "Three months", "Six months", "One year"],
    a: 2,
    e: "A monthly abstract and summary is placed before the Head of the Circle, who takes serious notice of cases pending over six months."
  },
  {
    q: "Under Rule 14-A, the quarterly statement of receipt, disposal and pendency of complaints must reach the Directorate by:",
    o: ["The 5th of the following month", "The 10th of the following month", "The 20th of the following month", "The last day of the quarter"],
    a: 2,
    e: "Rule 14-A: the quarterly return must reach the Directorate by the 20th of the following month (e.g. quarter ending 31 March → by 20 April)."
  },
  {
    q: "Under Rule 15, the Circle-level Register of Loss / Fraud / Misappropriation records cases in how many sections?",
    o: ["Four", "Five", "Seven", "Ten"],
    a: 2,
    e: "Rule 15: the register records loss/fraud/misappropriation cases in seven sections (registered articles, insured articles, money orders, SB accounts, PO certificates, misappropriation of cash/stamps, and miscellaneous)."
  },
  {
    q: "In the Loss/Fraud register under Rule 15, primary offenders and subsidiary offenders are respectively marked:",
    o: ["'1' and '2'", "'P' and 'S'", "'A' and 'B'", "'M' and 'S'"],
    a: 1,
    e: "Primary offenders are marked 'P' and subsidiary offenders 'S'. (Remember: Loss/Fraud register = 7 sections; Complaints = 4 categories.)"
  },
  {
    q: "Under Rule 16 (preservation of records), for how long are the diaries of Superintendents preserved?",
    o: ["1 year after the month to which they relate", "3 years", "5 years", "Permanently"],
    a: 0,
    e: "Rule 16: diaries of Superintendents are preserved 1 year after the month to which they relate."
  },
  {
    q: "Under Rule 16, the preservation period for the Director-General's Circulars and General Orders is:",
    o: ["1 year", "3 years after the close of the year of issue", "6 months", "Permanent"],
    a: 1,
    e: "Rule 16: DG's Circulars and General Orders are preserved 3 years after the close of the year of issue."
  },
  {
    q: "Under Rule 16, tour programmes are preserved for:",
    o: ["6 months after completion of the tour", "1 year", "3 years", "Permanently"],
    a: 0,
    e: "Rule 16: tour programmes are preserved 6 months after completion of the tour."
  },
  {
    q: "Under Rule 16, invalid / extraordinary pension cases are preserved for:",
    o: ["5 years after retirement", "12 years", "20 years", "25 years from sanction"],
    a: 3,
    e: "Rule 16: invalid / extraordinary pension cases are preserved 25 years from sanction (other pension cases: 5 years after retirement)."
  },
  {
    q: "Under Rule 16, 'Rulings on all subjects' are preserved for:",
    o: ["3 years", "20 years", "Permanent", "1 year"],
    a: 2,
    e: "Rule 16: rulings on all subjects are preserved permanently."
  },
  {
    q: "Under Rule 28, the monthly statement of statistics (Form Ms-14(c)) must reach the Director General by:",
    o: ["The 5th of the following month", "The 10th of the following month", "The 20th of the following month", "The end of the following month"],
    a: 2,
    e: "Rule 28: the monthly statistics statement (Form Ms-14(c), compiled from Ms-14(a)) must reach the DG by the 20th of the following month."
  },
  {
    q: "Under Rule 31, the half-yearly enumeration of ordinary unregistered articles is carried out during the second week of which months?",
    o: ["January and July", "February and August", "March and September", "April and October"],
    a: 1,
    e: "Rule 31: enumeration is done in the second week of February and August each year; returns are on Form MS-6 and the Head of the Circle reports the result on Form Pa-19."
  },
  {
    q: "Under Rule 31, the enumeration reports are due to the DG not later than:",
    o: ["1st March and 1st September", "1st April (Feb enumeration) and 1st October (Aug enumeration)", "20th of the following month", "15th April and 15th October"],
    a: 1,
    e: "Rule 31: reports are due not later than 1st April (for the February enumeration) and 1st October (for the August enumeration)."
  }
];

// -------------------------------------------------------------------------------------
// SET 3 — Chapter 1: Inspection Periodicities, Notices & Sanctioning Powers (Rules 20–89)
// -------------------------------------------------------------------------------------
export const pm_vol8_set3: RawQuestion[] = [
  {
    q: "Under Rule 20, the office of every Superintendent of Post Offices and RMS is thoroughly inspected at least once in every:",
    o: ["6 months", "12 months", "18 months", "24 months"],
    a: 1,
    e: "Rule 20: the office of every Superintendent (Posts and RMS) is thoroughly inspected at least once in every 12 months."
  },
  {
    q: "Under Rule 21, a first-class Head Office (except a Presidency HO) is inspected:",
    o: ["Once in 12 months by the SSPO", "Twice in 12 months", "Once in two years", "Four times a year"],
    a: 0,
    e: "Rule 21: a first-class HO (except Presidency) is inspected once in 12 months by the SSPO; its administrative branch is also inspected once a year."
  },
  {
    q: "Under Rule 21, a second-class Head Office is inspected:",
    o: ["Once in 12 months", "Twice in 12 months (≈6-month intervals) by the Superintendent", "Once in two years", "Only on complaint"],
    a: 1,
    e: "Rule 21: a second-class HO is inspected twice in 12 months (about 6-month intervals) by the Superintendent. (Trap: 1st-class HO = once a year, but 2nd-class = twice a year.)"
  },
  {
    q: "Under Rule 21, all sub-offices and branch offices are inspected:",
    o: ["Once in 12 months", "Twice in 12 months, divided between the Superintendent and Inspectors", "Four times a year", "Once in two years"],
    a: 1,
    e: "Rule 21: all sub and branch offices are inspected twice in 12 months, divided between the Superintendent and Inspectors (branch-office systematic inspection being the Inspector's special duty)."
  },
  {
    q: "Under Rule 21, Presidency GPO branches are inspected by the Presidency Postmaster:",
    o: ["Once a year", "Twice a year", "Four times a year", "Once in two years"],
    a: 1,
    e: "Rule 21: Presidency GPO branches are inspected by the Presidency Postmaster twice a year."
  },
  {
    q: "Under Rule 23, a Head of Circle's orders for general guidance are published as a circular that is issued:",
    o: ["Weekly", "Monthly", "Quarterly", "Annually"],
    a: 1,
    e: "Rule 23: the Head of Circle's circular is published monthly with a consecutive annual series of numbers; circulars are destroyed after 3 years. (By contrast the DG's circular is weekly.)"
  },
  {
    q: "Under Rule 30, registered newspapers may post without affixing stamps (under licence) provided they post not less than:",
    o: ["100 articles at a time", "200 articles at a time", "500 articles at a time", "1000 articles at a time"],
    a: 2,
    e: "Rule 30: registered newspapers posting not less than 500 articles at a time may post without stamps under a licence (Form MS-97, applied for on Form MS-96), on depositing security equal to one month's postage."
  },
  {
    q: "Under Rule 46, the Head of the Circle may authorise a branch office to accept articles for insurance up to a value of:",
    o: ["₹200", "₹600", "₹1,000", "₹5,000"],
    a: 1,
    e: "Rule 46: a branch office may be authorised to accept articles for insurance up to ₹600 (a legacy figure — current limits are higher under the latest SB Order / PO Guide)."
  },
  {
    q: "Under Rule 49, the aggregate cash that may be entrusted to a single (town) postman can be raised by the Head of the Circle to:",
    o: ["₹500", "₹1,000", "₹2,000", "₹5,000"],
    a: 2,
    e: "Rule 49: the Head of the Circle may raise the aggregate cash with a single postman to ₹2,000; for a single village postman the limit is ₹500 (police-certified safe beats), who may then also take out money orders up to ₹100 each."
  },
  {
    q: "Under Rule 49-A, an Inspector of Posts must verify payment of at least how many money orders per month?",
    o: ["25", "50", "75", "100"],
    a: 0,
    e: "Rule 49-A: an Inspector of Posts verifies at least 25 money orders a month; Town Inspectors, Overseers and Overseer-Postmen verify at least 50 each."
  },
  {
    q: "Under Rule 49-A, Town Inspectors, Overseers and Overseer-Postmen must each verify payment of at least how many money orders per month?",
    o: ["25", "40", "50", "60"],
    a: 2,
    e: "Rule 49-A: these ground-level delivery supervisors verify at least 50 money orders a month (double the Inspector of Posts' 25)."
  },
  {
    q: "Under Rule 54-1, a certificate of non-payment for a lost/miscarried Indian Postal Order can be obtained from the DAG (Posts), Delhi, only after:",
    o: ["6 months", "12 months", "16 months from the last day of the month of issue", "24 months"],
    a: 2,
    e: "Rule 54-1: a certificate of non-payment can be obtained only after 16 months from the last day of the month of issue; the Superintendent/First-Class Postmaster may then sanction a genuine refund."
  },
  {
    q: "Under Rules 57–66, the Head of the Circle may decide a deceased/incapacitated depositor's claim (cash) up to a limit of:",
    o: ["₹1,000", "₹2,500", "₹5,000", "₹10,000"],
    a: 2,
    e: "Rule 63: the Head of the Circle decides claims up to ₹5,000 cash or ₹5,000 nominal securities; above that, probate/letters of administration/succession certificate is required. (The figure is a legacy limit, revised upward under current SB Orders.)"
  },
  {
    q: "Under Rule 77, the RLO half-yearly return (Form RLO-5) for the half-year ending 30th September must be submitted by the Head of the Circle to the DG by:",
    o: ["1st October", "15th October", "20th October", "31st October"],
    a: 1,
    e: "Rule 77: Form RLO-5 for the half-years ending 30 Sep and 31 Mar is submitted to the DG by 15 October and 15 April respectively."
  },
  {
    q: "Under Rule 75, prepayment of postage in cash (instead of stamps) is available for unregistered packets posted in a quantity of not less than:",
    o: ["200 at a time", "300 at a time", "500 at a time", "1000 at a time"],
    a: 2,
    e: "Rule 75: prepayment of postage in cash is available for unregistered packets posted in a quantity of not less than 500 at a time."
  },
  {
    q: "Under Rule 22, ordinarily how many copies of each postal notice go to an office?",
    o: ["One", "Two (one for the noticeboard, one for record)", "Three", "Four"],
    a: 1,
    e: "Rule 22: ordinarily only two copies of each notice go to an office (one for the noticeboard, one for record); printing-press type for a postal notice is kept standing for ten days for additional copies."
  }
];

// -------------------------------------------------------------------------------------
// SET 4 — Chapter 2: Superintendents — Control, Cash Balances, Sorting Orders & Diaries
// -------------------------------------------------------------------------------------
export const pm_vol8_set4: RawQuestion[] = [
  {
    q: "Under Rule 112, on which date do Head Offices forward the Memorandum of Distribution of Pay and Allowances (Form ACG-26) to the Superintendent?",
    o: ["The 1st of each month", "The 5th of each month", "The 10th of each month", "The last day of the month"],
    a: 1,
    e: "Rule 112: on the 5th of each month, HOs forward the Memorandum of Distribution of Pay and Allowances (Form ACG-26) for the preceding month, with the A-Rolls, to the Superintendent/Senior Superintendent."
  },
  {
    q: "Under Rule 122, the memorandum of distribution of work submitted by Head/Sub Postmasters for the Superintendent's approval is on which form?",
    o: ["Form MS-11", "Form MS-88", "Form Pa-17(a)", "Form ACG-26"],
    a: 0,
    e: "Rule 122: every Head/Sub Postmaster assisted by clerks submits a memorandum of distribution of work in Form MS-11 for the Superintendent's approval."
  },
  {
    q: "Under Rule 138, the MAXIMUM cash balance of an office is fixed with reference to its:",
    o: ["Daily receipts", "Daily payments", "Monthly turnover", "Authorised establishment"],
    a: 1,
    e: "Rule 138: the maximum cash balance is fixed with reference to daily payments; the minimum with reference to daily receipts ('Max ← payments, Min ← receipts')."
  },
  {
    q: "Under Rule 139, the difference between the maximum and the minimum cash balance must in no case be less than:",
    o: ["One-quarter of the minimum cash balance", "Half the minimum cash balance", "The full minimum cash balance", "Twice the minimum cash balance"],
    a: 1,
    e: "Rule 139: (max − min) must be at least half the minimum cash balance. E.g. if min = ₹10,000, max must be at least ₹15,000."
  },
  {
    q: "Under Rule 141, the minimum and maximum cash balance of a first-class Head Office is fixed by:",
    o: ["The Head of the Circle", "The Postmaster himself", "The Senior Superintendent of Post Offices (SSPO)", "The Director General"],
    a: 2,
    e: "Rule 141: the cash balance of a first-class HO is fixed by the SSPO — not the Head of the Circle and not the Postmaster. (For other offices, the Superintendent fixes the balances.)"
  },
  {
    q: "Under Rules 143–144, the consolidated memo of authorised balances supplied to each Head Office (for all sub-offices in account with it) is on which form?",
    o: ["Form Pa-14", "Form Pa-14(s)", "Form Pa-15(s)", "Form Pa-20"],
    a: 2,
    e: "Rules 143–144: the consolidated memo (cash, stamps, IPOs and drawing limits for all sub-offices in account with the HO) is Form Pa-15(s), supplied by the Superintendent."
  },
  {
    q: "Under Rule 162, an 'A' Order issued by the Superintendent is a:",
    o: ["Sorting Order — a copy of which must be furnished to the Head of the Circle", "Guidance Order — no copy going to the Head of the Circle", "Camp-articles order", "Punishment order"],
    a: 0,
    e: "Rule 162: an 'A' Order is a Sorting Order (change in a sorting list); a copy of every 'A' Order must be furnished to the Head of the Circle. ('A goes up, B stays down.')"
  },
  {
    q: "Under Rule 162, 'B' Orders — instructions for the guidance of subordinates on other subjects — are:",
    o: ["Copied to the Head of the Circle", "NOT furnished to the Head of the Circle", "Issued only by the Head of the Circle", "Destroyed daily"],
    a: 1,
    e: "Rule 162: a 'B' (Guidance) Order is NOT furnished to the Head of the Circle. For camp articles of high officials on tour, 'T' is prefixed to 'B' (T-B Order)."
  },
  {
    q: "Under Rule 164, a Superintendent RMS receives a copy of each sub-divisional Inspector's diary [Genl-2(S)]:",
    o: ["Fortnightly — on the 1st and 16th", "Weekly — on the 1st, 8th, 16th and 24th", "Monthly — on the 1st", "Daily"],
    a: 1,
    e: "Rule 164: the Superintendent RMS receives the Inspector's diary weekly (1st, 8th, 16th, 24th) with a monthly summary [Inspn-9]; the Superintendent of Posts receives it fortnightly (1st, 16th) with summary [Inspn-3]."
  },
  {
    q: "Under Rule 167, the office of every Inspector is thoroughly inspected by the Superintendent at least once in every 12 months, and a copy of the order-book remarks (Form Ms-8) is forwarded to:",
    o: ["The Director General", "The Head of the Circle", "The Audit Office", "The Postmaster"],
    a: 1,
    e: "Rule 167: the Inspector's office is inspected at least once in every 12 months; a copy of the order-book remarks (Form Ms-8) is forwarded to the Head of the Circle."
  },
  {
    q: "Under Rule 171–172, the prescribed speed of Letter Mail Runners is:",
    o: ["3 miles per hour", "4 miles per hour", "5 miles per hour", "6 miles per hour"],
    a: 2,
    e: "Rule 171–172: Letter Mail Runners = 5 miles per hour; Parcel Mail Runners = 3 miles per hour ('Letters 5, Parcels 3')."
  },
  {
    q: "Under Rule 171–172, the prescribed speed of Parcel Mail Runners is:",
    o: ["2 miles per hour", "3 miles per hour", "4 miles per hour", "5 miles per hour"],
    a: 1,
    e: "Rule 171–172: Parcel Mail Runners move at 3 miles per hour — slower than the 5 mph letter mail runners, because parcel mail is heavier."
  },
  {
    q: "Under Rule 184, the Superintendent submits the Haulage and Weighment Statement (Form MS-60(a)) to the Head of the Circle on or before:",
    o: ["1st January and 1st July", "1st February and 1st August", "1st April and 1st October", "21st January and 21st July"],
    a: 1,
    e: "Rule 184: the statement (Form MS-60(a)) is submitted on or before 1st February and 1st August, showing accommodation on each railway on 21st January and 21st July respectively."
  },
  {
    q: "Under Rule 195, the Superintendent's diary (Form Genl-1) — a copy of the preceding fortnight's entries — is sent to the Head of the Circle on:",
    o: ["The 1st and 16th of each month", "The 1st, 8th, 16th and 24th", "The 5th and 20th", "The last day of the month"],
    a: 0,
    e: "Rule 195: a copy of the preceding fortnight's diary entries (Genl-1) is sent to the Head of the Circle on the 1st and 16th of each month. First-Class Postmasters do not submit diaries but send a quarterly statement of inspection to the SSPO."
  },
  {
    q: "Under Rule 216, iron safes in the Division are painted in which colour scheme to prevent rusting?",
    o: ["Red outside and green inside", "Green outside and red inside", "Black outside and grey inside", "Grey outside and black inside"],
    a: 1,
    e: "Rule 216: iron safes are painted green outside and red inside ('GORI' — Green Outside, Red Inside). Every letter box in the Division is regularly painted once a year."
  },
  {
    q: "Under Rule 194/2, the register maintained by the Superintendent for a continuous record of loss/fraud cases is on which form?",
    o: ["Form M-89", "Form M-40", "Form Genl-1", "Form MS-8"],
    a: 0,
    e: "Rule 194/2: the Division's continuous loss/fraud register is Form M-89 (retention: 7 years for sections, 4 years for RMS)."
  }
];

// -------------------------------------------------------------------------------------
// SET 5 — Chapter 2: Inspection Standards, Day-Counts & Verification (Rules 238–239)
// -------------------------------------------------------------------------------------
export const pm_vol8_set5: RawQuestion[] = [
  {
    q: "Under the Rule 238 standard schedule, the annual Inspection-cum-Verification of a Head Post Office / GPO lasts:",
    o: ["3 days", "4 days", "5 days", "6 days"],
    a: 3,
    e: "Rule 238: the annual Inspection-cum-Verification of an HO/GPO lasts 6 days; the half-yearly Verification of an HO/GPO lasts 3 days."
  },
  {
    q: "Under Rule 238, the half-yearly Verification of a Head Post Office / GPO lasts:",
    o: ["2 days", "3 days", "4 days", "6 days"],
    a: 1,
    e: "Rule 238: HO/GPO half-yearly Verification = 3 days (the annual Inspection-cum-Verification = 6 days)."
  },
  {
    q: "Under Rule 238, the annual inspection of a Sub Post Office (HSG I & II) and an MDG lasts:",
    o: ["1 day", "2 days", "3 days", "4 days"],
    a: 2,
    e: "Rule 238: SPO (HSG I & II) and MDG annual inspection = 3 days; an LSG Sub Post Office = 2 days."
  },
  {
    q: "Under Rule 238, the annual inspection of a Branch Post Office lasts:",
    o: ["1 day", "2 days", "3 days", "Half a day"],
    a: 0,
    e: "Rule 238: a Branch Post Office annual inspection = 1 day (as does a C-Class single-handed non-delivery SO, the RLO, and a Mail Office)."
  },
  {
    q: "Under Rule 238, the annual inspection of a PSD (Postal Store Depot) lasts:",
    o: ["2 days", "3 days", "4 days", "6 days"],
    a: 2,
    e: "Rule 238: a PSD (Postal Store Depot) annual inspection = 4 days."
  },
  {
    q: "Under Rule 238, the annual inspection of a Head Record Office lasts:",
    o: ["1 day", "2 days", "3 days", "4 days"],
    a: 2,
    e: "Rule 238: a Head Record Office annual inspection = 3 days (a Sub Record Office = 2 days)."
  },
  {
    q: "Under the Rule 238 time schedule, the target percentage of inspections to be completed in the 1st quarter (Jan–Mar) is:",
    o: ["15%", "20%", "30%", "35%"],
    a: 0,
    e: "Rule 238 quarter targets: Q1 (Jan–Mar) 15%, Q2 (Apr–Jun) 35%, Q3 (Jul–Sep) 30%, Q4 (Oct–Dec) 20%."
  },
  {
    q: "Under the Rule 238 time schedule, the target percentage of inspections to be completed in the 2nd quarter (Apr–Jun) is:",
    o: ["15%", "20%", "30%", "35%"],
    a: 3,
    e: "Rule 238: the 2nd quarter (Apr–Jun) target is 35% — the highest of the four quarters (15-35-30-20)."
  },
  {
    q: "Under the Rule 238 time schedule, the target percentage of inspections for the 4th quarter (Oct–Dec) is:",
    o: ["15%", "20%", "30%", "35%"],
    a: 1,
    e: "Rule 238: the 4th quarter (Oct–Dec) target is 20% (quarter split 15-35-30-20)."
  },
  {
    q: "Under Rule 239, the Superintendent thoroughly verifies the balances of all Head Offices in the Division:",
    o: ["Once in every 12 months", "Twice in every 12 months (at ~6-month intervals)", "Four times a year", "Once in two years"],
    a: 1,
    e: "Rule 239: the Superintendent verifies HO balances twice in every 12 months. Combined with the Inspector's two verifications (Rule 299), each HO is checked four times a year."
  },
  {
    q: "Under Rule 239, the HO Summary (Form ACG-1) is checked for entries on how many dates during a verification?",
    o: ["2 dates", "3 dates", "4 dates of different months", "5 dates"],
    a: 2,
    e: "Rule 239: the HO Summary (ACG-1), the Treasurer's Cash Book (ACG-2) and the Register of Cheques are each checked for entries on at least 4 dates of different months."
  },
  {
    q: "Under Rule 239, Service Books are checked to the extent of at least:",
    o: ["2% of books", "5% of books, taken at random", "10% of books", "All books"],
    a: 1,
    e: "Rule 239: at least 5% of Service Books are checked, taken at random."
  },
  {
    q: "Under the Rule 239 timelines, for an inspection lasting 1 day, the report must be issued within:",
    o: ["7 days", "15 days", "30 days", "45 days"],
    a: 1,
    e: "Rule 239 report deadlines: 1-day inspection → 15 days; 2 to <8 days → 30 days; 8 days and above → 45 days."
  },
  {
    q: "Under the Rule 239 timelines, for an inspection lasting 8 days and above, the report must be issued within:",
    o: ["15 days", "30 days", "45 days", "60 days"],
    a: 2,
    e: "Rule 239: an inspection of 8 days and above → report within 45 days."
  },
  {
    q: "Under Rule 238, during the year there is one Verification and one Verification-cum-Inspection. Which falls in the first half of the year?",
    o: ["Verification", "Verification-cum-Inspection", "Both fall in the first half", "Neither — both are in the second half"],
    a: 0,
    e: "Rule 238: the first half of the year is the Verification; the second half is the Verification-cum-Inspection."
  },
  {
    q: "Under Rule 238, the annual inspection of an RLO (Returned Letter Office) lasts:",
    o: ["1 day", "2 days", "3 days", "4 days"],
    a: 0,
    e: "Rule 238: an RLO annual inspection lasts 1 day."
  }
];

// -------------------------------------------------------------------------------------
// SET 6 — Chapter 3: Inspectors of Post Offices (Rules 260–300)
// -------------------------------------------------------------------------------------
export const pm_vol8_set6: RawQuestion[] = [
  {
    q: "Under Rule 260, an Inspector must possess a thorough practical knowledge of:",
    o: ["Only savings-bank work", "Post-office work and of all departmental forms, so as to instruct subordinates", "Only accounts and audit", "Railway timetables"],
    a: 1,
    e: "Rule 260: an Inspector must have thorough practical knowledge of post-office work and all departmental forms, be able to instruct subordinates, and be able to take charge of an HO/important SO in an emergency."
  },
  {
    q: "Under Rule 260-A, on receipt of a report of loss, fraud, highway robbery or serious irregularity, the Inspector must:",
    o: ["Wait for the Superintendent's written orders", "Proceed at once to the spot to investigate, continuing until relieved by a senior officer", "Refer the matter to the police only", "Enter it in the diary and take no field action"],
    a: 1,
    e: "Rule 260-A: the Inspector proceeds at once to the spot to investigate and continues until relieved by the arrival of the Superintendent or other senior officer."
  },
  {
    q: "Under Rule 260-B, when in charge of routine office work, the Inspector opens and distributes the dak — except:",
    o: ["The dak from the Head of the Circle", "Registered dak", "Insured dak", "The dak from the Superintendent"],
    a: 0,
    e: "Rule 260-B: the Inspector attends to opening and distribution of dak except the dak from the Head of the Circle, issues reminders, passes TA bills of lower staff, and grants casual leave when the Superintendent is on tour."
  },
  {
    q: "Under Rule 260-C, the Inspector inspects the complaints branch:",
    o: ["Once a month", "Once a fortnight", "Once a week", "Once a quarter"],
    a: 1,
    e: "Rule 260-C: the Inspector inspects the complaints branch once a fortnight and is responsible for prompt disposal of complaints and submission of the related statements."
  },
  {
    q: "Under Rule 261, the Inspector may grant leave to a Branch Postmaster (BPM / GDS) up to:",
    o: ["30 days", "45 days", "60 days", "90 days"],
    a: 2,
    e: "Rule 261: the Inspector may grant leave up to 60 days to a Branch Postmaster and up to 90 days to other GDS in his sub-division."
  },
  {
    q: "Under Rule 261, the Inspector may grant leave to GDS other than a Branch Postmaster up to:",
    o: ["60 days", "75 days", "90 days", "120 days"],
    a: 2,
    e: "Rule 261: leave up to 90 days may be granted to GDS other than a Branch Postmaster (a BPM gets the smaller 60-day figure)."
  },
  {
    q: "Under Rule 273, village-postmen beats may be arranged under which two systems?",
    o: ["Fixed Beat and Unfixed Beat", "Urban Beat and Rural Beat", "Day Beat and Night Beat", "Primary Beat and Secondary Beat"],
    a: 0,
    e: "Rule 273: the two systems are Fixed Beat and Unfixed Beat (a combined fixed-and-unfixed beat mixes the two). Route lists and beat maps are on Form M-53."
  },
  {
    q: "Under Rule 276, the Village Sorting List supplied by the Inspector to each office is on which form?",
    o: ["Form M-52", "Form M-53", "Form M-40", "Form MS-88"],
    a: 0,
    e: "Rule 276: the Village Sorting List is Form M-52 (route list = M-53 — don't swap them)."
  },
  {
    q: "Under Rule 277, the Village Return is submitted by each Branch Office in which month, and must reach the Superintendent by 1st April?",
    o: ["January (first 14 days)", "February (first 14 days)", "March (first 14 days)", "April (first 14 days)"],
    a: 2,
    e: "Rule 277: the Village Return is submitted by each BO in March, kept for the first 14 days of March, and must reach the Superintendent not later than 1st April."
  },
  {
    q: "Under Rule 280, the Inspector should carry how many Aligarh locks of standard size while on tour?",
    o: ["Two", "Four", "Half a dozen (6)", "A dozen (12)"],
    a: 2,
    e: "Rule 280: the Inspector carries half a dozen (6) Aligarh locks of standard size on tour, to replace any unserviceable lock found on a letter box."
  },
  {
    q: "Under Rule 293, the diary of an Inspector of Posts is on Form Genl-2 and is submitted:",
    o: ["Weekly — on the 1st, 8th, 16th and 24th", "Fortnightly — on the 1st and 16th", "Monthly — on the 1st", "Daily"],
    a: 1,
    e: "Rule 293: the Inspector of Posts' diary (Genl-2) is fortnightly (1st and 16th); the Inspector RMS' diary [Genl-2(S)] is weekly (1st, 8th, 16th, 24th)."
  },
  {
    q: "Under Rule 298, the Inspector's order book (Form MS-8) contains how many serially numbered pages?",
    o: ["100 pages", "150 pages", "200 pages", "250 pages"],
    a: 2,
    e: "Rule 298: the order book (Form MS-8) contains 200 serially numbered pages; the related guidance book contains 100 pages ('Order = 200, Guidance = 100')."
  },
  {
    q: "Under Rule 299, the Inspector thoroughly verifies the balances of all Head Post Offices in his sub-division:",
    o: ["Once in every 12 months", "Two times in every 12 months", "Four times in every 12 months", "Once in two years"],
    a: 1,
    e: "Rule 299: the Inspector verifies HO balances two times in every 12 months; with the Superintendent's two verifications (Rule 239), each HO is checked four times a year."
  },
  {
    q: "Under Rule 300, the Inspector must inspect each sub-office assigned to him by the Superintendent:",
    o: ["Once every 12 months", "Twice every 12 months", "Once every two years", "Only on complaint"],
    a: 0,
    e: "Rule 300: the Inspector inspects each assigned sub-office once every 12 months, and all Branch Offices in his sub-division except those the Superintendent inspects himself, using the prescribed BO/SO questionnaire."
  },
  {
    q: "Under Rule 260-B, the Inspector (or Assistant Superintendent) grants casual leave to the staff:",
    o: ["At any time on his own authority", "Only when the Superintendent is on tour", "Never — only the Superintendent grants it", "Only with the Head of the Circle's sanction"],
    a: 1,
    e: "Rule 260-B: the Inspector grants casual leave to the staff when the Superintendent is on tour."
  }
];

// -------------------------------------------------------------------------------------
// SET 7 — Chapters 4 & 7: Town Inspectors, Overseer-Postmen & Overseers
// -------------------------------------------------------------------------------------
export const pm_vol8_set7: RawQuestion[] = [
  {
    q: "Under Rule 303, a Town Inspector is appointed in large town/city offices to supervise delivery and conveyance of mails within the town under the orders of the Postmaster. His jurisdiction is fixed by:",
    o: ["The Postmaster", "The Superintendent", "The Head of the Circle", "The Town Inspector himself"],
    a: 2,
    e: "Rule 303: the Town Inspector's jurisdiction is fixed by the Head of the Circle; his central duty is to see that postmen and delivery staff work honestly, punctually and correctly."
  },
  {
    q: "Under Rule 309, the Town Inspector must verify payment of at least how many money orders per month?",
    o: ["25", "40", "50", "75"],
    a: 2,
    e: "Rule 309: the Town Inspector (like the Overseer and Overseer-Postman) verifies at least 50 money orders per month; an Inspector of Posts verifies 25."
  },
  {
    q: "In which record are all irregularities in the work of postmen logged (Rules 312–313)?",
    o: ["The order book (MS-8)", "The Town Inspector's diary", "The Register of Complaints (CPT-1)", "The Loss/Fraud register (M-89)"],
    a: 1,
    e: "Rules 312–313: all irregularities noticed in the postmen's duties are recorded in the Town Inspector's diary, and prompt action is taken."
  },
  {
    q: "The monthly list of money orders verified by the Town Inspector / Overseer-Postman (Form Genl-6) is submitted to the Superintendent by:",
    o: ["The 5th of the following month", "The 8th of the following month", "The 10th of the following month", "The 20th of the following month"],
    a: 0,
    e: "Chapter 4: the Genl-6 MO-verified list accompanies the diary of the last working day of the month and is submitted to the Superintendent by the 5th of the following month."
  },
  {
    q: "An Overseer-Postman is best described as:",
    o: ["A clerk who supervises accounts", "A senior postman who combines postman duties with limited supervisory functions over other postmen", "A gazetted inspecting officer", "A record-office sorter"],
    a: 1,
    e: "An Overseer-Postman is a senior 'working supervisor' postman who, in smaller town set-ups, supervises and tests the delivery work of other postmen in addition to (or in place of) a Town Inspector."
  },
  {
    q: "Under Rules 343/168, Overseers are employed in each Division for supervision of runner lines, supervision of village postmen, AND:",
    o: ["Sorting of registered mail", "Conveyance or escort of cash remittances between offices — when prescribed by the Head of the Circle", "Maintenance of the order book", "Inspection of head offices"],
    a: 1,
    e: "Rules 168/343: the three Overseer jobs are (1) supervision of runner lines, (2) supervision of village postmen/postmen/ABPMs, and (3) escort of cash remittances between offices — the last only when prescribed by the Head of the Circle."
  },
  {
    q: "The Overseer's diary is maintained on which form, and submitted to the Inspector how often?",
    o: ["Form Genl-1, fortnightly", "Form Genl-4, weekly", "Form Genl-2, fortnightly", "Form Genl-6, monthly"],
    a: 1,
    e: "The Overseer's diary is Form Genl-4, submitted weekly to the Inspector; the work summary is Genl-12 (monthly) and the money-orders-verified list is Genl-6."
  },
  {
    q: "The Overseer's monthly list of money orders verified (Form Genl-6) is forwarded onward to the Superintendent by:",
    o: ["The 5th of the month", "The 8th of the month", "The 16th of the month", "The 24th of the month"],
    a: 1,
    e: "For the Overseer, the monthly Genl-6 MO-verified list, with the Inspector's summary, is submitted to the Superintendent by the 8th of the month (Rule 282)."
  },
  {
    q: "How many money orders per month must an Overseer verify?",
    o: ["25", "40", "50", "60"],
    a: 2,
    e: "The Overseer (like the Town Inspector and Overseer-Postman) verifies at least 50 money orders per month (Rule 49-A)."
  },
  {
    q: "Under Rule 169, an Overseer returns to his central office at fixed intervals ordinarily not longer than:",
    o: ["3 days", "5 days", "7 days", "10 days"],
    a: 2,
    e: "Rule 169: the Overseer returns to his central office at intervals ordinarily not longer than 7 days; the Superintendent prepares a route statement for each Overseer."
  },
  {
    q: "Under Rule 283, when the Overseer disburses pay to the road (runner) establishment, the completed acquittance rolls are sent to:",
    o: ["The Audit Office directly", "The Head Office (through the Inspector) for record and audit", "The Superintendent's office", "The Circle Office"],
    a: 1,
    e: "Rule 283: the completed acquittance rolls (the signed pay-lists proving the money reached each runner) are sent by the Overseer to the Head Office through the Inspector, for record and audit."
  },
  {
    q: "When an Overseer meets a village postman on the beat, which of the man's records does he examine (in addition to cash and undelivered articles)?",
    o: ["The order book (MS-8)", "The visit book (Form Ms-86) and book of receipts", "The Register of Complaints (CPT-1)", "The A-Roll"],
    a: 1,
    e: "The Overseer examines the village postman's visit book (Form Ms-86), book of receipts, cash and undelivered articles whenever he meets him on the beat or at the office."
  },
  {
    q: "For contrast: while a Town Inspector / Overseer / Overseer-Postman verify 50 money orders a month, an Inspector of Posts verifies:",
    o: ["10", "25", "40", "50"],
    a: 1,
    e: "An Inspector of Posts verifies 25 money orders a month; the ground-level delivery supervisors (Town Inspector, Overseer, Overseer-Postman) verify 50 each (Rule 49-A)."
  }
];

// -------------------------------------------------------------------------------------
// SET 8 — Chapter 5: Assistant Superintendents & Inspectors, RMS (Rules 320–335)
// -------------------------------------------------------------------------------------
export const pm_vol8_set8: RawQuestion[] = [
  {
    q: "Under Rule 320, an Assistant Superintendent / Inspector RMS is entrusted mainly with:",
    o: ["Delivery of mail in towns", "Checking the sorting work done by sections and mail offices, and investigating important cases of loss/fraud", "Fixing cash balances of head offices", "Recruitment of Gramin Dak Sevaks"],
    a: 1,
    e: "Rule 320: the ASP/Inspector RMS mainly checks the sorting work of sections and mail offices and investigates important cases of loss, fraud, etc."
  },
  {
    q: "Under Rule 320, when attached to the office of a Head of a Circle, an Inspector/ASP RMS is designated:",
    o: ["Sorting Inspector", "Circle Inspector", "Mail Agent", "Sorting Assistant"],
    a: 0,
    e: "Rule 320: an Inspector/ASP RMS attached to the Circle Office is designated a Sorting Inspector."
  },
  {
    q: "Under Chapter 1 Rule 21(4), every mail office, record office or section must be thoroughly inspected at least:",
    o: ["Once in 12 months", "Twice in every 12 months", "Four times a year", "Once in two years"],
    a: 1,
    e: "Rule 21(4): every mail office, record office or section is inspected twice in every 12 months, divided by the Head of the Circle between the Superintendent RMS, the ASP RMS and the Sub-divisional Inspector RMS."
  },
  {
    q: "In the division of RMS inspections, which offices are reserved to the Superintendent RMS?",
    o: ["The smaller sub-offices", "The more important mail/record offices and the more important sorting sections", "Only branch offices", "Only transit sections"],
    a: 1,
    e: "The Superintendent RMS takes the more important mail/record offices and sorting sections; the ASP and Sub-divisional Inspector take the other offices and sections as allotted."
  },
  {
    q: "The order book used by the Inspector RMS for recording inspection results is:",
    o: ["Form Genl-2(S) with 100 pages", "Form MS-8 with 200 pages", "Form M-40 with 50 pages", "Form Ms-14(b)"],
    a: 1,
    e: "As for the Inspector of Posts (Rule 298), the RMS order book is Form MS-8 with 200 pages; a copy of the remarks goes to the Superintendent."
  },
  {
    q: "The diary of an Inspector RMS is on Form Genl-2(S) and is submitted:",
    o: ["Fortnightly — on the 1st and 16th", "Weekly — on the 1st, 8th, 16th and 24th", "Monthly — on the 1st", "Daily"],
    a: 1,
    e: "The Inspector RMS diary [Genl-2(S)] is weekly (1st, 8th, 16th, 24th) with a monthly summary [Inspn-9] — RMS moves faster, so it reports more often than the Posts fortnightly cycle."
  },
  {
    q: "Under Rule 326, irregularities noticed by a Sub-divisional Inspector RMS, and the results of any investigation entrusted to him, must be communicated to the Superintendent:",
    o: ["Weekly", "Fortnightly", "Daily", "Monthly"],
    a: 2,
    e: "Rule 326: both irregularities noticed and investigation results must be communicated to the Superintendent DAILY — the key distinguishing feature of RMS supervision from the slower Posts cycle."
  },
  {
    q: "The Inspector RMS maintains the Register of Lines and Stages on which form, with entries made in what order?",
    o: ["Form M-53, chronological order", "Form M-40, alphabetical order", "Form MS-8, serial order", "Form Genl-4, numerical order"],
    a: 1,
    e: "The Inspector RMS maintains the register of lines and stages (Form M-40) with entries in alphabetical order; where a line crosses more than one sub-division, each Inspector records it throughout its length."
  },
  {
    q: "In the RMS context, the expression \"Inspector\" includes, unless the context shows otherwise:",
    o: ["The Head Sorting Assistant", "The Sub-divisional Inspector RMS", "The Mail Guard", "The Sorting Assistant"],
    a: 1,
    e: "Rule 320: the expression 'Inspector' in the RMS context includes the Sub-divisional Inspector RMS unless the context shows otherwise."
  },
  {
    q: "Among the general duties (Rule 321), the ASP / Inspector RMS checks the sorting work to ensure that:",
    o: ["Bags and bundles are correctly made up, routed and exchanged per the sorting list", "Cash balances are within limits", "Pension cases are cleared in three months", "Letter boxes are painted annually"],
    a: 0,
    e: "Rule 321: the ASP/Inspector RMS checks that bags and bundles are correctly made up, routed and exchanged per the sorting list, and tests punctual exchange and connection of mails at junctions and transit points."
  },
  {
    q: "In current practice, the ASP / Inspector RMS carries out surprise checks and night visits mainly to:",
    o: ["Head post offices", "Transit sections, to verify proper exchange of bags", "Circle offices", "Stock depots"],
    a: 1,
    e: "In current practice, the ASP/Inspector RMS carries out surprise checks and night visits to transit sections to verify proper exchange of bags, watching for over-carrying, dumping and mis-routing."
  },
  {
    q: "Which of the following is a core investigation focus of the ASP / Inspector RMS (Rule 321)?",
    o: ["Franking-machine licences", "Cases of loss, fraud, abstraction, mis-sending and missent/over-carried bags", "Newspaper registration", "Duplicate pass-books"],
    a: 1,
    e: "Rule 321: the ASP/Inspector RMS investigates important cases of loss, fraud, abstraction, mis-sending and missent/over-carried bags."
  }
];

// -------------------------------------------------------------------------------------
// SET 9 — Chapter 8: Stock Depots (Rules 357–390)
// -------------------------------------------------------------------------------------
export const pm_vol8_set9: RawQuestion[] = [
  {
    q: "Under Rule 357, the official in charge of a Stock Depot in Postal Circles is designated:",
    o: ["The Superintendent", "The Manager", "The Stock Clerk", "The Depot Postmaster"],
    a: 1,
    e: "Rule 357: the official in charge of a Stock Depot is the Manager, responsible for safe custody of stock, correctness of the stock registers, timely supply, and disposal of obsolete articles."
  },
  {
    q: "Which office continues its pivotal national role of supplying stamps and seals for all post offices in the country?",
    o: ["PSD Kolkata", "PSD Nasik Road", "PSFS Aligarh (Postal Stores, Forms & Seals)", "GPO Mumbai"],
    a: 2,
    e: "PSFS Aligarh is the national stamp-and-seal supply point (working with the Government of India Press) and is also the disposal hub for obsolete stamps/seals and the source of Aligarh locks."
  },
  {
    q: "The three Central Forms Stores are:",
    o: ["Aligarh, Delhi and Chennai", "Aligarh (PSFS), Kolkata (PSD) and Nasik Road (PSD)", "Mumbai, Kolkata and Chennai", "Aligarh, Nagpur and Nasik Road"],
    a: 1,
    e: "The three Central Forms Stores are PSFS Aligarh, PSD Kolkata and PSD Nasik Road; physical verification of forms at these three is done during the second (March) inspection."
  },
  {
    q: "Under Rule 374, obsolete and unserviceable stamps and seals must be:",
    o: ["Sold as scrap to the highest bidder", "Auctioned locally", "Never sold — sent to the Postal Workshop at Aligarh for disposal/destruction under proper supervision", "Retained permanently in the depot"],
    a: 2,
    e: "Rule 374: obsolete and unserviceable stamps and seals must never be sold; they are sent to the Postal Workshop at Aligarh for disposal/destruction under proper supervision."
  },
  {
    q: "Under Rule 380, stock articles weighing over 10 kg are despatched:",
    o: ["By Service Registered Parcel", "By rail, steamer or other suitable conveyance (as goods)", "As Service Packets", "By insured post only"],
    a: 1,
    e: "Rule 380: stock articles over 10 kg go by rail, steamer or other suitable conveyance as goods; those under 10 kg go by Service Registered Parcel if they contain valuables."
  },
  {
    q: "Under Rule 381, forms weighing over 5 kg are despatched:",
    o: ["As Service Packets", "Enclosed in a bag and sent as goods by rail / steamer", "By Service Registered Parcel", "By ordinary book post"],
    a: 1,
    e: "Rule 381: small quantities of forms go as Service Packets; forms over 5 kg are enclosed in a bag and sent as goods by rail/steamer."
  },
  {
    q: "The despatch weight thresholds are respectively — stock articles and forms:",
    o: ["5 kg and 10 kg", "10 kg and 5 kg", "10 kg and 10 kg", "20 kg and 10 kg"],
    a: 1,
    e: "Despatch thresholds: stock articles 10 kg (Rule 380); forms 5 kg (Rule 381). Stamps/valuables are guarded more closely, hence the higher 10 kg cut-off and registered-parcel route."
  },
  {
    q: "Under Rule 387, the entries in the Depot's stock register are checked against:",
    o: ["The indents received", "The invoices with which articles were received or despatched", "The monthly statistics (Ms-14)", "The order book (MS-8)"],
    a: 1,
    e: "Rule 387: stock-register entries are checked against the invoices with which articles were received or despatched, so recorded balances always agree with documented movements."
  },
  {
    q: "Post offices requisition stamps, forms and stores from the Depot by:",
    o: ["An indent", "A money order", "A pay order", "A telegram"],
    a: 0,
    e: "Post offices requisition stamps, forms and stores from the Depot by indent; the Depot supplies against the indent within authorised scales, each despatch accompanied by an invoice."
  },
  {
    q: "Postage stamps and stationery for sale in mail offices are, in the first instance, procured from:",
    o: ["PSFS Aligarh directly", "The nearest Head Post Office", "The Circle Stamp Depot", "The Superintendent RMS"],
    a: 1,
    e: "The first supply of stamps and stationery to mail offices is procured from the nearest Head Post Office (then replenished through the Depot)."
  },
  {
    q: "The Manager of a Stock Depot is responsible for all of the following EXCEPT:",
    o: ["Safe custody of all stock", "Correctness of the stock registers and timely supply to offices", "Proper disposal of obsolete or unserviceable articles", "Fixing the cash balances of head offices"],
    a: 3,
    e: "Rule 357: the Manager is responsible for safe custody, correct registers, timely supply and disposal of obsolete articles. Fixing HO cash balances is the SSPO's/Superintendent's function (Chapter 2)."
  },
  {
    q: "In a Minor Circle, the first inspection and physical verification of the Stock Depot (half-year ending 30 September) is carried out by:",
    o: ["The APMG in charge of the depot", "The Head of the Circle or a Deputy Director", "The Stock Depot Manager", "The Director General"],
    a: 1,
    e: "In Minor Circles, the first inspection and physical verification (half-year ending 30 Sep) is carried out by the Head of the Circle or a Deputy Director."
  }
];

// -------------------------------------------------------------------------------------
// SET 10 — Chapters 9 & 10: Returned Letter Offices (RLO) and Breaks & Accidents
// -------------------------------------------------------------------------------------
export const pm_vol8_set10: RawQuestion[] = [
  {
    q: "Under Rule 389, a Returned Letter Office (RLO) is established at:",
    o: ["Every Head Post Office", "The Headquarters of each Postal Circle", "Every Divisional headquarters", "The nearest National Sorting Hub"],
    a: 1,
    e: "Rule 389: an RLO is established at the Headquarters of each Postal Circle and functions under the direct control and supervision of the CPMG (Head of the Circle)."
  },
  {
    q: "The RLO functions under the direct control and supervision of:",
    o: ["The Superintendent of Post Offices", "The CPMG (Head of the Circle)", "The Director General", "The Head Postmaster"],
    a: 1,
    e: "Rule 389: the RLO works under the direct control and supervision of the CPMG; the officer/official in charge is the Manager (Returned Letters), assisted by Returned Letter Assistants."
  },
  {
    q: "Under Rule 406, lottery tickets detected in transmission are destroyed under the personal supervision of an officer not below the rank of:",
    o: ["Inspector", "Superintendent", "Director", "Postmaster General"],
    a: 2,
    e: "Rule 406: lottery tickets detected in transmission are destroyed under the personal supervision of an officer not below the rank of Director."
  },
  {
    q: "Under Rule 414, the RLO envelope and the RLO label are respectively:",
    o: ["RLO 10 and RLO(s)", "RLO(s) and RLO 10", "RLO 3 and RLO 5", "RLO 5 and RLO 3"],
    a: 1,
    e: "Rule 414: the RLO envelope is RLO(s) and the RLO label is RLO 10. An opened/no-sender article is forwarded in an RLO envelope; a closed article bearing the sender's full address is redirected by pasting the RLO 10 label."
  },
  {
    q: "Under Rule 414, an unclaimed/refused letter-mail article that bears the sender's full name & address and is NOT opened is:",
    o: ["Forwarded in an RLO envelope RLO(s)", "Redirected by pasting the RLO label (RLO 10) with the revised address", "Destroyed immediately", "Held under double-lock"],
    a: 1,
    e: "Rule 414: such an article (closed, with the sender's full address) is redirected by pasting the RLO 10 label with the revised address; opened/no-sender articles go in the RLO(s) envelope."
  },
  {
    q: "Under Rule 433, unclaimed newspapers and magazines are returned to the publisher/distributor/agent:",
    o: ["Weekly", "Monthly", "Quarterly", "Only on demand"],
    a: 1,
    e: "Rule 433: unclaimed newspapers/magazines are returned to the publisher/distributor/agent monthly; if fewer than five copies, despatch may be deferred to the end of the second month (by which they must in any case be despatched)."
  },
  {
    q: "Under Rule 433, if fewer than five copies of unclaimed magazines are held, despatch may be deferred to:",
    o: ["The end of the first week", "The end of the second month", "The end of the quarter", "The end of the year"],
    a: 1,
    e: "Rule 433: with fewer than 5 copies, despatch may be deferred to the end of the second month — by the end of which they must in any case be despatched."
  },
  {
    q: "Under Rule 434, registered articles containing valuable property received at the RLO are entered in the register on Form:",
    o: ["RLO 3", "RLO 5", "RLO 10", "RLO(s)"],
    a: 0,
    e: "Rule 434: such articles are entered in the register of registered articles & articles containing valuable property received (Form RLO 3) and kept in a separate strong secured almirah, chronologically by date of receipt, with an alphabetical index by addressee."
  },
  {
    q: "Under Rule 434, valuable registered articles at the RLO are kept:",
    o: ["Loose in the sorting hall", "In a separate, strong, secured almirah with compartments, chronologically by date of receipt", "With the Manager's personal cash", "In the general record room"],
    a: 1,
    e: "Rule 434: valuable registered articles are kept in a separate strong, double-secured almirah with compartments, arranged chronologically by date of receipt, with an alphabetical index by addressee for quick retrieval."
  },
  {
    q: "Which modern instrument now primarily governs the detention and disposal of undelivered items at the RLO (esp. Regulation 67)?",
    o: ["The Indian Post Office Act, 1898", "The Post Office Rules / Regulations, 2024 (under the Post Office Act, 2023)", "The GFR, 2017", "The IPO Rules, 1933"],
    a: 1,
    e: "Detention/disposal of undelivered items is now governed by the Post Office Rules/Regulations, 2024 (Reg. 67), made under the Post Office Act, 2023 (in force 18 June 2024). The Manual's scheme remains the exam framework."
  },
  {
    q: "Under Chapter 10, if the detention to mails from a break/accident is likely to EXCEED 6 hours, the report is made:",
    o: ["Only to the Record Office", "At once to the Superintendent (and the Record Office)", "To the Head of the Circle only", "To the police only"],
    a: 1,
    e: "Chapter 10 (the 6-hour rule): if likely detention exceeds 6 hours, report at once (by fastest means) to the Superintendent; if less than 6 hours, the report goes only to the Record Office."
  },
  {
    q: "Under Chapter 10, if the likely detention to mails is LESS than 6 hours, the report is sent:",
    o: ["At once to the Superintendent", "Only to the Record Office", "To the Head of the Circle", "To the Director General"],
    a: 1,
    e: "Chapter 10: if likely detention is less than 6 hours, the report is sent only to the Record Office (over 6 hours → Superintendent at once)."
  },
  {
    q: "Under Chapter 10, misconnection of mail buses, trains and air services is reported by the Record Offices to:",
    o: ["The Superintendent, as early as possible", "The Head of the Circle only", "The Director General", "The railway authorities only"],
    a: 0,
    e: "Chapter 10: misconnection of mail buses, trains and air services is reported to the Superintendent as early as possible by the Record Offices."
  },
  {
    q: "Under Chapter 10, in any accident the immediate priority of the supervising officer is:",
    o: ["Informing the press", "The safety and security of the mail bags — especially registered, insured and VP articles and cash", "Restoring the damaged vehicle", "Filing the diary entry"],
    a: 1,
    e: "Chapter 10: the immediate priority in an accident is the safety and security of the mail bags — especially registered, insured and value-payable articles and any cash — before other concerns; then restore communication by an alternative arrangement."
  },
  {
    q: "Under Chapter 10, application for extra railway accommodation for a transit section (when regular accommodation is inadequate) is made by:",
    o: ["The Head of the Circle", "The Mail Agent / Mail Guard in charge (for the section); the Superintendent RMS for the division generally", "The Postmaster", "The Stock Depot Manager"],
    a: 1,
    e: "Chapter 10: for a transit section, extra railway accommodation is applied for by the Mail Agent / Mail Guard in charge; for the division generally, by the Superintendent RMS."
  }
];
