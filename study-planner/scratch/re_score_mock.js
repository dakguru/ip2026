
const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";

const MockResultSchema = new mongoose.Schema({
    userEmail: String,
    score: Number,
    answers: { type: Map, of: Number },
    testId: String
});

const MockResult = mongoose.models.MockResult || mongoose.model('MockResult', MockResultSchema);

const CORRECT_ANSWERS = {
    "psgb-04-q1": 2,
    "psgb-04-q2": 3,
    "psgb-04-q3": 3,
    "psgb-04-q4": 2,
    "psgb-04-q5": 1,
    "psgb-04-q6": 1,
    "psgb-04-q7": 0,
    "psgb-04-q8": 1,
    "psgb-04-q9": 3,
    "psgb-04-q10": 1,
    "psgb-04-q11": 3,
    "psgb-04-q12": 0,
    "psgb-04-q13": 1,
    "psgb-04-q14": 3,
    "psgb-04-q15": 1,
    "psgb-04-q16": 3,
    "psgb-04-q17": 1,
    "psgb-04-q18": 0,
    "psgb-04-q19": 3,
    "psgb-04-q20": 0,
    "psgb-04-q21": 2,
    "psgb-04-q22": 1,
    "psgb-04-q23": 0,
    "psgb-04-q24": 2,
    "psgb-04-q25": 1,
    "psgb-04-q26": 1,
    "psgb-04-q27": 1,
    "psgb-04-q28": 3,
    "psgb-04-q29": 3,
    "psgb-04-q30": 2,
    "psgb-04-q31": 2,
    "psgb-04-q32": 2,
    "psgb-04-q33": 2,
    "psgb-04-q34": 2,
    "psgb-04-q35": 3,
    "psgb-04-q36": 1,
    "psgb-04-q37": 3,
    "psgb-04-q38": 2,
    "psgb-04-q39": 3,
    "psgb-04-q40": 1,
    "psgb-04-q41": 1,
    "psgb-04-q42": 0,
    "psgb-04-q43": 2,
    "psgb-04-q44": 2,
    "psgb-04-q45": 1,
    "psgb-04-q46": 1,
    "psgb-04-q47": 1,
    "psgb-04-q48": 1,
    "psgb-04-q49": 1,
    "psgb-04-q50": 0
};

async function reScore() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB");

        const testId = "psgb-mock-2026-04-26";
        const results = await MockResult.find({ testId });

        for (const res of results) {
            if (!res.answers || res.answers.size === 0) continue;

            let correctCount = 0;
            const answersObj = res.answers instanceof Map ? Object.fromEntries(res.answers) : res.answers;
            
            for (const qId in answersObj) {
                if (CORRECT_ANSWERS[qId] === answersObj[qId]) {
                    correctCount++;
                }
            }

            const newScore = correctCount * 2;
            console.log(`Email: ${res.userEmail} | Current: ${res.score} | Calculated: ${newScore}`);
            
            if (newScore !== res.score) {
                console.log(`   -> Updating score to ${newScore}`);
                await MockResult.updateOne({ _id: res._id }, { score: newScore });
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

reScore();
