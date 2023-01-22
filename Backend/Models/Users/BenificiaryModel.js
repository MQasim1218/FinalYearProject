const mongoose = require("mongoose")
const validator = require("validator");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const benificairySchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
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
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    },
    password: {
        type: String,
        // required: true,
        minlength: 7,
        // trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain the word: "password"');
            }
        },
    },
    contact: {
        type: String,
        // required: true,
        trim: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
        }
    },
    requested_campaigns: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }],

    requested_loans: [{
        type: mongoose.Schema.ObjectId,
        ref: 'loan'
    }],
    // audit_reports: [{
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'audit'
    // }],


    // Need to see what happens with these things!!
    account_no: {
        type: String
    },
    account_type: {
        type: String
    },


},
    { timestamps: true }
)

const createJWT = async (_id) => {
    let secret = process.env.JWT_SECRET
    return jwt.sign({ id: _id, userType: "Benificiary" }, secret, { expiresIn: '1h' })
}


benificairySchema.statics.login = async function (email, password) {
    // const emailEncrypted = await bcrypt.hash(email, salt)
    let user = await this.findOne({ email: email }).exec()
    if (!user) {
        console.log("No benificiary with the provided email")
        return null
    }
    // console.log(user)
    if (bcrypt.compareSync(password, user.password)) return { benificiary: user, token: await createJWT(user._id) }
    else console.log("The password provided is incorrect!")
    return null
}


benificairySchema.statics.signup = async function (benificiary) {
    try {
        let { name, email, password } = benificiary
        // FIXME: Set the inputs back to normal.
        // let { name, age, email, password, contact, location } = benificiary

        const salt = await bcrypt.genSalt(13)
        const passEncrypted = await bcrypt.hash(password, salt)

        let exists = await this.findOne({ email }).exec()
        if (exists) {
            console.log("Alreay a same benificairy with the same email exists")
            console.log(exists)
            return null
        }

        const user = await this.create({
            name,
            email,
            password: passEncrypted,
            // age: age, location: location,
            // contact: contact
        })

        console.log("Benificiary returned: ", user)

        return {
            user,
            token: await createJWT(user._id)
        }
    } catch (error) {
        console.log("Error occured During signup! Err: ", error.message)
        return null
    }
}

const beneficiaryModel = mongoose.model('benificiary', benificairySchema)

module.exports = { beneficiaryModel, benificairySchema }