import dbConnect from './src/lib/mongoose';
import DakSutra from './src/models/DakSutra';

// Map highlight span bg classes to inline styles
const spanFixMap: [RegExp, string][] = [
    [
        /class="bg-red-700 text-white px-1"/g,
        'style="background-color:#b91c1c; color:#ffffff; padding:2px 6px; border-radius:3px; font-weight:700;"'
    ],
    [
        /class="bg-amber-900 text-white px-1"/g,
        'style="background-color:#78350f; color:#ffffff; padding:2px 6px; border-radius:3px; font-weight:700;"'
    ],
    [
        /class="bg-amber-900 text-white px-1 font-bold"/g,
        'style="background-color:#78350f; color:#ffffff; padding:2px 6px; border-radius:3px; font-weight:700;"'
    ],
];

async function fix() {
    console.log("Connecting...");
    await dbConnect();

    const cards = await DakSutra.find({ act_name: "Manual for Procurement of Goods & Services" });
    console.log("Found " + cards.length + " cards");

    const fields = ['official_text', 'guru_explanation', 'practical_example', 'exam_insight'] as const;

    for (const card of cards) {
        const updates: Record<string, string> = {};
        for (const field of fields) {
            if (!card[field]) continue;
            let text = card[field] as string;
            let changed = false;
            for (const [pattern, replacement] of spanFixMap) {
                const newText = text.replace(pattern, replacement);
                if (newText !== text) {
                    text = newText;
                    changed = true;
                }
            }
            if (changed) updates[field] = text;
        }
        if (Object.keys(updates).length > 0) {
            await DakSutra.findByIdAndUpdate(card._id, { $set: updates });
            console.log("Fixed: " + card.title);
        } else {
            console.log("OK: " + card.title);
        }
    }

    console.log("Done!");
    process.exit(0);
}
fix().catch(e => { console.error(e); process.exit(1); });
