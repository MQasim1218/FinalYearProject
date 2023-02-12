/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  
 */

const express = require('express')
const router = express.Router()
const Camps = require('../../Controllers/Campaigns/GenCampaignCntrlr')





router.get("/", Camps.GetAllCampaigns)

router.get("/admin/:admin_id", GetAdminsCampaigns)
router.get("/admin/:admin_id/:cat", GetAdminCategoryCampaigns)
router.get("/admin/:admin_id/:year", GetAdminCategoryCampaigns)

router.get("/category/:cat", GetAllCampaigns)
router.get("/category/:cat/:year", GetAllCampaigns)


router.get("/", GetAllCampaigns)
router.get("/", GetAllCampaigns)
router.get("/", GetAllCampaigns)
router.get("/", GetAllCampaigns)
router.get("/", GetAllCampaigns)
router.get("/", GetAllCampaigns)
router.get("/", GetAllCampaigns)
router.get("/:id", GetOneCampaign)

module.exports = router