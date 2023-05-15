const mongoose = require("mongoose")
const xyz = require("validator") // Importing this incase this is needed


let campaignSchema = mongoose.Schema({
    campaign_title: {
        type: String,
        required: true,
        trim: true
    },

    required_amount: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        // required: true,
        trim: true
    },



    donated_amount: {
        type: Number,
        default: 0
    },

    catagory: {
        type: String,
        required: true
    },

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

