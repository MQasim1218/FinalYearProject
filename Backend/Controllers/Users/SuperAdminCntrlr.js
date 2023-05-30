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
const fs = require('fs');
const envfile = require('envfile');



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
            res.status(500).send("Incorrect Credentials")
        }
    } catch (error) {
        console.log("Error encountered: ", error.message)
        next(error)
    }
}

// Get all the Donations 
const ChangePassword = async (req, res, next) => {
    try {
        console.log("We are here, resetting the Superadmins email!!")

        // Set the Pass to the new pass!
        process.env.SUPERADMIN_PASSWORD = req.body.pass

        dotenv.config({ path: "../../.env" })

        console.log("Super Admin Saved successfully!!")
    } catch (err) {
        console.log(err.message)
    }
}

// Get Donations made in a month...
// FIXME: UNable to update the SuperAdmin Email or password in the Backend!
const ChangeEmail = async (req, res, next) => {
    try {
        console.log("We are here, resetting the Superadmins email!!")
        // Set the Pass to the new pass!
        console.log("Email recieved is: ", req.body.email)
        let sp = "../../.env"
        let parsedFile = envfile.parse(sp);

        process.env.SUPERADMIN_EMAIL = req.body.email

        // Write the updated values back to the .env file
        fs.writeFileSync(sp, envfile.stringify(parsedFile));



        console.log(process.env.SUPERADMIN_EMAIL)

        dotenv.config({ path: "../../.env" })

        console.log("Super Admin Updated successfully!!")
        res.json({ email: process.env.SUPERADMIN_EMAIL, pass: process.env.SUPERADMIN_PASSWORD })
    } catch (err) {
        console.log(err.message)
        next(err)
    }
}


// Get All the donations 

module.exports = {
    // CRUD Options!!
    SignIn,
    ChangeEmail,
    ChangePassword,
}