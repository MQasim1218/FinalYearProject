const mongoose = require("mongoose")

let campaignSchema = mongoose.Schema({
    campaign_type: { type: String, required: true },
    campaign_amount: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    approved: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
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

