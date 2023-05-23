const express = require('express')

const DonorModel = require('../../Models/Users/DonorModel')
const DonorController = require('../../Controllers/Users/DonorCntr')

const SpecificCampaign = require('../../Models/Campaings/SpecificCampaign')
const GeneralCampaign = require('../../Models/Campaings/GeneralCampaigns')

// I need to set the heck with donations!!
const DonorDonationModel = require('../../Models/Donations/DonationDonor')

const authorize = require('../../middleware/authorization')

let router = express.Router()

// Donor SignUp
router.post('/signup', DonorController.DonorSignUp)

// Donor Login
router.post('/login', DonorController.DonorSignIn)

// FIXME: !!
// ! router.use(authorize)
// ! This is just commented for the sake of removing authorization from the programme

//Donor Update
router.patch(
    '/update/:id',
    DonorController.UpdateDonor
)

// Mark donor as deleted!!
router.patch(
    '/remove_donor/:donor_id',
    DonorController.MarkDonorAsDeleted
)




// Get all donors
router.get(
    '/',
    DonorController.AllDonors
);

router.get(
    '/deleted',
    DonorController.GetDeleted
)

// ! NOTE: IG This route should be a part of Campaigns Router!!
// Search Campaigns
router.get(
    '/available_campaigns',
    DonorController.SearchAvailableCampaigns
)


// Get all the campaigns where the donor has donated!
router.get(
    'donated_camps/:donor_id',
    DonorController.GetDonatedCapmaigns
)

// ! NOTE: IG This route should be a part of Campaigns Router!!
// Search Campaign Based on Title
router.get('/search_campaign/title', DonorController.SearchCampaignByTitle)

// ! NOTE: IG This route should be a part of Campaigns Router!!
// Filter campiagns based on Time Range, Title and/or Location
router.get('/search_campaign/filter', DonorController.SearchCampaignByFilter)

router.get('/:id/donations', DonorController.GetDonations)
// Donor retrival
router.get('/:id', DonorController.GetDonor)

// router.post('/donate', DonorController.Donate)
// Update a donor 
router.put('/:id', DonorController.UpdateDonor)

router.delete('/:id',)




module.exports = router