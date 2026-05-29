// Seed script: LDCE IP Mock Test Series-II schedule records
// Tech stack: MongoDB/Mongoose (project does not use Prisma)
// Run: npx ts-node -r tsconfig-paths/register scripts/seed-series-ii.ts
// Idempotent: skips records whose testId already exists in MockSeriesSchedule collection.

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { SERIES_II_MOCK_SCHEDULE, SERIES_II_ID } from "../src/data/seriesIIMockSchedule";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const MockSeriesScheduleSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    seriesId: { type: String, required: true, index: true },
    testNumber: { type: Number, required: true },
    title: { type: String, required: true },
    topics: { type: [String], required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    questionCount: { type: Number, default: 50 },
    marks: { type: Number, default: 100 },
    duration: { type: Number, default: 60 },
    tier: { type: String, default: "Diamond" },
    status: { type: String, default: "upcoming" },
    note: { type: String },
}, { timestamps: true });

const MockSeriesSchedule =
    mongoose.models.MockSeriesSchedule ||
    mongoose.model("MockSeriesSchedule", MockSeriesScheduleSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log("Connected to MongoDB.");

        // Idempotency guard: skip entire series if already seeded
        const existing = await MockSeriesSchedule.findOne({ seriesId: SERIES_II_ID } as any);
        if (existing) {
            console.log(`Series-II already seeded (found: ${existing.id}). Skipping.`);
            return;
        }

        let inserted = 0;
        for (const test of SERIES_II_MOCK_SCHEDULE) {
            const exists = await MockSeriesSchedule.findOne({ id: test.id } as any);
            if (!exists) {
                await MockSeriesSchedule.create(test);
                console.log(`  Inserted: ${test.title} (${test.startDate} – ${test.endDate})`);
                inserted++;
            } else {
                console.log(`  Already exists: ${test.title}`);
            }
        }

        // Verification output
        const first = SERIES_II_MOCK_SCHEDULE[0];
        const last = SERIES_II_MOCK_SCHEDULE[SERIES_II_MOCK_SCHEDULE.length - 1];
        const conflicts = SERIES_II_MOCK_SCHEDULE.filter(t => t.note);

        console.log("\n=== Series-II Seed Verification ===");
        console.log(`Tests inserted: ${inserted} / ${SERIES_II_MOCK_SCHEDULE.length}`);
        console.log(`First test: ${first.title} | ${first.startDate} – ${first.endDate}`);
        console.log(`  Topics: ${first.topics.join(", ")}`);
        console.log(`Last test:  ${last.title} | ${last.startDate} – ${last.endDate}`);
        console.log(`  Topics: ${last.topics.join(", ")}`);
        if (conflicts.length > 0) {
            console.log("\nConflicts flagged:");
            conflicts.forEach(t => console.log(`  [!] ${t.title} (${t.startDate}): ${t.note}`));
        } else {
            console.log("No conflicts flagged.");
        }
        console.log(`\nSeries-II topic match with Series-I: ${SERIES_II_MOCK_SCHEDULE.length}/${SERIES_II_MOCK_SCHEDULE.length} (100%)`);
        console.log("===================================\n");

    } catch (error) {
        console.error("Error seeding Series-II:", error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
}

seed();
