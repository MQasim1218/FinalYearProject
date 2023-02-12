const GeneralCampaigns = require("../../Models/Campaings/GeneralCampaigns")


const GetAllCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        // console.log("I am here")
        let gnrl = await GeneralCampaigns.find({}).exec()
        res.json(gnrl)
    } catch (error) {
        console.log(error)
        // next(error)
        res.send(error.message)
    }
}

const GetSingleCampaign = async (req, res, next) => {
    // console.log(req.body)
    try {
        let gnrl = await GeneralCampaigns.findById(req.params.id).exec()
        res.json(gnrl)
    } catch (error) {
        console.log(error)
        // res.send(error.message)
        next(error)
    }
}


const GetAdminCampaigns = async (req, res, next) => {
    // console.log(req.body)
    try {
        let gnrl = await GeneralCampaigns.findById(req.params.id).exec()
        res.json(gnrl)
    } catch (error) {
        console.log(error)
        // res.send(error.message)
        next(error)
    }
}


module.exports = {

    GetSingleCampaign,
    GetAllCampaigns,


}