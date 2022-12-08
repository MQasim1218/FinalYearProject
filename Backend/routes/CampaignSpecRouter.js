/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  
 */
const SpecificCampaigns = require("../Models/SpecificCampaign")
const express = require('express')
const router = express.Router()


const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        let spec = await SpecificCampaigns.find({}).exec()
        res.json(gnrl)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const GetOneCampaign = async (req, res, next) => {
    // console.log(req.body)
    try {
        let spec = SpecificCampaigns.findById(req.params.id).exec()
        res.json(spec)
    } catch (error) {
        console.log(error.message)
        // res.send(error.message)
        next(error)
    }
}




router.get("/:id", GetOneCampaign)
router.get("/", GetAllCampaigns)

module.exports = router