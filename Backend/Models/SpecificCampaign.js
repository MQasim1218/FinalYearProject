const mongoose = require("mongoose")

let campaignSchema = mongoose.Schema({
    campaign_type: { type: String, required: true },
    campaign_amount: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: { type: 'Point' },
    catagory: { type: String, required: true },
    donors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'donors' }],
    beneficiry: [{ type: mongoose.Schema.Types.ObjectId, ref: 'benificiary' }]

},
    {
        timestamps: true
    }
)

let Campaign = mongoose.model('specific_campaign', campaignSchema)

module.exports = Campaign

