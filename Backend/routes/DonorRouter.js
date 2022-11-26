const express = require('express')
const DonorModel = require('../Models/DonorModel')
const DonorController = require('../Controllers/DonorController')
let router = express.Router()

// Donor SignUp
router.post('/signup', DonorController.DonorSignUp)

// Donor retrival
router.get('/:id', (req, res, next) => {
    DonorModel.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})

// Get all donors
router.get('/allDonors', function (req, res, next) {
    DonorModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});


router.delete('/:id', function (req, res, next) {
    DonorModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})

module.exports = router