import mongoose from 'mongoose';
import dbConnect from './src/lib/mongoose';
import DakSutra from './src/models/DakSutra';

const card1 = {
title: "Procurement Overview, Five R's & Fundamental Principles",
slug: "proc-overview-5rs",
rule_number: "Rule 143-145, Rule 144 GFR 2017",
act_name: "Manual for Procurement of Goods & Services",
category: "Explanation",
effective_date: new Date('2024-07-10'),
exam_tags: ["LDCE IP", "Paper III", "GFR 2017"],
status: "published",
created_by: "system-seed@dakguru.com",
official_text: `
<h2 class="text-indigo-900 border-b-2 border-indigo-200 mb-4 pb-2">📋 Procurement Framework & Five R's</h2>

<div class="mb-5 bg-indigo-50 p-4 rounded-lg border border-indigo-200">
    <h3 class="text-indigo-800 font-black mb-2">📌 Scope of 'Goods'</h3>
    <p class="text-sm mb-2">The term <strong>'Goods'</strong> includes: articles, material, commodity, livestock, medicines, furniture, fixtures, raw material, consumables, spare parts, instruments, machinery, equipment, industrial plants, vehicles, aircraft, ships, railway rolling stock, assemblies, sub-assemblies, accessories.</p>
    <p class="text-sm mb-2"><strong>Also includes intangibles:</strong> software, technology transfer, licenses, patents, intellectual properties.</p>
    <p class="text-sm text-red-700 font-bold">❌ Excludes: Books, publications, periodicals for a library.</p>
    <p class="text-sm mt-2">Procurement of goods may include incidental small work/services such as transportation, insurance, installation, commissioning, training & maintenance. <strong>(Rule 143 GFR 2017)</strong></p>
</div>

<div class="mb-5 bg-emerald-50 p-4 rounded-lg border border-emerald-200">
    <h3 class="text-emerald-800 font-black mb-2">🎯 The Five R's of Procurement</h3>
    <p class="text-xs italic mb-3 text-slate-600">Mnemonic: <strong>"Quality Quantity Price Time Source"</strong> → QQPTS</p>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-emerald-700 text-white font-bold">
                <tr><th class="p-2 border" style="color:#fff">R#</th><th class="p-2 border" style="color:#fff">Aim</th><th class="p-2 border" style="color:#fff">Meaning</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border font-bold">1</td><td class="p-2 border font-bold text-emerald-700">Right Quality</td><td class="p-2 border">Specs meet actual requirement</td></tr>
                <tr class="bg-emerald-50"><td class="p-2 border font-bold">2</td><td class="p-2 border font-bold text-emerald-700">Right Quantity</td><td class="p-2 border">Exact amount needed</td></tr>
                <tr><td class="p-2 border font-bold">3</td><td class="p-2 border font-bold text-emerald-700">Right Price</td><td class="p-2 border">Best Value for Money (VfM)</td></tr>
                <tr class="bg-emerald-50"><td class="p-2 border font-bold">4</td><td class="p-2 border font-bold text-emerald-700">Right Time & Place</td><td class="p-2 border">Timely delivery at correct location</td></tr>
                <tr><td class="p-2 border font-bold">5</td><td class="p-2 border font-bold text-emerald-700">Right Source</td><td class="p-2 border">Reliable & capable suppliers</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-5 bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="text-blue-800 font-black mb-2">⚖️ Fundamental Principles (Rule 144 GFR 2017)</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-blue-700 underline mb-1">Transparency Principle</h4>
            <ul class="text-xs space-y-1">
                <li>• Ensure fairness, equality, competition & appeal rights</li>
                <li>• Simultaneous & symmetric dissemination of information</li>
                <li>• Publish on <strong>CPPP</strong> (Central Public Procurement Portal)</li>
                <li>• Fair & transparent procedure for inviting offers</li>
            </ul>
        </div>
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-violet-700 underline mb-1">Professionalism Principle</h4>
            <ul class="text-xs space-y-1">
                <li>• Economy, efficiency, effectiveness & integrity</li>
                <li>• Avoid wasteful, dilatory & improper practices</li>
                <li>• Comply with <strong>CIPP</strong> (Code of Integrity for Public Procurement)</li>
            </ul>
        </div>
    </div>
</div>

<div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
    <h3 class="text-amber-800 font-black mb-2">🏭 Categorisation of Procurements</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-amber-700 text-white font-bold">
                <tr><th class="p-2 border" style="color:#fff">Category</th><th class="p-2 border" style="color:#fff">Key Distinction</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border font-bold">Goods vs Works</td><td class="p-2 border">Goods → made on <strong>supplier's premises</strong>; Works → executed on <strong>procuring entity's premises</strong></td></tr>
                <tr class="bg-amber-50"><td class="p-2 border font-bold">Consultancy Services</td><td class="p-2 border">High intellectual input, non-routine, outcomes not precisely measurable (e.g., IT projects, software dev)</td></tr>
                <tr><td class="p-2 border font-bold">Non-consultancy Services</td><td class="p-2 border">Repetitive routines, measurable & standardised outputs (e.g., cleaning, security)</td></tr>
            </tbody>
        </table>
    </div>
    <p class="text-xs mt-2 text-red-700 font-bold">⚠️ IT Projects (software dev, cloud, system integration) → Usually procured as Consultancy Services</p>
</div>
`,
guru_explanation: `
<div class="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl space-y-4">
    <h3 class="text-indigo-900 font-black text-lg mb-2">🧠 Quick Revision Box</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-emerald-700 underline">GeM Mandate</h4>
            <p class="text-xs">Common use Goods/Services available on GeM → <strong>Mandatory procurement through GeM</strong> (Rule 149 GFR 2017)</p>
        </div>
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-blue-700 underline">Competent Authority (CA)</h4>
            <p class="text-xs">CA competent to incur expenditure may sanction purchases as per Delegation of Financial Power Rules (Rule 145 GFR 2017)</p>
        </div>
    </div>
    <div class="bg-white p-3 border rounded shadow-inner">
        <h4 class="font-black text-rose-700 border-b mb-1">⚠️ Exam Trap Alert</h4>
        <ul class="text-sm space-y-1">
            <li>• "Right Policy" / "Right Resource" are <strong>NOT</strong> part of the Five R's</li>
            <li>• Works may include incidental Goods & vice versa</li>
            <li>• Goods <strong>excludes</strong> library books/publications</li>
        </ul>
    </div>
</div>
`,
practical_example: `
<div class="bg-slate-900 text-slate-100 p-5 rounded-lg border-2 border-amber-500">
    <div class="flex items-center gap-2 mb-2 text-amber-400 font-black italic">
        <span class="text-xl">🛠️</span> SCENARIO: Identify the Procurement Type
    </div>
    <div class="space-y-2 text-sm border-l-2 border-amber-500 pl-4 py-1">
        <p>1. Buying 100 computers for post offices → <strong>Goods</strong></p>
        <p>2. Building a new sorting office on Dept land → <strong>Works</strong></p>
        <p>3. Developing a custom postal tracking app → <strong>Consultancy Service</strong></p>
        <p>4. Hiring security guards for post offices → <strong>Non-consultancy Service</strong></p>
    </div>
</div>
`,
exam_insight: `
<div class="bg-amber-100 p-5 border-4 border-amber-600 rounded-2xl relative overflow-hidden">
    <div class="absolute -right-4 -top-4 text-6xl opacity-20">🎯</div>
    <h4 class="font-black text-amber-900 border-b-2 border-amber-300 pb-1 mb-3 text-lg">📈 HIGH-YIELD EXAM POINTS</h4>
    <div class="grid grid-cols-1 gap-3">
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> Five R's of Procurement?<br/>
            <span class="font-bold text-amber-600">A:</span> Right Quality, Quantity, Price, Time & Place, Source
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> IT project procurement type?<br/>
            <span class="font-bold text-amber-600">A:</span> <span class="bg-amber-900 text-white px-1">Consultancy Services</span>
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> Where must offers be published?<br/>
            <span class="font-bold text-amber-600">A:</span> CPPP (www.eprocure.gov.in) & GeM
        </div>
    </div>
</div>
`
};

const card2 = {
title: "Modes of Procurement (OTE, GTE, LTE, SLTE, PAC, STE)",
slug: "proc-modes-all",
rule_number: "Rule 154, 158, 161-166 GFR 2017",
act_name: "Manual for Procurement of Goods & Services",
category: "Rule",
effective_date: new Date('2024-07-10'),
exam_tags: ["LDCE IP", "Paper III", "GFR 2017"],
status: "published",
created_by: "system-seed@dakguru.com",
official_text: `
<h2 class="text-blue-900 border-b-2 border-blue-200 mb-4 pb-2">📦 Complete Modes of Procurement</h2>

<div class="mb-5 bg-blue-50 p-4 rounded-lg border border-blue-200">
    <h3 class="text-blue-800 font-black mb-2">🗂️ Master Comparison Table</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-blue-800 text-white font-bold">
                <tr><th class="p-2 border" style="color:#fff">Mode</th><th class="p-2 border" style="color:#fff">Value Range</th><th class="p-2 border" style="color:#fff">Min Time</th><th class="p-2 border" style="color:#fff">Key Feature</th></tr>
            </thead>
            <tbody>
                <tr class="bg-green-50"><td class="p-2 border font-bold text-green-700">OTE</td><td class="p-2 border">> ₹50 Lakhs (default)</td><td class="p-2 border font-bold">21 days</td><td class="p-2 border">Widest competition, best VfM, published on CPPP/GeM</td></tr>
                <tr><td class="p-2 border font-bold text-blue-700">GTE</td><td class="p-2 border">No GTE up to ₹200 Cr</td><td class="p-2 border font-bold">4 weeks</td><td class="p-2 border">Foreign firms, docs in English, RBI currency basket</td></tr>
                <tr class="bg-orange-50"><td class="p-2 border font-bold text-orange-700">LTE</td><td class="p-2 border">₹5L to ₹50L (default)</td><td class="p-2 border font-bold">3 weeks</td><td class="p-2 border">Min 3 registered vendors, single-page bid doc</td></tr>
                <tr><td class="p-2 border font-bold text-pink-700">SLTE</td><td class="p-2 border">> ₹50L (special cases)</td><td class="p-2 border">3 weeks</td><td class="p-2 border">Urgency certificate needed from indenter</td></tr>
                <tr class="bg-purple-50"><td class="p-2 border font-bold text-purple-700">PAC</td><td class="p-2 border">Any value</td><td class="p-2 border">Shortest</td><td class="p-2 border">OEM/proprietary only, max 3 years validity</td></tr>
                <tr><td class="p-2 border font-bold text-red-700">STE</td><td class="p-2 border">Any value</td><td class="p-2 border">Shortest</td><td class="p-2 border">Emergency/standardization only, without PAC</td></tr>
                <tr class="bg-slate-100"><td class="p-2 border font-bold text-slate-700">Direct Purchase</td><td class="p-2 border font-bold text-red-700">Up to ₹50,000</td><td class="p-2 border">Immediate</td><td class="p-2 border">Petty purchase, off-the-shelf, GeMAR&PTS mandatory</td></tr>
            </tbody>
        </table>
    </div>
    <p class="text-xs mt-2 italic text-slate-500">Note: LTE/SLTE threshold changed w.e.f. 10th July 2024</p>
</div>

<div class="mb-5 bg-green-50 p-4 rounded-lg border border-green-200">
    <h3 class="text-green-800 font-black mb-2">📢 OTE - Open Tender Enquiry (Rule 161)</h3>
    <ul class="text-sm space-y-1">
        <li>• <strong>Default mode</strong> for procurements > ₹50 Lakhs</li>
        <li>• Advertised on CPPP + GeM + Organisation's website</li>
        <li>• Downloaded tender docs → <strong>NO cost charged</strong></li>
        <li>• Min <strong>21 days</strong> from date of advertisement for bid opening</li>
        <li>• Can be used even below ₹50L if warranted</li>
        <li>• Registered bidders also free to participate</li>
    </ul>
</div>

<div class="mb-5 bg-sky-50 p-4 rounded-lg border border-sky-200">
    <h3 class="text-sky-800 font-black mb-2">🌍 GTE - Global Tender Enquiry (Rule 161)</h3>
    <ul class="text-sm space-y-1">
        <li>• When goods <strong>not available within the country</strong></li>
        <li>• Documents must be in <strong>English</strong></li>
        <li>• Price in INR / USD / EUR / GBP / JPY (RBI basket)</li>
        <li>• Min <strong>4 weeks</strong> for bid submission</li>
        <li>• <strong>No GTE up to ₹200 Crores</strong> (unless exempted by DoE)</li>
        <li>• e-Procurement NOT mandatorily insisted upon</li>
        <li>• Agency Commission: normally ≤ <strong>5%</strong></li>
    </ul>
</div>

<div class="mb-5 bg-orange-50 p-4 rounded-lg border border-orange-200">
    <h3 class="text-orange-800 font-black mb-2">📋 LTE & SLTE</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 bg-white border rounded">
            <h4 class="font-bold text-orange-700">LTE (Rule 162)</h4>
            <ul class="text-xs space-y-1">
                <li>• Default for <strong>₹5L to ₹50L</strong></li>
                <li>• Min <strong>3 bidders</strong> (registered vendors)</li>
                <li>• Single-page bid document</li>
                <li>• Min <strong>3 weeks</strong> (6 weeks for imports)</li>
                <li>• Bid Security & Performance Security <strong>normally NOT taken</strong></li>
                <li>• Uninvited bids = unsolicited, normally not entertained</li>
            </ul>
        </div>
        <div class="p-3 bg-white border rounded">
            <h4 class="font-bold text-pink-700">SLTE (> ₹50L, Rule 162)</h4>
            <ul class="text-xs space-y-1">
                <li>• Only in <strong>special circumstances</strong>:</li>
                <li>  – Existing/prospective urgency (certified)</li>
                <li>  – Not in public interest for OTE</li>
                <li>  – Known & limited sources</li>
                <li>  – Pre-verification of firm needed</li>
                <li>• Detailed bid docs (like OTE)</li>
            </ul>
        </div>
    </div>
</div>

<div class="mb-5 bg-purple-50 p-4 rounded-lg border border-purple-200">
    <h3 class="text-purple-800 font-black mb-2">🔒 PAC & STE</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 bg-white border rounded">
            <h4 class="font-bold text-purple-700">PAC (Proprietary Article Certificate)</h4>
            <ul class="text-xs space-y-1">
                <li>• Only from OEM or authorised dealers/stockists</li>
                <li>• Signed as per SoPP level</li>
                <li>• <strong>Max 3 years</strong> → then mandatory OTE</li>
                <li>• Shortest mode but lesser VfM</li>
            </ul>
        </div>
        <div class="p-3 bg-white border rounded">
            <h4 class="font-bold text-red-700">STE without PAC (Rule 166)</h4>
            <ul class="text-xs space-y-1">
                <li>• Only for:</li>
                <li>  – Emergency (certified by indenter)</li>
                <li>  – Standardization of machinery/spares</li>
                <li>• Approval of CA required</li>
            </ul>
        </div>
    </div>
</div>

<div class="bg-slate-100 p-4 rounded-lg border border-slate-300">
    <h3 class="text-slate-800 font-black mb-2">🛒 Direct Procurement without Quotation (Rule 154)</h3>
    <ul class="text-sm space-y-1">
        <li>• Also called <strong>Petty Purchase</strong></li>
        <li>• Up to <strong>₹50,000</strong> per case</li>
        <li>• Off-the-shelf, simple specs, not on GeM</li>
        <li>• <strong>GeMAR&PTS</strong> report mandatory for procurement outside GeM</li>
        <li>• Imprest amount: sufficient for <strong>2 months</strong>, recouped monthly</li>
        <li>• Cash payment allowed up to <strong>₹5,000</strong> only</li>
        <li>• Annual ceiling: ~<strong>₹5 Lakhs</strong> per office per year</li>
        <li>• Staff must be <strong>rotated frequently</strong></li>
        <li>• Demand must NOT be split to avoid higher approval</li>
    </ul>
</div>
`,
guru_explanation: `
<div class="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl space-y-4">
    <h3 class="text-blue-900 font-black text-lg mb-2">🧠 Memory Framework</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-green-700 underline">Value Ladder 💰</h4>
            <p class="text-xs">Up to ₹50K → Direct Purchase<br/>₹5L-₹50L → LTE<br/>> ₹50L → OTE<br/>> ₹200Cr → No GTE</p>
        </div>
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-blue-700 underline">Time Ladder ⏱️</h4>
            <p class="text-xs">OTE → 21 days<br/>LTE → 3 weeks<br/>LTE import → 6 weeks<br/>GTE → 4 weeks</p>
        </div>
    </div>
    <div class="p-3 bg-white border rounded shadow-sm">
        <h4 class="font-bold text-amber-700 underline">Rate Contract (RC) / Framework Contract (FC)</h4>
        <ul class="text-xs space-y-1">
            <li>• RC = price agreement, no quantity commitment</li>
            <li>• NOT needed for common items on GeM (computers, printers, stationery, furniture)</li>
            <li>• Only for specialized/engineering items NOT on GeM</li>
            <li>• In services/consultancy → called Framework Contract (FC)</li>
        </ul>
    </div>
</div>
`,
practical_example: `
<div class="bg-slate-900 text-slate-100 p-5 rounded-lg border-2 border-emerald-500">
    <div class="flex items-center gap-2 mb-2 text-emerald-400 font-black italic">
        <span class="text-xl">🛠️</span> SCENARIO: Pick the Right Mode
    </div>
    <div class="space-y-2 text-sm border-l-2 border-emerald-500 pl-4 py-1">
        <p>1. Office needs pens worth ₹8,000 (not on GeM) → <strong>Direct Purchase</strong></p>
        <p>2. Tables worth ₹30 Lakhs (not on GeM) → <strong>LTE</strong></p>
        <p>3. Sorting machines worth ₹2 Crores → <strong>OTE</strong></p>
        <p>4. Specialized scanner available only from one manufacturer → <strong>PAC</strong></p>
        <p>5. Emergency repair parts needed urgently → <strong>STE without PAC</strong></p>
    </div>
</div>
`,
exam_insight: `
<div class="bg-amber-100 p-5 border-4 border-amber-600 rounded-2xl relative overflow-hidden">
    <div class="absolute -right-4 -top-4 text-6xl opacity-20">🎯</div>
    <h4 class="font-black text-amber-900 border-b-2 border-amber-300 pb-1 mb-3">📈 EXAM CRITICAL NUMBERS</h4>
    <div class="grid grid-cols-1 gap-2">
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> Default mode for > ₹50L?<br/>
            <span class="font-bold text-amber-600">A:</span> OTE (Open Tender Enquiry)
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> PAC validity?<br/>
            <span class="font-bold text-amber-600">A:</span> <span class="bg-amber-900 text-white px-1">Max 3 years</span>
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> Direct purchase cash limit?<br/>
            <span class="font-bold text-amber-600">A:</span> ₹5,000 only
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> GTE not allowed up to?<br/>
            <span class="font-bold text-amber-600">A:</span> ₹200 Crores
        </div>
    </div>
</div>
`
};

async function seed() {
    console.log("Connecting to DB...");
    await dbConnect();
    console.log("Seeding Card 1 & 2...");
    for (const card of [card1, card2]) {
        await DakSutra.findOneAndUpdate(
            { slug: card.slug },
            { $set: card },
            { upsert: true, new: true }
        );
        console.log("Done: " + card.title);
    }
    console.log("Part 1 complete!");
    process.exit(0);
}
seed().catch(e => { console.error(e); process.exit(1); });
