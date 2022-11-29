const express = require('express')
const DonorModel = require('../Models/DonorModel')
const DonorController = require('../Controllers/DonorCntr')
const SpecificCampaign = require('../Models/SpecificCampaign')
const DonationModel = require('../Models/DonationModel')
const donorModel = require('../Models/DonorModel')
const GeneralCampaign = require('../Models/GeneralCampaigns')
const { json } = require('express')
let router = express.Router()

// Donor SignUp
router.post('/signup', DonorController.DonorSignUp)

// Donor retrival
router.get('/:id', DonorController.GetDonor)

// Get all donors
router.get('/allDonors', DonorController.AllDonors);

// Search Campaigns
router.get('/available_campaigns', DonorController.SearchAvailableCampaigns)

// Search Campaign Based on Title
router.get('/search_campaign/title', DonorController.SearchCampaignByTitle)

// Filter campiagns based on Time Range, Title and/or Location
router.get('/search_campaign/filter',
    async (req, res, next) => {
        try {
            let available = { specific: null, general: null }

            let spec_av = await SpecificCampaign.find(
                {
                    campaign_title: {
                        $regex: `/${req.body.title}/i`
                    },
                    // Have to implement search based on Location.

                    createdAt: {
                        $lte: req.body.end_date,
                        $gte: req.body.start_date
                    },

                    completed: false,
                    approved: true
                }).exec()
            let genr_av = await GeneralCampaign.find({
                campaign_title: {
                    $regex: `/${req.body.title}/i`
                },
                // Have to implement search based on Location.

                createdAt: {
                    $lte: req.body.end_date,
                    $gte: req.body.start_date
                },

                completed: false,
                approved: true
            }).exec()

            available.specific = spec_av
            available.general = genr_av

            res.json(JSON.stringify(available))

        } catch (error) {
            console.log("Error occured while searchign campaigns")
            res.send("Error occured: " + error.message)
        }
    }
)


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

module.exports = router