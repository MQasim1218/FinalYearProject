const mongoose = require("mongoose")
const validator = require("validator");
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

    donated_campaigns_specific: [{
        type: mongoose.Schema.ObjectId,
        ref: 'specific_campaign'
    }],

    donated_campaigns_general: [{
        type: mongoose.Schema.ObjectId,
        ref: 'general_campaign'
    }],


    account_details: { type: accDetailsSchema },

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
},
    {
        timestamps: true,
    }
)

const donorModel = mongoose.model('donor', donorSchema)

module.exports = donorModel