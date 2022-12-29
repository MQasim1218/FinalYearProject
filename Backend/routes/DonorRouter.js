const express = require('express')
const DonorModel = require('../Models/DonorModel')
const DonorController = require('../Controllers/DonorCntr')
const SpecificCampaign = require('../Models/SpecificCampaign')
const DonationModel = require('../Models/DonationModel')
const GeneralCampaign = require('../Models/GeneralCampaigns')
const { json } = require('express')
const authorize = require('../middleware/authorization')
const { mongo, default: mongoose } = require('mongoose')
let router = express.Router()

// Donor SignUp
router.post('/signup', DonorController.DonorSignUp)

// Donor Login
router.post('/login', DonorController.DonorSignIn)

// Index page for Donors. Nothing here!
router.get('/', (req, res, next) => { res.send("Welcome to donor page") })

router.use(authorize)

// Get all donors
router.get('/allDonors', DonorController.AllDonors);

// ! NOTE: IG This route should be a part of Campaigns Router!!
// Search Campaigns
router.get('/available_campaigns', DonorController.SearchAvailableCampaigns)

// ! NOTE: IG This route should be a part of Campaigns Router!!
// Search Campaign Based on Title
router.get('/search_campaign/title', DonorController.SearchCampaignByTitle)

// ! NOTE: IG This route should be a part of Campaigns Router!!
// Filter campiagns based on Time Range, Title and/or Location
router.get('/search_campaign/filter', DonorController.SearchCampaignByFilter)

router.get('/:id/donations', DonorController.GetDonations)
// Donor retrival
router.get('/:id', DonorController.GetDonor)

// Update a donor 
router.put('/:id', DonorController.UpdateDonor)

router.delete('/:id',)

router.post('/donate/:campaign_id', DonorController.Donate)



module.exports = router