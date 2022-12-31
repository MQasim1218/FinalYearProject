// NOTE: This function returns all the Donations made by the SuperAdmin. 
const GetAllDonations = async (req, res, next) => { }

// Get all the Donations 
const GetYearDonations = async (req, res, next) => { }

// Get Donations made in a month...
const GetMonthDonations = async (req, res, next) => { }

// Get all the Donations made to a Particular Admin
const DonationsToAdmin = async (req, res, next) => { }



// Make Donation to an Admin
const DonateToAdmin = async (req, res, next) => { }


// Get All the donations 

module.exports = {
    GetAllDonations, // Get all the donations made by an Admin.
    GetYearDonations, // Get Donations made by Admin in a year.
    GetMonthDonations, // Doantions by Sup Admin in a Month 
    GetAdminDonations, // Donations sent to an Admin come here.


    DonateToAdmin, // Send money to Admin
}