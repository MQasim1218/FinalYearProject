/**
 * NOTE: What donations an Admin can make.
 * NOTE: What kind of controls does the Admin has over these Donations. 
 * 
 * 1. Make Donation to a Campaign.
 * 2. View Donations made in a year.
 * 3. View donations made to a particular Admin.
 * 4. View donations made to a category of campaigns. 
 * 5. 
 */



const router = require('express').Router()
const DonorDonationController = require('../../Controllers/Donations/DonorDonsCntr')
const authorize = require('../../middleware/authorization')


// Authorize incoming requests
// ! router.get(authorize)

/**
 *  ############################# SECTION #############################
 *  Beneath here.. we are dealing with Donations of all the Donors.
 */

// All the donation made by a donor.
router.get('/single/:id', DonorDonationController.SingleDonation)


// All the donation made by a donor.
router.get('/donor/:donor_id/:category?', DonorDonationController.DonorAllDonations)

// All donations in a year
router.get('/donor/:donor_id/:year/:category?', DonorDonationController.DonorYearDonations)

// All donations in a year
router.get('/donor/:donor_id/:year/:month/:category?', DonorDonationController.DonorMonthDonations)


// All the donation made by all the donors.
router.get('/:category?', DonorDonationController.GetAllDonations)

// All donations by the donors in a year
router.get('/:year/:category?', DonorDonationController.GetYearDonations)

// All donations by donors in a month
router.get('/:year/:month/:category?', DonorDonationController.GetMonthDonations)

// REVIEW: Donations by all donors recieved between a Specified timeperiod

// Get donations made by the Donors before a date
router.get('/range/:end_date/:category?', DonorDonationController.GetDonations_Before)

// Get donations made by the Donors after a date
router.get('/range/:start_date/:category?', DonorDonationController.GetDonations_After)

// Get donations made by the Donors between a timeperiod
router.get('/range/:start_date/:end_date/:category?', DonorDonationController.GetDonations_TimeRange)



/**
 *  ############################# SECTION #############################
 *  Beneath here.. we are dealing with Donations of a particular Donor. Above, we dealing with general Donor Donations.
 */




// REVIEW: Donations between a Specified timeperiod
// ! Below here.. most things need to be implemented!!
// ! Hope we pass todays scrutiny.

// Get donations made by a Donor before a date
// router.get('/:donor_id/range/:end_date/:category?', DonorDonationController.TODO)

// Get donations made by a Donor after a date
// router.get('/:donor_id/range/:start_date/:category?', DonorDonationController.TODO)

// Get donations made by a Donor between a timeperiod
// router.get('/:donor_id/range/:start_date/:end_date/:category?', DonorDonationController.TODO)

// Get all Admin donation entries for a particular donor donations!!
// Track where all the money of this donor has been spent!!
// Also Track How much much is spent in each category!

/**
 * 1. Get all the donations made by the donor
 * 2. Get all the SuperDuper Admin Donations that have these Donation Ids.
 * 3. Then get the Admins that recieved these donations.
 * 4. Track the campaigns where the money was spent.. 
 * 5. Return the campaigns where the money went!!
 */
// router.get('/:donor_id/expended_donations/:category?',)

// Get all Admin donation entries for a single donation by a particular donor!!
// Usage: Is donation mese kitna part Student Support ke lye gaya hai..
// Example2: Is donation ka kon kon se Campaigns me istemaal hua hai. 
// router.get('/expended_donations/:donation_id/:category?',)

module.exports = router