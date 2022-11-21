const express = require('express')
const AdminModel = require('../Models/AdminModel')
const AdminController = require('../Controllers/AdminController')
const GeneralCampaignModel = require("../Models/GeneralCampaigns")
const SpecificCampaignModel = require("../Models/SpecificCampaign")


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

router.get('/appealedCampaigns', async (req, res, next) => {
    console.log("over here")
    try {
        let appealed = await SpecificCampaignModel.find({ approved: false }).exec()
        res.send(appealed)

    } catch (error) {
        res.send(error)
    }

})


// })
// router.get('/allCampigns/:id', async (req, res, next) => {
//     let campaigns = await campaigns.Admin.findOne(req.params.id).populate('created_campaigns')
//     let campigns = admin.created_campaigns

// })
router.get('/GeneralCampigns/:id', AdminController.ViewGeneralCampaigns)

router.get('/SpecificCampigns/:id', AdminController.ViewSpecificCampaigns)



router.patch('/approveCampaign/:campaign_id', async (req, res, next) => {
    try {
        let camp = await SpecificCampaignModel.findById(req.params.campaign_id).exec()
        console.log(camp)
        if (camp.approved === true) {
            res.send("This campaign is already approved!")
        } else {
            camp.approved = true
            res.send(camp)
            camp.save()
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
})

// Empty routes.. Will do these in a little while

router.get('/adminCampaigns')
router.get('/adminCampaigns')
router.get('/adminCampaigns')
router.post('/:id/addGeneralCampaign', AdminController.AddGeneralCampaign)


router.get('/:id', AdminController.GetAdmin)

router.get('/', AdminController.GetAllAdmins)

router.delete('/:id', AdminController.DeleteAdmin)

router.patch('/:id', AdminController.UpdateAdmin)

module.exports = router