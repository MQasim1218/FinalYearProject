const { default: mongoose } = require("mongoose");

const accDetailsSchema = mongoose.Schema({
    account_no: { type: String, required: true, trim: true },
    bank_name: { tpye: String, required: true },
    account_type: { type: String, enum: ['bank', 'easypaisa'] }
})

module.exports = accDetailsSchema