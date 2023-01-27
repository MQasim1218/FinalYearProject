const { default: mongoose } = require("mongoose");

const donorDonationSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: true
    },
    donor: {
        type: mongoose.Types.ObjectId,
        ref: 'donor',
        required: true,
    },
    amountDonated: {
        type: Number,
        default: 0,
    },
    isLoan: { type: Boolean, default: false },


    // I dont see if we need to add location for doantion | Both donor and benificiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('DonorDonation', donorDonationSchema)

module.exports = DonationModel