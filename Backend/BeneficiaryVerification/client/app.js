const express = require('express');
const multer = require('multer')
// const upload = require("express-fileupload")
const { callVerifyImages, init_srv } = require('./grpcClient');
const fs = require('fs');


const app = express();


// Set up Multer for handling file uploads

// Create a storage for multer
const storage = multer.diskStorage({
    // ! Will need to change the storage destination in the main code! 
    destination: '../temp/',
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload_files = multer({ storage: storage });

app.post('/verify', upload_files.array('images'), async (req, res) => {
    try {
        // ! Will also need to settle this path in the main project

        let paths = req.files.map(file => file.path)

        const imagePaths = req.files.map(file => file.path.slice(3));
        console.log('Image Paths:', imagePaths);

        // Call the function for image verification and obtain predictions
        let predictions = await callVerifyImages(imagePaths);

        // Send the response 
        res.json(predictions);


        // Delete the files
        paths.forEach(file_path => {
            fs.unlink(file_path, err => {
                if (err)
                    console.log("Error deleting the file at " + file_path + "\n", err.message)
                else
                    console.log("File deleted successfully")
            })
        });

        return


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(3000, () => {
    console.log('Express server listening on port 3000');

    // When the server starts, initialize the ML models aswell
    init_srv()
}); 