const donorModel = require("../Models/DonorModel")
const donationModel = require("../Models/DonationModel")


const DonorSignUp = async (req, res, next) => {
    let donor = await donorModel.find({ email: req.body.email }).exec()
    if (!donor) {
        console.log("No donor with the given Email exists!!")
        console.log("Creating a donor now!!")
        DonorModel.create(req.body)
            .then(function (data) {
                console.log(data)
                res.status(200)
                res.json(data)
            }).catch((err) => { console.log(err) })
    } else
        res.status(500).send("donor already exists!")

}

const DonorSignIn = async (req, res, next) => {
    let donor = await DonorModel.find({ email: req.body.email }).exec()
    if (!donor) {
        console.log("No donor with the given Email exists!!")
        res.status(404).send("Donor credentials are incorrect")
    } else {
        // res.status(500).send("donor found")
        console.log("Donor found!!")
        if (req.body.password === donor.password) {
            console.log("Donor signed in")
            res.json(donor)
        } else {
            res.status(404).send("Incorrect password entered")
        }
    }
}

const AllDonors = async (req, res, next) => {
    DonorModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
}

const GetDonor = async (req, res, next) => {
    DonorModel.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                console.log("Resource not in donor/:id - Skipping this route altogether!!")
                return next(error)
            }
            res.json(data)
        })
}

const Donate = async (req, res, next) => {
    // Must recieve data
    // - Donation amount
    // - Donor ID 
    try {
        // Create a donation entry
        // The real part with Stripe need to be tackled in the later implementation.

        let donation_entry = await DonationModel.create(req.body)
        if (donation_entry) {
            res.status(500).send("couldnt craete donation for some reason\n Line: 53 Donor Controller")
        }

        let campiagn = SpecificCampaign.findByIdAndUpdate(
            req.params.campaign_id,
            { $push: { donations: donation_entry._id } }
        )

        res.json(donation_entry)

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}



module.exports = {
    DonorSignIn,
    DonorSignUp,
    AllDonors,
    GetDonor,
    Donate
}