const { adminSchema } = require('../Models/AdminModel')
const { benificairySchema } = require('../Models/BenificiaryModel')
const mongoose = require("mongoose")

let auditSchema = mongoose.Schema({
    // Title given by the auditor!!
    audit_title: { type: String },

    // Determine if the audit was sucessful or not
    audit_status: { type: Boolean, required: true, default: false },

    // Campaign for which Audit is being done!!
    campaign: { type: mongoose.Schema.Types.ObjectId, required: true },

    // Audit approved by the SuperAdmin
    audit_result: Boolean,

    // Audit Remarks given by the SuperAdmin 
    audit_remarks: String,

    // The Date by which the Audit must be complete!
    due_date: { type: mongoose.Schema.Types.Date, required: true },

    // Admins that are a part of the Audit
    auditor_admin: [adminSchema],

    // Benificiary that is the part of the Audit
    auditor_benef: benificairySchema,

    // Audit Report uploaded by the Admin
    filename: { type: String },

    // Path where the file is saved
    filepath: { type: String },
},
    {
        timestamps: true
    }
)

let Audit = mongoose.model('audit', auditSchema)

module.exports = Audit
