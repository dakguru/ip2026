const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });
async function run() {
    const c = new MongoClient(process.env.MONGODB_URI);
    await c.connect();
    const res = await c.db().collection('daksutras').deleteMany({
        title: { $in: ['SB Orders 2023-2025: New Schemes, Enhanced Limits & Revised TDS', 'Digital Transformation in POSB: e-KYC, e-Passbook & Interoperability'] }
    });
    console.log('Deleted ' + res.deletedCount + ' old cards.');
    await c.close();
}
run();
