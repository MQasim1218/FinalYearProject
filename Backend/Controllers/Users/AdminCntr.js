const AdminModel = require("../../Models/Users/AdminModel")
const GeneralCampaignModel = require("../../Models/Campaings/GeneralCampaigns")
const SpecificCampaignModel = require("../../Models/Campaings/SpecificCampaign")
const AdminDonations = require("../../Models/Donations/DonationAdmin")
const DonorModel = require("../../Models/Users/DonorModel")
const benefAppealModel = require("../../Models/Campaings/benifAppeal")

// Crud Operations
const GetAdmin = async (req, res, next) => {
    try {
        AdminModel.findById(req.params.id)
            .exec(function (error, data) {
                if (error) {
                    return next(error)
                }
                res.json(data)
            })
    } catch (error) {
        console.log(error)
        next(error)
    }

}

const GetDonorsForAdminCampaigns = async (req, res, next) => {
    try {

        /**
         * Step 1: Get all the Admin donations of the Admin
         * Step 2: Get the donorIds from the Admin Donations
         * Step 3: Fetch all the donors from the DonorIds.
         */

        let adminDons = await AdminDonations.find({ admin: req.params.id }).exec()
        if (!adminDons)
            return res.send("no donations by the Admin")

        console.log("Admin dons are: ", adminDons)

        let donorIds = adminDons.map((don) => don.donorId)
        console.log("Donor Ids are: ", donorIds)

        DonorModel.find({
            _id: { $in: donorIds }
        })
            .exec(function (error, data) {
                if (error) {
                    return next(error)
                }
                // console.log()
                res.json(data)
            })
    } catch (error) {
        console.log(error)
        next(error)
    }

}

const GetAllAdmins = async (req, res, next) => {
    console.log(req.body)
    AdminModel.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
}

const AddNewAdmin = async (req, res, next) => {
    try {
        console.log("Got a request for creating a new Admin")
        console.log(req.body)

        let usr = await AdminModel.signup(req.body)

        if (!usr) {

            console.log("Cannot create an admin. Some error occured!")
            return res.send("Admin creation failed!")
        }
        let { user, token } = usr
        res.json({ user, token })
    } catch (error) {
        console.log("Error encountered: ", error.message)
        res.send("Admin Creation Failed")
        // next(error)
    }
}

const SignInAdmin = async (req, res, next) => {
    try {
        let { user, token } = await AdminModel.login(req.body.email, req.body.password)

        if (user) {
            console.log("Admin logged in: ", user)
            res.json({ user, token })
        } else {

        }
    } catch (error) {
        console.log("Error encountered: ", error.message)
        next(error)
    }
}

const UpdateAdmin = async (req, res, next) => {
    await AdminModel.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
            chatId: req.body.chatId,
            picture: req.body.picture,
            contact: req.body.contact
        }
    )
    let newAdmin = await AdminModel.findById(req.params.id)
    res.json(newAdmin)
}

// const DeleteAdmin = async (req, res, next) => {
//     AdminModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
//         if (error) {
//             next(error)
//         }
//         res.json(data)
//     })
// }

// Authentication Operations
const ChangeAuthDetails = async (req, res, next) => {
    try {
        let admin = await AdminModel.findByIdAndUpdate(req.params.id,
            {
                email: req.body.email,
                password: req.body.password,
            }
        )
        let newAdmin = await AdminModel.findById(req.params.id)
        res.json(newAdmin)

    } catch (error) {
        console.log("errror aa gya hai boss")
        res.send(error.message)
    }
}

const ChangeDetails = async (req, res, next) => {
    await AdminModel.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
            chatId: req.body.chatId,
            contact: req.body.contact
        }
    )
    let newAdmin = await AdminModel.findById(req.params.id)
    res.json(newAdmin)
}

// Manipulate Campaigns
const AddGeneralCampaign = async (req, res, next) => {

    try {

        console.log("The data recieved from the frontend is: ", req.body)

        let newCampaign = await GeneralCampaignModel.create(req.body)
        console.log("New campaign created")


        await AdminModel.updateOne(
            { _id: req.params.id },
            { $push: { general_campaigns: newCampaign._id } }
        ).exec()
        let admin = await AdminModel.findById(req.params.id).exec()
        res.json(admin)

    } catch (err) {
        console.log("err: ", err.message)
        res.send(err)
    }
    console.log("Adding Campaign for the Admin: ", req.params.id)
    // res.send("Got the control here")

}

const ViewGeneralCampaigns = async (req, res, next) => {
    try {
        let admin = await AdminModel.findById(req.params.id).populate('general_campaigns').exec()
        let genr_ids = admin.general_campaigns
        let genr_campaigns = await GeneralCampaignModel.find({ id: { $in: genr_ids } }).exec()
        res.json(genr_campaigns)
    } catch (error) {
        res.status(500).send(error)
    }
}

const ViewSpecificCampaigns = async (req, res, next) => {
    try {
        let admin = await AdminModel.findById(req.params.id).populate('specific_campaigns').exec()
        let spec_ids = admin.specific_campaigns
        let spec_campaigns = await SpecificCampaignModel.find({ id: { $in: spec_ids } }).exec()
        res.json(spec_campaigns)
    } catch (err) {
        res.status(500).send(err)
    }
}

const ViewAppealedCases = async (req, res, next) => {
    console.log("over here")
    try {
        let appealed = await benefAppealModel.find({ verified: false }).populate('benefId').exec()
        console.log(appealed)
        res.send(appealed)
    } catch (error) {
        res.send(error)
    }
}

const ApproveAppeal = async (req, res, next) => {
    try {
        let appeal = await benefAppealModel.findById(req.params.appeal_id).exec()
        console.log(appeal)
        appeal.verified = true
        res.send(appeal)
        appeal.save()

        return
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}

const RejectCampiagnRequest = async (req, res, next) => {
    try {
        let camp = await SpecificCampaignModel.findById(req.params.campaign_id).exec()
        console.log(camp)
        if (camp.approved === true) {
            res.send("This campaign cannot be rejected!")
        } else if (camp.rejected === false) {
            camp.rejected = true
            camp.save()
            res.send(camp)
        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err)
    }
}


module.exports = {
    GetAdmin,
    AddNewAdmin,
    UpdateAdmin,
    // DeleteAdmin,
    SignInAdmin,
    GetAllAdmins,
    ChangeDetails,
    ApproveAppeal,
    ChangeAuthDetails,
    AddGeneralCampaign,
    ViewGeneralCampaigns,
    RejectCampiagnRequest,
    ViewSpecificCampaigns,
    ViewAppealedCases,
    GetDonorsForAdminCampaigns
}