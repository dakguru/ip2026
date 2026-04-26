
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const MockResultSchema = new mongoose.Schema({
    userName: String,
    userEmail: String,
    score: Number,
    totalQuestions: Number,
    testId: String,
    submittedAt: Date
});

const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

async function checkResults() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const names = [
            "Deshmukh Rohan",
            "Kumar Srivastava",
            "Arjun M",
            "Ishaan",
            "Priyanka Nair"
        ];

        for (const name of names) {
            console.log(`Searching for all results of: ${name}`);
            const results = await MockResult.find({
                userName: { $regex: name, $options: 'i' }
            }).limit(5);
            
            if (results.length > 0) {
                results.forEach(r => console.log(`Found: ${r.userName} | ${r.userEmail} | ${r.testId}`));
            } else {
                console.log(`No result found for: ${name}`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

checkResults();
