const mongoose = require('mongoose')
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
        trim: true
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
        validate(value) {
            let regex = '/[0-9]{11}/'
            if (!regex.match(value)) {
                throw new Error('Conatct cannot contain anything but Numbers')
            }
        }
    },
    requested_campaigns: [{}],
    audit_reports: [{}],
    account_no: {},
    account_type: {}
},
    {
        timestamps: true,
    }
)

const beneficiaryModel = mongoose.model('beneficiary', benificairySchema)

module.exports = beneficiaryModel