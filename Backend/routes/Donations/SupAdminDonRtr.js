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
const SupAdminDonCntr = require('../../Controllers/Donations/SupAdminDonsCntrlr')
const authorize = require('../../middleware/authorization')


// ! router.use(authorize)
// ! Authorization left out for now!!


// SECTION - Doantions to a Particular Admin
// Get all supadmin donations -- Filter for a particular category!!
router.get('/admin/:admin_id/:category?', SupAdminDonCntr.AllDonationsToAdmin)

// Get donations made by the SuperAdmin in a year -- Filterable by catogory
router.get('/admin/:admin_id/:year/:category?', SupAdminDonCntr.YearDonations_ToAdmin)

// Get donations made by the SuperAdmin in a timeRange
router.get('/admin/:admin_id/:year/:month/:category?', SupAdminDonCntr.MonthDonations_ToAdmin)

// REVIEW: Donations to an Admin between a Specified timeperiod
// Get all supAdmin donations -- Filter for a particular category!!
router.get('/admin/:admin_id/range/:end_date/:category?', SupAdminDonCntr.Donations_Before_ToAdmin)

// Get donations made by the SuperAdmin in a year -- Filterable by catogory
router.get('/admin/:admin_id/range/:start_date/:category?', SupAdminDonCntr.Donations_After_ToAdmin)

// Get donations made by the SuperAdmin in a timeRange
router.get('admin/:admin_id/range/:start_date/:end_date/:category?', SupAdminDonCntr.Donations_TimeRange_ToAdmin)


// Get single supadmin donation
router.get('/single/:id?', SupAdminDonCntr.GetSingleDonation)

// Get single donor donations made to the super admin.
router.get('/singleDonorDonation/:id?', SupAdminDonCntr.GetDonsForSingleDonorDonation)


// SECTION - *** All_Donations *** Based on Time!!




// Get all supadmin donations -- Filter for a particular category!!
router.get('/:category?', SupAdminDonCntr.GetAllDonations)

// Get donations made by the SuperAdmin in a year -- Filterable by catogory
router.get('/:year/:category?', SupAdminDonCntr.GetYearDonations)

// Get donations made by the SuperAdmin in a Month
router.get('/:year/:month/:category?', SupAdminDonCntr.GetMonthDonations)



// REVIEW: Donations between a Specified timeperiod

// Get donations made by the SuperAdmin before a date
router.get('/range/:end_date/:category?', SupAdminDonCntr.GetDonations_Before)

// Get donations made by the SuperAdmin after a date
router.get('/range/:start_date/:category?', SupAdminDonCntr.GetDonations_After)

// Get donations made by the SuperAdmin between a timeperiod
router.get('/range/:start_date/:end_date/:category?', SupAdminDonCntr.GetDonations_TimeRange)
// ! All the donations given a time

// ! SuperAdmin ==> Admin1



// Get all the Donations made by superadmin to an Admins sorted by the dates
router.post('/donate', SupAdminDonCntr.DonateToAdmin)


// ! There is a requirement that the Super Admin registers the Donation Made by Donors against thier names.
// ! Our FYP requires the DONOR to Make the Donation. Should I implement both ways or just the Institute requirement for now?
// ! Shall we incorporate a mechanism to allow donors to make thier own donations...

// NOTE: Register a donation made by the Donor
router.post('/registerDonation', SupAdminDonCntr.RegisterDonorDonation)


module.exports = router

