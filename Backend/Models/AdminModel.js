const mongoose = require('mongoose')
const validator = require("validator");


const adminSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
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
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid");
            }
        }
    }, // required
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('Password cannot contain the word: "password"');
            }
        },
    }, // required
    contact: {
        type: String,
        required: true,
        trim: true,
    }, // required
    location: {
        type: {
            type: String,
            enum: ['Point', 'Polygon'],
            // required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }

    },

    // Reference To the specific Campaigns Created by the Particular Admin
    specific_campaigns: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }],

    general_campaigns: [{
        type: mongoose.Schema.ObjectId,
        ref: 'general_campaign'
    }],

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


adminSchema.statics.login = async function (email, password) {
    // const emailEncrypted = await bcrypt.hash(email, salt)
    let user = await this.findOne({ email: email }).exec()
    if (!user) {
        console.log("No admin with the provided email")
        return null
    }

    if (bcrypt.compareSync(password, user.password)) return user
    console.log("The password provided is incorrect!")
    return null

}

adminSchema.statics.signup = async function (admin) {
    try {
        const salt = await bcrypt.genSalt(13)
        const passEncrypted = await bcrypt.hash(password, salt)

        let { name, age, email, password, contact, location } = admin
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
            contact: contact
        })

        return user
    } catch (error) {
        console.log("Error occured During signup! Err: ", error.message)
        return null
    }
}

const Admin = mongoose.model('admin', adminSchema)

module.exports = { Admin: Admin, adminSchema }