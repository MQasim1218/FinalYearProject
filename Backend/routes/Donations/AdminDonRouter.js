/**
 * NOTE: What donations a Super Admin can make.
 * NOTE: What kind of controls does the superAdmin Has over these Donations 
 *  
 * 1. View Donations made in a year.
 * 2. View donations made to a particular Admin.
 * 3. View donations made to a category of campaigns. 
 * 4. Get one Particular Donation information.
 * 
 */

const router = require('express').Router()
const AdminDonationController = require('../../Controllers/Donations/AdminDonsCntrlr')
const AdminDonations = require('../../Models/Donations/DonationAdmin')

const authorize = require('../../middleware/authorization')

// ! Router.use(authorize)
// ! Later uncomment for authorization.


// REVIEW - *** All_Donations *** Based on Time!!
// Get all Admin donations to campaigns -- Filter for a particular category!!
router.get('/:category?', AdminDonationController.GetAllDonations)

router.get('/admin/:admin_id/', async (req, res) => {
    console.log("The admin id recieved is: ", req.params.admin_id)
    // res.send(`Admin id recieved: ${req.params.admin_id}`)
    try {
        let AdminDons = await AdminDonations.find({ admin: req.params?.admin_id })
            .populate('admin')
            .populate('campaign')
            .exec()
        console.log(AdminDons)
        res.json(AdminDons)
    } catch (error) {
    }
})

router.get('/superdonation/:id', AdminDonationController.Superdonation)

// ANCHOR - Get all camoaings for a aprticular campaign 
router.get('/camp/:camp_id', AdminDonationController.GetCampaignDonations)

// Get donations made by Admins to Campaings in a year -- Filterable by catogory
router.get('/:year/:category?', AdminDonationController.GetYearDonations)

// Get donations made by the SuperAdmin in a Month
router.get('/:year/:month/:category?', AdminDonationController.GetMonthDonations)


// REVIEW: Donations between a Specified timeperiod
// Get donations made by the SuperAdmin before a date
router.get('/range/:end_date/:category?', AdminDonationController.GetDonations_Before)

// Get donations made by the SuperAdmin after a date
router.get('/range/:start_date/:category?', AdminDonationController.GetDonations_Before)

// Get donations made by the SuperAdmin between a timeperiod
router.get('/range/:start_date/:end_date/:category?', AdminDonationController.GetDonations_TimeRange)




// Get one Admin donations to his/her campaigns -- Filter for a particular category!!
// router.get('/admin/:admin_id/:category?', AdminDonationController.AdminAllDonations)

// Get donations made by Admins to Campaings in a year -- Filterable by catogory
router.get('/admin/:admin_id/time/:year/:category?', AdminDonationController.AdminYearDonations)

// Get donations made by the SuperAdmin in a Month
router.get('/admin/:admin_id/time/:year/:month/:category?', AdminDonationController.AdminCampaignDonationsMonth)

// REVIEW: Donations between a Specified timeperiod
// Get donations made by an Admin before a date
router.get('/admin/:admin_id/range/:end_date/:category?', AdminDonationController.AdminCampaignDonations_Before)

// Get donations made by an Admin after a date
router.get('/admin/:admin_id/range/:start_date/:category?', AdminDonationController.AdminCampaignDonations_After)

// Get donations made by an Admin between a timeperiod
router.get('/admin/:admin_id/range/:start_date/:end_date/:category?', AdminDonationController.AdminCampaignDonations_TimeRange)



// REVIEW - Doantions to a Particular Campaign


// FIXME: Get all Admin donations to a Particular Campaign
// router.get('/camp/:id/', AdminDonationController.)

// FIXME: Get donations made by the Admin to a Campaign in a year 
router.get('/camp/:id/:year', AdminDonationController.AdminYearDonations)

// FIXME: Get donations made by the Admin to a campaign in a Month
router.get('camp/:id/:year/:month', AdminDonationController.AdminMonthDonations)

// REVIEW: Donations to a Campaign by Admin between a Specified timeperiod


// FIXME: Get donations made by the Admin before a date!!
router.get('/camp/:id/range/:end_date/:category?', AdminDonationController.AdminDonations_Before)

// FIXME: Get donations made by the Admin after a perticular date!!
router.get('/camp/:id/range/:start_date/:category?', AdminDonationController.AdminDonations_After)

// FIXME: Get all Admin donations to a campaign between a timeperiod!!.
router.get('camp/:id/range/:start_date/:end_date/:category?', AdminDonationController.AdminDonations_TimeRange
)

// Make Donations by Admin to campaign
router.post('/donate/:camp_id', AdminDonationController.DonateToCampaign)

/**
 * ! Need to add routes for Campaign Specific Queries
 */
// Get a Specific Donation by Admin to campaign
router.get('/donation/:id', AdminDonationController.SingleDonation)


//// ! There is a requirement that the Super Admin registers the Donation Made by Donors against thier names.
//// ! Our FYP requires the SUPERADMIN to Make the Donation. Should I implement both ways or just the Institute requirement for now?
//// ! Shall we incorporate a mechanism to allow donors to make thier own donations...



module.exports = router
