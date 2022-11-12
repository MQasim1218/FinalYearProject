const mongoose = require("mongoose")

let campaignSchema = mongoose.Schema({

},
    {
        timestamps: true
    }
)

let Campaign = mongoose.model('campaign', campaignSchema)

module.exports = Campaign

