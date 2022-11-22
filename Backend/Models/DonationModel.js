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
        ref: 'benificiary',
        default: null
    },
    location: {

    }
    // I dont see if we need to add location for doantion | Both donor and benificiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model(donationSchema, 'donation')

module.exports = DonationModel