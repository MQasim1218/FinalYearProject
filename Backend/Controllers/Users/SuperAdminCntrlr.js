// TODO: THIS File is a serious todo.. needs to be implemented tonight!!
/**
 * 
 * Super Admin Actions.. Not the Actions related to the SuperAdmin Donations
 * Super Admin Donations are dealt by Another controller
 * 
 * Super Admin can:
 *  1. Make Account ??
 *  2. Update Account details ??
 *  3. Make Account ??
 *  4. Register a donation.
 *  5. 
 */

const SuperAdminModel = require("../../Models/Users/SuperAdmin")
const dotenv = require('dotenv')



// NOTE: This function returns all the Donations made by the SuperAdmin. 
const UpdateAccountDetails = async (req, res, next) => {
    
}

const SignIn = async (req, res, next) => {
    try {
        let { user, token } = await SuperAdminModel.login(req.body?.email, req.body?.password)

        if (user) {
            console.log("Admin logged in sucessfully", user)
            res.json({ user, token })
        } else {
            console.log("Incorrect Credentials!!")
            res.send("Incorrect Credentials")
        }
    } catch (error) {
        console.log("Error encountered: ", error.message)
        next(error)
    }
}

// Get all the Donations 
const ChangePassword = async (req, res, next) => {
    try {
        // Set the Pass to the new pass!
        process.env.SUPERADMIN_PASSWORD = req.body.new_pass

        dotenv.config({ path: "../../.env" })

        console.log("Super Admin Saved successfully!!")
    } catch (err) {
        console.log(err.message)
    }
}

// Get Donations made in a month...
const ChangeEmail = async (req, res, next) => {
    try {
        // Set the Pass to the new pass!
        process.env.SUPERADMIN_EMAIL = req.body.new_email

        dotenv.config({ path: "../../.env" })

        console.log("Super Admin Updated successfully!!")
    } catch (err) {
        console.log(err.message)
    }
}


// Get All the donations 

module.exports = {
    // CRUD Options!!
    SignIn,
    ChangeEmail,
    ChangePassword,

    // SuperAdmin Actions!!
    DonateToAdmin, // Send money to Admin
    RegisterDonorDonation
}