const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcrypt")
const accDetailsSchema = require('./AccountDetailsModel')


const donorSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    email: {
        type: String, required: true, trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String, required: true, minlength: 7, trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain the word: "password"');
            }
        },
    },

    contact: { type: String, required: true, trim: true },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    donated_campaigns_specific: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }],

    donated_campaigns_general: [{
        type: mongoose.Schema.ObjectId,
        ref: 'general_campaign'
    }],


    account_details: { type: accDetailsSchema },


},
    {
        timestamps: true,
    }
)

donorSchema.statics.login = async function (email, password) {
    // const emailEncrypted = await bcrypt.hash(email, salt)
    let user = await this.findOne({ email: email }).exec()
    if (!user) {
        console.log("No donor with the provided email")
        return null
    }

    if (bcrypt.compareSync(password, user.password)) return user
    console.log("The password provided is incorrect!")
    return null

}

donorSchema.statics.signup = async function (donor) {
    try {
        const salt = await bcrypt.genSalt(13)
        const passEncrypted = await bcrypt.hash(password, salt)

        let { name, age, email, password, contact, location } = donor
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
            contact: contact
        })

        return user
    } catch (error) {
        console.log("Error occured During signup! Err: ", error.message)
        return null
    }
}


const donorModel = mongoose.model('donor', donorSchema)

module.exports = donorModel