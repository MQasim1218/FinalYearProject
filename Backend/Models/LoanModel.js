const mongoose = require("mongoose")

let loanSchema = mongoose.Schema({
    loan_type: { type: String, required: true },
    loan_amount: { type: Number, required: true },
    donated_amount: { type: Number, default: 0 },
    description: { type: String, required: true },
    benificiary: { type: mongoose.Types.ObjectId, ref: 'benificairy' },
    approved: { type: Boolean, required: true, default: false },
    rejected: { type: Boolean, required: true, default: false },
    completed: { type: Boolean, required: true, default: false },
    // Loan is also stored as a donation
    received_loans: [{ type: mongoose.Types.ObjectId, ref: 'donation' }],
    return_entries: [{ amount: Number, date: Date }]
},
    { timestamps: true }
)

let Loan = mongoose.model('loan', loanSchema)

module.exports = Loan

