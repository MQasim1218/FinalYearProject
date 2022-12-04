/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  
 */
const SpecificCampaigns = require("../Models/SpecificCampaign")
const GeneralCampaigns = require("../Models/GeneralCampaigns")
const express = require('express')
const router = express.Router()


const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        let spec = await SpecificCampaigns.find({}).exec()
        let gnrl = await GeneralCampaigns.find({}).exec()
        res.json([...spec, ...gnrl])
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const GetOneCampaign = async (req, res, next) => {
    // console.log(req.body)
    try {
        let spec = SpecificCampaigns.findById(req.params.id).exec()
        let gnrl = GeneralCampaigns.findById(req.params.id).exec()
        if (spec !== null) res.json(spec)
        else res.json(gnrl)
    } catch (error) {
        console.log(error)
        next(error)
    }
}




router.get("/:id", GetOneCampaign)
router.get("/", GetAllCampaigns)

module.exports = router