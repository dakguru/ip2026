import mongoose from 'mongoose';
import dbConnect from './src/lib/mongoose';
import DakSutra from './src/models/DakSutra';

async function seed() {
    console.log("Connecting to DB...");
    await dbConnect();

    const entry = {
        title: "Masterclass: Preservation Period of Records (Comprehensive)",
        rule_number: "Appendix A (Vol VIII), Rule 212 (Vol VI)",
        act_name: "Postal Manual Volume VIII",
        category: "Rule",
        effective_date: new Date('2025-01-01'),
        exam_tags: ["LDCE IP", "PS Group B", "Postal Manual Vol VIII", "Paper I"],
        status: "published",
        created_by: "system-seed@dakguru.com",
        official_text: `
<h2 class="text-indigo-900 border-b-2 border-indigo-200 mb-4 pb-2">📂 Comprehensive Retention Schedule</h2>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-amber-700 font-black mb-2 flex items-center gap-2">⚡ Variable / Immediate Destruction</h3>
    <p class="text-sm mb-3 text-slate-600 italic">Records that are replaced or destroyed based on specific trigger events.</p>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-amber-600 text-white font-bold">
                <tr><th class="p-2 text-left border">Record Description</th><th class="p-2 text-left border">Preservation Condition</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border font-bold">SB Specimen Signature Books (HO)</td><td class="p-2 border">Destroyed forthwith by PM after SS conversion.</td></tr>
                <tr class="bg-amber-50"><td class="p-2 border font-bold">Postal Publications</td><td class="p-2 border">After supply of new editions.</td></tr>
                <tr><td class="p-2 border font-bold">Circulars / Standing Orders</td><td class="p-2 border">Till specific instructions are received.</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-green-700 font-black mb-2">📅 1 Year Preservation</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-green-600 text-white font-bold">
                <tr><th class="p-2 text-left border">Record Description</th><th class="p-2 text-left border">Event / Condition</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border">Mail Dept Records (General)</td><td class="p-2 border">1 year from closure.</td></tr>
                <tr class="bg-green-50"><td class="p-2 border">Fluctuating Charges Statement (Form A)</td><td class="p-2 border">1 year.</td></tr>
                <tr><td class="p-2 border">Audit/Executive Inspection Reports</td><td class="p-2 border">1 year after next inspection & all items settled.</td></tr>
                <tr class="bg-green-50"><td class="p-2 border">GPF Annual Statements</td><td class="p-2 border">1 year.</td></tr>
                <tr><td class="p-2 border">Robberies, Thefts, Pros. Corresp.</td><td class="p-2 border">1 year after cases are closed.</td></tr>
                <tr class="bg-green-50"><td class="p-2 border">OTA (Overtime Allowance) Records</td><td class="p-2 border">1 year from end of financial year.</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-blue-700 font-black mb-2">🕰️ 18 Months (1.5 Years)</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-blue-600 text-white font-bold">
                <tr><th class="p-2 text-left border">Record Description</th><th class="p-2 text-left border">Preservation Period</th></tr>
            </thead>
            <tbody>
                <tr class="bg-blue-50 font-bold"><td class="p-2 border">SO Daily Accounts / Summaries / Slips</td><td class="p-2 border text-red-700 underline">18 Months</td></tr>
                <tr><td class="p-2 border font-bold text-indigo-700">Correspondence on Losses/Defalcations</td><td class="p-2 border italic">18 months after final orders (1 year in PO/RMS).</td></tr>
                <tr class="bg-blue-50"><td class="p-2 border">SB Slip (SB.27), Passbook Stock Reg.</td><td class="p-2 border">18 months.</td></tr>
                <tr><td class="p-2 border">Book of Postmarks (MS.18)</td><td class="p-2 border">18 months.</td></tr>
                <tr class="bg-blue-50"><td class="p-2 border">Savings Certificate Identity Slips</td><td class="p-2 border">18 months after discharge of certs.</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-orange-900 font-black mb-2">📆 2 Years Preservation</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-orange-800 text-white font-bold">
                <tr><th class="p-2 text-left border">Record Description</th><th class="p-2 text-left border">Special Condition</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border">Mail Lists (In/Out)</td><td class="p-2 border">2 years.</td></tr>
                <tr class="bg-orange-50 font-bold"><td class="p-2 border">Franking Machine Records (FM.16, FM.11, FM.12)</td><td class="p-2 border">2 years.</td></tr>
                <tr><td class="p-2 border">Day Bag Book (UBOS / DBOS)</td><td class="p-2 border">2 years (Note: CBO is 10 yrs).</td></tr>
                <tr class="bg-orange-50"><td class="p-2 border">BO Daily Accounts & BO Slips</td><td class="p-2 border">2 years.</td></tr>
                <tr><td class="p-2 border font-bold text-red-800">APARs / Character Sheets (Death)</td><td class="p-2 border">2 years after death.</td></tr>
                <tr class="bg-orange-50"><td class="p-2 border">Enumeration Returns (MS.6)</td><td class="p-2 border">2 years.</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-royal-blue font-black mb-2 text-blue-900">📑 3 Years Preservation</h3>
    <p class="text-xs italic mb-2 text-slate-500">Major administrative records often requested in LDCE.</p>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-indigo-900 text-white font-bold">
                <tr><th class="p-2 text-left border">Record / Form Name</th><th class="p-2 text-left border">Condition</th></tr>
            </thead>
            <tbody>
                <tr class="font-black bg-indigo-50 italic"><td class="p-2 border underline">Postmaster's Order Book (MS.8)</td><td class="p-2 border">3 Years</td></tr>
                <tr><td class="p-2 border">HO Summary / Cash Book / Contingent Bills</td><td class="p-2 border">3 years.</td></tr>
                <tr class="bg-indigo-50"><td class="p-2 border font-bold">Service Book (incl. Leave Account)</td><td class="p-2 border">3 yrs after death/retirement or final pension.</td></tr>
                <tr><td class="p-2 border">Gradation Lists</td><td class="p-2 border">3 years after new one supplied.</td></tr>
                <tr class="bg-indigo-50"><td class="p-2 border">Deceased Claim Cases (SB/SC)</td><td class="p-2 border">3 years after closure (6 yrs if bound by indemnity).</td></tr>
                <tr><td class="p-2 border italic text-indigo-700">Personal Files</td><td class="p-2 border">3 years after death/retirement or pension sanction.</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-emerald-900 font-black mb-2">🔒 Long-term (5 - 10 Years)</h3>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-emerald-800 text-white font-bold">
                <tr><th class="p-2 text-left border">Record Description</th><th class="p-2 text-left border">Period</th></tr>
            </thead>
            <tbody>
                <tr class="bg-emerald-50"><td class="p-2 border">SB Specimen Signature Book (SO)</td><td class="p-2 border">5 years after ALL accounts are closed.</td></tr>
                <tr><td class="p-2 border font-bold">SB AOFs with KYC / CDD</td><td class="p-2 border italic">5 years after closure of account.</td></tr>
                <tr class="bg-emerald-50 font-black"><td class="p-2 border">Day Bag Books (CBOS) / Stock Register</td><td class="p-2 border text-red-700">10 Years</td></tr>
                <tr><td class="p-2 border">Register of Security Deposits / Bonds</td><td class="p-2 border">10 years.</td></tr>
                <tr class="bg-emerald-50 font-bold"><td class="p-2 border italic text-sm">Disciplinary Proceedings Records</td><td class="p-2 border">10 years from date of disposal.</td></tr>
            </tbody>
        </table>
    </div>
</div>

<div class="mb-6 bg-slate-50 p-4 rounded-lg border">
    <h3 class="text-slate-900 font-black mb-2">💎 Permanent Preservation</h3>
    <p class="text-xs bg-slate-200 p-1 inline-block rounded mb-2 font-bold italic">Never to be destroyed.</p>
    <div class="overflow-x-auto">
        <table class="w-full text-sm border-collapse bg-white">
            <thead class="bg-slate-900 text-white font-bold">
                <tr><th class="p-2 text-left border">Record Name</th><th class="p-2 text-left border">Branch</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border font-bold text-lg italic">Nominal Roll</td><td class="p-2 border">Miscellaneous / SB</td></tr>
                <tr class="bg-slate-50"><td class="p-2 border font-bold">Register of Destruction of Records</td><td class="p-2 border">Accounts / Misc</td></tr>
                <tr><td class="p-2 border font-bold italic text-sm text-slate-700 underline">Runner's Appointment Certificates</td><td class="p-2 border">Accounts</td></tr>
                <tr class="bg-slate-50"><td class="p-2 border">Silent Account Ledger Folios / Cards</td><td class="p-2 border">Savings Bank</td></tr>
            </tbody>
        </table>
    </div>
</div>
        `,
        guru_explanation: `
<div class="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-xl space-y-4">
    <h3 class="text-indigo-900 font-black text-xl mb-2 flex items-center gap-2">🧠 The Guru Strategy: How to Memorize</h3>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-amber-700 underline">The Bag Rule 🎒</h4>
            <p class="text-xs text-slate-600"><strong>CBO:</strong> 10 Years (Big office, long life).<br/><strong>UBO/DBO:</strong> 2 Years (Small office, short life).</p>
        </div>
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-blue-700 underline">The MO Rule ✉️</h4>
            <p class="text-xs text-slate-600"><strong>Daily Records:</strong> 18 Months.<br/><strong>Receipts:</strong> 2 Years.<br/><strong>Pension MO:</strong> 5 Years.</p>
        </div>
        <div class="p-3 bg-white border rounded shadow-sm">
            <h4 class="font-bold text-green-700 underline">The HR Rule 👤</h4>
            <p class="text-xs text-slate-600"><strong>Service Book:</strong> 3 yrs after death.<br/><strong>APARs (Retire):</strong> 5 years.<br/><strong>APARs (Dismiss):</strong> 6 years.</p>
        </div>
    </div>

    <div class="bg-white p-3 border rounded shadow-inner">
        <h4 class="font-black text-rose-700 border-b mb-1">⚠️ 100% Accuracy Alert (2025 Ed.)</h4>
        <p class="text-sm">Never calculate the retention from the date of creation. Always calculate from the <strong>1st of April (New FY)</strong> following the completion of the record. </p>
    </div>
</div>
        `,
        practical_example: `
<div class="bg-slate-900 text-slate-100 p-5 rounded-lg border-2 border-amber-500">
    <div class="flex items-center gap-2 mb-2 text-amber-400 font-black italic">
        <span class="text-xl">🛠️</span> CASE STUDY: DISPOSAL WORKFLOW
    </div>
    <p class="text-sm leading-relaxed mb-4">
        A Postmaster finds a bundle of <strong>Sub Office summaries</strong> dated between August 2023 and March 2024. 
    </p>
    <div class="space-y-2 text-sm border-l-2 border-amber-500 pl-4 py-1">
        <p>1. <strong>Identify Period:</strong> SO Summary = 18 Months.</p>
        <p>2. <strong>Identify Base Date:</strong> 1st April 2024 (Start of next FY).</p>
        <p>3. <strong>Calculate Disposal Date:</strong> April 2024 + 1.5 Years = <strong>October 2025</strong>.</p>
        <p>4. <strong>Verification:</strong> Supervisor confirms NO pending audit objection (IR Paras) for that FY.</p>
    </div>
    <div class="mt-4 p-2 bg-slate-800 rounded text-center font-bold border border-slate-700">
        💡 Action: Safe to dispose in October 2025.
    </div>
</div>
        `,
        exam_insight: `
<div class="bg-amber-100 p-5 border-4 border-amber-600 rounded-2xl relative overflow-hidden">
    <div class="absolute -right-4 -top-4 text-6xl opacity-20">🎯</div>
    <h4 class="font-black text-amber-900 border-b-2 border-amber-300 pb-1 mb-3 text-lg">📈 HIGH PROBABILITY HITS (2026 LDCE)</h4>
    <div class="grid grid-cols-1 gap-3">
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> Which record has no destruction period? <br/>
            <span class="font-bold text-amber-600">A:</span> <span class="underline">Nominal Roll</span> (Permanent).
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> Preservation of <strong>Postmaster's Order Book (MS.8)</strong>? <br/>
            <span class="font-bold text-amber-600">A:</span> <span class="bg-amber-900 text-white px-1">⚠️ 3 Years</span> (Most candidates pick 2).
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> 5 year NSCS Indemnity Bonds? <br/>
            <span class="font-bold text-amber-600">A:</span> 23 Years.
        </div>
        <div class="bg-white/60 p-2 rounded border border-amber-200">
            <span class="font-black text-amber-900">Q:</span> GPF annual statements? <br/>
            <span class="font-bold text-amber-600">A:</span> 1 Year.
        </div>
    </div>
</div>
        `
    };

    console.log("Seeding Final Comprehensive Dak Sutra...");
    await DakSutra.deleteMany({ title: entry.title });
    await DakSutra.create(entry);

    console.log("Seeding successful! Masterclass content is now live.");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
