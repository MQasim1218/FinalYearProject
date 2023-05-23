const DonorModel = require("../../Models/Users/DonorModel")
const bcrypt = require("bcrypt")

// ! This file needs serious updates to routes and the controller functions
const DonorDonations = require("../../Models/Donations/DonationDonor")
const SpecificCampaign = require("../../Models/Campaings/SpecificCampaign")
const GeneralCampaign = require("../../Models/Campaings/GeneralCampaigns")



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
    // MarkDonorAsDeleted,
    AllDonors,
    GetDonor,
    

    // Today's work: Mai 11, 2023
    MarkDonorAsDeleted,
    GetDeleted
}