const mongoose = require('mongoose');
const fs = require('fs');

async function main() {
  const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to DB.");

  const DakSutraSchema = new mongoose.Schema({
    act_name: String,
    title: String,
    rule_number: String,
    official_text: String,
    guru_explanation: String,
    practical_example: String,
    exam_insight: String,
    order: Number,
    is_active: Boolean,
  }, { collection: 'daksutras' }); // Check collection name: it could be daksutras or dak_sutra

  // Let's use the mongoose model dynamically, or just raw mongo update
  const db = mongoose.connection.db;
  // Let's find the correct collection
  const cols = await db.listCollections().toArray();
  const dakSutraColName = cols.find(c => c.name.toLowerCase().includes('daksutra')).name;
  console.log("Found collection:", dakSutraColName);
  
  const col = db.collection(dakSutraColName);

  // Read the corrected ultra memory guide HTML
  const ultraGuideHtml = fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_ultra_memory_guide_corrected.html', 'utf8');

  // Update 1: Ultra Memory Guide
  const { ObjectId } = require('mongodb');
  const res = await col.updateOne(
    { _id: new ObjectId('6a0c93ecc4d0af046a6ac1dc') },
    { 
      $set: { 
        official_text: ultraGuideHtml,
        rule_number: 'Chapter 2 (Rules 18–41) & Chapter 6 (Rules 143–206)' 
      }
    }
  );
  console.log(`Updated 6a0c93ecc4d0af046a6ac1dc (Ultra Memory Guide): Modified count ${res.modifiedCount}`);

  await mongoose.disconnect();
}

main().catch(console.error);
