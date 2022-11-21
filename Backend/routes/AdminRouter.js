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
 * ANCHOR: Approve/Disapprove-Incoming-Benificiary-Campaign-Request
 * 
 * 
 * TODO: Audit-Campaign
 * TODO: Analytics
 * TODO: Reports
 * TODO: Expenses
 * TODO: 
 */

router.post('/signup', AdminController.AddNewAdmin)

router.get('/appealedCampaigns', AdminController.ViewAppealedCampaigns)
router.get('/rejectCampaignRequest/:campaign_id', AdminController.RejectCampiagnRequest)


// })
// router.get('/allCampigns/:id', async (req, res, next) => {
//     let campaigns = await campaigns.Admin.findOne(req.params.id).populate('created_campaigns')
//     let campigns = admin.created_campaigns

// })
router.get('/GeneralCampigns/:id', AdminController.ViewGeneralCampaigns)

router.get('/SpecificCampigns/:id', AdminController.ViewSpecificCampaigns)



router.patch('/approveCampaign/:campaign_id', AdminController.ApproveCampaign)

router.get('/rejectCampaign/:campaign_id', AdminController.RejectCampiagnRequest)

// Empty routes.. Will do these in a little while
router.get('/reports')
router.post('/reports/monthly_donation/:month')
router.post('/reports/yearly_donation/:month')
router.post('/reports/credit_report/:month')
router.post('/reports/balance_sheet/:month')



router.get('/analytics/top_donors')
router.get('/analytics/interactive_map')
router.get('/analytics/interactive_map/city')
router.post('/analytics/city')
router.get('/analytics/donor')
router.get('/analytics/benificiary')
router.get('/analytics/')
router.get('/adminCampaigns')
router.get('/adminCampaigns')
router.get('/adminCampaigns')


router.post('/:id/addGeneralCampaign', AdminController.AddGeneralCampaign)

router.get('/:id', AdminController.GetAdmin)

router.get('/', AdminController.GetAllAdmins)

router.delete('/:id', AdminController.DeleteAdmin)

router.patch('/:id', AdminController.UpdateAdmin)

module.exports = router