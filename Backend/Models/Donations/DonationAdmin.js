const { default: mongoose } = require("mongoose");

const adminDonationSchema = mongoose.Schema({

    // Total Amount donated by the Admin to any campaign
    amount: {
        type: Number,
        required: true,
        default: 0
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

    // Reference to where the donation is coming from!!
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
    // I dont see if we need to add location for doantion | Both donor and benificiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('AdminDonation', adminDonationSchema)

module.exports = DonationModel