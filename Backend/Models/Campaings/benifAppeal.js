const mongoose = require("mongoose")

let benefAppealSchema = mongoose.Schema({

    case_title: String,

    benefId: {
        type: mongoose.Types.ObjectId,
        ref: "beneficiary",
        required: true
    },

    // Add the urls of cloud documents
    campaign_docs: [
        {
            // type: String,

            // NOTE: Validation check to ensure that the gives thing is a url, will remove if it does not match our requirements.
            type: String,
            required: false,
            validate: {
                validator: url => {
                    return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
                        .test(url)
                },

                message: 'Invalid URL provided or a corner case 🧇🧇'
            }

        }
    ],

    docs_predictions: {
        type: mongoose.Schema({
            imgName: String,
            prediction: String
        })
    },

    // If the docs_preds is good, then the verified should get true~
    verified: {
        type: Boolean,
        default: false
    },

    // TODO: Need to fix the Enum part for the campaign category!! 🍁🎶
    category: {
        type: String,
        // Enum: ["ABC", "DEF", "GHI"],
        required: true
    },

},
    {
        timestamps: true
    }
)

let benefAppealModel = mongoose.model('appeal', benefAppealSchema)

module.exports = benefAppealModel


