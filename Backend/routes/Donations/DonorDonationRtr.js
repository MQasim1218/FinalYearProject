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

// Get donations from a particular donor donation!! -- Where donor_donation.id === route.params.ddon_id
router.get('/:donordonation_id/expended_donations', )