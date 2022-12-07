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
    },
    age: {
        type: Number,
        required: true,
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
        required: true,
        minlength: 7,
        trim: true,
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

const Admin = mongoose.model('admin', adminSchema)

module.exports = { Admin: Admin, adminSchema }