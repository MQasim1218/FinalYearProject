/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  the new car is on te
 */
// const SpecificCampaigns = require("../../Models/Campaings/SpecificCampaign")
const SpecificCampaigns = require("../../Controllers/Campaings/SpecCampaignCntrlr")
const express = require('express')
const router = express.Router()






router.get("/:id", SpecificCampaigns.GetOneCampaign)
router.get("/", GetAllCampaigns)

module.exports = router