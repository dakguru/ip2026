import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dbConnect from './src/lib/mongoose';
import DakSutra from './src/models/DakSutra';

const DIR = path.join(process.cwd(), 'seed-dh-financial');

async function seed() {
    console.log("Connecting to DB...");
    await dbConnect();

    const official_text = fs.readFileSync(path.join(DIR, 'official_text.html'), 'utf-8');
    const guru_explanation = fs.readFileSync(path.join(DIR, 'guru_explanation.html'), 'utf-8');
    const practical_example = fs.readFileSync(path.join(DIR, 'practical_example.html'), 'utf-8');
    const exam_insight = fs.readFileSync(path.join(DIR, 'exam_insight.html'), 'utf-8');

    const entry = {
        title: "Divisional Head Financial Powers (Part 1): Establishment, Office Expenses & Rent",
        slug: "dh-fp-part1",
        rule_number: "Schedule III, Sl. No. 1–9",
        act_name: "DFPR 2024",
        category: "Rule",
        effective_date: new Date('2025-04-01'),
        exam_tags: ["LDCE IP", "PS Group B"],
        status: "published",
        created_by: "system-seed@dakguru.com",
        official_text,
        guru_explanation,
        practical_example,
        exam_insight,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    console.log("Seeding Divisional Head Financial Powers (Part 1)...");
    await DakSutra.deleteMany({ title: entry.title });
    // Use collection.insertOne to bypass the pre-save hook issue
    await DakSutra.collection.insertOne(entry);

    console.log("✅ Seed completed! Divisional Head Financial Powers Part 1 is now live.");
    process.exit(0);
}

seed().catch(err => {
    console.error(err);
    process.exit(1);
});
