
const SuperAdminDons = require('../../Models/Donations/DonationSuperAdmin')


// ! NOTE: This function returns all the Donations made by the SuperAdmin to all admins.
// Get all supadmin donations -- Filter for a particular category!!


const GetAllDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        if (cat == null) {
            let Dons = await SuperAdminDons.find({}).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({ category: cat }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get all the Donations 
const GetYearDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
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

// Get Donations made in a month...
const GetMonthDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
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

// Get Donations after a particular date
const GetDonations_After = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let month = req.params.month
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
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
        let end_date = req.params.end_date
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
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
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
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

// * Donations made by SuperAdmin to a Particular Admin

// All the doantions made to a particular admin since day 1
const AllDonationsToAdmin = async (req, res, next) => {
    try {
        let cat = req.params.category
        let adminId = req.params.admin_id
        if (cat == null) {
            let Dons = await SuperAdminDons.find({ admin: adminId }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                admin: id,
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }

}

// All the Donations to a particular Admin in an year. 
const YearDonations_ToAdmin = async (req, res, next) => {
    try {

        let cat = req.params.category
        let year = req.params.year
        let adminId = req.params.admin_id
        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                },
                admin: adminId,
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations made in a month...
const MonthDonations_ToAdmin = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month
        let adminId = req.params.admin_id
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-${month}-01`),
                    $lt: ISODate(`${year}-${month + 1}-01`)
                },
                admin: adminId,
                category: cat
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations after a particular date
const Donations_After_ToAdmin = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let adminId = req.params.admin_id
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                },
                category: cat,
                admin: adminId
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }

}

// Get Donations to Admin before a particular date
const Donations_Before_ToAdmin = async (req, res, next) => {
    try {
        let cat = req.params.category
        let end_date = req.params.end_date
        let adminId = req.params.admin_id
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                },
                admin: adminId,
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
const Donations_TimeRange_ToAdmin = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let end_date = req.params.end_date
        let adminId = req.params.admin_id
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                },
                category: cat,
                admin: adminId
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Make Donation to an Admin
const DonateToAdmin = async (req, res, next) => { }


// Get All the donations 

module.exports = {
    // All donations made by the Admin
    GetAllDonations, // Get all the donations made by an Admin.
    GetYearDonations, // Get Donations made by Admin in a year.
    GetMonthDonations, // Doantions by Sup Admin in a Month 
    GetDonations_After,
    GetDonations_Before,
    GetDonations_TimeRange,

    // All donations made by SuperAdmin to Admins
    AllDonationsToAdmin,
    YearDonations_ToAdmin,
    MonthDonations_ToAdmin,
    Donations_Before_ToAdmin,
    Donations_After_ToAdmin,
    Donations_TimeRange_ToAdmin,

    // Send money to Admin
    DonateToAdmin,
}