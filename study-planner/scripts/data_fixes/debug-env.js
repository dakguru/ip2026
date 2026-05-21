const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Manually load .env.local
const envPath = path.resolve(__dirname, '.env.local');
const result = dotenv.config({ path: envPath });

if (result.error) {
    console.error("Error loading .env.local:", result.error);
}

console.log("Checking Email Env Vars:");
console.log("File exists:", fs.existsSync(envPath));
console.log("EMAIL_USER:", process.env.EMAIL_USER ? "Present" : "MISSING");
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Present" : "MISSING");
console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
