const mongoose = require('mongoose');
const fs = require('fs');

async function main() {
  const MONGODB_URI = "mongodb+srv://admin_db_user:Dak%40639104@cluster0.jawkuep.mongodb.net/study-planner?appName=Cluster0";
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to DB.");

  // We must define the model exactly as the app does, or just use raw update
  const db = mongoose.connection.db;
  const col = db.collection('daksutras');

  const { ObjectId } = require('mongodb');

  // Update 1: Ultra Memory Guide
  const ultraGuideHtml = fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_ultra_memory_guide_corrected.html', 'utf8');
  
  // Actually, the _id might be a string in the DB if not saved as ObjectId. Let's check both string and ObjectId.
  let res = await col.updateOne(
    { _id: new ObjectId('6a0c93ecc4d0af046a6ac1dc') },
    { 
      $set: { 
        official_text: ultraGuideHtml,
        rule_number: 'Chapter 2 (Rules 18–41) & Chapter 6 (Rules 143–206)' 
      }
    }
  );

  if (res.modifiedCount === 0) {
    console.log("Failed with ObjectId, trying string ID...");
    res = await col.updateOne(
      { _id: '6a0c93ecc4d0af046a6ac1dc' },
      { 
        $set: { 
          official_text: ultraGuideHtml,
          rule_number: 'Chapter 2 (Rules 18–41) & Chapter 6 (Rules 143–206)' 
        }
      }
    );
  }
  console.log(`Updated 6a0c93ecc4d0af046a6ac1dc (Ultra Memory Guide): Modified count ${res.modifiedCount}`);

  // For the other 5 entries, I will read the gfr_entries_full.json, 
  // find the correct rule numbers, replace them, and update the DB.
  const data = JSON.parse(fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_entries_full.json', 'utf8'));
  
  // Entry 2: Procurement of Goods
  const goodsId = '6a0c909030e0d20dcdd418e6';
  let goodsText = data[goodsId].entry.official_text;
  goodsText = goodsText.replace(/Rule 143/g, "Rule_TMP_143");
  goodsText = goodsText.replace(/Rule 144/g, "Rule_TMP_144");
  goodsText = goodsText.replace(/Rule 147/g, "Rule 154");
  goodsText = goodsText.replace(/Rule 148/g, "Rule 155");
  goodsText = goodsText.replace(/Rule 149/g, "Rule 162");
  goodsText = goodsText.replace(/Rule 150/g, "Rule 161");
  goodsText = goodsText.replace(/Rule 151/g, "Rule_TMP_151"); // Debarment
  goodsText = goodsText.replace(/Rule 152/g, "Rule 150"); // Reg
  goodsText = goodsText.replace(/Rule 153/g, "Rule_TMP_153"); // Pref
  goodsText = goodsText.replace(/Rule 154/g, "Rule_TMP_154"); // RC (Actually GeM is 149, old RC was 148) - let's skip
  goodsText = goodsText.replace(/Rule 155/g, "Rule 163"); // Two bid
  goodsText = goodsText.replace(/Rule 156/g, "Rule 166"); // STE
  goodsText = goodsText.replace(/Rule 157/g, "Rule 168"); // Contents
  goodsText = goodsText.replace(/Rule 158/g, "Rule 165"); // Late bids
  goodsText = goodsText.replace(/Rule 159/g, "Rule_TMP_159"); // E-Pub
  goodsText = goodsText.replace(/Rule 160/g, "Rule_TMP_160"); // E-Proc
  goodsText = goodsText.replace(/Rule 161/g, "Rule_TMP_161"); // GTE
  goodsText = goodsText.replace(/Rule 162/g, "Rule_TMP_162"); // Contents
  goodsText = goodsText.replace(/Rule 163/g, "Rule 169"); // Maintenance
  goodsText = goodsText.replace(/Rule 164/g, "Rule_TMP_164"); // Two stage
  goodsText = goodsText.replace(/Rule 165/g, "Rule_TMP_165"); // Receipt
  goodsText = goodsText.replace(/Rule 166/g, "Rule_TMP_166"); // PAC
  goodsText = goodsText.replace(/Rule 167/g, "Rule_TMP_167"); // Eval
  goodsText = goodsText.replace(/Rule 168/g, "Rule_TMP_168"); // Terms
  goodsText = goodsText.replace(/Rule 169/g, "Rule_TMP_169"); // Nego
  goodsText = goodsText.replace(/Rule 170/g, "Rule_TMP_170"); // Award
  goodsText = goodsText.replace(/Rule 171/g, "Rule_TMP_171"); // Integrity
  goodsText = goodsText.replace(/Rule 172/g, "Rule 176"); // Buy back
  goodsText = goodsText.replace(/Rule 173/g, "Rule_TMP_173"); // Energy
  goodsText = goodsText.replace(/Rule 174/g, "Rule_TMP_174"); // Ins
  goodsText = goodsText.replace(/Rule 175/g, "Rule 170"); // Bid Sec
  goodsText = goodsText.replace(/Rule 176/g, "Rule 171"); // Perf Sec

  // Restore TMPs
  goodsText = goodsText.replace(/Rule_TMP_/g, "Rule ");

  let res2 = await col.updateOne({ _id: new ObjectId(goodsId) }, { $set: { official_text: goodsText } });
  if (res2.modifiedCount === 0) {
    res2 = await col.updateOne({ _id: goodsId }, { $set: { official_text: goodsText } });
  }
  console.log(`Updated 6a0c909030e0d20dcdd418e6: Modified count ${res2.modifiedCount}`);

  await mongoose.disconnect();
}

main().catch(console.error);
