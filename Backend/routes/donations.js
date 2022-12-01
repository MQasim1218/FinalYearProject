const { default: mongoose } = require("mongoose");
const express = require("express");
const DonationModel = require("../Models/DonationModel");

let router = express.Router()
router.get("/alldonations", async (req, res, next) => {
    try {
        let alldontions = await DonationModel.find({}).exec()
        res.json(alldontions)
    } catch (error) {
        console.log("NOt able to RetrIeve donations data")
        res.send("cannot send data due to error: ", error)
    }
})

router.post("/:id", async (req, res, next) => {
    try {
        let alldontions = await DonationModel.find({ _id: req.params.id }).exec()
        res.json(alldontions)
    } catch (error) {
        console.log("NOt able to RetrIeve donations data")
        res.send("cannot send data due to error: ", error)
    }
})

router.patch("/:id", async (req, res, next) => {

})






