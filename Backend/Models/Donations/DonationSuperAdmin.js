const { default: mongoose } = require("mongoose");

const supAdminDonationSchema = mongoose.Schema({

    amount: {
        type: Number,
        required: true,
        default: true
    },

    donated: {
        type: Number,
        default: 0
    },

    remaining: {
        type: Number,
        required: true,
        default: 0
    },

    donation_title: {
        type: String,
        required: true,
    },


    description: String,

    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'admin',
        required: true,
    },

    donordonationId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "DonorDonation"
    },

    // Not sure if we need the category here ?????
    category: {
        type: String,
        // required: true,
        default: 'General'
    }
    // I dont see if we need to add location for doantion | Both donor and beneficiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('SuperAdminDonation', supAdminDonationSchema)

module.exports = DonationModel