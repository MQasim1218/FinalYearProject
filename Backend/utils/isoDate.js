
// Get a date in string format and convert it to ISO Format
function toISODate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toISOString();
    } catch (error) {
        return null
    }

}

module.exports = toISODate
