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

//Donor Update
router.patch('/update/:id', DonorController.UpdateDonor)

// Mark donor as deleted!!
router.patch(
    '/remove_donor/:donor_id',
    async (req, res, next) => {
        let id = req.params.donor_id

        let result = await DonorModel.findByIdAndUpdate(id, { deleted: true }).exec()
        if (result) {
            console.log("The user got deleted sucesfully")
            res.json(result)
        }
    }
)

// Index page for Donors. Nothing here!
// router.get('/', (req, res, next) => { res.send("Welcome to donor page") })

// FIXME: !!
// ! router.use(authorize)
// ! This is just commented for the sake of removing authorization from the programme

// Get all donors
router.get('/', DonorController.AllDonors);

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

router.post('/donate', DonorController.Donate)
// Update a donor 
router.put('/:id', DonorController.UpdateDonor)

router.delete('/:id',)




module.exports = router