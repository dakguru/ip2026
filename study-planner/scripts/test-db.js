
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env.local') });

const uri = process.env.MONGODB_URI;

async function testConnection() {
    if (!uri) {
        console.error("MONGODB_URI is not set");
        process.exit(1);
    }
    console.log("Connecting to:", uri.replace(/\/\/.*@/, "//***:***@"));
    try {
        await mongoose.connect(uri);
        console.log("Connected successfully to MongoDB!");
        process.exit(0);
    } catch (err) {
        console.error("Connection failed:", err);
        process.exit(1);
    }
}

testConnection();
