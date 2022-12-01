const DonorModel = require("../Models/DonorModel")
const DonationModel = require("../Models/DonationModel")
const SpecificCampaign = require("../Models/SpecificCampaign")
const GeneralCampaign = require("../Models/GeneralCampaigns")
const { ViewSpecificCampaigns } = require("./AdminCntr")


const DonorSignUp = async (req, res, next) => {
    let donor = await DonorModel.findOne({ email: req.body.email }).exec()
    console.log(donor)
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
    DonorModel.findOne({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                console.log("Resource not in donor/:id - Skipping this route altogether!!")
                return next()
            }
            res.json(data)
        })
}

const Donate = async (req, res, next) => {
    // Must recieve data
    // - Donation amount
    // - Donor ID 
    // - Donation Type
    try {
        // Create a donation entry
        // The real part with Stripe need to be tackled in the later implementation.
        let donation_entry = await DonationModel.create(req.body)
        if (!donation_entry) {
            res.send("Couldnt create a donation entry!")
        }
        let campaign = null

        if (req.body.camp_type === "Specific") {
            campaign = await SpecificCampaign.findByIdAndUpdate(
                req.params.campaign_id,
                { $push: { donations: donation_entry._id } }
            )

            await DonorModel.findByIdAndUpdate(
                req.body.donor,
                { $push: { donated_campaigns_specific: req.params.campaign_id } }
            )
        } else if (req.body.camp_type === "General") {
            campaign = await GeneralCampaign.findByIdAndUpdate(
                req.params.campaign_id,
                { $push: { donations: donation_entry._id } }
            )

            await DonorModel.findByIdAndUpdate(
                req.body.donor,
                { $push: { donated_campaigns_general: req.params.campaign_id } }
            )
        }
        res.json({ donation_entry, campaign })

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

const UpdateDonor = async (req, res, next) => {
    try {
        await DonorModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password,
                contact: req.body.contact,
                location: req.body.location
            }
        )
        let donor = await DonorModel.findById(req.params.id).exec()
        res.json(donor)
    } catch (error) {
        console.log("Error while updating the Donor")
        // res.send(error.message)
        next(error)
    }
}

const SearchCampaignByFilter = async (req, res, next) => {
    try {
        console.log("the request is in here!")
        let available = { specific: null, general: null }

        let spec_av = await SpecificCampaign.find(
            {
                $or: [
                    {
                        campaign_title: {
                            $regex: /[${req.body.title}]/igm
                        }
                    },
                    // Have to implement search based on Location.
                    // {
                    //     location: {}
                    // },

                    {
                        createdAt: {
                            $lte: req.body.end_date,
                            $gte: req.body.start_date
                        }
                    },

                ],

                completed: { $in: [false, null] },
                approved: true
            }).exec()
        let genr_av = await GeneralCampaign.find({
            $or: [{
                campaign_title: {
                    $regex: /[${req.body.title}]+/igm
                }
            },
            // Have to implement search based on Location.

            {
                createdAt: {
                    $lte: req.body.end_date,
                    $gte: req.body.start_date
                }
            }
            ],

            completed: { $in: [false, null] },
            approved: true
        }).exec()

        available.specific = spec_av
        available.general = genr_av

        res.json(available)

    } catch (error) {
        console.log("Error occured while searchign campaigns")
        res.send("Error occured: " + error.message)
    }
}

const SearchCampaignByTitle = async (req, res, next) => {
    try {
        let available = { specific: null, general: null }
        // , completed: false, approved: true
        console.log(req.body.title)
        let spec_av = await SpecificCampaign.find({ campaign_title: /[${req.body.title}]+/gmi }).exec()
        let genr_av = await GeneralCampaign.find({ campaign_title: /[${req.body.title}]+/gmi }).exec()

        available.specific = spec_av
        available.general = genr_av

        res.json(available)
        // res.json(JSON.stringify(available))

    } catch (error) {
        console.log("Error occured while searchign campaigns")
        res.send("Error occured: " + error.message)
    }
}

const GetDonatedCapmaigns = async (req, res, next) => { }

const GetDonations = async (req, res, next) => {
    try {
        let donations = await DonationModel.find({ donor: req.body.donor_id })
        res.json(donations)
    } catch (error) {
        res.send(error.message)
    }
}

const SearchAvailableCampaigns = async (req, res, next) => {
    try {
        let available = { specific: null, general: null }

        let specific_av = await SpecificCampaign.find({ approved: true, completed: { $in: [false, null] } }).exec()
        if (specific_av) available.specific = specific_av
        // completed: false, approved: true
        let general_av = await GeneralCampaign.find({ approved: true, completed: { $in: [false, null] } })
        if (general_av) available.general = general_av

        // res.json(JSON.stringify(available))
        res.json(available)

    } catch (error) {
        console.log("Got a error while fetching the campaigns")
        console.log("Error: ", error.message)
        res.send("Error occured: " + error.message)
    }
}

module.exports = {
    SearchCampaignByTitle,
    SearchAvailableCampaigns,
    SearchCampaignByFilter,
    GetDonations,
    DonorSignIn,
    DonorSignUp,
    UpdateDonor,
    AllDonors,
    GetDonor,
    Donate
}