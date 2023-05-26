const xlsx = require('xlsx');
const fs = require('fs');
const getFilename = require('./utils/getFilename');


// NOTE: MA💖 MA💖 this function is finalized, takes custom sheet names too now. MA
function CreateMultisheetExcelFile(data, fields, filename, sheetnames) {

    // REVIEW: Scrutinizing the nature of the data to be passed.
    // NOTE: DONE scrutinizing, done finalizing

    // First we need to create a notebook.
    const workbook = xlsx.utils.book_new();

    console.log(data.length)


    // Loop for the length of data recieved!
    for (let ind = 0; ind < data.length; ind++) {

        // Get single object from the data recieved!
        const objsGroup = data[ind];
        console.log("The objsGroup received is: ", objsGroup)


        // * Assuming this code takes each entry and converts it to an array of object values.
        let valuesArrays = objsGroup.data.map((elem) => Object.values(elem))

        // console.log("Values Array is: ", valuesArrays)
        let id = objsGroup._id
        const worksheet = xlsx.utils.aoa_to_sheet([
            fields,
            // ! We need arrays of values, not objects
            ...valuesArrays // Spread all the values here!!
        ])

        // console.log(worksheet)
        xlsx.utils.book_append_sheet(workbook, worksheet, sheetnames[ind])
    }

    // Generate the Excel file binary data
    const excelData = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Create a buffer from the binary data
    const buffer = Buffer.from(excelData);

    // Get the name for the file!!
    let fn = getFilename(filename)

    // Save the buffer to the output file
    fs.writeFileSync(`C:/Users/ahsan/downloads/${fn}.xlsx`, buffer);
}



module.exports = CreateMultisheetExcelFile



