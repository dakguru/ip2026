const fs = require('fs');

const data = JSON.parse(fs.readFileSync('formatted-psgb.json', 'utf8'));

const mapped = {
    paper1: {
        title: "Paper I: General Awareness and General Knowledge",
        subtitle: "150 Questions • 300 Marks • 3 Hours",
        description: "",
        sections: []
    },
    paper2: {
        title: "Paper II: Rules and Regulations",
        subtitle: "150 Questions • 300 Marks • 3 Hours",
        description: "",
        sections: []
    }
};

const p1 = data.filter(i => i['Paper I/II'] === 'Paper I');
const grp1 = p1.reduce((acc, curr) => {
    if (!acc[curr.Category]) acc[curr.Category] = [];
    acc[curr.Category].push({ name: curr['Name of the topic'], link: null });
    return acc;
}, {});
Object.entries(grp1).forEach(([cat, items]) => {
    mapped.paper1.sections.push({ category: cat, items });
});

const p2 = data.filter(i => i['Paper I/II'] === 'Paper II');
const grp2 = p2.reduce((acc, curr) => {
    if (!acc[curr.Category]) acc[curr.Category] = [];
    acc[curr.Category].push({ name: curr['Name of the topic'], link: null });
    return acc;
}, {});
Object.entries(grp2).forEach(([cat, items]) => {
    mapped.paper2.sections.push({ category: cat, items });
});

fs.writeFileSync('processed-psgb-syllabus.json', JSON.stringify(mapped, null, 2));
