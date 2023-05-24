var express = require('express');
var router = express.Router();


const SuperAdminAnalytics = require('../../DataAggregation/AggrScripts/supAdminDonsReports')
const AdminAnalytics = require('../../DataAggregation/AggrScripts/adminDons_report')

/* GET home page. */
router.post('/superadminAnalytics', async function (req, res, next) {


    let fn = SuperAdminAnalytics.Get_All_SuperAdmin_Donations_Report()
    console.log("The file name is: ", fn)
    res.send("This part of code is working!")

});

router.post('/adminAnalytics', async function (req, res, next) {

    let fn = AdminAnalytics.Get_All_Admin_Donations_Report()
    console.log("The file name is: ", fn)
    res.send("This part of code is working!")

    // res.sendFile()
});

module.exports = router;
