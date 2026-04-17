
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

const envLocalPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
} else {
    dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) { console.error('❌ MONGODB_URI not found'); process.exit(1); }

async function update() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const collection = client.db().collection('daksutras');

        const targetId = "69c9d991d3aa2557b9575f92";

        const updatedData = {
            title: "Insured Articles — Rules, Limits & Compensation Procedure",
            rule_number: "Regulation 133 (as amended by S.O. 1595(E), 25 March 2026)",
            act_name: "Post Office Regulations, 2024",
            category: "Regulation",
            effective_date: new Date("2026-04-01"),
            exam_tags: ["LDCE IP", "PS Group B", "GDS"],
            official_text: `<div class="space-y-6">
    <section>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Insured Articles — Overview</h3>
        <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Any postal article (letter, parcel, etc.) containing articles of <strong>value</strong> may be insured against loss or damage in the postal system. Insurance is a declaration of value by the sender, and the Post Office undertakes to pay compensation equal to the insured value (subject to maximum limits) in case of loss or damage.
        </p>
    </section>

    <section class="bg-amber-50 dark:bg-amber-950/20 p-5 rounded-2xl border border-amber-100 dark:border-amber-900/30">
        <h4 class="font-bold text-amber-800 dark:text-amber-400 mb-2">Recent Amendment — S.O. 1595(E) dated 25 March 2026</h4>
        <div class="text-sm text-zinc-700 dark:text-zinc-300">
            <p class="font-bold mb-1">Post Office (Third Amendment) Regulations, 2026</p>
            <p>In the Post Office Regulations, 2024, in <strong>Regulation 133, sub-regulation (1)</strong>, for the words <em>"not exceeding one lakh rupees"</em>, the words <strong>"not exceeding five lakh rupees"</strong> shall be substituted.</p>
            <p class="mt-2 text-xs opacity-80"><strong>Effective: 1st April, 2026</strong> | Issued by: Vivek Kumar Daksh, Dy. Director General | F. No. F 01-01/2024-PO-Part (1)</p>
        </div>
    </section>

    <section>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Articles That Can Be Insured</h3>
        <ul class="list-disc list-outside ml-5 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Letters and parcels containing currency, jewellery, valuables, documents, electronic items</li>
            <li>Articles must be properly packed to withstand transit</li>
        </ul>
    </section>

    <section>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Maximum Insurable Value (w.e.f. 1 April 2026)</h3>
        <div class="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table class="w-full text-sm text-left">
                <thead class="bg-zinc-50 dark:bg-zinc-800/50 text-zinc-500">
                    <tr>
                        <th class="px-4 py-3 font-semibold">Category</th>
                        <th class="px-4 py-3 font-semibold">Limit</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                        <td class="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100 italic">Domestic insured articles (Regulation 133)</td>
                        <td class="px-4 py-3 font-bold text-indigo-600 dark:text-indigo-400">₹5,00,000 (₹5 lakh) per article</td>
                    </tr>
                    <tr class="opacity-60">
                        <td class="px-4 py-3">Before 1 April 2026 (old limit)</td>
                        <td class="px-4 py-3">₹1,00,000 (₹1 lakh)</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

    <section>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Insurance Fee</h3>
        <p class="text-zinc-700 dark:text-zinc-300">
            Insurance fee is charged in addition to normal postage. The fee is calculated based on the declared insured value as per the slab rates notified by the Department.
        </p>
    </section>

    <section>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Compensation for Loss — Conditions</h3>
        <ul class="list-disc list-outside ml-5 space-y-2 text-zinc-700 dark:text-zinc-300">
            <li>Compensation is payable if the article is <strong>lost, rifled, or damaged</strong> in transit.</li>
            <li>The sender must establish the <strong>actual value</strong> of the loss — compensation cannot exceed the actual value OR the insured amount, whichever is <strong>lower</strong>.</li>
            <li>Compensation is <strong>not payable</strong> if the loss/damage is due to the <strong>inherent defect</strong> of the article or improper packing by the sender.</li>
            <li>Compensation is <strong>not payable</strong> if the loss occurred due to <strong>act of God</strong> (flood, earthquake, etc.) or enemy action.</li>
        </ul>
    </section>

    <section>
        <h3 class="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">Procedure for Claim</h3>
        <ol class="list-decimal list-outside ml-5 space-y-2 text-zinc-700 dark:text-zinc-300 font-medium">
            <li>Sender files complaint at booking post office.</li>
            <li>Inquiry is conducted by the Division.</li>
            <li>If confirmed lost/damaged, claim is processed by the competent authority.</li>
            <li>Amount sanctioned and paid by Money Order/NEFT.</li>
        </ol>
    </section>
</div>`,
            guru_explanation: `<div class="space-y-6">
    <p class="text-zinc-700 dark:text-zinc-300 leading-relaxed">
        Insurance is the financial safety net for valuable postal articles. The government has <strong>significantly enhanced the protection</strong> w.e.f. 1 April 2026 by raising the cap from ₹1 lakh to ₹5 lakh. Here's the complete picture:
    </p>

    <div class="overflow-hidden rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
        <table class="w-full text-sm text-left">
            <thead class="bg-indigo-50 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                <tr>
                    <th class="px-4 py-4 font-bold uppercase tracking-wider">Feature</th>
                    <th class="px-4 py-4 font-bold uppercase tracking-wider">Registration</th>
                    <th class="px-4 py-4 font-bold uppercase tracking-wider">Insurance</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr>
                    <td class="px-4 py-4 font-bold text-zinc-900 dark:text-white bg-zinc-50/50 dark:bg-zinc-800/30">Purpose</td>
                    <td class="px-4 py-4">Accountability & tracking</td>
                    <td class="px-4 py-4">Monetary protection</td>
                </tr>
                <tr>
                    <td class="px-4 py-4 font-bold text-zinc-900 dark:text-white bg-zinc-50/50 dark:bg-zinc-800/30">Delivery</td>
                    <td class="px-4 py-4">Against signature</td>
                    <td class="px-4 py-4">Against signature</td>
                </tr>
                <tr>
                    <td class="px-4 py-4 font-bold text-zinc-900 dark:text-white bg-zinc-50/50 dark:bg-zinc-800/30">Loss Compensation</td>
                    <td class="px-4 py-4">Up to ₹100 only</td>
                    <td class="px-4 py-4">Up to declared/insured value (<strong>max ₹5 lakh w.e.f. 1 Apr 2026</strong>)</td>
                </tr>
                <tr>
                    <td class="px-4 py-4 font-bold text-zinc-900 dark:text-white bg-zinc-50/50 dark:bg-zinc-800/30">Best Use Case</td>
                    <td class="px-4 py-4">Documents, legal notices</td>
                    <td class="px-4 py-4">Jewellery, electronics, currency</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-700">
        <h4 class="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-3">Why Was the Limit Raised to ₹5 Lakh?</h4>
        <p class="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
            The old ₹1 lakh limit was set under earlier regulations and had become inadequate given inflation and rising value of goods being mailed — especially electronics, jewellery, and legal instruments. The <strong>Post Office (Third Amendment) Regulations, 2026</strong> [S.O. 1595(E)] raised it <strong>5× to ₹5 lakh</strong>, making insured postal service a viable alternative to private courier insurance for high-value items.
        </p>
    </div>

    <div class="relative p-6 rounded-2xl bg-indigo-50/30 dark:bg-indigo-900/10 border border-indigo-100/50 dark:border-indigo-900/30 overflow-hidden">
        <div class="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
        <h4 class="font-bold text-zinc-900 dark:text-zinc-100 mb-2">The "Actual Value or Insured Value, Whichever is Lower" Rule</h4>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            This fundamental rule is unchanged by the amendment: If you insure a watch for ₹3,00,000 but it actually costs ₹2,00,000, and it's lost — you get only <strong>₹2,00,000</strong> (actual value). You cannot profit from insurance. Always insure for the <strong>full actual value</strong> (up to the ₹5 lakh cap).
        </p>
    </div>
    
    <div>
        <h4 class="font-bold text-zinc-900 dark:text-zinc-100 mb-2">When is Compensation NOT Paid?</h4>
        <ul class="list-disc list-outside ml-5 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Improper packing by sender (fragile goods in flimsy packaging)</li>
            <li>Inherent vice of the article (perishable goods spoiling)</li>
            <li>Force majeure — natural disasters, enemy action</li>
            <li>If the declared value at booking was lower than the claimed loss</li>
        </ul>
    </div>
</div>`,
            practical_example: `<div class="grid grid-cols-1 gap-6">
    <div class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 p-2">
            <span class="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold rounded uppercase tracking-wider">Example 1</span>
        </div>
        <h4 class="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
            Scenario 1 (New Limit)
        </h4>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            Arjun sends gold jewellery worth ₹4,50,000 as an insured article after 1 April 2026, declaring full value. The parcel is lost.
        </p>
        <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Correct Verdict:
            </p>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                Under the amended Regulation 133 (w.e.f. 1 April 2026), the maximum insurable value is ₹5 lakh. Arjun's declared value ₹4,50,000 is within the limit. <strong>Compensation = ₹4,50,000</strong> (subject to enquiry).
            </p>
        </div>
    </div>

    <div class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 p-2">
            <span class="px-2 py-1 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 text-[10px] font-bold rounded uppercase tracking-wider">Example 2</span>
        </div>
        <h4 class="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            Scenario 2 (Historical Change)
        </h4>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            The same jewellery (₹4,50,000) was sent <strong>before</strong> 1 April 2026 — the maximum insurable value was then ₹1 lakh.
        </p>
        <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                Correct Verdict:
            </p>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                Arjun could insure only up to ₹1,00,000. Even if he declared ₹4,50,000, the Post Office would only pay <strong>₹1,00,000</strong> (old cap). The ₹3,50,000 balance would have been an uninsured loss.
            </p>
        </div>
    </div>

    <div class="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm relative overflow-hidden">
        <div class="absolute top-0 right-0 p-2">
            <span class="px-2 py-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-[10px] font-bold rounded uppercase tracking-wider">Example 3</span>
        </div>
        <h4 class="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-red-500"></span>
            Scenario 3 (Under-insurance)
        </h4>
        <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
            Rita sends a laptop worth ₹80,000 but insures it for only ₹50,000 to save on the insurance fee. It's lost.
        </p>
        <div class="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <p class="text-sm font-bold text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                Correct Verdict:
            </p>
            <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed italic">
                Compensation = lower of actual (₹80,000) and insured (₹50,000) = <strong>₹50,000</strong>. She loses ₹30,000 due to under-insuring.
            </p>
        </div>
    </div>
</div>`,
            exam_insight: `<div class="space-y-6">
    <div class="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table class="w-full text-xs text-left">
            <thead class="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300">
                <tr>
                    <th class="px-4 py-4 font-bold uppercase tracking-wider">Parameter</th>
                    <th class="px-4 py-4 font-bold uppercase tracking-wider">Before 1 Apr 2026</th>
                    <th class="px-4 py-4 font-bold uppercase tracking-wider">From 1 Apr 2026</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                <tr>
                    <td class="px-4 py-4 font-semibold italic">Max insurable value</td>
                    <td class="px-4 py-4">₹1,00,000</td>
                    <td class="px-4 py-4 font-bold text-indigo-600 dark:text-indigo-400">₹5,00,000</td>
                </tr>
                <tr>
                    <td class="px-4 py-4 font-semibold italic">Governing provision</td>
                    <td class="px-4 py-4">Regulation 133(1)</td>
                    <td class="px-4 py-4 font-medium">Regulation 133(1) as amended</td>
                </tr>
                <tr>
                    <td class="px-4 py-4 font-semibold italic">Amendment notification</td>
                    <td class="px-4 py-4">—</td>
                    <td class="px-4 py-4 text-[10px] text-zinc-500">S.O. 1595(E), 25 March 2026</td>
                </tr>
            </tbody>
        </table>
    </div>

    <ul class="space-y-3">
        <li class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Registered article loss compensation: <strong>₹100 only</strong> (unchanged)
        </li>
        <li class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Compensation rule: <strong>lower of actual value or insured value</strong> (unchanged)
        </li>
        <li class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Amendment name: <strong>Post Office (Third Amendment) Regulations, 2026</strong>
        </li>
        <li class="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <span class="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
            Issued by: <strong>Vivek Kumar Daksh, Dy. DG</strong>, under section 13 of Post Office Act, 2023
        </li>
    </ul>

    <div class="mt-6 flex gap-4 p-5 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-2xl border border-indigo-500/20">
        <div class="shrink-0 text-2xl">💡</div>
        <div>
            <p class="text-sm font-bold text-indigo-700 dark:text-indigo-400 mb-1 leading-snug">Hot Exam MCQ (High Probability):</p>
            <p class="text-sm text-indigo-600/80 dark:text-indigo-300/80 leading-relaxed italic">
                "What is the maximum value up to which a domestic postal article can be insured with effect from 1st April, 2026?" — Answer: <strong>₹5,00,000 (₹5 lakh)</strong>.
            </p>
        </div>
    </div>
</div>`,
            status: "published",
            updatedAt: new Date()
        };

        const result = await collection.updateOne(
            { _id: targetId }, // Filter by ID for precision
            {
                $set: {
                    title: updatedData.title,
                    rule_number: updatedData.rule_number,
                    act_name: updatedData.act_name,
                    category: updatedData.category,
                    effective_date: updatedData.effective_date,
                    exam_tags: updatedData.exam_tags,
                    official_text: updatedData.official_text,
                    guru_explanation: updatedData.guru_explanation,
                    practical_example: updatedData.practical_example,
                    exam_insight: updatedData.exam_insight,
                    updatedAt: updatedData.updatedAt
                }
            }
        );

        if (result.matchedCount === 0) {
             // Fallback to title search if ID doesn't match for some reason
             console.log("⚠️ ID match failed, attempting update by title...");
             const resultTitle = await collection.updateOne(
                { title: "Insured Articles — Rules, Limits & Compensation Procedure" },
                { $set: updatedData }
             );
             if (resultTitle.matchedCount === 0) {
                console.error("❌ Entry not found in DB by ID or Title.");
             } else {
                console.log("✅ Successfully updated by Title.");
             }
        } else if (result.modifiedCount === 1) {
            console.log("✅ Successfully updated: Insured Articles entry by ID");
            console.log("   - New Insurance limit: ₹5 lakh");
            console.log("   - New Governing provision: Regulation 133");
        } else {
            console.log("ℹ️  Entry found by ID but no changes made (already matching).");
        }

    } catch (err) {
        console.error("❌ Update failed:", err);
    } finally {
        await client.close();
        process.exit();
    }
}

update();
