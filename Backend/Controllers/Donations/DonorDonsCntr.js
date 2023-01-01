const DonorDons = require('../../Models/Donations/DonationDonor')


// Get all the donations made by all the donors!!
const GetAllDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        if (cat == null) {
            // Get all the donations made by the Donors
            let Dons = await DonorDons.find({}).exec()
            res.json(Dons)
        } else {
            // Get all the Donations by all the donors for a particular category.
            let Dons = await DonorDons.find({ category: cat }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}


// Get all the Donations 
const GetYearDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                },
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}


// Get Donations made by all the donors in a month...
const GetMonthDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                },
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Donors donations!\nError: ', error)
        res.send(error)
    }
}


const GetDonationsAfter = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let month = req.params.month
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                },
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }
}


const GetDonationsBefore = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.end_date
        let month = req.params.month
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await DonorDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                },
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations made in a month...
const GetDonations_TimeRange = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let end_date = req.params.end_date
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                },
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }
}

// * Individual donations by each seperate donor to charity.