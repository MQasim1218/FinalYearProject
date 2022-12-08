const AdminModel = require("../Models/AdminModel")
const { beneficiaryModel } = require("../Models/BenificiaryModel")
const donorModel = require("../Models/DonorModel")



const authorize = async (req, res, next) => {


    let auth = req.headers.authorization
    let { userType } = req.body
    // console.log("auth: ", auth)
    if (auth == null) {
        console.log("No token recieved in the header!!")
        return res.status(401).send("You are not authenticated!!")
    }
    let token = auth.split(' ')[1]
    try {
        let jwtPayload = jwt.verify(token, process.env.JWT_SECRET)
        let { id } = jwtPayload
        if (id == null) {
            console.log("The User Id not stored in the Token!!")
            res.status(404).json({ User: null })
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
        if (req.user != null)
            return res.send("Token verification failed")

        next()
    } catch (error) {
        console.log("Token verification failed")
        res.send("Token unrecognized")
    }
}

module.exports = authorize