const express = require('express')
const { beneficiaryModel } = require('../../Models/Users/BeneficiaryModel')
const SpecCapmaignModel = require('../../Models/Campaings/SpecificCampaign')
const LoanModel = require('../../Models/Campaings/LoanModel')
const authorize = require('../../middleware/authorization')
const multer = require('multer')
const { AppealCampaign } = require('../../Controllers/Campaigns/SpecCampaignCntrlr')
const benefAppealModel = require('../../Models/Campaings/benifAppeal')
const axios = require('axios')



// const { callVerifyImages } = require('../../utils/grpcClient')


let router = express.Router()
// #################  Authentication  ##################
// #################  Authentication  ##################



// Add a particular beneficiary by his/her id
// FIXME - There is an error with Beneficiary signup. The user is created in db but an error is returned...
router.post('/signup', async (req, res, next) => {

    let auth_res = await beneficiaryModel.signup(req.body)

    if (!auth_res) {
        console.log("Authentication failed! Cant create your beneficiary account!")
        return res.send("Cant create the beneficiary account!")
    }

    let { benef, token } = auth_res
    console.log("Benef recieved: ", benef)

    return res.json({
        user: benef,
        token: token
    })

    // let ben = await beneficiaryModel.findOne({ email: req.body.email }).exec()
    // if (!ben) {
    //     beneficiaryModel.create(req.body)
    //         .then(function (data) {
    //             console.log(data)
    //             res.status(200)
    //             res.json(data)
    //         }).catch((err) => { console.log(err) })
    // }
})

// Sign Beneficiary into the account
router.post("/login", async (req, res, next) => {
    console.log("Our request hit here!")
    console.log("Request Recieved: ", req.body)

    let { email, password } = req.body
    let login_res = await beneficiaryModel.login(email, password)

    if (!login_res) {
        console.log("Some error occured with Beneficiary Authentication")
        return res.status(500).send("Can not sign you in due to some error")
    }
    let { beneficiary, token } = login_res
    console.log(beneficiary)
    return res.json({
        user: beneficiary,
        token: token
    })
})

// Needs tobe uncommented after the big meeting.. Doing this to bypass authorization!!
// ! router.use(authorize)

// #################  CRUD  ##################
// #################  CRUD  ##################

// Get a particular beneficiary by his/her id
router.get('/single/:id', (req, res, next) => {
    beneficiaryModel.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
})


// Get all beneficiaries
router.get('/', function (req, res, next) {
    beneficiaryModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        console.log("All benefis", data)
        res.json(data);
    });
})


// Delete a beneficiary.
router.delete('/:id', function (req, res, next) {
    beneficiaryModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
})


// // Create a storage for multer
// const storage = multer.diskStorage({
//     // ! Will need to change the storage destination in the main code!
//     destination: '../temp/',
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '_' + file.originalname);
//     }
// });

// const upload_files = multer({ storage: storage });


// NOTE - This is to update or upload a file for the beneficiary
// router.put('/upload_file', upload_files.array('images'), (req, res, next) => { })
// router.post('/upload_file', upload_files.array('images'), (req, res, next) => { })


// #################  Capmaigns  ##################
// #################  Capmaigns  ##################


// Create a multer storage instance
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Set the destination folder for uploaded files
        cb(null, "./temp/");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}`);
    },
});


// Create a multer upload instance
const upload = multer({ storage });

// Appeal a campaign
router.post("/appeal/", upload.array('images'), async (req, res, next) => {

    try {
        console.log("The request received is:", req.body);
        console.log("The uploaded files are:", req.files);

        // Access the form data
        const { case_title, description, category, benefId, campaign_docs } = req.body;

        console.log("THe docs are: ", campaign_docs)

        // Access the uploaded files
        const uploadedFiles = req.files.map((file) => file.filename);

        // Create the appeal object
        const appeal = await benefAppealModel.create({
            case_title,
            description,
            category,
            campaign_docs,
            benefId,
        });

        // Send the response
        res.status(200).json(appeal);


        // Send the files to the backend for verification
        // You can perform any required operations with the uploaded files here

        // Send the files to the backend for verification
        const verificationPayload = {
            files: uploadedFiles,
            // Include any additional data required for verification
        };

        const verificationEndpoint = "http://localhost:3003/verify"; // Replace with the actual endpoint URL

        // Make the Axios POST request to the verification endpoint
        console.log("Sending the backend request for verification!")
        try {
            // let preds = await axios.post(verificationEndpoint, verificationPayload);
            console.log("The predictions returned are: Nothing for now!")

        } catch (error) {
            console.log("Failed in verifiaction!")
        }

        // You can handle the response from the verification server here

    } catch (error) {
        console.log("Error:", error.message);
        next(error);
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

// Get all campaigns for a particular benef
router.get("/:id/campaigns", async (req, res, next) => {
    try {
        let ben = await beneficiaryModel.findById(req.params.id).populate('requested_campaigns').exec()
        if (ben) {
            res.json(ben.requested_campaigns)
        } else console.log("Beneficiary id is not valid")

    } catch (error) {
        console.log("Error occured while fetching data for beneficiary campaings")
        console.log(error)
    }
})

// Get a campaign for a particular benef
router.get("/:id/campaigns/:camp_id", async (req, res, next) => {
    try {
        let ben = await beneficiaryModel.findById(req.params.id).populate('requested_campaigns').exec()
        if (ben) {
            let camp = ben.requested_campaigns.find(camp => val._id === req.params.camp_id)
            res.json(camp)
        } else console.log("Beneficiary id is not valid")
    } catch (error) {
        console.log("Error occured while fetching data for beneficiary campaings")
        console.log(error.message)
        res.send(error.message)
    }
})


// #################  Loans  ##################
// #################  Loans  ##################

// Appeal Loan
router.post("/appeal/:benef_id/loan", async (req, res, next) => {
    try {
        let loan = await LoanModel.create(req.body)
        console.log(loan)
        loan.beneficiary = req.params.benef_id

        beneficiaryModel.findByIdAndUpdate(
            req.params.benef_id,
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
router.get("/:id/loans", async (req, res, next) => {
    try {
        let bf = await beneficiaryModel.findById(req.params.id).exec()
        if (bf) {
            res.json(bf.requested_loans)
        } else {
            res.send("The beneficiary has on campaigns")
        }
    } catch (error) {
        console.log("Not able to get beneficeries")
    }

})

// Get a particular loans for a beneficiary
router.get("/:id/loans/:loan_id", async (req, res, next) => {
    try {
        let bf = await beneficiaryModel.findById(req.params.id).exec()
        if (bf) {
            let loan = bf.requested_loans.find(loan => loan._id === req.params.loan_id)
            res.json(loan)
        } else {
            res.send("The beneficiary has on campaigns")
        }
    } catch (error) {
        console.log("Not able to get beneficeries")
    }
})

// Get a particular loans for a beneficiary
router.post("/:id/loans/return/:loan_id", async (req, res, next) => {
    let loan = LoanModel.findById(req.params.loan_id).exec()
    if (!loan) {
        console.log("Incorrect Loan Id entered!")
    }

})

// #################  Analytics  ##################
// #################  Analytics  ##################

// Activity on a Campaign
// router.get(path, function () { })

// // Activity on Campaign(s) over a time period
// router.get(path, function () { })

// // Activity on Campaign(s) based on location
// router.get(path, function () { })

module.exports = router