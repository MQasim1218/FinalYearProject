const express = require('express')
const AdminModel = require('../../Models/Users/AdminModel')
const AdminController = require('../../Controllers/Users/AdminCntr')
const SuperAdminController = require('../../Controllers/Users/SuperAdminCntrlr')
const SuperAdminModel = require('../../Models/Users/SuperAdmin')
const GeneralCampaignModel = require("../../Models/Campaings/GeneralCampaigns")
const SpecificCampaignModel = require("../../Models/Campaings/SpecificCampaign")
const authorize = require('../../middleware/authorization')


let router = express.Router()

/**
 * SECTION: DONE
 * ! DONE: Campaign Managment Basic
 * ! DONE: User Authentication Basic
 * ! DONE: CRUD campaigns + Approve/Reject 
 *  
 * TODO: Audit-Campaign
 * TODO: Analytics
 * TODO: Reports
 * TODO: Expenses -- Iska kia krna hia boss?
 * TODO: 
 */

// router.post('/signup', SuperAdminController.AddNewAdmin)
router.post('/login', SuperAdminController.SignIn)
router.patch('/change_email', SuperAdminController.ChangeEmail)
router.patch('/change_pass', SuperAdminController.ChangePassword)

router.delete('', (req, res, next) => {
    // ! Need to figure a way to (not) the super admin from the env file.


})


// FIXME: This needs tobe implemented!!
// router.get('/forgot_password', SuperAdminController.)

// router.use(authorize)

// localhost:5000/admin/signup
router.get(
    '/appealedCampaigns',
    AdminController.ViewAppealedCampaigns
)

// })
// router.get('/allCampigns/:id', async (req, res, next) => {
//     let campaigns = await campaigns.Admin.findOne(req.params.id).populate('created_campaigns')
//     let campigns = admin.created_campaigns
// })

router.get(
    '/GeneralCampigns/:id',
    AdminController.ViewGeneralCampaigns
)

router.get('/SpecificCampigns/:id', AdminController.ViewSpecificCampaigns)

router.get('/rejectCampaignRequest/:campaign_id', AdminController.RejectCampiagnRequest)

router.patch('/approveCampaign/:campaign_id', AdminController.ApproveCampaign)

router.get('/rejectCampaign/:campaign_id', AdminController.RejectCampiagnRequest)

// TODO: Archive Campiagn
router.get('/archivedCampaigns', async (req, res, next) => {
    try {
        let specific_capms = await SpecificCampaignModel.find({ archived: true }).exec()
        let general_capms = await GeneralCampaignModel.find({ archived: true }).exec()

        res.json(general_capms.concat(specific_capms))
    } catch (error) {
        console.log('error is: ', error)
        next(error)
    }

})

// Archive a campaign
router.get('/archiveCampaign/:campaign_id', async (req, res, next) => {
    try {
        let gen_ack = await GeneralCampaignModel.findByIdAndUpdate(
            { _id: req.params.campaign_id },
            { archived: true }
        )
            .exec()

        if (gen_ack !== null) res.json(gen_ack)
        else {
            let spc_ack = await SpecificCampaignModel.findOneAndUpdate(
                { _id: req.params.campaign_id },
                { archived: true }
            )
                .exec()
            if (spc_ack !== null) res.json(spc_ack)
            else { console.log("No capmaign found!!"); res.status(404).send("Didnt find what you loooking for") }
        }
    } catch (error) {
        next(error)
    }
})

router.get('download_reports', (req, res, next) => {
    
    
    res.sendFile()
})


// Empty routes.. Will do these in a little while
// router.get('/reports')
// router.get('/reports/monthly_donation/:month')
// router.get('/reports/yearly_donation/:year')
// router.post('/reports/credit_report/:month')
// router.post('/reports/balance_sheet/:month')
// router.get('/analytics/top_donors')
// router.get('/analytics/interactive_map')
// router.get('/analytics/interactive_map/city')
// router.post('/analytics/city')
// router.get('/analytics/donor')
// router.get('/analytics/beneficiary')
// router.get('/analytics/')
// router.get('/adminCampaigns')
// router.get('/adminCampaigns')
// router.get('/adminCampaigns')


// Add Campaign
router.post('/:id/addGeneralCampaign', AdminController.AddGeneralCampaign)
// Get Admin
router.get('/:id', AdminController.GetAdmin)

// router.delete('/:id', AdminController.DeleteAdmin)

router.patch('/:id', AdminController.UpdateAdmin)

// Get All Admins
router.get('/', AdminController.GetAllAdmins)
module.exports = router