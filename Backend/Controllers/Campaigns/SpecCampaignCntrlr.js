
const SpecificCampaigns = require('../../Models/Campaings/SpecificCampaign')

const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        /**
         * Need to make sure of a few things.. The campaign is neither rejected nor deleted.
         * The campaign is apporved and not 
         */
        let spec = await SpecificCampaigns.find({
            $or: [
                { rejected: { $exists: false } }, // the feild `rejected` doesn't exist on the dpcument!
                { rejected: false } // Get only the ones that have rejected set to false.
            ]
        }).exec()
        res.json(spec)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

const GetAllApporvedCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        /**
         * Need to make sure of a few things.. The campaign is neither rejected nor deleted.
         * The campaign is apporved and not 
         */
        let spec = await SpecificCampaigns.find({
            $or: [
                { rejected: { $exists: false } }, // the feild `rejected` doesn't exist on the dpcument!
                { rejected: false } // Get only the ones that have rejected set to false.
            ],
            $or: [
                { approved: { $exists: false } }, // the feild `rejected` doesn't exist on the dpcument!
                { approved: false }
            ]
        }).exec()
        res.json(spec)
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

const GetAvailable = (req, res, next) => { }




const AppealCampaign = async (req, res, next) => {

}

const ApproveAppealedCampaign = async (req, res, next) => {
    // I think this one is done in the admin.appeal campaign
}


module.exports = {
    AppealCampaign,



    // Get Requests
    GetOneCampaign,
    GetAllCampaigns,
}