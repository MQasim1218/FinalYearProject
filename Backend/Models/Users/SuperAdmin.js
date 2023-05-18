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
    if (bcrypt.compareSync(password, user.password)) return { admin: user, token: token }
    console.log("The password provided is incorrect!")
    return null

}

adminSchema.statics.signup = async function (admin) {
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

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin