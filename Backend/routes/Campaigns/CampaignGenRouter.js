/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  
 */
const GeneralCampaigns = require("../../Models/GeneralCampaigns")
const express = require('express')
const router = express.Router()


const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        let gnrl = await GeneralCampaigns.find({}).exec()
        res.json(gnrl)
    } catch (error) {
        console.log(error)
        // next(error)
        res.send(error.message)
    }
}

const GetOneCampaign = async (req, res, next) => {
    // console.log(req.body)
    try {
        let gnrl = await GeneralCampaigns.findById(req.params.id).exec()
        res.json(gnrl)
    } catch (error) {
        console.log(error)
        // res.send(error.message)
        next(error)
    }
}




router.get("/:id", GetOneCampaign)
router.get("/", GetAllCampaigns)

module.exports = router