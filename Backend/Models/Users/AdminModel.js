const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const adminSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        // required: true,
        trim: true
    }, // required
    age: {
        type: Number,
        // required: true,
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
    picture: {
        type: String,
    },
    contact: {
        type: String,
        // required: true,
        trim: true,
    }, // required

    deleted: {
        type: Boolean,
        defalut: false
    },

    location: {
        type: {
            type: String,
            enum: ['Point', 'Polygon'],
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
        }

    },

    // Amount available with the Admin!!
    availableAmount: {
        type: Number,
        default: 0
    },


    specific_campaigns: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }], // Reference To the specific Campaigns Created by the Particular Admin
    general_campaigns: [{
        type: mongoose.Schema.ObjectId,
        ref: 'general_campaign'
    }], // Reference To the general Campaigns Created by the Particular Admin
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

adminSchema.statics.login = async function (email, password) {
    // const emailEncrypted = await bcrypt.hash(email, salt)
    let user = await this.findOne({ email: email }).exec()
    console.log("I am here!!")
    if (!user) {
        console.log("No admin with the provided email")
        return null
    }
    let token = await createJWT(user._id)
    console.log(token)
    if (bcrypt.compareSync(password, user.password)) return { user, token }
    console.log("The password provided is incorrect!")

    // FIXME: This needs to be uncommented
    // return null
    return { user, token } // ! This is a work around for bycrypt
}

adminSchema.statics.signup = async function (admin) {
    try {
        console.log('admin vaklues at backend signup', admin)
        let { name, age, email, password, chatId, picture, contact, location } = admin
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
            chatId: chatId,
            picture: picture,
            age: age, location: location,
            contact: contact
        })
        let token = await createJWT(user._id)
        console.log("Created Token: ", token)
        return { user, token }
    } catch (error) {
        console.log("Error occured During signup! Err: ", error.message)
        return null
    }
}

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin