const { default: mongoose } = require("mongoose");

const donationSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: true
    },
    donor: {
        type: mongoose.Types.ObjectId,
        ref: 'donors',
        required: true,
        default: null
    },
    benificiary: {
        type: mongoose.Types.ObjectId,
        ref: 'benificiaries',
        default: null
    },
    City: {}
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model(donationSchema, 'donation')

module.exports = DonationModel