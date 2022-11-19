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

const GetAllAdmins = async (req, res, next) => {
    AdminModel.Admin.find({}).exec(function (error, data) {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
}


const AddNewAdmin = async (req, res, next) => {
    console.log("Got a request for creating a new Admin")
    console.log(req.body)
    let admin = await AdminModel.Admin.findOne({ email: req.body.email }).exec()
    console.log(admin)
    if (admin) {
        res.send("Admin Already Exists")
    } else {

        console.log("Admin for given credentials deos not exist! Creating Admin Now!!")
        AdminModel.Admin.create(req.body)
            .then(function (data) {
                console.log(data)
                res.status(200)
                res.json(data)
            })
            .catch((err) => { console.log(err) })
    }
}

const UpdateAdmin = async (req, res, next) => {
    await AdminModel.Admin.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
            contact: req.body.contact
        }
    )
    let newAdmin = await AdminModel.Admin.findById(req.params.id)
    res.json(newAdmin)
}
const DeleteAdmin = async (req, res, next) => {
    AdminModel.Admin.deleteOne({ _id: req.params.id }).exec(function (error, data) {
        if (error) {
            next(error)
        }
        res.json(data)
    })
}

// Authentication Operations
const ChangeAuthDetails = async (req, res, next) => {
    let admin = await AdminModel.Admin.findByIdAndUpdate(req.params.id,
        {
            email: req.body.email,
            password: req.body.password,
        }
    )
    let newAdmin = await AdminModel.Admin.findById(req.params.id)
    res.json(newAdmin)
}
const ChangeDetails = async (req, res, next) => {
    await AdminModel.Admin.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password,
            contact: req.body.contact
        }
    )
    let newAdmin = await AdminModel.Admin.findById(req.params.id)
    res.json(newAdmin)
}


// Manipulate Campaigns
const ApproveCampaign = async (req, res, next) => {

}


module.exports = {
    AddNewAdmin,
    UpdateAdmin,
    GetAdmin,
    GetAllAdmins,
    ChangeAuthDetails,
    ApproveCampaign,
    DeleteAdmin,
}