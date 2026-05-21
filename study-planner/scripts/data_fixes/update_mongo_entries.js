const mongoose = require('mongoose');
const fs = require('fs');

async function main() {
  const MONGODB_URI = "mongodb://127.0.0.1:27017/studydb"; // From .env.local
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
  }, { collection: 'dak_sutra' });

  const DakSutra = mongoose.models.DakSutra || mongoose.model('DakSutra', DakSutraSchema);

  // Read the corrected ultra memory guide HTML
  const ultraGuideHtml = fs.readFileSync('D:\\IP 2026\\study-planner\\gfr_ultra_memory_guide_corrected.html', 'utf8');

  // Update 1: Ultra Memory Guide
  await DakSutra.updateOne(
    { _id: '6a0c93ecc4d0af046a6ac1dc' },
    { 
      $set: { 
        official_text: ultraGuideHtml,
        rule_number: 'Chapter 2 (Rules 18–41) & Chapter 6 (Rules 143–206)' 
      }
    }
  );
  console.log("Updated 6a0c93ecc4d0af046a6ac1dc (Ultra Memory Guide)");

  // Update 2: Procurement of Goods
  // 6a0c909030e0d20dcdd418e6
  // It has rules 142 to 176. The text has wrong numbers like "Rule 149 - Limited Tender Enquiry"
  const entry2 = await DakSutra.findById('6a0c909030e0d20dcdd418e6');
  if (entry2) {
    let text = entry2.official_text;
    text = text.replace(/Rule 147.*?(?=<div|<p|<span)/gs, match => match.replace('147', '154')); // Purchase without quotation
    text = text.replace(/Rule 148.*?(?=<div|<p|<span)/gs, match => match.replace('148', '155')); // LPC
    text = text.replace(/Rule 149.*?(?=<div|<p|<span)/gs, match => match.replace('149', '162')); // LTE
    text = text.replace(/Rule 150.*?(?=<div|<p|<span)/gs, match => match.replace('150', '161')); // ATE
    // Actually, string replacement is very risky because of cascading numbers. Let's just do targeted replace for the specific wrong ones, or rewrite it.
    // Instead, I'll use a safer approach: I will fetch the entries, update the text manually in a file, and then upload them.
    console.log("Entry 2 needs careful update.");
  }
  
  await mongoose.disconnect();
}

main().catch(console.error);
