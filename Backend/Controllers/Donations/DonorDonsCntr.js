const DonorDons = require('../../Models/Donations/DonationDonor')

const donorFeilds = ['id', 'name', 'age', 'email', 'contact', 'createdAt']

// Get all the donations made by all the donors!!
const GetAllDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        if (cat == null) {
            // Get all the donations made by the Donors
            let Dons = await DonorDons
                .find({})
                .populate('donor', {

                })
                .exec()
            res.json(Dons)
        } else {
            // Get all the Donations by all the donors for a particular category.
            let Dons = await DonorDons.find({ category: cat }).populate('donor').exec()
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
        console.log('error encountered while retrieving Super Admin donations!\nError: ', error)
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


const GetDonations_After = async (req, res, next) => {
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


const GetDonations_Before = async (req, res, next) => {
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

// * Individual donations by each seperate donor to ??? Campaign ?? Category.


// REVIEW: Important todos!.
// Donation(s) expended - Admins
// Donation(s) expended - Admin -> Campaigns
// Donation(s) expended - Campaigns over time.
//

const DonorAllDonations = async (req, res, next) => {
    console.log("Got a requwst to fetch all donations!!")
    try {
        let cat = req.params.category
        let donor_id = req.params.donor_id
        if (cat == null) {
            // Get all the donations made by the Donors
            let Dons = await DonorDons.find({
                donor: donor_id
            }).exec()
            res.json(Dons)
        } else {
            // Get all the Donations by specific donor for a particular category.
            let Dons = await DonorDons.find({
                category: cat,
                donor: donor_id
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}

const SingleDonation = async (req, res, next) => {
    console.log("Got a requwst to fetch a single donation!!")
    try {
        // Get all the donations made by the Donors
        let Donation = await DonorDons.findById(
            req.params.id
        ).populate('donor').exec()

        console.log("Donor Donation is: ", Donation)

        res.json(Donation)
    } catch (error) {
        console.log('error encountered while retrieving Single Donation by the Donor !\nError: ', error)
        res.send(error)
    }
}

// Get donations of a donor in a year!
const DonorYearDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let donor_id = req.params.donor_id
        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                },
                donor: donor_id
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                },
                category: cat,
                donor: donor_id
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get the month donations of a donor!! 
const DonorMonthDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month
        let donor_id = req.params.donor_id

        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                },
                donor: donor_id
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await DonorDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                },
                category: cat,
                donor: donor_id
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Donors donations!\nError: ', error)
        res.send(error)
    }
}


module.exports = {

    DonorAllDonations,
    DonorMonthDonations,
    DonorYearDonations,

    // ! All donations
    GetAllDonations,
    GetDonations_After,
    GetDonations_Before,
    GetDonations_TimeRange,
    GetYearDonations,
    GetMonthDonations,
    SingleDonation
}