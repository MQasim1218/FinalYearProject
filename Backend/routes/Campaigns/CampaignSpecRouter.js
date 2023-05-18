/**
 * @Campaign_Routes
 * TODO: 
 *      1. List all the possible routes for the campaigns.
 *      2. Describe what each route shall serve.
 *      3.  the new car is on te
 */

const SpecificCampaigns = require("../../Controllers/Campaigns/SpecCampaignCntrlr")
const SpecCampaigns = require("../../Models/Campaings/SpecificCampaign")
const express = require('express')
const router = express.Router()






router.get("/:id", SpecificCampaigns.GetOneCampaign)
router.get("/", SpecificCampaigns.GetAllCampaigns)


router.post("/appeal", SpecificCampaigns.AppealCampaign)

// This is incase the admin wants to upload more documents than the ones already uploaded during campaign creation.
// The update is successful but the result retuned is not !
router.post(
    '/upload_docs/:camp_id',
    async (req, res, next) => {
        // Get the urls (for the files uploaded in to the cloudinary)
        // Add the urls to the documents list!

        console.log("Adding the docs url to the campigns")

        try {
            // Got the urls!!
            let urls = req.body.doc_urls
            console.log(urls)

            let result = await SpecCampaigns.findByIdAndUpdate(req.params.camp_id, {
                $push: { campaign_docs: { $each: urls } }
            }).exec()

            result = await SpecCampaigns.findById(req.params.camp_id).exec()

            console.log(result)

            return res.json(result)

        } catch (err) {
            console.log("Error occured trying to add doc urls")
            return res.status(500).send("Err: " + err.message)
        }
    }
)

/**
 * ANCHOR: This route is only to be used to append the the list of documents already attached!
 * Generally, the benif uploads the documents directly from the appeal page, not here, this is to aad furhter documents. 
*/
// router.post("/upload_docs", SpecificCampaigns.UploadDocuments)
// * router.get("appealed status?? because this is visiable in multiple placess")


module.exports = router