const { default: mongoose } = require("mongoose");

const donorDonationSchema = mongoose.Schema({

    // The total amount initially donated by the donor 
    amount: {
        type: Number,
        required: true,
        default: true
    },

    // The amount that is donted from the total amount!
    amountDonated: {
        type: Number,
        default: 0,
    },

    // The remaining amount from the total amount@!!
    amountRemaining: {
        type: Number,
        default: -1,
    },

    specific_campaign: {
        type: mongoose.Types.ObjectId,
        ref: 'specific_campaign',
    },

    general_campaign: {
        type: mongoose.Types.ObjectId,
        ref: 'general_campaign',
    },

    donor: {
        type: mongoose.Types.ObjectId,
        ref: 'donor',
        required: true,
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