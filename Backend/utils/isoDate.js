
// Get a date in string format and convert it to ISO Format
function toISODate(dateString) {
    const date = new Date(dateString);
    return date.toISOString();
}

module.exports = toISODate
