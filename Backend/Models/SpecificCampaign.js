const mongoose = require("mongoose")

let campaignSchema = mongoose.Schema({
    campaign_type: {},
    campaign_amount: {},
    description: {},
    location: {},
    catagory: {},
    donors: [{}],
    beneficiry: [{}]

},
    {
        timestamps: true
    }
)

let Campaign = mongoose.model('campaign', campaignSchema)

module.exports = Campaign

