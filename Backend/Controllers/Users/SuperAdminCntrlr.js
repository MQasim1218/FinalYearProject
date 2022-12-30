// TODO: THIS File is a serious todo.. needs to be implemented tonight!!


// NOTE: This function returns all the Donations made by the SuperAdmin. 
const GetAllDonations = async (req, res, next) => { }

// Get all the Donations 
const GetYearDonations = async (req, res, next) => { }

// Make Donation to an Admin
const MakeDonationToAdmin = async (req, res, next) => { }

// Get all the Donations made to a Particular Admin
const DonationsToAdmin = async (req, res, next) => { }

// Get All the donations 

module.exports = {
    GetAllDonations, // Get all the donations made by an Admin.
    GetYearDonations, // Get Donations made by Admin in a year.
    GetAdminDonations, // Donations sent to an Admin come here.
    MakeDonationToAdmin, // Send money to Admin
}