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

const Donate = async (req, res, next) => {
    // Must recieve data
    // - Donation amount
    // - Campaing Id
    try {
        let donation_entry = await DonationModel.create(req.body)
        if (donation_entry) {
            res.status(500).send("couldnt craete donation for some reason")
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    DonorSignIn,
    DonorSignUp,
    Donate
}