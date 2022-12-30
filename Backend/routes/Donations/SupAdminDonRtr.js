/**
 * NOTE: What donations a Super Admin can make.
 * NOTE: What kind of controls does the superAdmin Has over these Donations 
 * 
 * 1. Make Donation to an Admin.
 * 2. View Donations made in a year.
 * 3. View donations made to a particular Admin.
 * 4. View donations made to a category of campaigns. 
 * 5. Get one Particular Donation information
 */

const router = require('express').Router()
const SuperAdminController = require('../../Controllers/Users/SuperAdminCntrlr')
// REVIEW - *** All_Donations *** Based on Time!!

// Get all supadmin donations -- Filter for a particular category!!
router.get('/:category?', SuperAdminController.GetAllDonations)

// Get donations made by the SuperAdmin in a year -- Filterable by catogory
router.get('/:year/:category?', SuperAdminController.GetYearDonations)

// Get donations made by the SuperAdmin in a Month
router.get('/:year/:month/:category?', SuperAdminController.GetMonthDonations)


// REVIEW: Donations between a Specified timeperiod
// Get donations made by the SuperAdmin before a date
router.get('/range/:end_date/:category?', SuperAdminController.TODO)

// Get donations made by the SuperAdmin after a date
router.get('/range/:start_date/:category?', SuperAdminController.TODO)

// Get donations made by the SuperAdmin between a timeperiod
router.get('/range/:start_date/:end_date/:category?', SuperAdminController.TODO)




// REVIEW - Doantions to a Particular Donor
// Get all supadmin donations -- Filter for a particular category!!
router.get('/admin/:id/:category?', SuperAdminController.GetAllDonationstoAdmin)

// Get donations made by the SuperAdmin in a year -- Filterable by catogory
router.get('/admin/:year/:category?', SuperAdminController.GetYearDonationstoAdmin)

// Get donations made by the SuperAdmin in a timeRange
router.get('admin/:year/:month/:category?', SuperAdminController.GetMonthDonationstoAdmin)

// REVIEW: Donations to an Admin between a Specified timeperiod
// Get all supAdmin donations -- Filter for a particular category!!
router.get('/admin/:id/range/:end_date/:end_date/:category?', SuperAdminController.GetAllDonationstoAdmin)

// Get donations made by the SuperAdmin in a year -- Filterable by catogory
router.get('/admin/range/:start_date/:category?', SuperAdminController.GetYearDonationstoAdmin)

// Get donations made by the SuperAdmin in a timeRange
router.get('admin/range/:start_date/:end_date/:category?', SuperAdminController.GetMonthDonationstoAdmin)



// Get all the Donations made by superadmin to an Admins sorted by the dates
router.post('/donate/:admin', SuperAdminController.DonateToAdmin)


//// ! There is a requirement that the Super Admin registers the Donation Made by Donors against thier names.
//// ! Our FYP requires the DONOR to Make the Donation. Should I implement both ways or just the Institute requirement for now?
//// ! Shall we incorporate a mechanism to allow donors to make thier own donations...

router.post('/registerDonation', SuperAdminController.TODO)




// Make a Donations to an Admin
router.post('/donate/:Admin', SuperAdminController.MakeDonationToAdmin)