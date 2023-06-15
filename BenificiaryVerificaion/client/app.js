const express = require('express');
const multer = require('multer')
// const upload = require("express-fileupload")
const { callVerifyImages, init_srv } = require('./grpcClient');
const fs = require('fs');
const app = express();
const benifAppeal = require('./Models/verificaion')
const mongoose = require('mongoose')
require('dotenv').config()
// mongoose.connect(process.env.MONGODB_PATH).then(() => { console.log("Successfully Connected to DB") })


const validIncidents = [
    "earthquake",
    "flooded",
    "ice storm",
    "burned",
    "collapsed",
    "earthquake",
    "fire whirl",
    "car accident",
    "van accident",
    "truck accident",
    "train accident",
    "bus accident",
    "motorcycle accident",
    "earthquake",
    "landslide",
    "mudslide mudflow",
    "rockslide rockfall",
    "snowslide avalanche",
    "thunderstorm",
    "wildfire",
    "tropical cyclone",
    "heavy rainfall",
    "tornado",
    "drought",
    "damaged"
]


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

// Get an aray of images and store them!!

// Safest bet. Call verify, send it all the files and then use it to call the grpc python server 

app.post('/verify', upload_files.array('images'), async (req, res) => {
    try {
        // ? Will also need to settle this path in the main project

        let paths = req.files.map(file => file.path)

        const imagePaths = req.files.map(file => file.path.slice(8));
        console.log('Image Paths:', imagePaths);

        // we need to save these image paths to database to be able to store additional info related to them

        // Call the function for image verification and obtain predictions
        let predictions = await callVerifyImages(imagePaths);

        // let prs = Object.values(predictions)

        // ! The better option would be to return the predoctions to the other backend to handle there instead of here!
        // prs.forEach((pred, index) => {
        //     if (pred.incidents.length != 0) {
        //         pred.incidents.forEach(val => {
        //             if (validIncidents.includes(val)) {

        //                 // Save the value to be added to the database!
        //                 console.log("Updating the Benificiary Appeal")

        //                 benifAppeal.findByIdAndUpdate(
        //                     req.params.appeal_id,
        //                     {
        //                         // Set verified to true!
        //                         verified: true,

        //                         // Add the prediction values to the array!
        //                         $push: {
        //                             docs_predictions: {
        //                                 imgName: imagePaths[index],
        //                                 prediction: val
        //                             }
        //                         }
        //                     },
        //                 )
        //             }
        //         })
        //     }
        // })




        // console.log("The values are: ", prs)

        // Send the response 
        // Just return the predictions for now!
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



app.listen(3003, () => {
    console.log('Express server listening on port 3003');

    // When the server starts, initialize the ML models aswell
    init_srv()
});