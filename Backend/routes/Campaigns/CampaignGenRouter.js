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
const GeneralCampaign = require('../../Models/Campaings/GeneralCampaigns')





router.get("/", Camps.GetAllCampaigns)
router.get("/:id", Camps.GetSingleCampaign)
router.get("/admin/:admin_id", Camps.GetAdminCampaigns)
router.get("/admin/:admin_id/:id", Camps.GetSingleAdminCampaign)


// This is incase the admin wants to upload more documents than the ones already uploaded during campaign creation.
router.post(
    '/upload_docs/:camp_id',
    async (req, res, next) => {
        // Get the urls (for the files uploaded in to the cloudinary)
        // Add the urls to the documents list!

        try {
            // Got the urls!!
            let urls = req.body.urls
            let res = await GeneralCampaign.findByIdAndUpdate(req.params.camp_id, {
                $push: { campaign_docs: urls }
            })

            res.json(res)

        } catch (err) {
            console.log("Error occured trying to add doc urls")
            res.status(500).send("Err: ", err.message)
        }
    }
)

// router.get("/admin/:admin_id", Camps.GetAdminsCampaigns)
// router.get("/admin/:admin_id/:cat", Camps.GetAdminCategoryCampaigns)
// router.get("/admin/:admin_id/:year", Camps.GetAdminCategoryCampaigns)

// router.get("/category/:cat", GetAllCampaigns)
// router.get("/category/:cat/:year", GetAllCampaigns)


// router.get("/", GetAllCampaigns)
// router.get("/", GetAllCampaigns)
// router.get("/", GetAllCampaigns)
// router.get("/", GetAllCampaigns)
// router.get("/", GetAllCampaigns)
// router.get("/", GetAllCampaigns)
// router.get("/", GetAllCampaigns)

module.exports = router