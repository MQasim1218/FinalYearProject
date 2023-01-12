const mongoose = require("mongoose")

let ReportSchema = mongoose.Schema({
    // [Widow-support, Student_supp, Monthly-help]
    
},
    {
        timestamps: true
    }
)

let GeneralCampaign = mongoose.model('report', ReportSchema)

module.exports = GeneralCampaign

