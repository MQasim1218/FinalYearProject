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
                {
                    totalAmount: { $sum: "amount" },
                    count: { $sum: 1 }
                },

            }])
            .exec()

        console.log("Total donated amount is: ", alldontionsAmount)
        res.json({ total: alldontionsAmount })

    } catch (error) {
        console.log("NOt able to RetrIeve donations data")
        res.send("cannot send data due to error: ", error)
    }
})



// Get the total amount of donation amount made in a month.
router.get("/:month/total", (req, res, next) => {
    try {
        let year = today.getFullYear()
        let sm = new Date(year, req.params.month, 0)
        sm = new Date(sm.setDate(sm.getDate() + 1)).toISOString()
        let em = new Date(year, mon, 31).toISOString()

        let donationTotal = DonationModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $lte: em, // Less than end date
                        $gte: sm // Less than start date
                    }
                },
                $group: {
                    totalAmount: { $sum: "amount" },
                    count: { $sum: 1 }
                }
            }
        ])

        res.json({ monthTotal: donationTotal })
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
})

// Get all donations for a month
router.get("/:month/", async (req, res, next) => {

    try {
        // let mon = today.getMonth() :: No need as we are getting this from the front end.
        let year = today.getFullYear()
        let sm = new Date(year, req.params.month, 0)
        sm = new Date(sm.setDate(sm.getDate() + 1)).toISOString()
        let em = new Date(year, mon, 31).toISOString()

        let dons = DonationModel.find({
            createdAt: {
                $lte: em,
                $gte: sm
            }
        })

        res.json(dons)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }


})


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






