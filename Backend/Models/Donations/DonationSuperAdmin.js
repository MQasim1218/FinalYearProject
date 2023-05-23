const { default: mongoose } = require("mongoose");

const supAdminDonationSchema = mongoose.Schema({

    // The total amount donated by the SuperAdmin to the Admin
    amount: {
        type: Number,
        required: true,
        default: true
    },

    // The amount which has been donated by the admin from the total donation amount(Above-top) 
    donated: {
        type: Number,
        default: 0
    },

    // The amount which remains donated by the admin from the total donation amount(Above-top) 
    remaining: {
        type: Number,
        required: true,
        default: -1
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