const { default: mongoose } = require("mongoose");
const express = require("express");
const DonationModel = require("../Models/DonationModel");

let router = express.Router()
router.get("/all", async (req, res, next) => {
    try {
        console.log("here in the donations router")
        // let alldontions = await DonationModel.find({}).exec()
        let alldontions = await DonationModel
            .aggregate([
                { $sort: { createdAt: -1 } }
            ])
            .exec()

        res.json(alldontions)
    } catch (error) {
        console.log("NOt able to RetrIeve donations data")
        res.send("cannot send data due to error: ", error)
    }
})
router.get("/all/total", async (req, res, next) => {
    try {
        // let alldontions = await DonationModel.find({}).exec()
        let alldontionsAmount = await DonationModel
            .aggregate([{
                $group:
                    { totalAmount: { $sum: "amount" } },
                count: { $sum: 1 }
            }])
            .exec()
        console.log("Total donated amount is")
        res.json(alldontionsAmount)
    } catch (error) {
        console.log("NOt able to RetrIeve donations data")
        res.send("cannot send data due to error: ", error)
    }
})

// Get the total amount of donation amount made in a month.
router.get("/:month/total",)
// Get all donations for a month
router.get("/:month/",)


// router.get("/recent", ...)
// router.get("/donations/month", ...)
// router.get("/donations/month", ...)

router.get("/:id", async (req, res, next) => {
    try {
        let donation = await DonationModel
            .find({ _id: req.params.id })
            .exec()
        res.json(donation)
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

module.exports = router






