const mongoose = require("mongoose")

let generalCampaignSchema = mongoose.Schema({
    // [Widow-support, Student_supp, Monthly-help]
    campaign_title: {
        type: String,
        required: true
    },

    admin: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "admins"
    },

    required_amount: {
        type: Number,
        required: true,
        trim: true
    },

    donated_amount: {
        type: Number,
        trim: true,
        default: 0
    },

    description: {
        type: String,
        required: true
    },

    location: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
        }
    },

    archived: {
        type: Boolean,
        default: false
    },

    category: {
        type: String,
        Enum: ["ABC", "DEF", "GHI"],
        // required: true
    },

    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'donation'
    }],

    completed: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true
    }
)

let GeneralCampaign = mongoose.model('general_campaign', generalCampaignSchema)

module.exports = GeneralCampaign


