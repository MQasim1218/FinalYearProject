const GenCamps = require('../../Models/Campaings/GeneralCampaigns')
const AdminDons = require('../../Models/Donations/DonationAdmin')
const SADonationModel = require('../../Models/Donations/DonationSuperAdmin')
const DonorModel = require('../../Models/Users/DonorModel')
const AdminModel = require('../../Models/Users/AdminModel')

const toISODate = require('../../utils/isoDate')

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

            // console.log("Admin donations are: ", Dons)
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


// Get all the donations made by all the donors!!
const GetCampaignDonations = async (req, res, next) => {
    try {
        let camp_id = req.params.camp_id

        let Dons = await AdminDons
            .find({ campaign: camp_id })
            .populate('donorId')
            .exec()

        console.log("Admin donations are: ", Dons)
        res.json(Dons)

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

        if (year == null) return res.status(400).send("provide a value for the year!!")

        let stDate = toISODate(`${year}-01-01`)
        let endDate = toISODate(`${year + 1}-01-01`)

        if (stDate == null || endDate == null) return res.status(400).send("provide a value for the year!!")


        if (cat == null) {
            // Get all the donations by the super Admin in a year.

            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: stDate,
                        $lt: endDate
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
                        $gte: stDate,
                        $lt: endDate
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

const Superdonation = async (req, res, next) => {
    try {
        console.log("Getting Donations for SuperAdmin!!")
        let id = req.params.id

        let Dons = await AdminDons
            .find({ supAdminDonation: id }).populate("campaign").exec()
        // .populate('donorId')

        console.log("Admin donations are: ", Dons)
        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retrieving Admin donations!\nError: ', error)
        res.send(error)
    }
}

// Get Donations made by all the Admins in a month...
// ANCHOR: ISO Date issue fixed!!
const GetMonthDonations = async (req, res, next) => {
    try {

        console.log("Here to get the donations of all the admins")
        let cat = req.params.category
        let year = req.params.year
        let month = req.params.month

        if (month != null && date != null) {

            let startDate_ISO = toISODate(`${year}-${month}-01`)
            let endDate_ISO = toISODate(`${year}-${month + 1}-01`)

            // FIXME: This is technically my fault, since I am creating the date!
            if (startDate_ISO == null || endDate_ISO == null) return res.send("Invalid date format!")

            if (cat == null) {
                // Get all the donations by the super Admin in a month.
                let Dons = await SuperAdminDons
                    .find({
                        createdAt: {
                            $gte: startDate_ISO,
                            $lte: endDate_ISO
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
                            $gte: startDate_ISO,
                            $lt: endDate_ISO
                        },
                        category: cat
                    })
                    .populate('admin')
                    .populate('campaign', campFeilds)
                    .exec()

                res.json(Dons)
            }
        } else {
            return res.send("Month or Year not provided!!")
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

        if (start_date == null) {
            console.log("Start date is null")
            return res.send("Start Date is undefined!!")
        }

        let stDate = toISODate(start_date)
        if (stDate == null) {
            console.log("Invalid Date provided!")
            res.status(400).send("Invalid Date Format Provided!")
        }


        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: stDate,
                    }
                })
                .sort({ createdAt: 'desc' })
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        } else {
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $gte: stDate,
                    },
                    category: cat
                })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
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

        if (end_date == null) {
            console.log("Ending date is null")
            return res.send("End-Date is undefined!!")
        }

        let endDate = toISODate(end_date)
        if (endDate == null) {
            console.log("Invalid Date provided!")
            res.status(400).send("Invalid Date Format Provided!")
        }


        if (cat == null) {
            // Get all the donations by the super Admin in a month.
            let Dons = await AdminDons
                .find({
                    createdAt: {
                        $lte: endDate,
                    }
                })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()


            res.json(Dons)
        } else {
            let Dons = await AdminDons.
                find({
                    createdAt: {
                        $lte: endDate,
                    },
                    category: cat
                })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
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
        if (adminId == null) {
            return res.status(400).send("No admin id provided!")
        }

        if (cat == null) {
            // Get all the donations made by the Donors
            let Dons = await AdminDons.find({ admin: adminId })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        } else {
            // Get all the Donations by all the donors for a particular category.
            let Dons = await AdminDons.find({
                category: cat,
                admin: adminId
            })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
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



// All donations made in a year by one specific Admin
const AdminYearDonations = async (req, res, next) => {
    try {

        console.log("hitting this route")
        let cat = req.params.category
        let adminId = req.params.adminId
        let year = req.params.year

        if (adminId == null) {

            return res.status(400).send("No admin id provided!")
        }

        if (year == null) {
            return res.status(400).send("No value for year provided!")
        }

        let stDate = toISODate(`${year}-01-01`)
        let endDate = toISODate(`${year + 1}-01-01`)

        if (stDate == null || endDate == null) {
            return res.status(400).send("Invalid Date format provided!")
        }

        if (cat == null) {
            // Get all the donations by the super Admin in a year.
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: stDate,
                    $lt: endDate
                },
                admin: adminId
            })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
                .populate('admin')
                .populate('campaign', campFeilds)
                .exec()

            res.json(Dons)
        } else {
            let Dons = await AdminDons.find({
                createdAt: {
                    $gte: stDate,
                    $lt: endDate
                },
                category: cat,
                admin: adminId
            })
                .sort({ createdAt: 'desc' }) // sort in decending order! Latest donations first!!
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
        // Since only the owner of the campaign can donate to the campaign,
        // there is no need to worry about the admin ID.

        let campId = req.params.campId
        let Dons = await AdminDons.find({
            campaign: campId
        })
            .sort({ createdAt: 'desc' })
            .populate('admin')
            .populate('campaign', campFeilds)
            .exec()


        res.json(Dons)

    } catch (error) {
        console.log('error encountered while retrieving Admin donations to a campaign!\nError: ', error)
        res.send(error)
    }
}
const AdminCampaignDonationsYear = async (req, res, next) => {
    try {
        let campId = req.params.campId
        let year = req.params.year

        if (campId == null || year == null) {
            console.log("Campaign Id recieved is: ", campId)
            console.log("Year recieved is: ", year)
            return res.status(400).send("Reqest params are not valid!!")
        }

        let stDate = toISODate(`${year}-01-01`)
        let endDate = toISODate(`${year + 1}-01-01`)

        if (stDate == null || endDate == null) {
            return res.status(400).send("Failed to parse date!! Invalid date params!")
        }

        // Get all the donations by the super Admin in a year.
        let Dons = await AdminDons.find({
            createdAt: {
                $gte: stDate,
                $lt: endDate
            },
            campaign: campId
        })
            .sort({ createdAt: 'desc' })
            .populate('admin')
            .populate('campaign', campFeilds)
            .exec()

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
        if (donationId == null) {
            res.status(400).send("The donation Id cannot be null")
        }

        let Don = await AdminDons.find({
            _id: donationId
        })
            .populate('admin')
            .populate('campaign', campFeilds)
            .exec()

        res.json(Don)

    } catch (error) {
        console.log('error encountered while retrieving a single donation by the Admin!\nError: ', error.message)
        res.send(error.message)
    }
}

const DonateToCampaign = async (req, res, next) => {
    // ! Awesome work.. Half the Backend isnt done

    let camp_id = req.body.campaign

    /**
     * FIXME: :: Where are the checks?? Can the admin donate
     * more than the value of the available donation?? 
     * 
     * When a dontion is made by the admin to a campaign
     * 1. Update the Amount donated to the campaign. ✅✅✅
     * 3. Add the campaign to the list of campaigns supported by the donor! ✅✅✅
     * ! IF IT IS NOT ALREADY THERE!!
     * 4. Decrease the total amount of money available with the admin ✅✅✅
     * 5. Increase the total donated amount from the superadmin's donation.✅✅✅
     */

    try {

        console.log("Request recieved is: ", req.body)

        console.log("here to create donation in the admin")
        let don = await AdminDons.create(req.body)
        if (don) {

            console.log("Created donation.. Waiting for campaign to update!!")
            let amount = parseInt(req.body.amount)

            // Update the amount donated to campaign

            // This is to update the campaign details.
            /**
             * Things to change.
             * Campaign donated amount
             * donations to this campaign.
             * 
             */
            let camp = await GenCamps.findById(camp_id).exec()
            camp.donated_amount += amount
            camp.save()
            res.json({ don, camp })

            // ANCHOR: Get the SuperAdmin Donation(where the admin donation originally came from!!) and ...!UPDATE!            
            let saUpdResult = await SADonationModel.findByIdAndUpdate(
                don.supAdminDonation,
                {
                    $inc: {
                        donated: amount, // Increase the donated amount!
                        remaining: -amount // Decrease the remaining amount!
                    }
                }
            ).exec()

            // Update the Donor and add this campaign to the
            // list of Campaings supported by the donor!!
            let resDonUpdate = await DonorModel.findOneAndUpdate(
                { _id: don.donorId },
                {
                    // Add to set only adds the Campaigns that are 
                    $addToSet: {
                        // we can also use don.campaign to get the campaign id!!
                        donated_campaigns_general: camp._id
                    }
                }
            ).exec()

            // Amount available with the admin updated.
            let resAdminUpd = await AdminModel.findByIdAndUpdate(
                don.admin,
                {
                    $inc: { availableAmount: -amount }
                }
            )


            // res.send("The donation was sucessfull")
        } else {
            res.send('Could not register the donation to the campaign!')
        }


    } catch (err) {
        console.log("Error:  ", err.message)
        return res.status(500).send(err.message)
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

    GetCampaignDonations,
    Superdonation,

    DonateToCampaign,
    SingleDonation,
}