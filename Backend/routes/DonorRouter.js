const express = require('express')
const DonorModel = require('../Models/DonorModel')
const DonorController = require('../Controllers/DonorCntr')
const SpecificCampaign = require('../Models/SpecificCampaign')
const DonationModel = require('../Models/DonationModel')
const donorModel = require('../Models/DonorModel')
let router = express.Router()

// Donor SignUp
router.post('/signup', DonorController.DonorSignUp)

// Donor retrival
router.get('/:id', DonorController.GetDonor)

// Get all donors
router.get('/allDonors', DonorController.AllDonors);


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