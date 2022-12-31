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

// REVIEW - *** All_Donations *** Based on Time!!
// Get all Admin donations to campaigns -- Filter for a particular category!!
router.get('/:category?', AdminDonationController.GetAllDonations)

// Get donations made by Admins to Campaings in a year -- Filterable by catogory
router.get('/:year/:category?', AdminDonationController.GetYearDonations)

// Get donations made by the SuperAdmin in a Month
router.get('/:year/:month/:category?', AdminDonationController.GetMonthDonations)


// REVIEW: Donations between a Specified timeperiod
// Get donations made by the SuperAdmin before a date
router.get('/range/:end_date/:category?', AdminDonationController.TODO)

// Get donations made by the SuperAdmin after a date
router.get('/range/:start_date/:category?', AdminDonationController.TODO)

// Get donations made by the SuperAdmin between a timeperiod
router.get('/range/:start_date/:end_date/:category?', AdminDonationController.TODO)


// Get one Admin donations to his/her campaigns -- Filter for a particular category!!
router.get('/:admin_id/:category?', AdminDonationController.TODO)

// Get donations made by Admins to Campaings in a year -- Filterable by catogory
router.get('/:admin_id/:year/:category?', AdminDonationController.TODO)

// Get donations made by the SuperAdmin in a Month
router.get('/:admin_id/:year/:month/:category?', AdminDonationController.TODO)

// REVIEW: Donations between a Specified timeperiod
// Get donations made by an Admin before a date
router.get('/:admin_id/range/:end_date/:category?', AdminDonationController.TODO)

// Get donations made by an Admin after a date
router.get('/:admin_id/range/:start_date/:category?', AdminDonationController.TODO)

// Get donations made by an Admin between a timeperiod
router.get('/:admin_id/range/:start_date/:end_date/:category?', AdminDonationController.TODO)



// REVIEW - Doantions to a Particular Campaign
// Get all Admin donations to a Particular Campaign 
router.get('/camp/:id/', AdminDonationController.TODO)

// Get donations made by the Admin to a Campaign in a year 
router.get('/camp/:id/:year', AdminDonationController.TODO)

// Get donations made by the Admin to a campaign in a Month
router.get('camp/:id/:year/:month', AdminDonationController.TODO)

// REVIEW: Donations to a Campaign by Admin between a Specified timeperiod
// Get donations made by the Admin before a date!!
router.get('/camp/:id/range/:end_date/:end_date', AdminDonationController.TODO)

// Get donations made by the Admin after a perticular date!!
router.get('/camp/:id/range/:start_date', AdminDonationController.TODO)

// Get all Admin donations to a campaign between a timeperiod!!.
router.get('camp/:id/range/:start_date/:end_date', AdminDonationController.TODO)

// Get all the Donations made by superadmin to an Admins sorted by the dates
router.post('/donate', AdminDonationController.DonateToCampaign)


//// ! There is a requirement that the Super Admin registers the Donation Made by Donors against thier names.
//// ! Our FYP requires the DONOR to Make the Donation. Should I implement both ways or just the Institute requirement for now?
//// ! Shall we incorporate a mechanism to allow donors to make thier own donations...

router.post('/registerDonation', AdminDonationController.TODO)




// Make a Donations to an Admin
router.post('/donate/:Admin', AdminDonationController.MakeDonationToAdmin)