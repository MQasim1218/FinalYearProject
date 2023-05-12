const fs = require('fs');

/**
 * 
 * @param {*} data: The data to be populated in the csv. 
 * @param {*} headers: The names of the csv headers. 
 * @param {*} filename: Name to be given to the file. This gets appended with the currrent time to keep record and ordering.
 * @returns 
 */
function createCSV_fromData(data, headers, filename) {
    try {
        const csvRows = [];
        csvRows.push(headers.join(',')); // add header row

        for (let i = 0; i < data.length; i++) {
            const row = [];
            for (let j = 0; j < headers.length; j++) {
                const field = headers[j];
                row.push(data[i][field]);
            }
            csvRows.push(row.join(','));
        }


        let exists = fs.existsSync("AuditFiles")
        if (!exists) // Create a new directroy if not exists
            fs.mkdir('AuditFiles', err => {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log("Created")
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
    } catch (error) {
        return err.message
    }

}

module.exports = createCSV_fromData
