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
        console.log("Created the csv array!!")


        // Check if the directory exists, else create to store the files.
        const directory = path.join(__dirname, 'Reports');
        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
            console.log('Created the directory');
        }

        console.log(directory)

        // console.log("the directory does exist!")

        // The cheating that we are doing here is that we are manually sending the hardcoded filepath back.. 
        // Lets save the file in a reports directory and send back only the filename.
        // maybe, we dont even need to send back the filename, just confirm that it has been saved.

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
