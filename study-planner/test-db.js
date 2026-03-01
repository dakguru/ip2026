
const mongoose = require('mongoose');
const uri = "mongodb+srv://admin_db_user:fnu7IX85OAV5EFpk@cluster0.jawkuep.mongodb.net/?appName=Cluster0";

async function run() {
    try {
        console.log("Connecting...");
        await mongoose.connect(uri);
        console.log("Connected successfully!");
        await mongoose.disconnect();
    } catch (err) {
        console.error("Connection failed:", err);
    }
}

run();
