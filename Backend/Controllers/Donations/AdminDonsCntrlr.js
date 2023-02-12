const GenCamps = require('../../Models/Campaings/GeneralCampaigns')
const AdminDons = require('../../Models/Donations/DonationAdmin')

const adminFeilds = ['id', 'name', 'age', 'email', 'contact']
const campFeilds = ['id', 'campaign_title', 'category', 'location']


// Get all the donations made by all the donors!!
const GetAllDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        if (cat == null) {
            // Get all the donations made by the Donors
            let Dons = await AdminDons
                .find({})
                .populate('admin', adminFeilds)
                .populate('campaign', campFeilds)
                .exec()

            console.log("Admin donations are: ", Dons)
            res.json(Dons)
        } else {
            // Get all the Donations by all the donors for a particular category.
            let Dons = await AdminDons
                .find({ category: cat })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get all the Donations by all admins in a Year!
const GetYearDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year

        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: ISODate(`${year}-01-01`),
                        $lt: ISODate(`${year + 1}-01-01`)
                    }
                })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        } else {
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: ISODate(`${year}-01-01`),
                        $lt: ISODate(`${year + 1}-01-01`)
                    },
                    category: cat
                })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations made by all the Admins in a month...
const GetMonthDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await SuperAdminDons
                .find({
                    createdAt: {
                        $gte: ISODate(`${year}-${month}-01`),
                        $lt: ISODate(`${year}-${month + 1}-01`)
                    }
                })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()
            res.json(Dons)
        } else {
            let Dons = await SuperAdminDons
                .find({
                    createdAt: {
                        $gte: ISODate(`${year}-${month}-01`),
                        $lt: ISODate(`${year}-${month + 1}-01`)
                    },
                    category: cat
                })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations made by all the Admins After a specified date!...
const GetDonations_After = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: ISODate(`${start_date}`),
                    }
                })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        } else {
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: ISODate(`${start_date}`),
                    },
                    category: cat
                })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations made by all the Admins before a specified date!...
const GetDonations_Before = async (req, res, next) => {
    try {
        let cat = req.params.category
        let end_date = req.params.end_date
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
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

// Get Donations made by all the Admins in a TimeRange...
const GetDonations_TimeRange = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let end_date = req.params.end_date
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                }
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
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


// SECTION - All donations of a particular Admin to all the Campaigns

// All donations made by an admin
const AdminAllDonations = async (req, res, next) => {
    try {

        console.log("In here")
        let cat = req.params.category
        let adminId = req.params.adminId

        if (cat == null) {
            // Get all the donations made by the Donors
            let Dons = await AdminDons.find({ admin: adminId }).exec()
            res.json(Dons)
        } else {
            // Get all the Donations by all the donors for a particular category.
            let Dons = await AdminDons.find({
                category: cat,
                admin: adminId
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}



// All donations made in a year by one specific Admin
const AdminYearDonations = async (req, res, next) => {
    try {

        console.log("hitting this route")
        let cat = req.params.category
        let adminId = req.params.adminId
        let year = req.params.year
        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: new Date(`${year}-01-01`).toISOString(),
                    $lt: new Date(`${year + 1}-01-01`).toISOString()
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: ISODate(`${year}-01-01`),
                    $lt: ISODate(`${year + 1}-01-01`)
                },
                category: cat,
                admin: adminId
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// All donations made in a month by one specific Admin
const AdminMonthDonations = async (req, res, next) => {
    try {
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month
        let adminId = req.params.adminId
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
                category: cat,
                admin: adminId
            }).exec()
            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}

// All donations made after a specific date by one specific Admin
const AdminDonations_After = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let adminId = req.params.adminId
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
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

// All donations made before a speific date by one specific Admin
const AdminDonations_Before = async (req, res, next) => {
    try {
        let cat = req.params.category
        let end_date = req.params.end_date
        let adminId = req.params.adminId

        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
                createdAt: {
                    $lte: ISODate(`${end_date}`),
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

// All donations made between a timerange by one specific Admin
const AdminDonations_TimeRange = async (req, res, next) => {
    try {
        let cat = req.params.category
        let start_date = req.params.start_date
        let end_date = req.params.end_date
        let adminId = req.params.adminId
        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
                },
                admin: adminId
            }).exec()
            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: ISODate(`${start_date}`),
                    $lte: ISODate(`${end_date}`)
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

// * Individual donations to Campaigns
// * Since only one Admin can donate to a campaign.. 
// * Thus no need to take and check for adminId

const AdminCampaignDonationsAll = async (req, res, next) => {
    try {
        let campId = req.params.campId
        let Dons = await AdminDons.find({
            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonationsYear = async (req, res, next) => {
    try {
        let campId = req.params.campId
        let year = req.params.year

        // Get all the donations by the super Admin in a year.
        let Dons = await AdminDons.find({
            createdAt: {
                $gte: ISODate(`${year}-01-01`),
                $lt: ISODate(`${year + 1}-01-01`)
            },
            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonationsMonth = async (req, res, next) => {
    try {
        let year = req.params.year
        let month = req.params.month
        let campId = req.params.campId

        let Dons = await SuperAdminDons.find({
            createdAt: {
                $gte: ISODate(`${year}-${month}-01`),
                $lt: ISODate(`${year}-${month + 1}-01`)
            },
            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonationsDate = async (req, res, next) => {
    try {
        let year = req.params.year
        let month = req.params.month
        let date = req.params.date
        let campId = req.params.campId

        let Dons = await SuperAdminDons.find({
            createdAt: ISODate(`${year} - ${month} - ${date}`),

            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retrieving Siepr Admin donations!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonations_Before = async (req, res, next) => {
    try {
        let end_date = req.params.end_date
        let campId = req.params.campId


        let Dons = await AdminDons.find({
            createdAt: {
                $lte: ISODate(`${end_date}`),
            },
            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonations_After = async (req, res, next) => {
    try {
        let start_date = req.params.start_date
        let campId = req.params.campId


        let Dons = await AdminDons.find({
            createdAt: {
                $gte: ISODate(`${start_date}`),
            },
            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonations_TimeRange = async (req, res, next) => {
    try {
        let start_date = req.params.start_date
        let end_date = req.params.end_date
        let campId = req.params.campId

        let Dons = await AdminDons.find({
            createdAt: {
                $gte: ISODate(`${start_date}`),
                $lte: ISODate(`${end_date}`),
            },
            campaign: campId
        }).exec()
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retreiving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// NOTE: This Gets One Single Admin Donation record!!
const SingleDonation = async (req, res, next) => {
    try {
        let donationId = req.params.id
        let Don = await AdminDons.find({
            _id: donationId
        }).exec()
        res.json(Don)

    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}

const DonateToCampaign = async (req, res, next) => {
    // ! Awesome work.. Half the Backend isnt done

    // let camp_id = req.body.camp_id
    try {
        let don = await AdminDons.create(req.body)
        if (don) {

            console.log("Created donation.. Waiting for campaign to update!!")
            let amount = parseInt(req.body.amount)

            let camp = await GenCamps.findById(req.body.campaign).exec()
            camp.donated_amount += amount
            camp.save()
            // res.json({ don, camp })
            res.send("The donation was sucessfull")
        } else {
            res.send('Could not register the donation to the campaign!')
        }


    } catch (error) {

    }


}

module.exports = {
    GetAllDonations,
    GetYearDonations,
    GetMonthDonations,
    GetDonations_After,
    GetDonations_Before,
    GetDonations_TimeRange,

    // Single Admin donations!!
    AdminAllDonations,
    AdminYearDonations,
    AdminMonthDonations,
    AdminDonations_After,
    AdminDonations_Before,
    AdminDonations_TimeRange,

    AdminCampaignDonationsAll,
    AdminCampaignDonationsDate,
    AdminCampaignDonationsMonth,
    AdminCampaignDonationsYear,
    AdminCampaignDonations_After,
    AdminCampaignDonations_Before,
    AdminCampaignDonations_TimeRange,

    DonateToCampaign,
    SingleDonation,
}