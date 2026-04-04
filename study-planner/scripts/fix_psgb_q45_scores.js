const { MongoClient } = require('mongodb');

// Configuration
const uri = 'mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0';
const testId = 'psgb-mock-2026-04-05';
const questionId = 'psgb-01-q45';
const OLD_CORRECT = 0; // 'A'
const NEW_CORRECT = 3; // 'D'
const MARKS_PER_Q = 2;

const DRY_RUN = process.argv.includes('--live') ? false : true;

async function run() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('study-planner');
        const mockResults = db.collection('mockresults');

        console.log(`--- Score Migration for ${testId} ---`);
        console.log(`Question: ${questionId}`);
        console.log(`Mode: ${DRY_RUN ? 'DRY RUN (No changes saved)' : 'LIVE (Changes will be saved)'}`);
        console.log('-----------------------------------');

        const results = await mockResults.find({ testId: testId }).toArray();
        console.log(`Found ${results.length} results to check.`);

        let updatedCount = 0;
        let gainedCount = 0;
        let lostCount = 0;

        for (const result of results) {
            // answers is a Map in Mongoose, but in MongoDB it's a plain object or Map depending on how it was saved.
            // Based on MockResult.ts: answers: { type: Map, of: Number }
            // In MongoDB, this usually maps to an object if keys are strings.
            
            const userAnswers = result.answers || {};
            const userChoice = userAnswers instanceof Map ? userAnswers.get(questionId) : userAnswers[questionId];

            if (userChoice === undefined) {
                console.log(`User ${result.userName} (${result.userEmail}) did not answer this question.`);
                continue;
            }

            let scoreAdjustment = 0;
            let reason = '';

            if (userChoice === NEW_CORRECT) {
                scoreAdjustment = MARKS_PER_Q;
                reason = `Chose new correct answer (D). Gained ${MARKS_PER_Q} marks.`;
                gainedCount++;
            } else if (userChoice === OLD_CORRECT) {
                scoreAdjustment = -MARKS_PER_Q;
                reason = `Chose old correct answer (A). Lost ${MARKS_PER_Q} marks.`;
                lostCount++;
            }

            if (scoreAdjustment !== 0) {
                const oldScore = result.score;
                const newScore = oldScore + scoreAdjustment;
                
                console.log(`Updating ${result.userName}: ${oldScore} -> ${newScore} (${reason})`);
                
                if (!DRY_RUN) {
                    await mockResults.updateOne(
                        { _id: result._id },
                        { $set: { score: newScore } }
                    );
                }
                updatedCount++;
            }
        }

        console.log('-----------------------------------');
        console.log(`Summary:`);
        console.log(`Total Checked: ${results.length}`);
        console.log(`Users Gained Marks: ${gainedCount}`);
        console.log(`Users Lost Marks: ${lostCount}`);
        console.log(`Total Updated: ${updatedCount}`);
        
        if (DRY_RUN && updatedCount > 0) {
            console.log('\nRun with --live flag to apply changes.');
        } else if (!DRY_RUN) {
            console.log('\nChanges applied successfully.');
        }

    } finally {
        await client.close();
    }
}

run().catch(console.dir);
