const AdminModel = require("../Models/AdminModel")
const GeneralCampaignModel = require("../Models/GeneralCampaigns")
const SpecificCampaignModel = require("../Models/SpecificCampaign")

// Crud Operations
const GetAdmin = async (req, res, next) => {
    try {
        AdminModel.find({ _id: req.params.id })
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
        let admin = await AdminModel.findOne({ email: req.body.email }).exec()
        console.log(admin)
        if (admin) {
            res.send("Admin Already Exists")
        } else {
            console.log("Admin for given credentials deos not exist! Creating Admin Now!!")
            AdminModel.create(req.body)
                .then(function (data) {
                    console.log(data)
                    res.status(200)
                    res.json(data)
                })
                .catch((err) => {
                    console.log(err)
                    res.send(err.message)
                })
        }
    } catch (error) {
        console.log("Error encountered: ", error.message)
        next(error)
    }
}


const SignInAdmin = async (req, res, next) => {
    try {
        console.log("Got a request for SignIn")
        console.log(req.body)
        let admin = await AdminModel.findOne({ email: req.body.email }).exec()
        console.log(admin)
        if (admin) {
            console.log("Admin with the given Email Exists")
            if (admin.password === req.body.password) {
                res.send(true)
            } else {
                res.send(false)
            }
        } else {
            res.send(false)
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
            contact: req.body.contact
        }
    )
    let newAdmin = await AdminModel.findById(req.params.id)
    res.json(newAdmin)
}

const DeleteAdmin = async (req, res, next) => {
    AdminModel.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
}

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
            contact: req.body.contact
        }
    )
    let newAdmin = await AdminModel.findById(req.params.id)
    res.json(newAdmin)
}


// Manipulate Campaigns
const AddGeneralCampaign = async (req, res, next) => {

    try {
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

const ViewAppealedCampaigns = async (req, res, next) => {
    console.log("over here")
    try {
        let appealed = await SpecificCampaignModel.find({ approved: false }).exec()
        res.send(appealed)
    } catch (error) {
        res.send(error)
    }
}

const ApproveCampaign = async (req, res, next) => {
    try {
        let camp = await SpecificCampaignModel.findById(req.params.campaign_id).exec()
        console.log(camp)
        if (camp.rejected === true) {
            res.send("This campaign is already rejected, Cant be approved!")
        } else if (camp.approved === false) {
            camp.approved = true
            res.send(camp)
            camp.save()
        }
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
    DeleteAdmin,
    SignInAdmin,
    GetAllAdmins,
    ChangeDetails,
    ApproveCampaign,
    ChangeAuthDetails,
    AddGeneralCampaign,
    ViewGeneralCampaigns,
    RejectCampiagnRequest,
    ViewSpecificCampaigns,
    ViewAppealedCampaigns
}