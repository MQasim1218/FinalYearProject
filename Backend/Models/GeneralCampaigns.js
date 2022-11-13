const mongoose = require("mongoose")

let campaignSchema = mongoose.Schema({
    // [Widow-support, Student_supp, Monthly-help]
    campaign_type: { type: String },
    campaign_amount: {},
    description: {},
    location: {},
    catagory: {},
    donors: [{}],

},
    {
        timestamps: true
    }
)

let Campaign = mongoose.model('speficif_campaign', campaignSchema)

module.exports = Campaign

