/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  
 */
const SpecificCampaigns = require("../../Models/Campaings/SpecificCampaign")
const express = require('express')
const router = express.Router()






router.get("/:id", GetOneCampaign)
router.get("/", GetAllCampaigns)

module.exports = router