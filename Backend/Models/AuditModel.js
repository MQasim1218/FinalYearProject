const mongoose = require("mongoose")

let auditSchema = mongoose.Schema({

},
    {
        timestamps: true
    }
)

let Audit = mongoose.model('audit', auditSchema)

module.exports = Audit
