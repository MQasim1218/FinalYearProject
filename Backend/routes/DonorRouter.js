const express = require('express')
const DonorModel = require('../Models/DonorModel')
const DonorController = require('../Controllers/DonorCntr')
const SpecificCampaign = require('../Models/SpecificCampaign')
const DonationModel = require('../Models/DonationModel')
const GeneralCampaign = require('../Models/GeneralCampaigns')
const { json } = require('express')
const { mongo, default: mongoose } = require('mongoose')
let router = express.Router()

// Donor SignUp
router.post('/signup', DonorController.DonorSignUp)

// Donor retrival
router.get('/:id', DonorController.GetDonor)

// Get all donors
router.get('/', DonorController.AllDonors);

// Search Campaigns
router.get('/available_campaigns', DonorController.SearchAvailableCampaigns)

// Search Campaign Based on Title
router.get('/search_campaign/title', DonorController.SearchCampaignByTitle)

// Filter campiagns based on Time Range, Title and/or Location
router.get('/search_campaign/filter', DonorController.SearchCampaignByFilter)

// Update a donor 
router.put('/:id', DonorController.UpdateDonor)

router.delete('/:id', function (req, res, next) {
    DonorModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})

router.post('/donate/:campaign_id', DonorController.Donate)

router.get('/donations', DonorController.GetDonations)

module.exports = router