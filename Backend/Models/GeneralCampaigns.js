const mongoose = require("mongoose")

let generalCampaignSchema = mongoose.Schema({
    // [Widow-support, Student_supp, Monthly-help]
    campaign_type: { type: String, required: true },
    campaign_amount: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    approved: { type: Boolean, required: true },
    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    catagory: { type: String, required: true },
    donors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'donors' }],
},
    {
        timestamps: true
    }
)

let GeneralCampaign = mongoose.model('general_campaign', generalCampaignSchema)

module.exports = GeneralCampaign

