const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        console.log("I am here")
        let spec = await SpecificCampaigns.find({}).exec()
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


module.exports = {
    AppealCampaign,


    // Get Requests
    GetOneCampaign,
    GetAllCampaigns,
}