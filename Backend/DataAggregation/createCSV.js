const fs = require('fs');
const path = require('path');

/**
 * 
 * @param {*} data: The data to be populated in the csv. 
 * @param {*} headers: The names of the csv headers. 
 * @param {*} filename: Name to be given to the file. This gets appended with the currrent time to keep record and ordering.
 * @param {*} info: Info holds some other information that does not correspond to the provided feilds array.
 *  
 */
function createCSV(data, headers, filename, info) {
    console.log("Here in the function to create a csv!!")
    try {

        const csvRows = [];

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
        const csv = csvRows.join('\n');


        // Check if the directory exists, else create to store the files.
        // const directory = path.join(__dirname, 'Reports');
        // if (!fs.existsSync(directory)) {
        //     fs.mkdirSync(directory);
        //     console.log('Created the directory');
        // }

        const directory = 'C:/Users/ahsan/downloads/'

        console.log("Created the csv array!!")

        // console.log("the directory does exist!")

        const filePath = path.join(directory, `${filename}.csv`);
        fs.writeFileSync(filePath, csv);

        console.log('File saved:', filePath);
        return filePath;

    } catch (err) {
        console.log(err.message)
        return null
    }
}

module.exports = createCSV
