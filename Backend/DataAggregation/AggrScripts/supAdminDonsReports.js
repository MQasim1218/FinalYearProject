
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

 * TODO: AllDAdmins_AllDonations(Grouped_Admin_Wise)
 * TODO: AllDAdmins_AllDonations(Grouped_Category_Wise)
 * TODO: AllDAdmins_AllDonations(Grouped_Year_Wise) ?? Lets see how this is done!!

 * TODO: AllAdmins_YearDonations ?? Lets see how this is done!!
 * TODO: AllAdmins_YearDonations(Grouped_Category_Wise) ?? Lets see how this is done!!
 * TODO: SingleAdminYearDonations(Grouped_Month_Wise) ?? Lets see how this is done!!

 */


const SuperAdminDonations = require('../../Models/Donations/DonationSuperAdmin');
const toISODate = require('../../utils/isoDate');
const createCSV = require('../createCSV');
const getFilename = require('../utils/getFilename');

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


async function Get_All_SuperAdmin_Donations_Report(year) {

    console.log("Here for the sup admin reports!!")
    const fields = [
        "Donation_Date",
        "Donation_Categroy",
        "Donation_Amount",
        "Amount_Forwarded_To_Campaigns",
        "Amount_Remaining_To_Be_Forwarded",
        "Admin_Name",
        "Admin_Email",
        "Donor_Name",
        "Donor_Email",
        "Donor_Contact",
        "Amount_Received_from_Donor",
        "Donor_Location",
    ];

    console.log(year)

    let st = toISODate(`${year}-01-01T00:00:00Z`)
    let end = toISODate(`${year + 1}-01-01T00:00:00Z`)

    console.log("Start val: ", st)
    console.log("END Start val: ", end)

    let data = await SuperAdminDonations
        .aggregate([

            // NOTE: Not looking for the campaigns

            {
                $lookup: {
                    from: "donordonations",
                    localField: "donordonationId",
                    foreignField: "_id",
                    as: "donorDonDetails"
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
                    from: "donors",
                    localField: "donorDonDetails.donor",
                    foreignField: "_id",
                    as: "donorDetails"
                }
            },

            {
                $match: {
                    createdAt: {
                        $gte: new Date(st), // Start of the year
                        $lt: new Date(end) // Start of the next year
                    }
                }
            },

            {
                $group: {
                    // * Need to check y the grouping itself is even required in the first place!
                    _id: "$category",
                    donations: {

                        $push: {
                            Donation_Date: "$createdAt",
                            Donation_Categroy: "$category",
                            Donation_Amount: "$amount",
                            Amount_Forwarded_To_Campaigns: "$donated",
                            Amount_Remaining_To_Be_Forwarded: "$remaining",
                            Admin_Name: "$adminDetails.name",
                            Admin_Email: "$adminDetails.email",
                            Donor_Name: "$donorDetails.name",
                            Donor_Email: "$donorDetails.email",
                            Donor_Contact: "$donorDetails.contact",
                            Amount_Received_from_Donor: "$donorDonDetails.amount",
                            Donor_Location: "$donorDetails.location",
                        }
                    },

                    //         // total_amount_donated: { $sum: "$amount" },
                    //         // total_amount_received: { $sum: "$superAdminDonationDetails.amount" },
                    //         // total_number_of_donations: { $sum: 1 } // Add one for each campaign
                }
            },

            // We are not getting the Admin Id seperately, rahter we are addming it to the documents feilds
            {
                $project: {
                    _id: 0
                }
            }
        ]
        )

    console.log("Data extracted is: ", data)
    if (data.length === 0) {
        return null
    }


    // lets reconstruct the data!
    let all_supadmin_dons = []

    for (let i = 0; i < data.length; i++) {
        const obj = data[i];

        const donations = data[i].donations;

        let supadmin_dons = []


        // admin_dons.donations = obj.donations. This will work, but throw dab data into the fonal result.
        for (let indx = 0; indx < donations.length; indx++) {

            const don = donations[indx];

            // Create an empty object for donations.
            let donation = {}


            // Populate the fields of the donation...
            donation.Donation_Date = don.Donation_Date.toString().slice(0, 24)
            donation.Donation_Categroy = don.Donation_Categroy
            donation.Donation_Amount = don.Donation_Amount // This is returned as array for no ... reason!
            donation.Amount_Forwarded_To_Campaigns = don.Amount_Forwarded_To_Campaigns
            donation.Amount_Remaining_To_Be_Forwarded = don.Amount_Remaining_To_Be_Forwarded
            donation.Admin_Name = don.Admin_Name
            donation.Admin_Email = don.Admin_Email
            donation.Donor_Name = don.Donor_Name[0] // This is returned as array for no ... reason!
            donation.Donor_Email = don.Donor_Email[0] // This is returned as array for no ... reason!
            donation.Donor_Contact = don.Donor_Contact[0] // This is returned as array for no ... reason!
            donation.Donor_Location = don.Donor_Location[0] // This is returned as array for no ... reason!
            donation.Amount_Received_from_Donor = don.Amount_Received_from_Donor

            // Add the donation to the Admin dons
            console.log(donation)
            supadmin_dons.push(donation)
        }
        // console.log(supadmin_dons)
        all_supadmin_dons.push(...supadmin_dons)
    }

    // Instead of returning here, I can simply write to the csv here!!

    // NOTE: Create the file name programatically below using the current time and the key `AllAdminDonationsReport`
    // console.log("All the admin donations are: ", all_supadmin_dons)

    // console.log("sdkfjsodijgsiovj")

    fn = getFilename("SuperAdminReport")


    filepath = createCSV(all_supadmin_dons, fields, fn)

    // console.log("file name returned is: ", fn)



    // lets play with the outer filename!
    // console.log("Outer filename is: ", fn)

    return filepath

}


module.exports = {
    Get_All_SuperAdmin_Donations_Report,
}

