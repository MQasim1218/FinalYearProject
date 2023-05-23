const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const SuperAdminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }, // required

    age: {
        type: Number,
        required: true,
        trim: true
    }, // required

    email: {
        type: String,
        // required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    }, // required

    password: {
        type: String,
        // required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain the word: "password"');
            }
        },
    }, // required
    chatId: {
        type: String,
        trim: true,
    }, // required
    contact: {
        type: String,
        // required: true,
        trim: true,
    }, // required


    deleted: {
        type: Boolean,
        default: false
    },

    location: {
        type: String,
        // required: true,
        trim: true,
    },

    city: {
        type: String,
        // required: true,
        trim: true,
    },

    Donations: {
        type: mongoose.Types.ObjectId,
        ref: 'AdminDonation'
    },

    DonorReference: {
        name: String,

    }

    // Audit Reports Done by the Particular Admin
    // audit_reports: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'audit'
    // }],
},
    {
        timestamps: true,
    }
)

const createJWT = async (_id) => {
    let secret = process.env.JWT_SECRET
    return jwt.sign({ id: _id, userType: "Admin" }, secret, { expiresIn: '1h' })
}

SuperAdminSchema.statics.login = async function (email, password) {
    // const emailEncrypted = await bcrypt.hash(email, salt)

    // console.log("I am here!!")
    // if (!user) {
    //     console.log("No admin with the provided email")
    //     return null
    // }
    // let token = await createJWT(user._id)
    // console.log(token)
    // let EMAIL, PASSWORD;


    let NAME = process.env.SUPERADMIN_NAME
    let EMAIL = process.env.SUPERADMIN_EMAIL
    let PASSWORD = process.env.SUPERADMIN_PASSWORD

    console.log("Name: ", NAME, "\tEmail: ", EMAIL, "\tPassword: ", PASSWORD)
    console.log("Email Provided: ", email, "\tPassword: ", PASSWORD)



    // Make the token for the SuperAdmin!
    let token = await createJWT(EMAIL)
    console.log("Token generated: ", token)

    // This needs to be handled with bcrypt hashing for the production!!
    if (password === PASSWORD && email === EMAIL) return { user: { NAME, EMAIL }, token: token }

    console.log("The password provided is incorrect!")
    return { user: null, token: null }

}

SuperAdminSchema.statics.signup = async function (admin) {
    try {
        let { name, age, email, password, contact, location, city } = admin
        const salt = await bcrypt.genSalt(13)
        const passEncrypted = await bcrypt.hash(password, salt)

        let exists = await this.findOne({ email }).exec()
        if (exists) {
            console.log("Alreay a same user exists")
            console.log(exists)
            return null
        }

        const user = await this.create({
            name: name, email: email,
            password: passEncrypted,
            age: age, location: location,
            city: city,
            contact: contact
        })
        let token = await createJWT(user._id)
        console.log("Created Token: ", token)
        return { admin: user, token: token }
    } catch (error) {
        console.log("Error occured During signup! Err: ", error.message)
        return null
    }
}

const SuperAdmin = mongoose.model('superadmin', SuperAdminSchema)

module.exports = SuperAdmin