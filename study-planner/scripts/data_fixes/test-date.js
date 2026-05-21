
const { parseISO, format } = require('date-fns');

const dateStr = "23-02-2026";
try {
    const date = parseISO(dateStr);
    console.log(`Parsed: ${date}`);
    console.log(`Formatted: ${format(date, 'yyyy-MM-dd')}`);
} catch (e) {
    console.error(e);
}
