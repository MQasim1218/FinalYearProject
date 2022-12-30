const { default: mongoose } = require("mongoose");

const accDetailsSchema = mongoose.Schema({
    recieved_amount: {
        type: Number,
        default: true
    },
    spent_amount: {},
})

module.exports = accDetailsSchema