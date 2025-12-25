const https = require('https');

const options = {
    method: 'GET',
    hostname: 'current-affairs-of-india.p.rapidapi.com',
    port: null,
    path: '/today-quiz',
    headers: {
        'x-rapidapi-key': '1bc39bde08msh044dfa558b1e89fp10d0d8jsn64cd63789ee0',
        'x-rapidapi-host': 'current-affairs-of-india.p.rapidapi.com'
    }
};

const req = https.request(options, function (res) {
    const chunks = [];

    res.on('data', function (chunk) {
        chunks.push(chunk);
    });

    res.on('end', function () {
        const body = Buffer.concat(chunks);
        try {
            const json = JSON.parse(body.toString());
            console.log("Status Code:", res.statusCode);
            console.log("Response Type:", Array.isArray(json) ? "Array" : typeof json);
            if (Array.isArray(json) && json.length > 0) {
                console.log("First Item Keys:", Object.keys(json[0]));
                console.log("First Item:", JSON.stringify(json[0], null, 2));
            } else if (json.data && Array.isArray(json.data) && json.data.length > 0) {
                console.log("First Item Keys (in data):", Object.keys(json.data[0]));
                console.log("First Item (in data):", JSON.stringify(json.data[0], null, 2));
            } else {
                console.log("Response:", body.toString().substring(0, 500)); // Print first 500 chars
            }
        } catch (e) {
            console.log("Error parsing JSON:", e);
            console.log("Raw Body:", body.toString());
        }
    });
});

req.end();
