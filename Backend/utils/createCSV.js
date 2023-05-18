const fs = require('fs');

/**
 * 
 * @param {*} data: The data to be populated in the csv. 
 * @param {*} headers: The names of the csv headers. 
 * @param {*} filename: Name to be given to the file. This gets appended with the currrent time to keep record and ordering.
 * @returns string filepath 
 */
function createCSV_fromData(data, headers, filename) {
    console.log("Here in the function to create a csv!!")
    try {

        const csvRows = [];
        let filepath = ""

        // Create the top headers for the csv
        csvRows.push(headers.join(',')); // add header row

        // Create && Append comma seperarted data rows to the csv array 
        for (let i = 0; i < data.length; i++) {
            const row = [];
            for (let j = 0; j < headers.length; j++) {
                const field = headers[j];
                row.push(data[i][field]);
            }
            csvRows.push(row.join(','));
        }

        // Check if the directory exists, else create to store the files.
        let exists = fs.existsSync("../Reports/Finalcial_reports")
        if (!exists) // Create a new directroy if not exists
            fs.mkdir('../Reports/Finalcial_reports', err => {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log("Created The Directory")
                }
            })

        const csv = csvRows.join('\n');

        fs.writeFile('AuditFiles/data2.csv', csv, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('File saved');
            }
        });

        return filepath

    } catch (error) {
        console.log(err.message)
        return null
    }
}

module.exports = createCSV_fromData
