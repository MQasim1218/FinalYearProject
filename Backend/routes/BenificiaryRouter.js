const e = require('express')
const express = require('express')
const BeneficiaryModel = require('../Models/BenificiaryModel')
const SpecCapmaignModel = require('../Models/SpecificCampaign')
const LoanModel = require('../Models/LoanModel')


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
router.post("/appeal/:benif_id/campaign", async (req, res, next) => {

    try {
        let sc = await SpecCapmaignModel.create(req.body)
        console.log(sc)
        sc.beneficiary = benif_id
        BeneficiaryModel.beneficiaryModel.findByIdAndUpdate(
            req.params.benif_id,
            { $push: { requested_campaigns: data._id } }
        )
        sc.save()

        res.status(200).json(sc)
    } catch (error) {
        console.log("Error: ", error.message)
        next(error)
    }

})


// Update an Appealed campaign
router.put("/campaign/:camp_id", async (req, res, next) => {
    try {
        let sc = await SpecCapmaignModel.findById(req.params.camp_id).exec()
        if (sc) {
            if (!(sc.approved || sc.rejected || sc.completed)) {
                sc.campaign_title = req.body.title
                sc.campaign_amount = req.body.amount
                sc.description = req.body.description
                sc.location = req.body.location
                sc.catagory = req.body.catagory

                console.log("Your appealed campaign has been approved.!")
                sc.save()
            }
            else {
                console.log("The Campaign cannot be altered")
            }
        }
    } catch (error) {
        console.log("Encountered an error while trying to update a campaign")
    }

})

// Get all campaigns for a particular benif
router.get("/:benif_id/campaigns", async (req, res, next) => {
    try {
        let ben = await BeneficiaryModel.beneficiaryModel.findById(req.params.benif_id).populate('requested_campaigns').exec()
        if (ben) {
            res.json(ben.requested_campaigns)
        } else console.log("Benificiary id is not valid")

    } catch (error) {
        console.log("Error occured while fetching data for benificiary campaings")
        console.log(error)
    }
})

// Get a campaign for a particular benif
router.get("/:benif_id/campaigns/:camp_id", async (req, res, next) => {
    try {
        let ben = await BeneficiaryModel.beneficiaryModel.findById(req.params.benif_id).populate('requested_campaigns').exec()
        if (ben) {
            let camp = ben.requested_campaigns.find(camp => val._id === req.params.camp_id)
            res.json(camp)
        } else console.log("Benificiary id is not valid")
    } catch (error) {
        console.log("Error occured while fetching data for benificiary campaings")
        console.log(error.message)
        res.send(error.message)
    }
})


// #################  Loans  ##################
// #################  Loans  ##################

// Appeal Loan
router.post("/appeal/:benif_id/loans", async (req, res, next) => {
    try {
        let loan = await LoanModel.create(req.body)
        console.log(loan)
        loan.beneficiary = benif_id
        BeneficiaryModel.beneficiaryModel.findByIdAndUpdate(
            req.params.benif_id,
            { $push: { requested_loans: loan._id } }
        )
        loan.save()
        res.status(200).json(loan)
    } catch (error) {
        console.log("Error: ", error.message)
        next(error)
    }
})

// Update an Appealed Loan
router.put("/loans/:loan_id", async (req, res, next) => {
    try {
        let loan = await LoanModel.findById(req.params.loan_id).exec()
        if (sc) {
            if (!(loan.approved || loan.rejected || loan.completed)) {
                loan.loan_type = req.body.loan_type
                loan.loan_amount = req.body.loan_amount
                loan.description = req.body.description
                loan.location = req.body.location
                loan.catagory = req.body.catagory

                console.log("Your appealed loan has been approved.!")
                sc.save()
            }
            else {
                console.log("The Campaign cannot be altered")
            }
        }
    } catch (error) {
        console.log("Encountered an error while trying to update a campaign")
        req.send(error.message)
    }
})

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