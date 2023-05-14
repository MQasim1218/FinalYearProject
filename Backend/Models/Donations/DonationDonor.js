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

    donation_title: {
        type: String,
        required: true,
    },

    catagory: {
        type: String,
        required: true,
        default: 'General',
    },

    description: String,

    isLoan: {
        type: Boolean,
        default: false
    },


    // I dont see if we need to add location for doantion | Both donor and beneficiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('DonorDonation', donorDonationSchema)

module.exports = DonationModel