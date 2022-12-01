const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    person: { type: String, required: true },
    person_image: { type: mongoose.Schema.Types.ObjectId, ref: 'photos' },
    platform: { type: String, required: true },
    comment_line: { type: String, required: true },

}, { timestamps: true })