
const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('D:\\IP 2026\\Dak Sutra Source\\SB_Order_2019-25_English-07032026.pdf');

pdf(dataBuffer).then(function(data) {
    fs.writeFileSync('D:\\IP 2026\\study-planner\\scratch\\sb_orders_text.txt', data.text);
    console.log('PDF extracted successfully to sb_orders_text.txt');
}).catch(err => {
    console.error('Error reading PDF:', err);
});
