const express = require('express')
const AdminModel = require('../../Models/Users/AdminModel')
const AdminController = require('../../Controllers/Users/AdminCntr')
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

router.post('/signup', AdminController.AddNewAdmin)
router.post('/login', AdminController.SignInAdmin)
router.patch('/update/:id', AdminController.UpdateAdmin)
// router.delete('/delete/:id', AdminController.DeleteAdmin)
router.get('/get/:id', AdminController.GetAdmin)



// router.use(authorize)

// localhost:5000/admin/signup
router.get(
    '/appealedCampaigns',
    AdminController.ViewAppealedCampaigns
)


router.patch(
    '/remove_admin/:admin_id',
    async (req, res, next) => {
        let id = req.params.admin_id

        let result = await AdminModel.findByIdAndUpdate(id, { deleted: true }).exec()
        if (result) {
            console.log("The user got deleted sucesfully")
            res.json(result)
        }
    }
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
router.get('/:id/donors', AdminController.GetDonorsForAdminCampaigns)
// Get Admin


router.patch('/:id', AdminController.UpdateAdmin)

// Get All Admins
router.get('/', AdminController.GetAllAdmins)


module.exports = router