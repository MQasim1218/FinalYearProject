const { adminSchema } = require('../Models/AdminModel')
const mongoose = require("mongoose")

let auditSchema = mongoose.Schema({
    audit_title: {},
    audit_status: Boolean,
    audit_result: Boolean,
    audit_remarks: String,
    auditor_admin: [adminSchema],
    auditor_benef: [benefSchema],
    
},
    {
        timestamps: true
    }
)

let Audit = mongoose.model('audit', auditSchema)

module.exports = Audit
