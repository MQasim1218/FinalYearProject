const express = require('express')
const AdminModel = require('../Models/AdminModel')
const AdminController = require('../Controllers/AdminController')
const GeneralCampaignModel = require("../Models/GeneralCampaigns")
const SpecificCampaignModel = require("../Models/SpecificCampaign")
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

// })
// router.get('/allCampigns/:id', async (req, res, next) => {
//     let campaigns = await campaigns.Admin.findOne(req.params.id).populate('created_campaigns')
//     let campigns = admin.created_campaigns

// })
router.get('/GeneralCampigns/:id', AdminController.ViewGeneralCampaigns)

router.get('/SpecificCampigns/:id', AdminController.ViewSpecificCampaigns)

router.post('/:id/addGeneralCampign', AdminController.AddGeneralCampaign)
router.get('/appealedCampigns', async () => {
    let appealed = SpecificCampaignModel.find({ approved: false }).exec()
    
})
router.patch('/approveCampign/:campaign_id', () => { })

// Empty routes.. Will do these in a little while

router.get('/adminCampigns')
router.get('/adminCampigns')
router.get('/adminCampigns')

module.exports = router