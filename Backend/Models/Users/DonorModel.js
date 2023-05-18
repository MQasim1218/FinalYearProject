const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")
const accDetailsSchema = require('./AccountDetailsModel');
const jwt = require("jsonwebtoken");


// FIXME - for testing purposes, required sanction is commented out.. 
// TODO: Needs to be re-enabled for later
const donorSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
        type: String,
        // required: true,
        trim: true
    },
    age: {
        type: Number,
        // required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        // unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        // trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain the word: "password"');
            }
        },
    },
    chatId: {
        type: String,
        trim: true,
    }, // required


    // We need to be sure this is a valid url o not?? OR MAYBE no need to verify.
    // Not a crucial piece of information!
    picture: {
        type: String,
    },


    contact: {
        type: String,
        // required: true,
        trim: true
    },

    deleted: {
        type: Boolean,
        default: false
    },

    location: {
        type: String,
        // required: true,
        trim: true
    },
    city: {
        type: String,
        // required: true,
        trim: true
    },

    donated_campaigns_specific: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }],

    donated_campaigns_general: [{
        type: mongoose.Schema.ObjectId,
        ref: 'general_campaign'
    }],
    tota_don_amount: {},

    // Need to work this part up this weekend!
    account_details: { type: accDetailsSchema },


},
    {
        timestamps: true,
    }
)


const createJWT = async (_id) => {
    let secret = process.env.JWT_SECRET
    return jwt.sign({ id: _id, userType: "Donor" }, secret, { expiresIn: '1h' })
}


donorSchema.statics.login = async function (email, password) {

    let user = await this.findOne({ email: email }).exec()
    console.log("I am here!!")
    if (!user) {
        console.log("No donor with the provided email")
        return null
    }
    let token = await createJWT(user._id)
    console.log(token)
    if (bcrypt.compareSync(password, user.password)) return { user, token }
    console.log("The password provided is incorrect!")
    return null

}

donorSchema.statics.signup = async function (donor) {
    try {
        let { name, age, email, password, contact, chatId, picture, location } = donor
        const salt = await bcrypt.genSalt(13)
        const passEncrypted = await bcrypt.hash(password, salt)

        let exists = await this.findOne({ email }).exec()
        if (exists) {
            console.log("Alreay a same donor with the same email exists")
            console.log(exists)
            return null
        }

        const user = await this.create({
            name: name, email: email,
            password: passEncrypted,
            age: age, location: location,
            city: city,
            contact: contact,
            chatId: chatId,
            picture: picture,
        })

        return { user, token: await createJWT(user._id) }
    } catch (error) {
        console.log("Error occured During signup! Err: ", error.message)
        return null
    }
}


const donorModel = mongoose.model('donor', donorSchema)

module.exports = donorModel