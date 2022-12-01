const { default: mongoose } = require("mongoose");

const donationSchema = mongoose.Schema({
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
    isLoan: { type: Boolean, default: false },
    camp_type: { type: String, enum: ["Specific", "General"], required: true }

    // I dont see if we need to add location for doantion | Both donor and benificiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('donation', donationSchema)

module.exports = DonationModel