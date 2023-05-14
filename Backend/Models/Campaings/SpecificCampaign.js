const mongoose = require("mongoose")

let campaignSchema = mongoose.Schema({
    campaign_title: { type: String, required: true, trim: true },
    campaign_amount: { type: Number, required: true, trim: true },
    description: { type: String, required: true },
    required_amount: { type: String, required: true },
    donated_amount: { type: Number, default: 0 },
    catagory: { type: String, required: true },
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
    beneficiary: { type: mongoose.Types.ObjectId, ref: 'beneficiary' },
    approved: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, default: false },
    rejected: { type: Boolean, required: true, default: false },
    donations: [{ type: mongoose.Types.ObjectId, ref: 'donation' }],
},
    {
        timestamps: true
    }
)

let Campaign = mongoose.model('specific_campaign', campaignSchema)

module.exports = Campaign

