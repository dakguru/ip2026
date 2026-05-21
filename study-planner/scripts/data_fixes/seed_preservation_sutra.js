const mongoose = require('mongoose');
const path = require('path');
const dbConnect = require('./src/lib/mongoose').default;
const DakSutra = require('./src/models/DakSutra').default;

async function seed() {
    try {
        await dbConnect();
        console.log('Connected to database');

        const content = {
            title: "Master Guide: Preservation & Disposal of Postal Records",
            rule_number: "Rule 212 (Vol VI), Rule 102 (Vol VIII)",
            act_name: "Postal Manual Volume VIII (Appendix A)",
            category: "Rule",
            effective_date: new Date('2025-01-01'),
            exam_tags: ["LDCE IP", "PS Group B", "Postal Manual Vol VIII", "Paper I"],
            status: "published",
            created_by: "Admin",
            official_text: `
<h3 class="text-amber-700">I. General Principles of Preservation</h3>
<p>As per <strong>Appendix A of Postal Manual Volume VIII</strong>, all postal records must be preserved for specific periods calculated from the 1st of April following the year to which they relate, unless specified otherwise.</p>
<div class="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-500 my-4">
    <strong>Destruction Rule:</strong> No record should be destroyed without a specific order from the Head of the Office, and never if an audit objection or inquiry is pending.
</div>

<h3 class="text-blue-700">II. Retention Periods at a Glance</h3>
<table class="w-full border-collapse border border-gray-200 mt-2">
    <thead>
        <tr class="bg-blue-600 text-white">
            <th class="p-2 border">Retention Period</th>
            <th class="p-2 border">Records / Documents</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td class="p-2 border font-bold">Permanent</td>
            <td class="p-2 border">Nominal Roll, Register of Security Deposits, Stock Book of Postmarks.</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold text-amber-600">10 Years</td>
            <td class="p-2 border text-sm">Stock Book of Post Office, Treasurer's Cash Book (ACG-2), Day Bag Book (CBO), Invoices for Stock items.</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold">5 Years</td>
            <td class="p-2 border text-sm">SB Specimen Signature Books at SOs (after closure), SB Vouchers in SBCO, APARs (Retirement/Dismissal), Free-look cancellation files (PLI).</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold">3 Years</td>
            <td class="p-2 border text-sm">Postmaster's Order Book (MS-8), Service Books (after death/retirement), Foreign MO Records, Gradation Lists.</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold text-green-700">2 Years</td>
            <td class="p-2 border text-sm">Book of MO Receipts (MO-1), Registered/Parcel Lists (BO), Audit Case Files, CCTV Footage of Exams (from declaration), APARs (Death).</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold">18 Months</td>
            <td class="p-2 border text-sm">Journals of MOs Issued/Paid/Received, Sub-Office Daily Accounts (ACG-22), SO/BO Summaries.</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold">1 Year</td>
            <td class="p-2 border text-sm">Correspondence on losses (Official disposal), Answer Books of Dept. Exams (from results).</td>
        </tr>
        <tr>
            <td class="p-2 border font-bold">6 Months</td>
            <td class="p-2 border text-sm">Bulk Money Order Lists, Ordinary Mail Lists.</td>
        </tr>
    </tbody>
</table>
            `,
            guru_explanation: `
<div class="space-y-3">
    <p>Understanding "Preservation" is not just about memorizing years; it's about knowing the <strong>trigger event</strong>. Most periods start from the closure of the accounting year.</p>
    <ul class="list-disc ml-5 space-y-1">
        <li><strong>Money Order Records:</strong> Note the 18-month rule. It's unique and frequently tested in IPO exams.</li>
        <li><strong>Bag Records:</strong> CBO records (10 yrs) are kept much longer than UBOS/DBOS (2 yrs).</li>
        <li><strong>SB Records:</strong> Signature books at SOs stay for 5 years <em>after all accounts in the book are closed</em> — this could effectively span decades!</li>
    </ul>
</div>
            `,
            practical_example: `
<div class="bg-gray-50 p-4 border rounded-md">
    <h4 class="font-bold underline mb-2">Practical Scenario:</h4>
    <p>A Postmaster wants to destroy the <strong>Journal of MOs Paid</strong> for the year 2023-24. </p>
    <p><strong>Step 1:</strong> Check the period (18 months). </p>
    <p><strong>Step 2:</strong> 18 months from March 2024 is September 2025. </p>
    <p><strong>Step 3:</strong> Ensure no audit objection (IR Paras) is pending for that year. </p>
    <p><strong>Result:</strong> If clear, destruction can be ordered after Sept 2025.</p>
</div>
            `,
            exam_insight: `
<div class="bg-amber-100 p-4 border-l-4 border-amber-600">
    <h4 class="font-black text-amber-900 border-b border-amber-300 pb-1 mb-2">🎯 2026 EXAM HITS</h4>
    <ul class="space-y-2 text-sm text-amber-900">
        <li><strong>Q:</strong> Preservation of <strong>Postmaster's Order Book</strong>? <br/><strong>A:</strong> 3 Years (Rule 25, Vol VI).</li>
        <li><strong>Q:</strong> <strong>Day Bag Book (CBO)</strong> vs <strong>UBOS</strong>? <br/><strong>A:</strong> CBO = 10 Years; UBOS/DBOS = 2 Years.</li>
        <li><strong>Q:</strong> Period for <strong>Nominal Roll</strong>? <br/><strong>A:</strong> Permanent (It’s the history of the office staff).</li>
        <li><strong>Q:</strong> <strong>CCTV Footage</strong> of Exams? <br/><strong>A:</strong> 2 Years after declaration of results.</li>
    </ul>
</div>
            `
        };

        const existing = await DakSutra.findOne({ title: content.title });
        if (existing) {
            await DakSutra.findByIdAndUpdate(existing._id, content);
            console.log('Updated existing Dak Sutra entry');
        } else {
            await new DakSutra(content).save();
            console.log('Created new Dak Sutra entry');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error seeding:', error);
        process.exit(1);
    }
}

seed();
