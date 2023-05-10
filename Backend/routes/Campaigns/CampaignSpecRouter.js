/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  the new car is on te
 */
// const SpecificCampaigns = require("../../Models/Campaings/SpecificCampaign")
const SpecificCampaigns = require("../../Controllers/Campaigns/SpecCampaignCntrlr")
const express = require('express')
const router = express.Router()






router.get("/:id", SpecificCampaigns.GetOneCampaign)
router.get("/", SpecificCampaigns.GetAllCampaigns)


router.post("/appeal", SpecificCampaigns.AppealCampaign)

/**
 * ANCHOR: This route is only to be used to append the the list of documents already attached!
 * Generally, the benif uploads the documents directly from the appeal page, not here, this is to aad furhter documents. 
*/
router.post("/upload_docs", SpecificCampaigns.UploadDocuments)
// * router.get("appealed status?? because this is visiable in multiple placess")


module.exports = router