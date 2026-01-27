
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

const sampleEntries = [
    {
        title: "GDS Leave Rules: Paid Leave",
        rule_number: "Rule 4",
        act_name: "GDS Conduct & Engagement Rules",
        category: "Rule",
        effective_date: new Date("2020-01-01"),
        exam_tags: ["GDS", "LDCE IP"],
        official_text: "Rule 4: Leave. (1) A Gramin Dak Sevak shall be entitled to such leave as may be determined by the Government from time to time.\n(2) Paid leave shall be granted to a Gramin Dak Sevak at the rate of 10 days for every half year of service.",
        guru_explanation: "For every 6 months you work as a GDS, you earn 10 days of paid leave. So in a full year, you get 20 days. You can accumulate up to 180 days in total. Remember: If you don't use them, you can carry them forward, but once you hit 180, you won't earn more until you use some!",
        practical_example: "If Ramesh joined as GDS on Jan 1st, 2024. By June 30th, 2024, he will have 10 days of paid leave credited to his account. If he takes 2 days leave in July, he will have 8 days remaining plus the next 10 days added on Dec 31st.",
        exam_insight: "Frequent question in LDCE IP: 'What is the maximum accumulation limit for GDS Paid Leave?' Answer: 180 days. Also, note that there is no provision for 'Half Pay Leave' for GDS.",
        status: "published",
        created_by: "system_admin",
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        title: "Section 4: Meaning of 'Post Office'",
        rule_number: "Section 4",
        act_name: "Post Office Act 2023",
        category: "Section",
        effective_date: new Date("2024-12-16"),
        exam_tags: ["LDCE IP", "PS Group B"],
        official_text: "Section 4. The Central Government may, by notification, provide for the delivery of any service through the Post Office as it may deem fit. The 'Post Office' means the Department of Posts and includes any entity or person authorized by the Central Government to provide service through its network.",
        guru_explanation: "This is a major change in the 2023 Act. The definition of Post Office is now much broader! It's no longer just a physical building but can be any 'entity or person' authorized by the Ministry. This opens the door for private partnerships and digital-only post offices.",
        practical_example: "Imagine a CSC (Common Service Center) in a village being authorized to accept speed post parcels. Under Section 4, that CSC effectively becomes a 'Post Office' for that service.",
        exam_insight: "Watch out for the date! The Post Office Act 2023 came into force on 16th Dec 2024. This is a highly probable MCQ for all upcoming postal exams.",
        status: "published",
        created_by: "system_admin",
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

async function seed() {
    const client = new MongoClient(MONGODB_URI);
    try {
        await client.connect();
        console.log("✓ Connected to MongoDB");
        const db = client.db(); // Uses DB name from URI
        const collection = db.collection('daksutras'); // Mongoose pluralizes to daksutras

        console.log("Cleaning up existing entries...");
        // await collection.deleteMany({}); 

        console.log("Inserting sample entries...");
        const result = await collection.insertMany(sampleEntries);
        console.log(`✓ Seeded ${result.insertedCount} entries.`);

    } catch (error) {
        console.error("❌ Seed failed:", error);
    } finally {
        await client.close();
        process.exit();
    }
}

seed();
