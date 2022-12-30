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

const express = require('express')
const router = express.Router()


// Get all supadmin donations
router.get('/allDonations', SuperAdminController.GetAllDonations)

// Get donations made by the SuperAdmin in a year
router.get('/yearDonations', SuperAdminController.GetYearDonations)

// Get all the Donations made by superadmin to an Admins sorted by the dates
router.get('/:admin', SuperAdminController.GetAdminDonations)

// Get all donations to a Particular Category???
// FIXME: Need to see how to make this workout.. and what is its purpose



 

// Make a Donations to an Admin
router.post('/donate/:Admin', SuperAdminController.MakeDonationToAdmin)