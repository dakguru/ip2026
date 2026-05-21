const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('D:\\IP 2026\\study-planner\\public\\notes\\paper-1\\Consolidation_Products_Centralized_Delivery_Policy.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('D:\\IP 2026\\consolidation.txt', data.text);
    console.log("Extracted successfully!");
}).catch(err => {
    console.error("Error:", err);
});
