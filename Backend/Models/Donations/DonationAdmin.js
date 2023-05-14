const { default: mongoose } = require("mongoose");

const adminDonationSchema = mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'admin',
        required: true,
    },
    campaign: {
        type: mongoose.Types.ObjectId,
        ref: 'general_campaign',
        required: true
    },
    donorId: {
        type: mongoose.Types.ObjectId,
        ref: 'donor',
        required: true,
    },
    supAdminDonation: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'SuperAdminDonations'
    },
    category: {
        type: String,
        default: "general",
        required: true
    }

    // isLoan: { type: Boolean, default: false },
    // I dont see if we need to add location for doantion | Both donor and beneficiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('AdminDonation', adminDonationSchema)

module.exports = DonationModel