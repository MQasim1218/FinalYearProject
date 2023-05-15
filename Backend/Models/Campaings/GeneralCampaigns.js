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

    // Add the urls of cloud documents
    campaign_docs: [
        {
            // type: String,

            // NOTE: Validation check to ensure that the gives thing is a url, will remove if it does not match our requirements.
            type: String,
            required: true,
            validate: {
                validator: url => {
                    return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
                        .test(url)
                },

                message: 'Invalid URL provided or a corner case 🧇🧇'
            }

        }
    ],

    archived: {
        type: Boolean,
        default: false
    },

    // TODO: Need to fix the Enum part for the campaign category!! 🍁🎶
    category: {
        type: String,
        // Enum: ["ABC", "DEF", "GHI"],
        required: true
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


