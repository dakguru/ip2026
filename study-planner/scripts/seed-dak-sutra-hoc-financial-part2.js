
const { MongoClient } = require('mongodb');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load env
const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI not found');
    process.exit(1);
}

const now = new Date();

const entries = [
    {
        title: "HOC Financial Powers — Procurement, Capital Works, Mail Conveyance, Refunds & Write-Offs (Part 2)",
        rule_number: "Schedule II-A — Sl. No. 12, 14–22, 24–37",
        act_name: "DFPR 2024 — Schedule II-A",
        category: "Rule",
        effective_date: new Date("2025-04-01"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: `<h2 class="text-indigo-900 border-b-2 border-indigo-200 mb-4 pb-2 text-lg font-black">📜 Official Provision — HOC Financial Powers Part 2</h2>

<div class="mb-4 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-200">
<p class="text-sm leading-relaxed mb-3">Part 2 covers the <strong class="text-indigo-800">capital + procurement + crisis management</strong> wing of HOC powers under <strong class="text-indigo-800">DFPR 2024, Rule 12(2)</strong>, as delegated by Secretary (Posts) in consultation with AS&amp;FA.</p>
<p class="text-sm leading-relaxed font-semibold text-slate-700">Domains covered: Procurement of stores, civil works, vehicles, ICT equipment, mail conveyance, engagement of professionals, refunds, write-offs, and single/negotiated tenders.</p>
</div>

<div class="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-lg">
<p class="text-sm font-black text-red-800 mb-2">⚠️ HOC-ONLY Items in Part 2 (Note 4 of Schedule II-A):</p>
<div class="grid grid-cols-2 gap-1 text-xs text-red-700 ml-2">
<span>• 15(i) — Postal Stores Depot Purchases</span>
<span>• 15(ii) — Stores for Works</span>
<span>• 15(iv) — Indents from Govt Press/Stationery</span>
<span>• 18(iv) — Dismantling of Building</span>
<span>• 22 — Awards and Prizes</span>
<span>• 24(vii) — Other unclassified expenditure</span>
<span>• 25(i) — New Operational Vehicle (vs condemned)</span>
<span>• 25(ii) — New Inspection Vehicle (vs condemned)</span>
<span>• 27(iii) — Computers under Schemes</span>
<span>• 27(iv) — Laptops for eligible officers</span>
<span>• 27(v) — Laptops for office use</span>
<span>• 28(i) — Project Estimates of postal buildings</span>
<span>• 31 — Heritage Assets / Upgradation</span>
<span>• 34(i)–(v) — All Write-Off powers</span>
<span>• 35(iii) — Road Mail / RTN Contracts</span>
<span>• 37 — Single/Negotiated Tender sanction</span>
</div>
</div>

<div class="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
<p class="text-sm font-bold text-blue-800 mb-1">📌 Note 5:</p>
<p class="text-xs text-blue-700">HOC-only items 15(i), 15(ii), 15(iv), 18(iv), 22, 24(vii), 27(iii)–(v) and 28(i) shall <strong>also be exercised by Director (RAKNPA) and CGM (PD/BD/PLI)</strong>.</p>
</div>

<h3 class="text-blue-900 font-black mb-3 mt-6 border-b border-blue-200 pb-1">📊 HOC vs HOD AT A GLANCE — Part 2 Items</h3>
<div class="overflow-x-auto mb-4">
<table class="w-full text-sm border-collapse bg-white">
<thead class="bg-gradient-to-r from-blue-700 to-indigo-700 text-white font-bold">
<tr><th class="p-2 text-left border">Sl. No.</th><th class="p-2 text-left border">Item</th><th class="p-2 text-left border">HOC Limit</th><th class="p-2 text-left border">HOD Limit</th></tr>
</thead>
<tbody>
<tr class="bg-blue-50"><td class="p-2 border font-bold">12(i)(c)</td><td class="p-2 border">Printing — Others</td><td class="p-2 border font-black text-blue-800">₹1.5 Lakh / annum</td><td class="p-2 border">₹1.5 Lakh / annum</td></tr>
<tr><td class="p-2 border font-bold">13(i)</td><td class="p-2 border">Renting of Equipment</td><td class="p-2 border font-black text-blue-800">₹25 Lakh / case</td><td class="p-2 border">₹25 Lakh / case</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">14</td><td class="p-2 border">Digital Equipment (OH-19)</td><td class="p-2 border font-black text-blue-800">Full Powers</td><td class="p-2 border">Full Powers</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">15(i)</td><td class="p-2 border">Postal Stores Depot Purchase</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">15(ii)</td><td class="p-2 border">Stores for Works</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">15(iv)</td><td class="p-2 border">Indents from Govt Press / Stationery / Govt Undertakings</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">16</td><td class="p-2 border">Petrol / Oil / Lubricants / CNG / Diesel</td><td class="p-2 border font-black text-blue-800">Full Powers</td><td class="p-2 border">Full Powers</td></tr>
<tr><td class="p-2 border font-bold">17(i)</td><td class="p-2 border">Advertising via BoC / DAVP</td><td class="p-2 border font-black text-blue-800">₹5 Lakh / case</td><td class="p-2 border">₹5 Lakh / case</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">17(ii)</td><td class="p-2 border">Advertising via other media</td><td class="p-2 border font-black text-blue-800">₹2 Lakh / case</td><td class="p-2 border">₹2 Lakh / case</td></tr>
<tr><td class="p-2 border font-bold">18(i)</td><td class="p-2 border">Minor Civil/Electrical Works — Govt Buildings</td><td class="p-2 border font-black text-blue-800">₹10 Lakh / case</td><td class="p-2 border">₹10 Lakh / case</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">18(ii)</td><td class="p-2 border">Minor Civil/Electrical Works — Rented Buildings</td><td class="p-2 border font-black text-blue-800">₹5 Lakh / case</td><td class="p-2 border">₹5 Lakh / case</td></tr>
<tr><td class="p-2 border font-bold">18(iii)</td><td class="p-2 border">Minor Electrical — Removable Fittings (Rented)</td><td class="p-2 border font-black text-blue-800">₹5 Lakh / case</td><td class="p-2 border">₹5 Lakh / case</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">18(iv)</td><td class="p-2 border"><strong>Dismantling of Building</strong></td><td class="p-2 border font-black text-red-700">Up to ₹50 Lakh <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-amber-50"><td class="p-2 border font-bold">19(i)</td><td class="p-2 border">Engagement of CA / Artists / GST Consultants</td><td class="p-2 border font-black text-amber-800">₹1 Crore / annum</td><td class="p-2 border text-amber-700">₹20 Lakh / annum</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">22</td><td class="p-2 border">Awards and Prizes</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">25(i)</td><td class="p-2 border">New Operational Vehicle (against condemned)</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">25(ii)</td><td class="p-2 border">New Inspection Vehicle (against condemned)</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">27(i)</td><td class="p-2 border">Desktop Computers — Fresh (non-scheme)</td><td class="p-2 border font-black text-blue-800">₹5 Lakh / case</td><td class="p-2 border">₹5 Lakh / case</td></tr>
<tr><td class="p-2 border font-bold">27(ii)</td><td class="p-2 border">Desktop Computers — Replacement (non-scheme)</td><td class="p-2 border font-black text-blue-800">₹20 Lakh / case</td><td class="p-2 border">₹20 Lakh / case</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">27(iii)</td><td class="p-2 border">Desktop/Peripherals under Computerisation Schemes</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">27(iv)</td><td class="p-2 border">Laptops for eligible officers</td><td class="p-2 border font-black text-red-700">₹1L (+taxes) / ₹1.3L MII &gt;40% <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">27(v)</td><td class="p-2 border">Laptops for office use (not individual)</td><td class="p-2 border font-black text-red-700">₹5 Lakh / annum <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">28(i)</td><td class="p-2 border">Project Estimates — New Postal Buildings / Staff Quarters</td><td class="p-2 border font-black text-red-700">Up to ₹10 Crores <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">28(ii)</td><td class="p-2 border">Addition/Alteration — Non-Residential</td><td class="p-2 border font-black text-blue-800">Up to ₹2 Crores</td><td class="p-2 border text-slate-400">—</td></tr>
<tr><td class="p-2 border font-bold">28(iii)</td><td class="p-2 border">Addition/Alteration — Residential</td><td class="p-2 border font-black text-blue-800">Up to ₹2 Crores</td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-blue-50"><td class="p-2 border font-bold">29</td><td class="p-2 border">Procurement of Infrastructural Assets</td><td class="p-2 border font-black text-blue-800">₹2 Crores / case</td><td class="p-2 border">₹2 Crores / case</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">34(i)</td><td class="p-2 border">Write-off — Loss of Revenue</td><td class="p-2 border font-black text-red-700">₹5,000 / case <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">34(ii)</td><td class="p-2 border">Write-off — Stores / Public Money</td><td class="p-2 border font-black text-red-700">₹50,000 / case <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">34(iii)</td><td class="p-2 border">Write-off — Stores Depreciation</td><td class="p-2 border font-black text-red-700">₹50,000 / case <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">34(iv)</td><td class="p-2 border">Mature Condemnation of Vehicles</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">34(v)</td><td class="p-2 border">Scrapping Vehicles ≥ 15 years (via RVSF)</td><td class="p-2 border font-black text-red-700">Full Powers <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
<tr class="bg-amber-50"><td class="p-2 border font-bold">36(e)</td><td class="p-2 border">Refund of Advertisement Charges</td><td class="p-2 border font-black text-amber-800">₹50,000 / case</td><td class="p-2 border text-amber-700">₹10,000 / case</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">37</td><td class="p-2 border">Single / Negotiated Tender Sanction</td><td class="p-2 border font-black text-red-700">₹50 Lakh / case <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-400">—</td></tr>
</tbody>
</table>
</div>

<h3 class="text-emerald-900 font-black mb-3 mt-6 border-b border-emerald-200 pb-1">🚂 Special Table — Mail Conveyance Powers [Sl. No. 35]</h3>
<div class="overflow-x-auto mb-4">
<table class="w-full text-sm border-collapse bg-white">
<thead class="bg-gradient-to-r from-emerald-700 to-teal-700 text-white font-bold">
<tr><th class="p-2 text-left border">Mode</th><th class="p-2 text-left border">HOC Limit</th><th class="p-2 text-left border">IFA Trigger</th></tr>
</thead>
<tbody>
<tr class="bg-emerald-50"><td class="p-2 border font-bold">(i) By Rail</td><td class="p-2 border font-black text-emerald-800">Full Powers (DoP-Railways approved rates)</td><td class="p-2 border text-slate-600">Beyond ₹2 Lakh / case</td></tr>
<tr><td class="p-2 border font-bold">(ii) By Air</td><td class="p-2 border font-black text-emerald-800">Full Powers (agreed carrier rates)</td><td class="p-2 border text-slate-600">Beyond ₹2 Lakh / case</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">(iii) By Road / RTN Contract</td><td class="p-2 border font-black text-red-700">Up to ₹10 Crores / contract <span class="text-xs">(HOC ONLY)</span></td><td class="p-2 border text-slate-600">Beyond ₹2 Lakh / case</td></tr>
<tr class="bg-amber-50"><td class="p-2 border font-bold">(iv) Other Means (Emergency)</td><td class="p-2 border font-black text-amber-800">₹2,50,000 / month / route (no tender, max 3 months)</td><td class="p-2 border text-slate-600">IFA required</td></tr>
<tr><td class="p-2 border font-bold">(v) Foreign Mails — Non-contract Steamer</td><td class="p-2 border font-black text-blue-800">₹5 Lakhs</td><td class="p-2 border text-slate-600">IFA required</td></tr>
<tr class="bg-emerald-50"><td class="p-2 border font-bold">(vi) Haulage of Special Trains</td><td class="p-2 border font-black text-emerald-800">Full Powers (Railway-sanctioned rates)</td><td class="p-2 border text-slate-600">Beyond ₹2 Lakh</td></tr>
<tr><td class="p-2 border font-bold">(vii) Diversion / Flood / Accident Charges</td><td class="p-2 border font-black text-emerald-800">Full Powers</td><td class="p-2 border text-slate-600">Beyond ₹2 Lakh</td></tr>
</tbody>
</table>
</div>

<h3 class="text-orange-900 font-black mb-3 mt-6 border-b border-orange-200 pb-1">🏗️ Special Table — Buildings &amp; Civil Works [Sl. No. 18, 28]</h3>
<div class="overflow-x-auto mb-4">
<table class="w-full text-sm border-collapse bg-white">
<thead class="bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold">
<tr><th class="p-2 text-left border">Item</th><th class="p-2 text-left border">HOC Limit</th><th class="p-2 text-left border">Note</th></tr>
</thead>
<tbody>
<tr class="bg-orange-50"><td class="p-2 border font-bold">Minor Civil/Electrical — Govt Buildings [18(i)]</td><td class="p-2 border font-black text-orange-800">₹10 Lakh / case</td><td class="p-2 border text-xs">HOC &amp; HOD both</td></tr>
<tr><td class="p-2 border font-bold">Minor Civil/Electrical — Rented Buildings [18(ii)]</td><td class="p-2 border font-black text-orange-800">₹5 Lakh / case</td><td class="p-2 border text-xs">HOC &amp; HOD both</td></tr>
<tr class="bg-orange-50"><td class="p-2 border font-bold">Minor Electrical — Removable Fittings (Rented) [18(iii)]</td><td class="p-2 border font-black text-orange-800">₹5 Lakh / case</td><td class="p-2 border text-xs">HOC &amp; HOD both</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">Dismantling of Building [18(iv)]</td><td class="p-2 border font-black text-red-700">Up to ₹50 Lakh</td><td class="p-2 border text-xs font-bold text-red-600">HOC ONLY</td></tr>
<tr class="bg-red-50"><td class="p-2 border font-bold">Project Estimates — New Postal Bldg / Staff Qtrs [28(i)]</td><td class="p-2 border font-black text-red-700">Up to ₹10 Crores</td><td class="p-2 border text-xs font-bold text-red-600">HOC ONLY</td></tr>
<tr class="bg-orange-50"><td class="p-2 border font-bold">Addition/Alteration — Non-Residential [28(ii)]</td><td class="p-2 border font-black text-orange-800">Up to ₹2 Crores</td><td class="p-2 border text-xs text-slate-500">excl. overheads</td></tr>
<tr><td class="p-2 border font-bold">Addition/Alteration — Residential [28(iii)]</td><td class="p-2 border font-black text-orange-800">Up to ₹2 Crores</td><td class="p-2 border text-xs text-slate-500">excl. overheads</td></tr>
<tr class="bg-orange-50"><td class="p-2 border font-bold">Procurement of Infrastructural Assets [29]</td><td class="p-2 border font-black text-orange-800">₹2 Crores / case</td><td class="p-2 border text-xs">HOC &amp; HOD both</td></tr>
</tbody>
</table>
</div>

<h3 class="text-violet-900 font-black mb-3 mt-6 border-b border-violet-200 pb-1">💰 Key HOC Financial Limits at a Glance</h3>
<div class="overflow-x-auto mb-4">
<table class="w-full text-sm border-collapse bg-white">
<thead class="bg-gradient-to-r from-violet-700 to-purple-700 text-white font-bold">
<tr><th class="p-2 text-left border">Domain</th><th class="p-2 text-left border">HOC Power</th></tr>
</thead>
<tbody>
<tr class="bg-violet-50"><td class="p-2 border">Postal Stores Depot Purchase</td><td class="p-2 border font-black text-violet-800">Full Powers</td></tr>
<tr><td class="p-2 border">Dismantling of Building</td><td class="p-2 border font-black text-violet-800">₹50 Lakh</td></tr>
<tr class="bg-violet-50"><td class="p-2 border">Engagement of CA / GST Consultants / Artists</td><td class="p-2 border font-black text-violet-800">₹1 Crore / annum</td></tr>
<tr><td class="p-2 border">Project Estimate — Postal Building</td><td class="p-2 border font-black text-violet-800">₹10 Crores</td></tr>
<tr class="bg-violet-50"><td class="p-2 border">Addition / Alteration (non-resi / resi)</td><td class="p-2 border font-black text-violet-800">₹2 Crores</td></tr>
<tr><td class="p-2 border">Mail Conveyance by Road (RTN)</td><td class="p-2 border font-black text-violet-800">₹10 Crores / contract</td></tr>
<tr class="bg-violet-50"><td class="p-2 border">Single / Negotiated Tender</td><td class="p-2 border font-black text-violet-800">₹50 Lakh / case</td></tr>
<tr><td class="p-2 border">Write-off — Loss of Revenue</td><td class="p-2 border font-black text-violet-800">₹5,000 / case</td></tr>
<tr class="bg-violet-50"><td class="p-2 border">Write-off — Stores / Public Money</td><td class="p-2 border font-black text-violet-800">₹50,000 / case</td></tr>
<tr><td class="p-2 border">Write-off — Stores Depreciation</td><td class="p-2 border font-black text-violet-800">₹50,000 / case</td></tr>
<tr class="bg-violet-50"><td class="p-2 border">Refund of Advertisement Charges</td><td class="p-2 border font-black text-violet-800">₹50,000 / case</td></tr>
<tr><td class="p-2 border">Foreign Mails — Non-contract Steamer</td><td class="p-2 border font-black text-violet-800">₹5 Lakhs</td></tr>
<tr class="bg-violet-50"><td class="p-2 border">Other Means Mail Conveyance (Emergency)</td><td class="p-2 border font-black text-violet-800">₹2,50,000 / month / route</td></tr>
</tbody>
</table>
</div>`,

        guru_explanation: `<h2 class="text-teal-900 border-b-2 border-teal-200 mb-4 pb-2 text-lg font-black">🎓 Dak Guru Explains — HOC Financial Powers Part 2</h2>

<div class="mb-4 p-4 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-200">
<p class="text-sm font-bold text-teal-900 mb-2">🎯 The Big Picture — What Part 2 Is About</p>
<p class="text-sm text-slate-700 leading-relaxed">If Part 1 was about <em>people and day-to-day running</em> (pay, allowances, renting offices), Part 2 is the <strong class="text-teal-800">Capital + Procurement + Crisis wing</strong>. Think of it as the CPMG's authority to <em>build, buy, move mail, and clean up losses</em>.</p>
</div>

<h3 class="text-indigo-900 font-black mb-3 mt-5 border-b border-indigo-100 pb-1">🗂️ Three "HOC ONLY" Buckets — Memorise by Theme</h3>

<div class="grid gap-3 mb-5">
<div class="p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
<p class="font-black text-blue-800 text-sm mb-1">📦 STORES BUCKET</p>
<p class="text-xs text-blue-700">Sl. No. <strong>15(i), 15(ii), 15(iv)</strong> — All Postal Stores Depot (PSD) related procurement. Only items stocked/issued through PSD; competitive tenders + funds availability + necessity required.</p>
</div>
<div class="p-3 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
<p class="font-black text-orange-800 text-sm mb-1">🏗️ CAPITAL BUCKET</p>
<p class="text-xs text-orange-700">Sl. No. <strong>18(iv)</strong> Dismantling, <strong>25(i) &amp; (ii)</strong> Vehicles, <strong>27(iii)–(v)</strong> ICT/Laptops, <strong>28(i)</strong> Buildings up to ₹10 Cr, <strong>31</strong> Heritage Assets — these require significant capital outlay, hence centralised at HOC only.</p>
</div>
<div class="p-3 bg-red-50 border-l-4 border-red-500 rounded-r-lg">
<p class="font-black text-red-800 text-sm mb-1">🔐 CONTROL BUCKET</p>
<p class="text-xs text-red-700">Sl. No. <strong>22</strong> Awards/Prizes, <strong>24(vii)</strong> Unclassified expenditure, <strong>34(i)–(v)</strong> Write-Offs, <strong>35(iii)</strong> Road Mail Conveyance, <strong>37</strong> Single/Negotiated Tenders — these are policy-sensitive or loss-recognition powers that must stay at Circle level.</p>
</div>
</div>

<h3 class="text-emerald-900 font-black mb-3 mt-5 border-b border-emerald-100 pb-1">🚗 Vehicle Procurement Logic — Crystal Clear</h3>
<div class="p-3 bg-emerald-50 border border-emerald-200 rounded-lg mb-4 text-sm">
<ul class="space-y-1 text-slate-700">
<li>✅ <strong>New vehicle = ONLY against condemned vehicle</strong> — this is a <em>replacement</em>, not an addition to fleet.</li>
<li>✅ <strong>Operational vehicles (OH-51)</strong> → governed by DoP OM No. 1-3/2016-MV dated 16.05.2018.</li>
<li>✅ <strong>Inspection vehicles</strong> → governed by DoP letter No. 17-1/2023-MV dated 29.02.2024 (price ceiling + make/model rules).</li>
<li>🚨 <strong>Vehicles ≥ 15 years old</strong> → MUST go through <strong>RVSF (Registered Vehicle Scrapping Facility)</strong> under MoRTH guidelines — no option.</li>
<li>✅ <strong>Mature condemnation</strong> [34(iv)] = vehicle reaching prescribed life (distance/age) per DoE OM 01(14)/2016-E.II(A) Part-III dated 01.04.2024.</li>
</ul>
</div>

<h3 class="text-violet-900 font-black mb-3 mt-5 border-b border-violet-100 pb-1">💻 ICT Equipment Memory Map</h3>
<div class="overflow-x-auto mb-4">
<table class="w-full text-sm border-collapse bg-white">
<thead class="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold">
<tr><th class="p-2 text-left border">Item</th><th class="p-2 text-left border">Sl. No.</th><th class="p-2 text-left border">Limit</th><th class="p-2 text-left border">Who?</th></tr>
</thead>
<tbody>
<tr class="bg-violet-50"><td class="p-2 border">Desktop — Fresh Purchase</td><td class="p-2 border font-bold">27(i)</td><td class="p-2 border">₹5 Lakh / case</td><td class="p-2 border">HOC &amp; HOD</td></tr>
<tr><td class="p-2 border">Desktop — Replacement</td><td class="p-2 border font-bold">27(ii)</td><td class="p-2 border">₹20 Lakh / case</td><td class="p-2 border">HOC &amp; HOD</td></tr>
<tr class="bg-red-50"><td class="p-2 border">Desktop/Peripherals under Schemes</td><td class="p-2 border font-bold">27(iii)</td><td class="p-2 border font-bold text-red-700">Full Powers</td><td class="p-2 border font-bold text-red-700">HOC ONLY</td></tr>
<tr class="bg-red-50"><td class="p-2 border">Laptop — for eligible officers</td><td class="p-2 border font-bold">27(iv)</td><td class="p-2 border font-bold text-red-700">₹1,00,000 + taxes<br/><span class="text-xs">₹1,30,000 + taxes if MII &gt;40%</span></td><td class="p-2 border font-bold text-red-700">HOC ONLY</td></tr>
<tr class="bg-red-50"><td class="p-2 border">Laptop — for office use (not individual)</td><td class="p-2 border font-bold">27(v)</td><td class="p-2 border font-bold text-red-700">₹5 Lakh / annum</td><td class="p-2 border font-bold text-red-700">HOC ONLY</td></tr>
</tbody>
</table>
</div>
<div class="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 mb-4">
<strong>MII &gt;40% explained:</strong> If the laptop is a <em>Make in India</em> product with &gt;40% local value addition, the ceiling is higher (₹1.3L instead of ₹1L). This incentivises procurement of domestically manufactured devices.
</div>

<h3 class="text-rose-900 font-black mb-3 mt-5 border-b border-rose-100 pb-1">✍️ Write-Off "Each Case" Rule [Note under Sl. No. 34(i)]</h3>
<div class="p-4 bg-rose-50 border border-rose-200 rounded-lg mb-4 text-sm">
<ul class="space-y-2 text-slate-700">
<li>📌 <strong>"Each case"</strong> = total value of stores written off <strong>on a single occasion</strong>.</li>
<li>🚫 <strong>Losses CANNOT be split</strong> across multiple write-off orders to stay within the sanctioning limit.</li>
<li>🔥 Losses from <strong>one cause</strong> (fire, theft, flood) must be written off <strong>at one time only</strong>.</li>
<li>✅ Losses from multiple separate causes <em>can</em> be written off together if convenient.</li>
<li>📋 A <strong>quarterly statement</strong> of all write-offs sanctioned goes to <strong>Integrated Finance Division (IFD)</strong>.</li>
</ul>
</div>

<h3 class="text-slate-900 font-black mb-3 mt-5 border-b border-slate-200 pb-1">🔑 Single Tender — Critical Nuance [Sl. No. 37]</h3>
<div class="p-3 bg-slate-50 border border-slate-300 rounded-lg text-sm mb-4">
<p class="text-slate-700 mb-2">A <strong>limited or open tender</strong> that results in <strong>only ONE effective offer</strong> is treated as a <strong>Single Tender</strong> — same rules apply.</p>
<p class="text-slate-700">HOC can sanction single/negotiated tender contracts up to <strong class="text-red-700">₹50 Lakh per case</strong>. Beyond this, Directorate sanction required.</p>
</div>

<h3 class="text-cyan-900 font-black mb-3 mt-5 border-b border-cyan-100 pb-1">🔟 Sanction of Project Estimates [Sl. No. 28(i)] — Step by Step</h3>
<div class="p-4 bg-cyan-50 border border-cyan-200 rounded-lg text-sm">
<ol class="space-y-2 list-decimal ml-4 text-slate-700">
<li><strong>Identify Project</strong> — new construction/reconstruction of postal building or staff quarters.</li>
<li><strong>Verify Land Status</strong> — no land acquisition unless prior special-case sanction obtained.</li>
<li><strong>SOA Conformance</strong> — office must follow PO/RMS/Rest House scale; residential must follow plinth area norms.</li>
<li><strong>Plinth Area Variation Check</strong> — up to <strong>5% variation</strong> due to structural reasons allowed.</li>
<li><strong>Include in Estimate</strong> — ETP charges (CPWD/State PWD/other agencies); freight when departmental Civil Wing executes.</li>
<li><strong>Exclude from Estimate</strong> — establishment &amp; stores-keeping charges (when departmental).</li>
<li><strong>IFA / CIFA Consultation</strong> — mandatory.</li>
<li><strong>HOC Sanction</strong> — up to <strong class="text-red-700">₹10 Crores per project</strong>.</li>
<li><strong>Above ₹10 Crores</strong> → refer to Directorate / Secretary (Posts).</li>
</ol>
</div>`,

        practical_example: `<h2 class="text-amber-900 border-b-2 border-amber-200 mb-4 pb-2 text-lg font-black">🎯 Practical Scenarios — HOC Financial Powers Part 2</h2>

<div class="space-y-4">

<div class="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
<p class="font-black text-green-900 text-sm mb-2">🟢 Scenario 1 — RTN Road Mail Contract (Tamil Nadu)</p>
<p class="text-sm text-slate-700 mb-2">A new RTN contract for Chennai–Madurai mail conveyance is finalised at <strong>₹8.5 Crores for 5 years</strong>.</p>
<div class="mt-2 text-xs space-y-1 text-slate-600">
<p>→ <strong>Rule applied:</strong> Sl. No. 35(iii) — HOC ONLY power, up to ₹10 Crores per contract.</p>
<p>→ ₹8.5 Cr is within limit. IFA consultation required (beyond ₹2 Lakh/case).</p>
<p class="font-bold text-green-800">✅ CPMG (HOC) sanctions — contract executed.</p>
</div>
</div>

<div class="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
<p class="font-black text-blue-900 text-sm mb-2">🟢 Scenario 2 — Construction of New HO Building in Karur</p>
<p class="text-sm text-slate-700 mb-2">DoP plans a new Karur HO at estimated cost of <strong>₹9.7 Crores</strong> including ETP charges from State PWD.</p>
<div class="mt-2 text-xs space-y-1 text-slate-600">
<p>→ <strong>Rule applied:</strong> Sl. No. 28(i) — HOC ONLY; up to ₹10 Crores.</p>
<p>→ SOA conformance checked, plinth area within 5% variation, IFA consultation completed.</p>
<p class="font-bold text-blue-800">✅ CPMG sanctions project estimate.</p>
</div>
</div>

<div class="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl border border-rose-200">
<p class="font-black text-rose-900 text-sm mb-2">🟢 Scenario 3 — Write-off after Theft at PSD</p>
<p class="text-sm text-slate-700 mb-2">Theft results in loss of stores worth <strong>₹42,000</strong> from Postal Stores Depot.</p>
<div class="mt-2 text-xs space-y-1 text-slate-600">
<p>→ <strong>Rule applied:</strong> Sl. No. 34(ii) — HOC ONLY; up to ₹50,000/case.</p>
<p>→ Conditions met: no defect in rules, no negligence by Govt servant, investigation done.</p>
<p>→ "Each case" rule: total ₹42,000 from one theft = one occasion — cannot split.</p>
<p class="font-bold text-rose-800">✅ CPMG writes off. Case included in next quarterly statement to IFD.</p>
</div>
</div>

<div class="p-4 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200">
<p class="font-black text-violet-900 text-sm mb-2">🟢 Scenario 4 — 17-year-old Inspection Vehicle Replacement</p>
<p class="text-sm text-slate-700 mb-2">A Maruti Vitara (2009, 17 years old) used by ASP-Inspection has reached end of life.</p>
<div class="mt-2 text-xs space-y-1 text-slate-600">
<p>→ Age ≥ 15 years → <strong>mandatory RVSF scrapping</strong> under Sl. No. 34(v).</p>
<p>→ Replacement under Sl. No. 25(ii) → Full Powers (HOC ONLY).</p>
<p>→ Conditions: subject to DoP letter 17-1/2023-MV (price ceiling, make, model).</p>
<p>→ IFA consultation required for both scrapping and replacement procurement.</p>
<p class="font-bold text-violet-800">✅ CPMG sanctions both scrapping &amp; replacement. Vehicle procured against condemnation.</p>
</div>
</div>

<div class="p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border border-cyan-200">
<p class="font-black text-cyan-900 text-sm mb-2">🟢 Scenario 5 — Building Dismantling [Sl. No. 18(iv)]</p>
<p class="text-sm text-slate-700 mb-2">An old postal building in Madurai needs to be demolished before reconstruction. Dismantling estimate is <strong>₹38 Lakhs</strong>.</p>
<div class="mt-2 text-xs space-y-1 text-slate-600">
<p>→ <strong>Rule applied:</strong> Sl. No. 18(iv) — HOC ONLY; up to ₹50 Lakh.</p>
<p>→ IFA consultation required.</p>
<p class="font-bold text-cyan-800">✅ CPMG sanctions dismantling.</p>
</div>
</div>

<div class="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl border border-amber-200">
<p class="font-black text-amber-900 text-sm mb-2">🟢 Scenario 6 — GST Consultant Engagement</p>
<p class="text-sm text-slate-700 mb-2">Tamil Nadu Circle wants to engage a GST consultant for ₹85 Lakh per annum (post GST consolidation to One State One GSTIN).</p>
<div class="mt-2 text-xs space-y-1 text-slate-600">
<p>→ <strong>Rule applied:</strong> Sl. No. 19(i) — HOC: ₹1 Crore/annum; HOD: ₹20 Lakh/annum.</p>
<p>→ ₹85 Lakh is within HOC limit (₹1 Cr) but exceeds HOD limit (₹20 L).</p>
<p class="font-bold text-amber-800">✅ CPMG (HOC) must sanction — HOD cannot.</p>
</div>
</div>

</div>

<h3 class="text-slate-900 font-black mb-3 mt-6 border-b border-slate-200 pb-1">🔟 Vehicle Condemnation &amp; Replacement — Step by Step [Sl. No. 25 + 34(iv) + 34(v)]</h3>
<div class="p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm">
<ol class="space-y-2 list-decimal ml-4 text-slate-700">
<li><strong>Identify candidate vehicle</strong> — reached prescribed life (distance run / age) per DoE OM 01(14)/2016-E.II(A) Part-III dated 01.04.2024.</li>
<li><strong>HOC sanctions Mature Condemnation</strong> — Sl. No. 34(iv), Full Powers; IFA consultation required.</li>
<li><strong>Check vehicle age</strong> — if <strong>≥ 15 years</strong> → mandatory RVSF route [34(v)].</li>
<li><strong>Scrap via RVSF</strong> — as per MoRTH guidelines.</li>
<li><strong>Procure Replacement</strong> — Operational [25(i)] or Inspection [25(ii)]; HOC ONLY, Full Powers.</li>
<li><strong>Verify conditions</strong> — DoP OM 1-3/2016-MV (operational) / Letter 17-1/2023-MV (inspection — price ceiling, make, model).</li>
<li><strong>IFA Consultation</strong> — required for procurement.</li>
<li><strong>HOC sanctions replacement</strong> — replacement only, not additional.</li>
</ol>
</div>`,

        exam_insight: `<h2 class="text-rose-900 border-b-2 border-rose-200 mb-4 pb-2 text-lg font-black">⚡ Exam Insight — HOC Financial Powers Part 2</h2>

<div class="mb-5 p-4 bg-gradient-to-r from-red-50 to-rose-50 rounded-xl border-2 border-red-300">
<p class="text-sm font-black text-red-900 mb-3">🔥 MUST-REMEMBER NUMBERS:</p>
<div class="grid grid-cols-1 gap-2 text-xs text-red-800">
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Project Estimate Cap = ₹10 Crores</strong> [Sl. No. 28(i)] — HOC ONLY. Above this → Directorate/Secretary (Posts).</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Dismantling of Building = ₹50 Lakh</strong> [Sl. No. 18(iv)] — HOC ONLY.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Mail by Road RTN = ₹10 Crores per contract</strong> [Sl. No. 35(iii)] — HOC ONLY.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Single/Negotiated Tender = ₹50 Lakh per case</strong> [Sl. No. 37] — HOC ONLY. A limited/open tender with only ONE effective offer = Single Tender.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>CA / GST Consultants = ₹1 Crore/annum (HOC) vs ₹20 Lakh/annum (HOD)</strong> — 5:1 ratio.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Laptop for officers</strong>: ₹1,00,000 + taxes (normal) | <strong>₹1,30,000 + taxes if MII &gt;40%</strong>.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Vehicles ≥ 15 years → mandatory RVSF</strong> (MoRTH). No exception.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Vehicle procurement = replacement against condemnation ONLY</strong> — not addition to fleet.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Compensation for postal article losses [24(iv) &amp; (v)] → NO IFA required</strong>.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>"Each case" in write-off</strong> = total value on ONE occasion. Cannot split losses.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Quarterly statement of write-offs</strong> → submitted to <strong>Integrated Finance Division (IFD)</strong>.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Refund of Advertisement Charges: HOC ₹50,000 vs HOD ₹10,000</strong> — 5:1 ratio.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Refund of Earnest Money [36(a)] = Full Powers, NO IFA</strong>.</span></div>
<div class="flex items-start gap-2"><span class="font-black text-red-600 shrink-0">▶</span><span><strong>Awards &amp; Prizes [Sl. No. 22] = Full Powers, HOC ONLY</strong>.</span></div>
</div>
</div>

<h3 class="text-slate-900 font-black mb-3 mt-5 border-b border-slate-200 pb-1">⚖️ Key Distinctions — Exam Traps</h3>
<div class="overflow-x-auto mb-4">
<table class="w-full text-sm border-collapse bg-white">
<thead class="bg-gradient-to-r from-slate-700 to-zinc-700 text-white font-bold">
<tr><th class="p-2 text-left border">Comparison</th><th class="p-2 text-left border">First Item</th><th class="p-2 text-left border">Second Item</th></tr>
</thead>
<tbody>
<tr class="bg-blue-50"><td class="p-2 border font-bold">Stores procurement</td><td class="p-2 border"><strong class="text-red-700">15(i) PSD = HOC ONLY</strong></td><td class="p-2 border">15(iii) Working stores = both HOC &amp; HOD</td></tr>
<tr><td class="p-2 border font-bold">Building works — minor</td><td class="p-2 border"><strong class="text-blue-700">18(i) Govt Bldg = ₹10 Lakh</strong></td><td class="p-2 border">18(ii) Rented Bldg = ₹5 Lakh</td></tr>
<tr class="bg-amber-50"><td class="p-2 border font-bold">Big civil works</td><td class="p-2 border"><strong class="text-amber-700">18(iv) Dismantling = ₹50 Lakh (HOC ONLY)</strong></td><td class="p-2 border">28(i) Project Estimate = ₹10 Crores (HOC ONLY)</td></tr>
<tr><td class="p-2 border font-bold">Computers</td><td class="p-2 border"><strong class="text-blue-700">27(i) Fresh Desktop = ₹5L</strong></td><td class="p-2 border">27(ii) Desktop Replacement = ₹20L</td></tr>
<tr class="bg-violet-50"><td class="p-2 border font-bold">Laptops</td><td class="p-2 border"><strong class="text-violet-700">27(iv) For officers = ₹1L (+₹30K if MII&gt;40%)</strong></td><td class="p-2 border">27(v) For office use = ₹5L/annum</td></tr>
<tr><td class="p-2 border font-bold">Mail conveyance</td><td class="p-2 border"><strong class="text-red-700">35(iii) Road/RTN = ₹10 Cr (HOC ONLY)</strong></td><td class="p-2 border">35(iv) Other emergency = ₹2.5L/month, max 3 months</td></tr>
<tr class="bg-rose-50"><td class="p-2 border font-bold">Write-offs</td><td class="p-2 border"><strong class="text-rose-700">34(i) Revenue = ₹5,000</strong></td><td class="p-2 border">34(ii) Stores = ₹50,000 | 34(iii) Depreciation = ₹50,000</td></tr>
<tr><td class="p-2 border font-bold">Vehicle condemnation</td><td class="p-2 border"><strong class="text-blue-700">34(iv) Mature condemnation = prescribed life reached</strong></td><td class="p-2 border">34(v) ≥15 years = mandatory RVSF route</td></tr>
<tr class="bg-green-50"><td class="p-2 border font-bold">Refunds</td><td class="p-2 border"><strong class="text-green-700">36(a) Earnest Money = Full, NO IFA</strong></td><td class="p-2 border">36(e) Advertisement = ₹50,000 (HOC), IFA required</td></tr>
<tr><td class="p-2 border font-bold">GST Consultant</td><td class="p-2 border"><strong class="text-indigo-700">HOC = ₹1 Crore/annum</strong></td><td class="p-2 border">HOD = ₹20 Lakh/annum (5:1 ratio)</td></tr>
</tbody>
</table>
</div>

<h3 class="text-indigo-900 font-black mb-3 mt-5 border-b border-indigo-100 pb-1">📌 Ultra-Revision Points</h3>
<div class="p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-sm">
<ol class="space-y-1.5 list-decimal ml-4 text-slate-700">
<li><strong>HOC ONLY items in Part 2:</strong> 15(i)–(ii)–(iv), 18(iv), 22, 24(vii), 25(i)–(ii), 27(iii)–(v), 28(i), 31, 34(i)–(v), 35(iii), 37.</li>
<li><strong>Project Estimate ceiling = ₹10 Crores</strong>; Dismantling = ₹50 Lakh.</li>
<li><strong>Mail by Road RTN = ₹10 Crores/contract</strong>; Foreign Mail by non-contract steamer = ₹5 Lakh.</li>
<li><strong>Single/Negotiated Tender = ₹50 Lakh</strong> (HOC ONLY); limited/open tender with only 1 effective offer = single tender.</li>
<li><strong>Engagement of CA/GST Consultant = ₹1 Crore/annum (HOC)</strong> vs ₹20 Lakh/annum (HOD).</li>
<li><strong>Laptop ceilings</strong>: ₹1,00,000 + taxes / ₹1,30,000 + taxes if MII &gt; 40%.</li>
<li><strong>Write-offs</strong>: Revenue ₹5,000 | Stores/Public Money ₹50,000 | Stores Depreciation ₹50,000.</li>
<li><strong>Vehicle Rule</strong>: Replacement only against condemnation; ≥15 years → RVSF mandatory.</li>
<li><strong>Compensation for loss of postal articles</strong> = Full Powers, <strong>NO IFA</strong>.</li>
<li><strong>Refund of Earnest Money</strong> = Full Powers, NO IFA; <strong>Refund of Advertisement</strong> = ₹50,000 (HOC), IFA required.</li>
<li><strong>"Each case" rule</strong> = total losses on one occasion; cannot split; quarterly report to IFD.</li>
<li><strong>Heritage Assets [Sl. No. 31]</strong> — As per limit fixed by Nodal Department / DoP; HOC ONLY.</li>
</ol>
</div>`,
        status: "published",
        created_by: "system_admin",
        createdAt: now,
        updatedAt: now
    }
];

async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const db = client.db();
        const collection = db.collection('daksutras');

        let inserted = 0;
        let updated = 0;

        for (const entry of entries) {
            const result = await collection.updateOne(
                { title: entry.title },
                { $set: entry },
                { upsert: true }
            );

            if (result.upsertedCount > 0) {
                console.log(`  ✅ Inserted: [${entry.category}] ${entry.title}`);
                inserted++;
            } else {
                console.log(`  🆙 Updated: [${entry.category}] ${entry.title}`);
                updated++;
            }
        }

        console.log(`\n📚 Done!`);
        console.log(`  Inserted: ${inserted}`);
        console.log(`  Updated:  ${updated}`);
        console.log(`  Total entries in this batch: ${entries.length}`);

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
