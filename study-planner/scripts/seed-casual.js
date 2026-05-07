
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
} else {
    dotenv.config();
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found');
    process.exit(1);
}

// Define Schema (to match the existing model)
const DakSutraSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    rule_number: { type: String },
    act_name: { type: String, required: true },
    category: {
        type: String,
        required: true,
        enum: ['Rule', 'Section', 'Regulation', 'Circular', 'Explanation']
    },
    effective_date: { type: Date },
    exam_tags: { type: [String], default: [] },
    official_text: { type: String },
    guru_explanation: { type: String },
    practical_example: { type: String },
    exam_insight: { type: String },
    document_url: { type: String },
    featured_image: { type: String },
    status: {
        type: String,
        default: 'published',
        enum: ['draft', 'published']
    },
    created_by: { type: String, required: true },
}, { timestamps: true });

function generateSlug(length = 6) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
}

DakSutraSchema.pre('save', function () {
    if (!this.slug) {
        this.slug = generateSlug();
    }
});

const DakSutra = mongoose.models.DakSutra || mongoose.model('DakSutra', DakSutraSchema);

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI);
        console.log("Connected successfully!");

        const dakSutra1 = {
            title: "Casual Labourers: Temporary Status, Wages & Leave Rules",
            rule_number: "Scheme 1993",
            act_name: "Casual Labourers Scheme",
            category: "Regulation",
            effective_date: new Date('1993-09-01'),
            exam_tags: ["Casual Labourer", "Wages", "Leave Rules", "LDCE IP", "PS Group B"],
            official_text: `
                <div class="space-y-4">
                    <p>📜 <strong>The Scheme:</strong> Called the <span class="text-blue-700 font-bold">"Casual Labourers (Grant of Temporary Status and Regularization) Scheme of Government of India, 1993"</span>.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-4 rounded-xl bg-blue-50 border border-blue-100">
                            <p class="font-bold text-blue-800 mb-1">Effective Date</p>
                            <p class="text-2xl font-black text-blue-600">01.09.1993</p>
                        </div>
                        <div class="p-4 rounded-xl bg-amber-50 border border-amber-100">
                            <p class="font-bold text-amber-800 mb-1">DoP Recruitment Ban</p>
                            <p class="text-2xl font-black text-amber-600">04.02.1997</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 class="font-black uppercase text-slate-700 mb-2">Applicability & Exceptions</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li>Applicable to <strong>Ministries/Departments</strong> of Government of India.</li>
                            <li><span class="text-red-700 font-bold">NOT Applicable to:</span> Department of Posts, Railways, and Department of Telecommunication (as they have their own schemes).</li>
                            <li><strong>Recruitment Ban:</strong> Complete ban imposed in DoP on recruitment of casual workers without Directorate approval (1997).</li>
                        </ul>
                    </div>
                    <div class="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50">
                        <h4 class="font-black uppercase text-indigo-800 mb-2">Conferment of Temporary Status (TS)</h4>
                        <p>Conferred on casual labourers who rendered <strong>continuous service of at least one year</strong> on the date of OM issue.</p>
                        <ul class="list-disc pl-5 mt-2 text-sm text-indigo-900/80">
                            <li>Does NOT reference availability of regular MTS posts.</li>
                            <li>Does NOT change existing duties or responsibilities.</li>
                        </ul>
                    </div>
                </div>
            `,
            guru_explanation: `
                <div class="space-y-6">
                    <section>
                        <h3 class="text-lg font-black text-blue-800 border-b-2 border-blue-200 pb-1 mb-3">The "Temporary Status" (TS) Concept</h3>
                        <p>Earning TS does not mean the labourer is suddenly a permanent government employee. They are <strong>still engaged on daily rates of pay</strong> on a need basis. They cannot enter the permanent establishment unless they pass through a <strong>regular MTS selection process</strong>.</p>
                    </section>
    
                    <section>
                        <h4 class="font-bold text-slate-800 mb-2">📊 Eligibility for Temporary Status (1 Year Service)</h4>
                        <table class="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                            <thead class="bg-blue-600 text-white">
                                <tr>
                                    <th class="p-3 text-left">Office Type</th>
                                    <th class="p-3 text-left">Minimum Days Required</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="border-b border-slate-100">
                                    <td class="p-3">Offices observing a <strong>6-days week</strong></td>
                                    <td class="p-3 font-bold text-blue-700">240 Days</td>
                                </tr>
                                <tr>
                                    <td class="p-3">Offices observing a <strong>5-days week</strong></td>
                                    <td class="p-3 font-bold text-blue-700">206 Days</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
    
                    <section>
                        <h4 class="font-bold text-slate-800 mb-2">💰 Wage Entitlements</h4>
                        <table class="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                            <thead class="bg-emerald-600 text-white">
                                <tr>
                                    <th class="p-3 text-left">Wage Component</th>
                                    <th class="p-3 text-left">Calculation / Rate</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="border-b border-slate-100">
                                    <td class="p-3"><strong>Daily Wages</strong> (Same Work)</td>
                                    <td class="p-3"><strong>1/30th of Min. Pay</strong> of relevant scale + DA (for 8 hrs)</td>
                                </tr>
                                <tr>
                                    <td class="p-3"><strong>TS Wage Package</strong></td>
                                    <td class="p-3 font-bold text-emerald-700">Minimum Pay Scale for regular MTS + DA + HRA</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
    
                    <section class="bg-amber-50 p-5 rounded-2xl border border-amber-200">
                        <h3 class="text-lg font-black text-amber-800 mb-3 flex items-center gap-2">
                            <span>🔟</span> Leave Calculation Process
                        </h3>
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">1</div>
                                <div>
                                    <p class="font-bold">Earning Rate</p>
                                    <p class="text-sm">Earns <strong>1 day of leave for every 10 days</strong> of work.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">2</div>
                                <div>
                                    <p class="font-bold">Account Update</p>
                                    <p class="text-sm">Leave credited twice a year: <strong>1st January</strong> and <strong>1st July</strong>.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center font-bold">3</div>
                                <div>
                                    <p class="font-bold">Accumulation</p>
                                    <p class="text-sm">Maximum accumulation limit is <strong>300 days</strong> (same as regular Govt employees).</p>
                                </div>
                            </div>
                        </div>
                    </section>
    
                    <section>
                        <h4 class="font-bold text-slate-800 mb-2">📋 Facilities & Conditions</h4>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div class="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                                <span class="text-blue-500">✅</span>
                                <span class="text-sm"><strong>Weekly Offs:</strong> 1 paid off after 6 days work (or 40 hrs in 5-day week).</span>
                            </div>
                            <div class="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                                <span class="text-blue-500">✅</span>
                                <span class="text-sm"><strong>Maternity Leave:</strong> Same as regular MTS for lady casual labourers.</span>
                            </div>
                            <div class="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                                <span class="text-blue-500">✅</span>
                                <span class="text-sm"><strong>Paternity Leave:</strong> 15 days during wife's confinement (&lt; 2 children).</span>
                            </div>
                            <div class="p-3 rounded-lg border border-red-200 bg-red-50 flex items-start gap-2">
                                <span class="text-red-500">❌</span>
                                <span class="text-sm font-bold text-red-800">No Leave Encashment on termination or quitting.</span>
                            </div>
                        </div>
                    </section>
                </div>
            `,
            practical_example: `
                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-blue-100/50 border border-blue-200">
                        <p class="font-black text-blue-800 uppercase text-xs mb-2">Scenario 1: Combining Leaves</p>
                        <p>A TS casual labourer takes 15 days of Paternity leave.</p>
                        <div class="mt-2 text-sm">
                            <p><strong>Action:</strong> Granted with wages drawn immediately before leave.</p>
                            <p class="text-blue-700 font-bold">Outcome: Not debited from regular leave account; can be combined with pro-rata earned leave.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl bg-indigo-100/50 border border-indigo-200">
                        <p class="font-black text-indigo-800 uppercase text-xs mb-2">Scenario 2: Weekly Off in Admin Office</p>
                        <p>Worker in a 5-day week office works 8 hours/day from Mon to Fri (40 hours total).</p>
                        <div class="mt-2 text-sm">
                            <p><strong>Action:</strong> Entitled to ONE paid weekly off.</p>
                            <p class="text-indigo-700 font-bold">Rule: Meets the 40-hour minimum threshold for administrative offices.</p>
                        </div>
                    </div>
                </div>
            `,
            exam_insight: `
                <div class="space-y-5">
                    <div>
                        <h4 class="font-black text-amber-800 uppercase text-xs flex items-center gap-1 mb-2">
                            <span class="text-lg">🔥</span> Most Asked Fact
                        </h4>
                        <p class="text-sm bg-amber-100/50 p-3 rounded-lg border border-amber-200">
                            The <strong>1993 Scheme</strong> is generally <strong>NOT applicable</strong> to the Department of Posts. DoP issued a complete ban on casual recruitment without Directorate approval in <strong>1997</strong>.
                        </p>
                    </div>
    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 rounded-lg border border-slate-200 bg-white">
                            <p class="font-black text-slate-500 uppercase text-[10px] mb-1">Frequently Confused</p>
                            <p class="text-xs">Leave accumulation limit is <strong>300 days</strong>, but earning rate is purely <strong>pro-rata (1 for 10)</strong>.</p>
                        </div>
                        <div class="p-3 rounded-lg border border-blue-200 bg-blue-50">
                            <p class="font-black text-blue-600 uppercase text-[10px] mb-1">One-Line Revision</p>
                            <p class="text-xs">A TS labourer's wage includes <strong>DA and HRA</strong>, matched to the <strong>minimum pay scale</strong> of a regular MTS.</p>
                        </div>
                    </div>
    
                    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <h4 class="font-black text-emerald-800 uppercase text-xs mb-3">🧠 Key Distinctions</h4>
                        <div class="space-y-2 text-sm">
                            <p><strong>Temporary Status vs. Permanent Status:</strong> TS confers pro-rata benefits/wages; Permanent Status requires <strong>formal selection</strong> into MTS establishment.</p>
                            <p><strong>6-Day vs. 5-Day Requirements:</strong> <strong>240 days</strong> in a 6-day week office vs. <strong>206 days</strong> in a 5-day week office.</p>
                        </div>
                    </div>
    
                    <div class="p-4 rounded-xl bg-slate-900 text-white shadow-lg">
                        <h4 class="font-black text-amber-400 uppercase text-xs mb-2">📌 Ultra-Revision Points</h4>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs list-disc pl-4 opacity-90">
                            <li>Scheme effective: <strong>01.09.1993</strong></li>
                            <li>DoP ban on recruitment: <strong>04.02.1997</strong></li>
                            <li>TS requires <strong>1 year</strong> continuous service</li>
                            <li>Pay: <strong>1/30th</strong> of MTS min + DA</li>
                            <li><strong>No leave encashment</strong> upon quitting</li>
                        </ul>
                    </div>
                </div>
            `,
            status: "published",
            created_by: "admin@dakguru.com"
        };
    
        const dakSutra2 = {
            title: "Casual Labourers: Regularization, Allowances & Termination",
            rule_number: "MTS Quota",
            act_name: "Casual Labourers Scheme",
            category: "Regulation",
            effective_date: new Date('1993-09-01'),
            exam_tags: ["Regularization", "MTS Quota", "Allowances", "LDCE IP", "PS Group B"],
            official_text: `
                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-violet-50 border border-violet-100">
                        <h4 class="font-black uppercase text-violet-800 mb-2">MTS Quota & Absorption Rules</h4>
                        <ul class="list-disc pl-5 space-y-1">
                            <li><strong>Vacancy Filling:</strong> <span class="text-violet-700 font-bold">Two out of every three</span> vacancies in offices with casual labourers are filled from TS casual workers.</li>
                            <li><strong>Absorption Ratio:</strong> <span class="text-indigo-700 font-bold">75% from GDS</span> and <span class="text-indigo-700 font-bold">25% from Casual Labourers</span>.</li>
                        </ul>
                    </div>
    
                    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                        <h4 class="font-black uppercase text-emerald-800 mb-2">Supreme Court Protection</h4>
                        <p class="text-sm italic">SLP (Civil) No.2224/2000 (Union of India Vs. Mohan Pal)</p>
                        <p class="mt-2">Casual labourers who acquired 'temporary' status <strong>shall not be removed</strong> from service arbitrarily.</p>
                    </div>
    
                    <div class="p-4 rounded-xl bg-blue-50 border border-blue-100">
                        <h4 class="font-black uppercase text-blue-800 mb-2">7th CPC Impact (Since 01.01.2016)</h4>
                        <p>TS casual labourers receive wages based on <strong>Group 'C' Level 1</strong> of the Pay Matrix.</p>
                        <p class="text-xs mt-1 font-bold text-blue-600 underline">Condition: Must be a MATRICULATE.</p>
                    </div>
                </div>
            `,
            guru_explanation: `
                <div class="space-y-6">
                    <section>
                        <h3 class="text-lg font-black text-violet-800 border-b-2 border-violet-200 pb-1 mb-3">The 3-Year Milestone</h3>
                        <p>A critical shift happens when a TS labourer completes <strong>three years of continuous service</strong>. They are treated like <strong>temporary MTS employees</strong> for:</p>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
                            <div class="p-3 rounded-lg border border-violet-200 bg-violet-50 text-center">
                                <p class="font-bold text-violet-700">GPF Account</p>
                                <p class="text-xs">Eligible to open & contribute</p>
                            </div>
                            <div class="p-3 rounded-lg border border-violet-200 bg-violet-50 text-center">
                                <p class="font-bold text-violet-700">Advances</p>
                                <p class="text-xs">Festival & Flood Advances</p>
                            </div>
                        </div>
                    </section>
    
                    <section>
                        <h4 class="font-bold text-slate-800 mb-2">📊 Regularization & Retirement Parameters</h4>
                        <table class="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                            <thead class="bg-violet-600 text-white">
                                <tr>
                                    <th class="p-3 text-left">Parameter</th>
                                    <th class="p-3 text-left">Rule / Quota</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="border-b border-slate-100">
                                    <td class="p-3"><strong>MTS Vacancy Filling</strong></td>
                                    <td class="p-3 font-bold text-violet-700">2 out of every 3 vacancies</td>
                                </tr>
                                <tr class="border-b border-slate-100">
                                    <td class="p-3"><strong>MTS Absorption Ratio</strong></td>
                                    <td class="p-3">GDS: 75% | <strong>Casual: 25%</strong></td>
                                </tr>
                                <tr>
                                    <td class="p-3"><strong>Retirement Benefit</strong></td>
                                    <td class="p-3 font-bold text-emerald-600">50% of TS service counted</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
    
                    <section class="bg-indigo-50 p-5 rounded-2xl border border-indigo-200">
                        <h3 class="text-lg font-black text-indigo-800 mb-3 flex items-center gap-2">
                            <span>🔟</span> Process: Applying for Advances
                        </h3>
                        <div class="space-y-4">
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold">1</div>
                                <div>
                                    <p class="font-bold">Eligibility</p>
                                    <p class="text-sm">Complete <strong>3 years</strong> of continuous TS service.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold">2</div>
                                <div>
                                    <p class="font-bold">Sureties</p>
                                    <p class="text-sm">Furnish <strong>two sureties</strong> from permanent Govt servants of the same department.</p>
                                </div>
                            </div>
                            <div class="flex gap-4">
                                <div class="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-200 text-indigo-800 flex items-center justify-center font-bold">3</div>
                                <div>
                                    <p class="font-bold">Grant</p>
                                    <p class="text-sm">Granted on conditions applicable to <strong>temporary MTS</strong>.</p>
                                </div>
                            </div>
                        </div>
                    </section>
    
                    <section>
                        <h4 class="font-bold text-slate-800 mb-2">💰 Allowances & Notice Periods</h4>
                        <table class="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
                            <thead class="bg-slate-700 text-white">
                                <tr>
                                    <th class="p-3 text-left">Type</th>
                                    <th class="p-3 text-left">Rate / Limit</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white">
                                <tr class="border-b border-slate-100">
                                    <td class="p-3"><strong>Transport Allowance</strong></td>
                                    <td class="p-3">Eligible for computation in daily wages</td>
                                </tr>
                                <tr class="border-b border-slate-100">
                                    <td class="p-3"><strong>TA (Physically Handicapped)</strong></td>
                                    <td class="p-3 font-bold text-blue-700">DOUBLE the normal rate</td>
                                </tr>
                                <tr>
                                    <td class="p-3"><strong>Notice Period</strong> (Termination/Resignation)</td>
                                    <td class="p-3 font-bold text-red-700">1 Month in writing</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
    
                    <div class="p-4 rounded-xl border border-red-200 bg-red-50">
                        <p class="text-sm font-bold text-red-800 flex items-center gap-2">
                            <span>⚠️</span> Termination Realities
                        </p>
                        <p class="text-xs text-red-700 mt-1">Despite SC protections, services can be dispensed with for <strong>serious misconduct</strong> or violation of service rules.</p>
                    </div>
                </div>
            `,
            practical_example: `
                <div class="space-y-4">
                    <div class="p-4 rounded-xl bg-rose-50 border border-rose-200">
                        <p class="font-black text-rose-800 uppercase text-xs mb-2">Scenario 1: Dispensing Service</p>
                        <p>A TS worker commits a serious violation of service rules.</p>
                        <div class="mt-2 text-sm">
                            <p><strong>Action:</strong> Employer issues 1-month written notice.</p>
                            <p class="text-rose-700 font-bold">Outcome: Valid. The Mohan Pal ruling does not protect against removal for serious misconduct.</p>
                        </div>
                    </div>
                    <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                        <p class="font-black text-emerald-800 uppercase text-xs mb-2">Scenario 2: Retirement Calculation</p>
                        <p>Worker served 10 years as TS and 15 years as regular MTS.</p>
                        <div class="mt-2 text-sm">
                            <p><strong>Calculation:</strong> 50% of 10 years (TS) + 15 years (Regular).</p>
                            <p class="text-emerald-700 font-bold">Final Qualifying Service: 20 Years (5 + 15).</p>
                        </div>
                    </div>
                </div>
            `,
            exam_insight: `
                <div class="space-y-5">
                    <div>
                        <h4 class="font-black text-amber-800 uppercase text-xs flex items-center gap-1 mb-2">
                            <span class="text-lg">🔥</span> Most Asked Fact
                        </h4>
                        <p class="text-sm bg-amber-100/50 p-3 rounded-lg border border-amber-200 font-bold">
                            50% of the service rendered under temporary status counts towards retirement benefits post-regularization.
                        </p>
                    </div>
    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="p-3 rounded-lg border border-slate-200 bg-white">
                            <p class="font-black text-slate-500 uppercase text-[10px] mb-1">Frequently Confused</p>
                            <p class="text-xs">DA/HRA start from <strong>Day 1</strong> of TS, but GPF/Advances only after <strong>3 years</strong> of continuous TS service.</p>
                        </div>
                        <div class="p-3 rounded-lg border border-rose-200 bg-rose-50">
                            <p class="font-black text-rose-600 uppercase text-[10px] mb-1">Traps & Distinctions</p>
                            <p class="text-xs">Don't confuse general vacancy rule (2/3) with specific quota breakdown (75% GDS / 25% Casual).</p>
                        </div>
                    </div>
    
                    <div class="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
                        <h4 class="font-black text-indigo-800 uppercase text-xs mb-3">🧠 Key Distinctions</h4>
                        <div class="space-y-2 text-sm">
                            <p><strong>Standard TA vs. PH TA:</strong> Normal TS workers get standard TA; Physically Handicapped get <strong>DOUBLE</strong> the normal rate.</p>
                            <p><strong>MTS Wages vs. 7th CPC Wages:</strong> Standard TS gets MTS minimum; 7th CPC Level 1 requires <strong>matriculation</strong>.</p>
                        </div>
                    </div>
    
                    <div class="p-4 rounded-xl bg-slate-900 text-white shadow-lg">
                        <h4 class="font-black text-amber-400 uppercase text-xs mb-2">📌 Ultra-Revision Points</h4>
                        <ul class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-xs list-disc pl-4 opacity-90">
                            <li>MTS Quota: <strong>75% GDS / 25% Casual</strong></li>
                            <li>Retirement: <strong>50% TS service</strong> counts</li>
                            <li>Advances: <strong>3 years</strong> TS service + <strong>2 sureties</strong></li>
                            <li>SC Case: <strong>Mohan Pal (SLP 2224/2000)</strong></li>
                            <li>Notice: <strong>1 month</strong> written (either side)</li>
                        </ul>
                    </div>
                </div>
            `,
            status: "published",
            created_by: "admin@dakguru.com"
        };

        console.log("Seeding Casual Labourer Dak Sutras...");
        
        // Remove existing if any
        await DakSutra.deleteMany({ title: { $in: [dakSutra1.title, dakSutra2.title] } });
        
        // Create new ones
        await DakSutra.create([dakSutra1, dakSutra2]);

        console.log("✅ Seed completed successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error);
        process.exit(1);
    }
}

seed();
