
const SuperAdminDons = require('../../Models/Donations/DonationSuperAdmin')
const DonorDons = require('../../Models/Donations/DonationDonor')
const Admin = require('../../Models/Users/AdminModel')
const Donor = require('../../Models/Users/DonorModel')
const getResolvedObjs = require('../../utils/resolve_objs')


const adminFeilds = ['name', 'age', 'contact', 'email']
const don_donation_fields = ['donor', 'catagory', 'createdAt']
const donorFields = ["name", "email", "contact"]

// ! NOTE: This function returns all the Donations made by the SuperAdmin to all admins.
// Get all supadmin donations -- Filter for a particular category!!


const GetAllDonations = async (req, res, next) => {
    console.log("Getting all the SuperAdmin donations!! 👓👓")
    try {
        let cat = req.params.category
        if (cat == null) {
            let Dons = await SuperAdminDons
                .find({})
                .sort({ createdAt: 'desc' })
                .populate("admin", adminFeilds)
                .populate("donordonationId", don_donation_fields)
                .populate("donor", donorFields)
                .exec()

            console.log(Dons)
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons.find({ category: cat })
                .sort({ createdAt: 'desc' })
                .populate("admin", adminFeilds)
                .populate("donordonationId", don_donation_fields)
                .populate("donor", donorFields)
                .exec()

            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.send(error)
    }
}


const GetSingleDonation = async (req, res, next) => {
    console.log("Here to fetch single Admin Dons")
    try {
        let id = req.params?.id
        if (id != null) {
            let Don = await SuperAdminDons
                .findById(id)
                .sort({ createdAt: 'desc' })
                .populate("admin", adminFeilds)
                .populate("donordonationId", don_donation_fields)
                .populate("donor", donorFields)
                .exec()
            res.json(Don)
        } else {

            res.status(500).send("Cant fetch without ID!!")
        }
    } catch (error) {
        console.log('error encountered while retreiving Single Super Admin donation!\nError: ', error)
        res.status(500).send(error.message)
    }
}

// Get all the donarions made by the super admin using the donor's specific donations.
const GetDonsForSingleDonorDonation = async (req, res, next) => {
    console.log("Here to fetch SA Donations from a single Donor Donation")
    try {
        let don_id = req.params?.id

        console.log("The donor donation Id recieved is: ", don_id)

        if (don_id != null) {
            let Don = await SuperAdminDons
                .find({ donordonationId: don_id })
                .sort({ createdAt: 'desc' })
                .populate("admin", adminFeilds)
                .populate("donordonationId", don_donation_fields)
                .populate("donor", donorFields)
                .exec()
            res.json(Don)
        } else {

            res.status(500).send("Cant fetch without ID!!")
        }
    } catch (error) {
        console.log('error encountered while retreiving Single Super Admin donation!\nError: ', error)
        res.send(error)
    }
}

// Get all the Donations  for a particular year!!
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


    console.log("Getting the donations made to one Admin by the SuperAdmin! 🎇🎇🎗")
    try {
        let cat = req.params.category
        let adminId = req.params.admin_id
        console.log("The Admin id is: ", adminId)

        if (adminId != null) {

            if (cat == null) {
                let Dons = await SuperAdminDons.find({ admin: adminId })
                    .populate("donordonationId", don_donation_fields)
                    .exec()


                Dons = Dons.map(async (don) => {
                    let donor = await Donor.findById(don.donordonationId?.donor).exec()
                    don = { ...don, donor }
                    return don
                })

                Dons = await getResolvedObjs(Dons)
                Dons = Dons.map((don) => ({ ...don._doc, donor: don.donor }))


                console.log("Donations Returned are: ", Dons)

                res.json(Dons)
            } else {
                let Dons = await SuperAdminDons.find({
                    admin: adminId,
                    category: cat
                }).exec()
                res.json(Dons)
            }
        } else {
            res.status(400).send({ msg: "Error: Admin id is null" })
        }
    } catch (error) {
        console.log('error encountered while retreiving Super Admin donations!\nError: ', error)
        res.status(500).send(error.message)
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
const DonateToAdmin = async (req, res, next) => {

    /**
     * When SuperAdmin Donates to Admin, do the following steps..
     *  1. Create a new SuperAdmin Transfer entry.
     *  2. Update the amount in the Admins Bank.. Currently available amount.
     *  3. Deduct the amount from the donation where the money is sent from.
     */

    try {
        console.log("A request for donation to admin recieved!!")
        // let { admin, amount: am, donordonationId } = req.body

        // STUB: Step1: Destructure the req.body to get the adminId, donationId,

        console.log("Req body: ", req.body)

        let don = await SuperAdminDons.create(req.body)
        if (don) {
            console.log("The daontion was successfull")
        } else {
            console.log("the donation failed")
        }

        console.log('Donation created :', don)

        let { admin, donordonationId, amount } = req.body

        let adminUpdated = await Admin.findByIdAndUpdate(admin, {
            $inc: {
                donated: amount,
                remaining: -amount
            }
        })

        console.log(adminUpdated)

        let donorDonationUpdated = await DonorDons.findByIdAndUpdate(donordonationId, {
            $inc: {
                amountRemaining: -amount,
                amountDonated: amount
            }
        })

        console.log("Updated Donor donation entry!!: ", donorDonationUpdated)

        console.log("Donation Successful")
        res.send("Donation Successful!")

    } catch (error) {
        res.status(500).send(error.message)
    }
}

const RegisterDonorDonation = async (req, res, next) => {
    console.log("Here to register donations!!")

    /**
     * To Register the Donor Donation, we need to do the following steps. 
     *  1. Update Donor Donations Entry
     *  2. Update the amount currently available to the organization
     *  3. 
     */
    try {

        // let { amount, donor } = req.body
        console.log("Request body: ", req.body)

        let donor_donation = await DonorDons.create(req.body)

        res.json(donor_donation)

    } catch (error) {
        res.send(error)
    }
}


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
    Donations_After_ToAdmin,
    Donations_Before_ToAdmin,
    Donations_TimeRange_ToAdmin,

    // All donations from a single donor donation!!
    GetDonsForSingleDonorDonation,

    // Send money to Admin
    RegisterDonorDonation,
    DonateToAdmin,
    GetSingleDonation
}