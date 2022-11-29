const express = require('express')
const BeneficiaryModel = require('../Models/BenificiaryModel')


let router = express.Router()


// #################  Authentication  ##################
// #################  Authentication  ##################

// Add a particular benificiary by his/her id
router.post('/signup', (req, res, next) => {
    BeneficiaryModel.create(req.body)
        .then(function (data) {
            console.log(data)
            res.status(200)
            res.json(data)
        }).catch((err) => { console.log(err) })
})

// Sign Benificiary into the account
router.post("/signin", (req, res, next) => { })


// #################  CRUD  ##################
// #################  CRUD  ##################

// Get a particular benificiary by his/her id
router.get('/:id', (req, res, next) => {
    BeneficiaryModel.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})


// Get all benificiaries
router.get('/', function (req, res, next) {
    BeneficiaryModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});


// Delete a benificiary.
router.delete('/:id', function (req, res, next) {
    BeneficiaryModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})

// NOTE - This is to update or upload a file for the benificiary
router.put('/upload_file', () => { })


// #################  Capmaigns  ##################
// #################  Capmaigns  ##################

// Appeal a campaign
router.post("/appeal/campaign", (req, res, next) => { })

// Update an Appealed campaign
router.put("/campaign/:camp_id", (req, res, next) => { })

// Get all campaigns for a particular benif
router.get("/campaigns", (req, res, next) => { })

// Get a campaign for a particular benif
router.get("/campaigns/:camp_id", (req, res, next) => { })


// #################  Loans  ##################
// #################  Loans  ##################

// Appeal Loan
router.post("/appeal/loan", (req, res, next) => { })

// Update an Appealed Loan
router.put("/loans/:id", (req, res, next) => { })

// Get all loans for a particular user
router.get("/loans", (req, res, next) => { })

// Get a particular loans for a benificiary
router.get("/loans/:loan_id", (req, res, next) => { })

// Get a particular loans for a benificiary
router.post("/loans/return/:loan_id", (req, res, next) => { })


// #################  Analytics  ##################
// #################  Analytics  ##################

// Activity on a Campaign
router.get(path, function () { })

// Activity on Campaign(s) over a time period
router.get(path, function () { })

// Activity on Campaign(s) based on location
router.get(path, function () { })

module.exports = router