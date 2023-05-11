const DonorModel = require("../../Models/Users/DonorModel")
const bcrypt = require("bcrypt")

// ! This file needs serious updates to routes and the controller functions
const DonorDonations = require("../../Models/Donations/DonationDonor")
const SpecificCampaign = require("../../Models/Campaings/SpecificCampaign")
const GeneralCampaign = require("../../Models/Campaings/GeneralCampaigns")

const stripe = require('stripe')('sk_test_51N4jJpD4d2tkTPKs2hMsKxF6cI2qEJALDyfgJzoXzAP1sdplbgi8H4R7wOFomnMN722KG6pXBOlkeEERlBDyJiM300tMCNI0t1')


const DonorSignUp = async (req, res, next) => {
    // let donor = await DonorModel.findOne({ email: req.body.email }).exec()
    // console.log(donor)
    // if (!donor) {
    //     console.log("No donor with the given Email exists!!")
    //     console.log("Creating a donor now!!")
    //     DonorModel.create(req.body)
    //         .then(function (data) {
    //             console.log(data)
    //             res.status(200)
    //             res.json(data)
    //         }).catch((err) => { console.log(err) })
    // } else
    //     res.status(500).send("donor already exists!")
    try {
        console.log("Got a request for creating a new Donor")
        let auth_res = await DonorModel.signup(req.body)
        if (!auth_res) {
            console.log("Cannot create an donor. Some error occured!")
            return res.send("Donor creation failed!")
        }

        // If values are returned from the signup function
        let { user, token } = auth_res
        console.log("Donor: ", user)
        res.json({ user, token })
    } catch (error) {
        console.log("Error encountered: ", error.message)
        res.send("Donor Creation Failed")
    }

}

const DonorSignIn = async (req, res, next) => {

    console.log("Request Recieved: ", req.body)

    let { email, password } = req.body
    let login_res = await DonorModel.login(email, password)

    if (!login_res) {
        console.log("Some error occured while Donor Authentication")
        return res.status(500).send("Can not sign you in due to some error")
    }
    let { user, token } = login_res
    console.log("Logged in Donor: ", user)
    return res.json({
        user,
        token
    })
    // let donor = await DonorModel.findOne({ email: req.body.email }).exec()
    // console.log(donor)
    // if (!donor) {
    // console.log("No donor with the given Email exists!!")
    // res.status(404).send("Donor credentials are incorrect")
    // } else {
    // res.status(500).send("donor found")
    // console.log("Donor found!!")
    // if (req.body.password === donor.password) {
    // console.log("Donor signed in")
    // res.json(donor)
    // } else {
    // res.status(404).send("Incorrect password entered")
    // }
    // }
}

const AllDonors = async (req, res, next) => {
    console.log("Getting all the donors")

    // Either the data obj has no entity deleted, or the entitiy is set to false
    DonorModel.find({
        $or: [
            { deleted: { $exists: false } },
            { deleted: false }
        ]
    }).sort({ createdAt: 'desc' }).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        // console.log(data)
        res.json(data);
    });
}

const GetDonor = async (req, res, next) => {
    DonorModel.findOne({ _id: req.params.id })
        .exec(function (error, donor) {
            if (error) {
                console.log("No donor with the given ID exists!!")
                return next()
            }

            if (donor.deteted == true) { }

            res.json(donor)
        })
}


/**
 * Donation flow.
 * Donor is making the donation -- so -- lets assume we are gonna use stripe for this.
 * ! Does the donor donate to the campain :: Currently ----NO----
 * ! Doesnt the SuperAdmin simple register the donor donation. SOME CASES. Donor has to be able to make donations on his own aswell
 * 
 * SECTION: Stripe Architecture
 * One main account - SuperAdmin Account!
 * SuperAdmin creates a payment intent -- But how?? the SA doesnt know how much the donor wants to donate
 * NOTE: Possible solution. Donor can select the amount he/she wants to donate from his/her portal.
 * The donor submits the form on the portal that conatains the details, the the stripe checkout the collects 
 * that information to make a custom checkout-page for the donation.  
 */
const Donate = async (req, res, next) => {
    // Must recieve data
    // - Donation amount
    // - Donor ID 
    // - Donation Category
    // - 
    try {
        console.log("Making the donatios as donor")

        // Do the Stripe process first
        let session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1N4l7LD4d2tkTPKse5AzTfAg",
                    quantity: 1
                },
            ],
            mode: 'payment',
            submit_type: 'donate',

            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        })




        // Create a donation entry
        let donation_entry = await DonorDonations.create(req.body)
        if (!donation_entry) {
            return res.send("Couldnt create a donation entry for the donor!!")
        }

        // ! This needs tobe looked into..
        // ! As our donor can no longer directly donate to a campaign, this is no longer a valid operation!
        // ! Keeping this so that maybe later, we may add fuctionality for direct donations.
        // ! Which basically go directly to the Admin controlling the donation
        // let campaign = null

        // if (req.body.camp_type === "Specific") {
        //     campaign = await SpecificCampaign.findByIdAndUpdate(
        //         req.params.campaign_id,
        //         { $push: { donations: donation_entry._id } }
        //     )

        //     await DonorModel.findByIdAndUpdate(
        //         req.body.donor,
        //         { $push: { donated_campaigns_specific: req.params.campaign_id } }
        //     )
        // } else if (req.body.camp_type === "General") {
        //     campaign = await GeneralCampaign.findByIdAndUpdate(
        //         req.params.campaign_id,
        //         { $push: { donations: donation_entry._id } }
        //     )

        //     await DonorModel.findByIdAndUpdate(
        //         req.body.donor,
        //         { $push: { donated_campaigns_general: req.params.campaign_id } }
        //     )
        // }

        // Redirect the user to the Stripe Page
        return res.redirect(303, session.url)
        // res.json(donation_entry)

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


// Need to test this if this works fine.
const UpdateDonor = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body?.password, 10)
    try {
        await DonorModel.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body?.name,
                age: req.body?.age,
                email: req.body?.email,
                password: hashedPassword,
                contact: req.body?.contact,
                picture: req.body?.picture,
                location: req.body?.location
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

/**
 * NOTE: This whole controller lets donors search campaigns.
 * Since a donor cannot directly donate to a campaign, is it necessary to let donor browse??
 * It can be a lead page to each donation page with a single 
 * ...donate button to make a general donation to a category. 
 */
const SearchCampaignByFilter = async (req, res, next) => {
    try {
        console.log("the request is in here!")
        let available = { specific: null, general: null }

        let spec_av = await SpecificCampaign.find(
            {
                $or: [
                    {
                        campaign_title: {
                            $regex: /[${req.params.title}]/igm
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

const GetDonatedCapmaigns = async (req, res, next) => {
    try {
        let donor = await DonorModel.findOne({ _id: req.params.id })
            .populate('donated_campaigns_specific')
            .populate('donated_campaigns_general')
            .exec()
        res.json([...donor.donated_campaigns_specific, ...donated_campaigns_general])
    } catch (error) {
        res.send(error.message)
    }
}

const GetDonations = async (req, res, next) => {
    try {
        let donations = await DonationModel.find({ donor: req.params.id }).populate('donor')

        console.log(donations)
        res.json(donations)
    } catch (error) {
        res.send(error.message)
    }
}

const SearchAvailableCampaigns = async (req, res, next) => {
    console.log("Getting all the available campaigns")

    try {
        let available = { specific: null, general: null }

        let specific_av = await SpecificCampaign
            .find({
                approved: true,
                completed: { $in: [false, null] }
            })
            .sort({ createdAt: "desc" }) // Do we need to populate any feilds??
            .exec()


        if (specific_av) available.specific = specific_av
        // completed: false, approved: true
        let general_av = await GeneralCampaign.find(
            {
                approved: true,
                completed: { $in: [false, null] }
            }
        )
        if (general_av) available.general = general_av

        // res.json(JSON.stringify(available))
        res.json(available)

    } catch (error) {
        console.log("Got a error while fetching the campaigns")
        console.log("Error: ", error.message)
        res.send("Error occured: " + error.message)
    }
}

const GetDeleted = async (req, res, next) => {
    try {
        let del_donors = await DonorModel
            .find({
                deleted: true
            })
            .exec()

        res.json(del_donors)
    } catch (error) {
        console.log("Error occured! Error: ", err.message)
        res.status(500).send("Failed to deleted donors!")
    }


}

const MarkDonorAsDeleted = async (req, res, next) => {

    try {
        let id = req.params.donor_id

        let result = await DonorModel.findByIdAndUpdate(id, { deleted: true }).exec()
        if (result) {
            console.log("The donor got removed sucesfully")
            res.json(result)
        }
    } catch (err) {
        console.log("Error occured! Error: ", err.message)
        res.status(500).send("Failed to mark donor as deleted!")
    }

}

// const DeleteDonor = async function (req, res, next) {
//     DonorModel.findOneAndUpdate(
//         { _id: req.params.id },
//         { deleted: true })
//         .exec(function (error, data) {
//             if (error) {
//                 next(error)
//             }
//             res.json(data)
//         })
// }

module.exports = {
    SearchAvailableCampaigns,
    SearchCampaignByFilter,
    SearchCampaignByTitle,
    GetDonatedCapmaigns,
    GetDonations,
    DonorSignIn,
    DonorSignUp,
    UpdateDonor,
    DeleteDonor,
    AllDonors,
    GetDonor,
    Donate,

    // Today's work: Mai 11, 2023
    MarkDonorAsDeleted,
    GetDeleted
}