const { default: mongoose } = require("mongoose");

const donorDonationSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'donor',
        required: true,
    },



    // I dont see if we need to add location for doantion | Both donor and benificiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('donation', donorDonationSchema)

module.exports = DonationModel