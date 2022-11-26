const mongoose = require("mongoose")

let loanSchema = mongoose.Schema({
    loan_type: { type: String, required: true },
    loan_amount: { type: Number, required: true, trim: true },
    description: { type: String, required: true },
    benificiary: { type: mongoose.Types.ObjectId, ref: 'benificairy' },
    approved: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
    // Loan is also stored as a donation
    granted_loans: [{ type: mongoose.Types.ObjectId, ref: 'donation' }],
},
    { timestamps: true }
)

let Loan = mongoose.model('loan', loanSchema)

module.exports = Loan

