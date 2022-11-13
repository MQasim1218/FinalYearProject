const mongoose = require("mongoose")
const validator = require("validator");


const benificairySchema = mongoose.Schema({
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
        required: true,
        trim: true,
    },

    requested_campaigns: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }],

    audit_reports: [{
        type: mongoose.Schema.ObjectId,
        ref: 'audit'
    }],

    account_no: {
        type: String
    },

    account_type: {
        type: String
    }
},
    {
        timestamps: true,
    }
)

const beneficiaryModel = mongoose.model('benificiary', benificairySchema)

module.exports = beneficiaryModel