const { default: mongoose } = require("mongoose");

const supAdminDonationSchema = mongoose.Schema({

    amount: {
        type: Number,
        required: true,
        default: true
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
        required: true
    },

    // Not sure if we need the category here ?????
    catagory: {
        type: String,
        // required: true,
        default: 'General'
    }



    // I dont see if we need to add location for doantion | Both donor and benificiary have thier own location.
},
    {
        timestamps: true,
    }
)

const DonationModel = mongoose.model('SuperAdminDonation', supAdminDonationSchema)

module.exports = DonationModel