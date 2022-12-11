const { default: mongoose } = require("mongoose");


// This shall contain all the detials about the organization.
// No need to recalculate upon each render/fetch
const statsSchema = mongoose.Schema({
    totDonors: {
        tpye: Number,
        default: 0
    },
    totDonors: {
        tpye: Number,
        default: 0
    },
    totDonatedAmount: {
        tpye: Number,
        default: 0
    },
    totDonations: {
        tpye: Number,
        default: 0
    },
})