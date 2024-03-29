const DonorDons = require('../../Models/Donations/DonationDonor')
const stripe = require('stripe')('sk_test_51MvPDHKczTjNEdSl45s7WqJQAskQ2PlTorvlEPJw7AIoOAuA7MoVCRjMXmwaQv5Azu8GtetRGLluuaXqFwiQUFm400iF0z5Tpo')

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
    console.log("CHECKING: ", req.params.donor_id)
    try {
        let cat = req.params.category
        let donor_id = req.params.donor_id

        if (cat == null) {
            // Get all the donations made by a Donor
            let Dons = await DonorDons.find({
                donor: donor_id
            })
                .sort({ createdAt: "desc" })
                .exec()

            console.log("All the Donor-Donations are: ", Dons)
            res.json(Dons)
        } else {
            // Get all the Donations by specific donor for a particular category.
            let Dons = await DonorDons.find(
                {
                    category: cat,
                    donor: donor_id
                }
            )
                .sort({ createdAt: "desc" })
                .exec()

            res.json(Dons)
        }
    } catch (error) {
        console.log('error encountered while retrieving Donor donations!\nError: ', error)
        res.send(error)
    }
}

const SingleDonation = async (req, res, next) => {
    console.log("Got a request to fetch a single donation!!")
    try {
        // Get information for single donation made by a Donor.
        let Donation = await DonorDons
            .findById(
                req.params.id
            )
            .populate('donor')
            .populate("specific_campaign")
            .populate('general_campaign')
            .exec()

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

/**
 * Donation flow.
 * Donor is making the donation -- so -- lets assume we are gonna use stripe for this.
 * ! Does the donor donate to the campain :: Currently ----NO----
 * ! Doesnt the SuperAdmin simple register the donor donation. SOME CASES. Donor has to be able to make donations on his own aswell
 * 
 * SECTION: Stripe Architecture
 * One main account - SuperAdmin Account!
 * SuperAdmin creates a payment intent -- But how?? the SA doesnt know how much the donor wants to donate
 * NOTE: Possible solution. Donor can select the amount he/she wants to donate from his/her portal.
 * The donor submits the form on the portal that conatains the details, the the stripe checkout the collects 
 * that information to make a custom checkout-page for the donation.  
 */

const makePayment = async (req, res) => {
    const int = req.body;
    const amount = parseInt(Object.keys(int)[0], 10);
    console.log("IN BACKEND", amount);

    try {
        // Retrieve the contract from the database

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100,
            currency: 'usd',
            payment_method_types: ['card', 'link'],
            metadata: {  },
            // automatic_payment_methods: {
            //   enabled: true,
            // },
        });
        console.log("PAYMENT INTENT", paymentIntent)
        // Update the contract with the payment ID
        // contract.paymentId = paymentIntent.id;
        // contract.paymentStatus = 'pending';
        // await contract.save();


        res.json({ message: 'Payment initiated', paymentId: paymentIntent.id, clientSecret: paymentIntent.client_secret, });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong. Payment not initiated.' });
    }
};


const Donate = async (req, res, next) => {
    // Must recieve data
    // - Donation amount
    // - Donor ID 
    // - Donation Category
    // - 
    try {
        console.log("Making the donatios as donor")


        // Create a donation entry
        // I guess we need to create this request in the webhook response, only if the donation is successful.
        // let donation_entry = await DonorDons.create(req.body)
        // if (!donation_entry) {
        //     return res.send("Couldnt create a donation entry for the donor!!")
        // }

        // Do the Stripe process first
        let session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1N4l7LD4d2tkTPKse5AzTfAg",
                    quantity: 1
                },
            ],
            mode: 'payment',
            submit_type: 'donate',

            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        })

        console.log("Session is: ", session)

        return res.redirect(303, session.url)
        // ! This needs tobe looked into..
        // ! As our donor can no longer directly donate to a campaign, this is no longer a valid operation!
        // ! Keeping this so that maybe later, we may add fuctionality for direct donations.
        // ! Which basically go directly to the Admin controlling the donation
        // let campaign = null

        // if (req.body.camp_type === "Specific") {
        //     campaign = await SpecificCampaign.findByIdAndUpdate(
        //         req.params.campaign_id,
        //         { $push: { donations: donation_entry._id } }
        //     )

        //     await DonorModel.findByIdAndUpdate(
        //         req.body.donor,
        //         { $push: { donated_campaigns_specific: req.params.campaign_id } }
        //     )
        // } else if (req.body.camp_type === "General") {
        //     campaign = await GeneralCampaign.findByIdAndUpdate(
        //         req.params.campaign_id,
        //         { $push: { donations: donation_entry._id } }
        //     )

        //     await DonorModel.findByIdAndUpdate(
        //         req.body.donor,
        //         { $push: { donated_campaigns_general: req.params.campaign_id } }
        //     )
        // }

        // Redirect the user to the Stripe Page

        // res.json(donation_entry)

    } catch (error) {
        console.log(error)
        return res.send(error)
    }
}


/**
 * Listen to the Stripe events using webhook
 */
const WebhookListen = async (req, res) => {
    const event = req.body;
    // Process the event data received from Stripe
    // Implement your logic based on the event type
    console.log('Received event:', event);


    switch (event.type) {
        case 'checkout.session.completed':



            // Handle successful checkout session
            const session = event.data.object;


            // Access relevant information from the session object and perform desired actions
            console.log('Checkout session completed:', session);
            break;


        case 'checkout.session.async_payment_failed':

            // Handle failed payment in the checkout session
            const sessionFailed = event.data.object;



            // Access relevant information from the sessionFailed object and perform desired actions
            console.log('Async payment failed:', sessionFailed);
            break;

        default:
            console.log('Unhandled event type:', event.type);
    }

    res.sendStatus(200); // Acknowledge receipt of the event
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
    SingleDonation,
    makePayment,

    WebhookListen,


    Donate
}