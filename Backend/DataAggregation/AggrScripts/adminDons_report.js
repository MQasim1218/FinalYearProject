
/**
 * ! Analytics to deduce from each 
 * * Total donations in every year
 * * Count of donations each year
 * * Count of donations in each category in each year
 * 
 * TODO: SingleAdmin_AllDonations 
 * TODO: SingleAdmin_AllDonations(Grouped_Category_Wise) 
 * TODO: SingleAdmin_AllDonations(Grouped_Year_Wise) ?? Lets see how this is done!!


 * TODO: SingleAdmin_YearDonations ?? Lets see how this is done!!
 * TODO: SingleAdmin_YearDonations(Grouped_Category_Wise) ?? Lets see how this is done!!
 * TODO: SingleAdmin_YearDonations(Grouped_Month_Wise) ?? Lets see how this is done!!
 * TODO: SingleAdmin_YearDonations(Grouped_(Month/Category)_Wise) ?? Lets see how this is done!!

 * TODO: AllDAdmins_AllDonations(Grouped_Admin_Wise) ✅
 * TODO: AllDAdmins_AllDonations(Grouped_Category_Wise) 
 * TODO: AllDAdmins_AllDonations(Grouped_Year_Wise) ?? Lets see how this is done!!

 * TODO: AllAdmins_YearDonations ?? Lets see how this is done!!
 * TODO: AllAdmins_YearDonations(Grouped_Category_Wise) ?? Lets see how this is done!!
 * TODO: SingleAdminYearDonations(Grouped_Month_Wise) ?? Lets see how this is done!!

 */


const { default: mongoose } = require('mongoose');
const AdminDonations = require('../../Models/Donations/DonationAdmin');
const createCSV = require('../createCSV');
const getFilename = require('../utils/getFilename');
const CreateMultisheetExcelFile = require('../createExcelFile');

const fields = [
    "Donation_Date",
    "Amount_Recevied",
    "Amount_Remaining",
    "Amount_Donated",
    "Donor_Name",
    "Donor_Contact",
    "Donor_Email",
    "Donor_Location",
    "Campaign_ID",
    "Campaign_Target",
    "Campaign_Amount_Reveived",
    "Campaign_Location",
    "Campaign_Url",
    "Admin_Donation_Remarks",
    "Super_Admin_Remarks",
];


function Get_All_Admin_yearly_Donations_Report() {
    // const fields = [
    //     "Admin_Email",
    //     "Admin_Name",
    //     "Donation_Date",
    //     "Amount_Received",
    //     "Amount_Donated",
    //     "Donor_Name",
    //     "Donor_Contact",
    //     "Donor_Email",
    //     "Donor_Location",
    //     "Campaign_Target",
    //     "Campaign_Amount_Reveived",
    //     "Campaign_Location",
    // ];

    AdminDonations
        .aggregate([
            {
                $project: {
                    year: { $year: "$createdAt" },
                    // fieldsToPreserve: "$$KEEP"
                    // other fields you want to preserve. Well, technically all.
                }
            },
            {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    documents: { $push: "$$ROOT" }
                }
            },
            {
                $sort: {
                    _id: 1 // 1 for ascending, -1 for descending
                }
            }
        ]).then(data => { console.log(data) })
}

function Get_All_Admin_Donations_Report() {

    const fields = [
        "Admin_Email",
        "Admin_Name",
        "Donation_Date",
        "Amount_Received",
        "Amount_Donated",
        "Donor_Name",
        "Donor_Contact",
        "Donor_Email",
        "Donor_Location",
        "Campaign_Target",
        "Campaign_Amount_Reveived",
        "Campaign_Location",
    ];

    AdminDonations
        .aggregate([

            {
                $lookup: {
                    from: "general_campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaignGenDetails"
                }
            },

            {
                $lookup: {
                    from: "admins",
                    localField: "admin",
                    foreignField: "_id",
                    as: "adminDetails"
                }
            },

            {
                $lookup: {
                    from: "specific_campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaignSpecDetails"
                }
            },

            {
                $lookup: {
                    from: "donors",
                    localField: "donorId",
                    foreignField: "_id",
                    as: "donorDetails"
                }
            },

            {
                $lookup: {
                    from: "superadmindonations",
                    localField: "supAdminDonation",
                    foreignField: "_id",
                    as: "superAdminDonationDetails"
                }
            },

            {
                $group: {
                    // * Need to check y the grouping itself is even required in the first place!
                    _id: "$adminDetails.email",
                    data: {

                        $push: {
                            Admin_Name: "$adminDetails.name",
                            Admin_Email: "$adminDetails.email",
                            Donation_Date: "$createdAt",
                            Amount_Received: "$superAdminDonationDetails.amount",
                            Amount_Donated: "$amount",
                            Donor_Name: "$donorDetails.name",
                            Donor_Contact: "$donorDetails.contact",
                            Donor_Email: "$donorDetails.email",
                            Donor_Location: "$donorDetails.location",
                            Campaign_Target: { $max: ["$campaignSpecDetails.required_amount", "$campaignGenDetails.required_amount"] },
                            Campaign_Amount_Reveived: { $max: ["$campaignSpecDetails.donated_amount", "$campaignGenDetails.donated_amount"] },
                            Campaign_Location: { $max: ["$campaignSpecDetails.location", "$campaignGenDetails.location"] },
                        }
                    },

                    total_amount_donated_by_admin: { $sum: "$amount" },
                    total_amount_received_by_admin: { $sum: "$superAdminDonationDetails.amount" },
                    total_number_of_donations_by_admin: { $sum: 1 } // Add one for each campaign
                }
            },

        ]
        )
        .then(data => {
            console.log(data)

            // lets reconstruct the data!
            // let all_admin_dons = []
            // REVIEW: Removing the old crappy code that just threw all the grouping out of the window and to no avail.
            // for (let i = 0; i < data.length; i++) {
            //     const obj = data[i];
            //     const donations = data[i].donations;
            //     let admin_dons = []
            // admin_dons.donations = obj.donations. This will work, but throw dab data into the fonal result.
            // for (let indx = 0; indx < donations.length; indx++) {

            //     const don = donations[indx];

            //     // Create an empty object for donations.
            //     let donation = {}


            //     // Populate the fields of the donation...
            //     donation.Admin_Id = don.Admin_Id
            //     donation.Admin_Name = don.Admin_Name
            //     donation.Admin_Email = don.Admin_Email
            //     donation.Donation_Date = don.Donation_Date.toString().slice(0, 24)
            //     donation.Amount_Received = don.Amount_Received
            //     donation.Amount_Donated = don.Amount_Donated // This is returned as array for no ... reason!
            //     donation.Donor_Name = don.Donor_Name[0] // This is returned as array for no ... reason!
            //     donation.Donor_Contact = don.Donor_Contact[0] // This is returned as array for no ... reason!
            //     donation.Donor_Email = don.Donor_Email[0] // This is returned as array for no ... reason!
            //     donation.Donor_Location = don.Donor_Location[0] // This is returned as array for no ... reason!
            //     donation.Campaign_ID = don.Campaign_ID // This is returned as array for no ... reason!
            //     donation.Campaign_Target = don.Campaign_Target[0]
            //     donation.Campaign_Amount_Reveived = don.Campaign_Amount_Reveived[0]
            //     donation.Campaign_Location = don.Campaign_Location[0]

            //     // Add the donation to the Admin dons
            //     admin_dons.push(donation)
            // }
            // console.log(admin_dons)
            // all_admin_dons.push(...admin_dons)
            // }
            // Instead of returning here, I can simply write to the csv here!!
            // NOTE: Create the file name programatically below using the current time and the key `AllAdminDonationsReport`
            // console.log("All the admin donations are: ", all_admin_dons)

            let sheetnames = data.map(
                (obj, ind) => (obj._id == null) ?
                    `sheet${ind}` :
                    (
                        (typeof obj._id === 'object') ? Object.values(obj._id).join('-') : obj._id
                    )
            )

            CreateMultisheetExcelFile(data, fields, "AllAdminsReport", sheetnames)

        }
        );

}

function Get_All_Admin_Category_Donations_Report() {

    const fields = [
        "Admin_Email",
        "Admin_Name",
        "Donation_Date",
        "Amount_Received",
        "Amount_Donated",
        "Donor_Name",
        "Donor_Contact",
        "Donor_Email",
        "Donor_Location",
        "Campaign_Target",
        "Campaign_Amount_Reveived",
        "Campaign_Location",
    ];

    AdminDonations
        .aggregate([

            {
                $lookup: {
                    from: "general_campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaignGenDetails"
                }
            },

            {
                $lookup: {
                    from: "admins",
                    localField: "admin",
                    foreignField: "_id",
                    as: "adminDetails"
                }
            },

            {
                $lookup: {
                    from: "specific_campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaignSpecDetails"
                }
            },

            {
                $lookup: {
                    from: "donors",
                    localField: "donorId",
                    foreignField: "_id",
                    as: "donorDetails"
                }
            },

            {
                $lookup: {
                    from: "superadmindonations",
                    localField: "supAdminDonation",
                    foreignField: "_id",
                    as: "superAdminDonationDetails"
                }
            },

            {
                $group: {
                    // * Need to check y the grouping itself is even required in the first place!

                    // * Group all the donations based on category of the donationns
                    _id: "$category",
                    data: {

                        $push: {
                            Admin_Name: "$adminDetails.name",
                            Admin_Email: "$adminDetails.email",
                            Donation_Date: "$createdAt",
                            Amount_Received: "$superAdminDonationDetails.amount",
                            Amount_Donated: "$amount",
                            Donor_Name: "$donorDetails.name",
                            Donor_Contact: "$donorDetails.contact",
                            Donor_Email: "$donorDetails.email",
                            Donor_Location: "$donorDetails.location",
                            Campaign_Target: { $max: ["$campaignSpecDetails.required_amount", "$campaignGenDetails.required_amount"] },
                            Campaign_Amount_Reveived: { $max: ["$campaignSpecDetails.donated_amount", "$campaignGenDetails.donated_amount"] },
                            Campaign_Location: { $max: ["$campaignSpecDetails.location", "$campaignGenDetails.location"] },
                        }
                    },

                    total_amount_donated_to_category: { $sum: "$amount" },
                    total_amount_received_for_category: { $sum: "$superAdminDonationDetails.amount" },
                    total_number_of_donations_in_category: { $sum: 1 }, // Add one for each campaign
                }
            },

            // {
            //     $unwind: {
            //         path: "$data.Admin_Name"
            //     }
            // },
            // {
            //     $unwind: {
            //         path: "$data.Admin_Email"
            //     }
            // }
        ]
        )
        .then(data => {

            // NOTE: Testing the option for seperate csv sheets for each category..
            // console.log(data)

            // let sheetnames = data1.map(obj => {
            //     let sn = null

            //     if (obj._id != null) {

            //         sn = (typeof obj._id == 'object') ? Object.values(obj._id).join('-') : obj._id // If the sn value hasn't been assigned yet, then assign it the value of `_id`
            //     }

            //     return sn || 'sheet' // If the `_id` is null, simply return the string sheet 

            // })
            let sheetnames = data.map(
                obj => (obj._id == null) ?
                    'sheet' :
                    (
                        (typeof obj._id === 'object') ? Object.values(obj._id).join('-') : obj._id
                    )
            )

            CreateMultisheetExcelFile(data, fields, "AdminsCategoryDonations", sheetnames)
        }
        );

}

const Get_Single_Admin_Donations_Report = (admin_id) => {

    const fields = [
        "Admin_Email",
        "Admin_Name",
        "Donation_Date",
        "Amount_Received",
        "Amount_Donated",
        "Donor_Name",
        "Donor_Contact",
        "Donor_Email",
        "Donor_Location",
        "Campaign_Target",
        "Campaign_Amount_Reveived",
        "Campaign_Location",
    ];

    admin_id = mongoose.Types.ObjectId(admin_id)

    console.log("Admin_id: ", admin_id)

    AdminDonations
        .aggregate([
            // Step1: Match the incoming Admin ID
            { $match: { admin: admin_id } },

            // Step 2: Perform the $lookup operation to get the linked documents
            {
                $lookup: {
                    from: "admins",
                    localField: "admin",
                    foreignField: "_id",
                    as: "adminDetails"
                }
            },
            {
                $lookup: {
                    from: "general_campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaignGenDetails"
                }
            },
            {
                $lookup: {
                    from: "specific_campaigns",
                    localField: "campaign",
                    foreignField: "_id",
                    as: "campaignSpecDetails"
                }
            },
            {
                $lookup: {
                    from: "donors",
                    localField: "donorId",
                    foreignField: "_id",
                    as: "donorDetails"
                }
            },
            {
                $lookup: {
                    from: "superadmindonations",
                    localField: "supAdminDonation",
                    foreignField: "_id",
                    as: "superAdminDonationDetails"
                }
            },

            // STEP: Sort by the created at date!!
            {
                $sort: { createdAt: 1 }
            },


            {
                $group: {
                    _id: null, // Leverage the empty 
                    total_donation: {
                        $sum: "$amount"
                    },
                    donations: {
                        $push: {
                            Admin_Name: "$adminDetails.name",
                            Admin_Email: "$adminDetails.email",
                            Donation_Date: "$createdAt",
                            Amount_Received: "$superAdminDonationDetails.amount",
                            Amount_Donated: "$amount",
                            Donor_Name: "$donorDetails.name",
                            Donor_Contact: "$donorDetails.contact",
                            Donor_Email: "$donorDetails.email",
                            Donor_Location: "$donorDetails.location",
                            Campaign_Target: { $max: ["$campaignSpecDetails.required_amount", "$campaignGenDetails.required_amount"] },
                            Campaign_Amount_Reveived: { $max: ["$campaignSpecDetails.donated_amount", "$campaignGenDetails.donated_amount"] },
                            Campaign_Location: { $max: ["$campaignSpecDetails.location", "$campaignGenDetails.location"] },

                        }
                    }
                }
            }


        ])
        .exec()
        .then(data => {
            // console.log(data)

            // lets reconstruct the data!
            let admin_dons = []

            const donations = data[0].donations;

            console.log(donations)

            //     let admin_dons = []


            //     // admin_dons.donations = obj.donations. This will work, but throw dab data into the fonal result.
            for (let indx = 0; indx < donations.length; indx++) {

                const don = donations[indx];

                // Create an empty object for donations.
                let donation = {}


                // Populate the fields of the donation...
                donation.Admin_Name = don.Admin_Name[0]
                donation.Admin_Email = don.Admin_Email[0]
                donation.Donation_Date = don.Donation_Date.toString().slice(0, 24)
                donation.Amount_Received = don.Amount_Received[0]
                donation.Amount_Donated = don.Amount_Donated // This is returned as array for no ... reason!
                donation.Donor_Name = don.Donor_Name[0] // This is returned as array for no ... reason!
                donation.Donor_Contact = don.Donor_Contact[0] // This is returned as array for no ... reason!
                donation.Donor_Email = don.Donor_Email[0] // This is returned as array for no ... reason!
                donation.Donor_Location = don.Donor_Location[0] // This is returned as array for no ... reason!
                donation.Campaign_Target = don.Campaign_Target[0]
                donation.Campaign_Amount_Reveived = don.Campaign_Amount_Reveived[0]
                donation.Campaign_Location = don.Campaign_Location[0]

                //         // Add the donation to the Admin dons
                admin_dons.push(donation)
            }


            // Instead of returning here, I can simply write to the csv here!!

            // NOTE: Create the file name programatically below using the current time and the key `AllAdminDonationsReport`
            console.log("All the admin donations are: ", admin_dons)

            let fn = getFilename("AdminDonationsReport")

            createCSV(admin_dons, fields, fn)
        }
        );
}


module.exports = {
    // ! All Admin Reports
    Get_All_Admin_Donations_Report,
    Get_All_Admin_Category_Donations_Report,
    Get_All_Admin_yearly_Donations_Report,

    // ! Single Admin
    Get_Single_Admin_Donations_Report
}

