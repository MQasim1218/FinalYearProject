const mongoose = require('mongoose')
const fs = require('fs');
// const app = require('express')
const Admins = require("./Models/Users/AdminModel");
const {
    Get_All_Admin_Donations_Report,
    Get_Single_Admin_Donations_Report,
    Get_All_Admin_Category_Donations_Report,
    Get_All_Admin_yearly_Donations_Report
} = require('./AggrScripts/adminDons_report');

const {
    Get_All_SuperAdmin_Donations_Report
} = require('./AggrScripts/supAdminDonsReports');
const getFilename = require('./utils/getFilename');

/**
 * * MODULE: Reports
 * 
 * TODO: Generate Financial reports based on the request query.
 * 
 * ANCHOR: Steps
 * Step1: Get the query from the url params.
 * Step2: Fetch the data from the mongo-db.
 * Step3: Convert the date to csv format.
 * Step4: Save the csv to the server?? Is this required? Since we create a csv all the time, saving it would just waste the resources.
 * Step5: Send the file back in the response (as downloadable file. 📂📂).
 *   
 */


try {
    mongoose.connect("mongodb://127.0.0.1:27017/FYP_DB").then(() => {
        console.log("COnected to mongo-db!!")
    })

    // Instantiate the express app below and make one single route to fetch the report.



    // Get_Single_Admin_Donations_Report("6379032e2533d51f506c2e02")
    // Get_All_Admin_Donations_Report()
    Get_All_Admin_yearly_Donations_Report()

} catch (err) {
    if (err) {
        console.log("Err: ", err.message)
    }
}






console.log("Ended the program")