const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// NOTE: MA💖 MA💖 this function is finalized, takes custom sheet names too now. MA
// function CreateMultisheetExcelFile(data, fields, filename, sheetnames) {

//     // REVIEW: Scrutinizing the nature of the data to be passed.
//     // NOTE: DONE scrutinizing, done finalizing

//     // First we need to create a notebook.
//     const workbook = xlsx.utils.book_new();

//     console.log("data length: ", data.length)


//     // Loop for the length of data recieved!
//     for (let ind = 0; ind < data.length; ind++) {

//         // Get single object from the data recieved!
//         const objsGroup = data[ind];
//         console.log("The objsGroup received is: ", objsGroup)


//         // * Assuming this code takes each entry and converts it to an array of object values.
//         let valuesArrays = objsGroup.data.map((elem) => Object.values(elem))

//         // console.log("Values Array is: ", valuesArrays)
//         let id = objsGroup._id
//         const worksheet = xlsx.utils.aoa_to_sheet([
//             fields,
//             // ! We need arrays of values, not objects
//             ...valuesArrays // Spread all the values here!!
//         ])

//         // console.log(worksheet)
//         xlsx.utils.book_append_sheet(workbook, worksheet, sheetnames[ind])
//     }

//     // Generate the Excel file binary data
//     const excelData = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

//     // Create a buffer from the binary data
//     const buffer = Buffer.from(excelData);


//     console.log("\n\nDone till here!")
//     // Check if the directory exists, else create to store the files.


//     // Save the buffer to the output file



//     const directory = path.join(__dirname, 'Reports');
//     const filePath = path.join(directory, `${filename}.xlsx`);
//     fs.writeFileSync(filePath, buffer);

//     console.log("The file has been written!!", filePath)
//     // Ruturning the actual filepath!?
//     return filePath
// }


function CreateMultisheetExcelFile(data, fields, filename, sheetnames) {
    const workbook = xlsx.utils.book_new();

    for (let ind = 0; ind < data.length; ind++) {
        const objsGroup = data[ind];
        let valuesArrays = objsGroup.data.map((elem) => Object.values(elem));
        const worksheet = xlsx.utils.aoa_to_sheet([fields, ...valuesArrays]);
        xlsx.utils.book_append_sheet(workbook, worksheet, sheetnames[ind]);
    }

    const excelData = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });

    const directory = path.join(__dirname, 'Reports');
    const filePath = path.join(directory, `${filename}.xlsx`);
    fs.writeFileSync(filePath, excelData);

    return filePath;
}


module.exports = CreateMultisheetExcelFile



