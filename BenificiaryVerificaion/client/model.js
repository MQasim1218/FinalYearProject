const { default: mongoose } = require("mongoose");

let prediction = mongoose.Schema({
    img_path: String,
    incidents: [String],
    places: [String]
})

let verification = mongoose.Schema({
    // Paths for all the images!
    imgs_paths: [String],

    // Prediction associated to each provided image!
    img_predictions: [prediction],

    // model_decision
    checkedOk: Boolean,

    // Admin Decision
    verified: Boolean,

    // Reference to which admin is dealing with the case!
    admin_id: {
        type: mongoose.Types.ObjectId
    },
})