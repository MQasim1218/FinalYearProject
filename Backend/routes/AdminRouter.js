const express = require('express')
const AdminModel = require('../Models/AdminModel')
const AdminController = require('../Controllers/AdminController')
const GeneralCampaignModel = require("../Models/GeneralCampaigns")
const { Admin } = require('../Models/AdminModel')


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

router.get('/:id', AdminController.GetAdmin)

router.get('/', AdminController.GetAllAdmins)

router.delete('/:id', AdminController.DeleteAdmin)

router.patch('/:id', AdminController.UpdateAdmin)

router.get('/adminCampigns/:id', async (req, res, next) => {
    let admin = await AdminModel.Admin.findOne(req.params.id).populate('created_campaigns')
    let campigns = admin.created_campaigns
    if (campigns.length === 0) {
        res.send("no campaigns found")
    }

})
router.get('/allCampigns/:id', async (req, res, next) => {
    let campaigns = await campaigns.Admin.findOne(req.params.id).populate('created_campaigns')
    let campigns = admin.created_campaigns

})

// router.get('/allCampigns/:id', async (req, res, next) => {
//     let admin = await AdminModel.Admin.findOne(req.params.id).populate('created_campaigns')
//     let campigns = admin.created_campaigns

// })

router.post('/:id/addGeneralCampign', async (req, res, next) => {
    try {
        let newCampaign = await GeneralCampaignModel.create(req.body)
        console.log("New campaign created")

        let admin = await Admin.findById(req.params.id).exec()

        await AdminModel.Admin.updateOne(
            { _id: req.params.id },
            { $push: { general_campaigns: newCampaign._id } }
        ).exec()
        res.json(admin)

    } catch (err) {
        console.log("err")
        res.send(err)
    }
    console.log("Adding Campaign for the Admin: ", req.params.id)
    // res.send("Got the control here")

})
router.get('/appealedCampigns')
router.get('/approveCampign')
router.get('/adminCampigns')
router.get('/adminCampigns')
router.get('/adminCampigns')

module.exports = router