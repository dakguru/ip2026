
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const MockResultSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    userEmail: String,
    score: Number,
    totalQuestions: Number,
    testId: String,
    submittedAt: Date
});

const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

async function getUserIds() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const emails = [
            "rohan.desh101@gmail.com",
            "kumar.sharma99@gmail.com",
            "arjunmehra.vns@gmail.com",
            "ishaanmalhotra@gmail.com",
            "priyanka.nair88@gmail.com"
        ];

        for (const email of emails) {
            const result = await MockResult.findOne({ userEmail: email });
            if (result) {
                console.log(`Email: ${email} | userId: ${result.userId} | userName: ${result.userName}`);
            } else {
                console.log(`No MockResult for email: ${email}`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

getUserIds();
