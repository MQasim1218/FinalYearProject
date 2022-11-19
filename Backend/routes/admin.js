const express = require('express')
const AdminModel = require('../Models/AdminModel')
const AdminController = require('../Controllers/AdminController')


let router = express.Router()

/**
 * SECTION: Things the admin can do
 * Update-Change Email/Passowrd/Name
 * Audit-Campaign
 * Create-Campaign => Campaign.add
 * UpdateCampaign => Campaign.update
 * DeleteCampaign => Campaign.delete
 * 
 * Approve/Disapprove-Incoming-Benificiary-Campaign-Request
 * 
 * 
 * Audit-Campaign
 */

router.post('/signup', AdminController.AddNewAdmin)

router.get('/:id', )

router.get('/', function (req, res, next) {
    AdminModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});

router.delete('/:id', function (req, res, next) {
    AdminModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})


module.exports = router