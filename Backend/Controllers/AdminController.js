const AdminModel = require("../Models/AdminModel")

// Crud Operations
const GetAdmin = async (req, res, next) => {
    AdminModel.Admin.find({ _id: req.params.id })
        .exec(function (error, data) {
            if (error) {
                return next(error)
            }
            res.json(data)
        })
}

const GetAllAdmin = async (req, res, next) => { }


const AddNewAdmin = async (req, res, next) => {
    AdminModel.Admin.find({ email: req.body.email }).exec((err, result) => {
        if (error) {
            console.log("Admin for given credentials deos not exist! Creating Admin Now!!")
            AdminModel.create(req.body)
                .then(function (data) {
                    console.log(data)
                    res.status(200)
                    res.json(data)
                })
                .catch((err) => { console.log(err) })
        }
        if (result !== undefined) {
            console.log("The Admin already exists")
            res.json(result)
        }
    })

}

const UpdateAdmin = async (req, res, next) => { }
const DeleteAdmin = async (req, res, next) => { }

// Authentication Operations
const ChangeAuthDetails = async (req, res, next) => { }
const ChangeDetails = async (req, res, next) => { }


// Manipulate Campaigns
const ApproveCampaign = async (req, res, next) => {

}


module.exports = {
    AddNewAdmin,
    UpdateAdmin,
    GetAdmin,
    ChangeAuthDetails,
    ApproveCampaign,
    DeleteAdmin,
}