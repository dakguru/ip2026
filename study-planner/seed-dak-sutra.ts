
import mongoose from 'mongoose';
import dbConnect from './src/lib/mongoose';
import DakSutra from './src/models/DakSutra';

async function seed() {
    console.log("Connecting to DB...");
    await dbConnect();

    const sample = {
        title: "Leave Rules for GDS (Rule 4)",
        rule_number: "Rule 4",
        act_name: "GDS Conduct & Engagement Rules",
        category: "Rule",
        effective_date: new Date('2024-01-01'),
        exam_tags: ["LDCE IP", "GDS"],
        official_text: "The Gramin Dak Sevaks shall be entitled to such leave as may be determined by the Government from time to time...",
        guru_explanation: "For GDS, leave is not an absolute right. There are specifically 20 days of paid leave (10 for each half year) which are credited in advance.",
        document_url: "https://dakguru.com/docs/gds-rules.pdf",
        status: "published",
        created_by: "system-seed@dakguru.com"
    };

    console.log("Seeding Dak Sutra...");
    await DakSutra.deleteMany({ title: "Leave Rules for GDS (Rule 4)" });
    await DakSutra.create(sample);

    console.log("Seed completed!");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
