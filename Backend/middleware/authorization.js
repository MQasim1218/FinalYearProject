const AdminModel = require("../Models/AdminModel")
const { beneficiaryModel } = require("../Models/BenificiaryModel")
const donorModel = require("../Models/DonorModel")
const jwt = require('jsonwebtoken')


const authorize = async (req, res, next) => {


    let auth = req.headers.authorization
    // let { userType } = req.body

    // if (userType == null || userType == "") {
    //     return res.send("Authorization failed, User Type not specified!")
    // }
    // console.log("auth: ", auth)
    if (auth == null) {
        console.log("No token recieved in the header!!")
        return res.status(401).send("You are not authenticated!!")
    }


    let token = auth.split(' ')[1]
    console.log("Token: ", token)
    try {
        let jwtPayload = jwt.verify(token, process.env.JWT_SECRET)
        console.log("jwtPayload recieved is: ", jwtPayload)
        let { id, userType } = jwtPayload
        if (id == null) {
            console.log("The User Id not stored in the Token!!")
            res.status(404).send("No user Id stored in the Token")
        }

        // REVIEW - Not 100% certian about this part. Will delve into this implemetation soon! 
        switch (userType) {
            case "admin" || "Admin":
                req.user = await AdminModel.findById(id).exec()
                break;
            case "donor" || "Donor":
                req.user = await donorModel.findById(id).exec()
                break;
            case "benificiary" || "Benificiary":
                req.user = await beneficiaryModel.findById(id).exec()
                break;
            default:
                break;
        }
        if (req.user === null)
            return res.send("Token not recognized!")

        next()
    } catch (error) {
        console.log("Token verification failed")
        res.status(404).send(`Token verification failed: ${error.message}`)
    }
}

module.exports = authorize