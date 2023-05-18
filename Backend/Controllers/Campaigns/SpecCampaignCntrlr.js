
const SpecCamps = require('../../Models/Campaings/SpecificCampaign')

const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        /**
         * Need to make sure of a few things.. The campaign is neither rejected nor deleted.
         * The campaign is apporved and not 
         */
        let spec = await SpecCamps.find({
            $or: [
                { rejected: { $exists: false } }, // the feild `rejected` doesn't exist on the dpcument!
                { rejected: false } // Get only the ones that have rejected set to false.
            ]
        })
            .sort({ createdAt: "desc" })
            .exec()


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
        console.log("Getting single specific campaign")
        let spec = await SpecificCampaigns.findById(req.params.id).exec()
        res.json(spec)
    } catch (error) {
        console.log(error.message)
        next(error)
    }
}

const GetAvailable = async (req, res, next) => {
    try {
        console.log("Getting available campaigns")
        let camps = await SpecificCampaigns.find({
            // Since deleted is a new feild, it wont be available on all docs
            // This can be removed in prodcution since all the new feilds will have this..
            // Mostly for debugging.
            $or: [
                { deleted: { $exists: false } }, // there is not feild called deleted
                { deleted: false }
            ],
            rejected: false,
            completed: false,
            approved: true
        })

        res.json(camps)

    } catch (err) {

    }
}




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