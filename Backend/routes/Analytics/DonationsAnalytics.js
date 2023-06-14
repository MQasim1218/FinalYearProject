var express = require('express');
var router = express.Router();


const SuperAdminAnalytics = require('../../DataAggregation/AggrScripts/supAdminDonsReports')
const AdminAnalytics = require('../../DataAggregation/AggrScripts/adminDons_report')
const fs = require('fs');
const { TIMEOUT } = require('dns');

/* GET home page. */
router.post('/superadminAnalytics', async function (req, res, next) {
    try {
        let d = new Date()

        let filepath = await SuperAdminAnalytics.Get_All_SuperAdmin_Donations_Report(req.body.year || d.getFullYear());
        if (filepath == null) {
            return res.send("No data retrieved")
        }

        // console.log("The file name is: ", fn);
        res.sendFile(filepath, (err) => {
            if (err) {
                res.status(500).send(err.message)
            }

            fs.unlink(filepath, (err) => {
                if (err)
                    console.log("Failed to remove the file!!")
            })
        });


        // Now delete the file just created! to clean the mess

    } catch (err) {
        console.log("Error here in this code!");
        res.send("Error occurred! Err: " + err.message);
    }
});


router.post('/adminsAnalytics/all', async function (req, res, next) {

    try {
        let d = new Date()

        let filepath = await AdminAnalytics.Get_All_Admin_Donations_Report(req.body.year || d.getFullYear());
        if (filepath == null) {
            return res.send("No data retrieved")
        }

        // console.log("The file name is: ", fn);
        res.sendFile(filepath, (err) => {
            if (err) {
                res.status(500).send(err.message)
            }

            // Now delete the file just created! to clean the mess
            fs.unlink(filepath, (err) => {
                if (err)
                    console.log("Failed to remove the file!!")
            })
        });



    } catch (err) {
        console.log("Error here in this code!");
        res.send("Error occurred! Err: " + err.message);
    }
});


// Get_All_Admin_Category_Donations_Report
router.post('/adminsAnalytics/cat', async function (req, res, next) {

    try {
        let d = new Date()

        let filepath = await AdminAnalytics.Get_All_Admin_Category_Donations_Report(req.body.year || d.getFullYear());
        if (filepath == null) {
            return res.send("No data retrieved")
        }

        // console.log("The file name is: ", fn);
        res.sendFile(filepath, (err) => {
            if (err) {
                res.status(500).send(err.message)
            }

            // Now delete the file just created! to clean the mess
            fs.unlink(filepath, (err) => {
                if (err)
                    console.log("Failed to remove the file!!")
            })
        });



    } catch (err) {
        console.log("Error here in this code!");
        res.send("Error occurred! Err: " + err.message);
    }
});
module.exports = router;
