import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar"
import Dashboard from "./scenes/dashboard"
// import Donations from "./scenes/donations"
import Recent from "./scenes/recentDonations"
import Users from "./scenes/users"
import CreateCampaign from "./scenes/createCampaign"
import Graphs from "./scenes/graphs"
import GeographyMap from "./scenes/geographymap"
import DonorDashboard from './scenes/donorDashboard';
import Login from './scenes/login';
import Register from './scenes/signup';
import AllCampaigns from './scenes/allCampaigns';
import AreaAnalytics from './scenes/areaAnalytics';
import Donate from './scenes/donate';
import ViewDonations from './scenes/viewDonations';
import TimeAnalytics from './scenes/timeAnalytics';
import GeographyMapDonor from './scenes/geographyMapDonor';
import DonationReports from './scenes/donationReports';
import ExpenditureReports from './scenes/expenditureReports';
import CampaignInfo from './scenes/campaignInfo';
import DonorInfo from './scenes/donorInfo';
import AdminAnalytics from './scenes/adminAnalytics';
import SuperReports from './scenes/superReports';
import SuperDonation from './scenes/superDonation';
import Admins from './scenes/admins';
import Donors from './scenes/donors';
import DonorDonations from "./scenes/donations/donorDonations"
import AdminDonations from "./scenes/donations/adminDonations"
import SuperAdminDonations from "./scenes/donations/superAdminDonations"
import CategoryDonations from "./scenes/donations/categoryDonations"
import { AccountTypeContext, LoggedUserTypeProvider } from './accountTypeContext';
import { useAuthContext } from './hooks/useAuthContext';
import DonationRegistration from './scenes/donationRegisteration';
import Sidebars from './scenes/global/Sidebars';
import { useState, useEffect, useContext } from 'react';
import SuperAdminDashboard from './scenes/superAdminDashboard';

import DonorDonationInfo from './scenes/donorDonationInfo';
import SuperAdminDonationInfo from './scenes/superAdminDonationInfo';
import AdminDonationInfo from './scenes/adminDonationInfo';

// What is this boss!!
import DonationRequests from './scenes/donationRequests';



function App(props) {

  const [accountType, setAccountType] = useState('');
  const [theme, colorMode] = useMode()
  const location = useLocation()
  let loggedUserType = useContext(AccountTypeContext)

  useEffect(() => { setAccountType(loggedUserType) }, [accountType])
  //const { user } = useAuthContext();

  const user = 'donor'
  //IMPORTANT: UNCOMMENT THIS CODE AND TRY TO RUN IT. MERE PAS PAGE BAR BAR RELOAD KRTA REHTA HA I THINK
  // useEffect(() => {
  //   if (!user && location.pathname !== '/register') {
  //     setTimeout(() => {
  //       window.location.href = '/';
  //     }, 0);
  //   } else if (user === 'donor' && location.pathname !== '/donordashboard' && location.pathname !== '/viewdonations' && location.pathname !== "/viewcampaigns" && location.pathname !== "/useranalytics" && location.pathname !== "/useranalytics/:id" && location.pathname !== "/areaanalytics" && location.pathname !== "/timeanalytics" && location.pathname !== "/geographymap" && location.pathname !== "/donationreports" && location.pathname !== "/expenditurereports") {
  //     // list all the routes that the donor can access
  //     setTimeout(() => {
  //       window.location.href = '/donordashboard';
  //     }, 0);
  //   } else if (user === 'admin' && location.pathname !== '/dashboard') {
  //     // list all the routes that the admin can access
  //     setTimeout(() => {
  //       window.location.href = '/dashboard';
  //     }, 0);
  //   }
  // }, [user, location.pathname]);

  // callback function that updates the accountType state variable
  const handleAccountTypeChange = (value) => {
    setAccountType(value);
  }


  return (
    //Context for colormode, so we can use it anywhere.
    <ColorModeContext.Provider value={colorMode}>
      {/*ThemeProvider is used so that material UI has access to it as well.*/}
      <ThemeProvider theme={theme}>
        {/*CssBaseline resets the css to default on colorchange*/}
        <CssBaseline />
        {/* {user && ( */}
        <AccountTypeContext.Provider value={accountType}>
          <div className="app">
            {accountType && <Sidebars />}
            <main className="content">
              <Topbar />
              <Routes>
                {/* {accountType === "donor" ? (
                    <> */}
                <Route path="/donordashboard" element={<DonorDashboard />} />
                <Route path="/viewdonations" element={<ViewDonations />} />
                <Route path="/viewcampaigns" element={<AllCampaigns />} />

                {/* FIXME: */}
                {/* WHY are there 2 UserAnalytics routes.. Both Leading to the same page? */}
                {/* WHY should the donor be able to see user analytics other than themselves */}
                <Route path="/useranalytics" element={<DonorInfo />} />
                <Route path="/areaanalytics" element={<AreaAnalytics />} />
                <Route path="/timeanalytics" element={<TimeAnalytics />} />
                <Route path="/geographymap" element={<GeographyMap />} />
                <Route path="/donationreports" element={<DonationReports />} />
                <Route path="/expenditurereports" element={<ExpenditureReports />} />
                <Route path="/donordonationinfo/:id" element={<DonorDonationInfo />} />

                {/* <Route path="*" /> */}
                {/* </>
                  ) : accountType === "admin" ? (
                    <> */}
                <Route path="/admindashboard" element={<Dashboard />} />


                {
                  /* 
                    Only get the donations made to campaigns 
                    initiated by the Admin.. 
                    Dont need all the campaign dinations 
                  */
                }
                <Route path="/incoming-donations" element={<SuperAdminDonations single_admin={true} />} />

                {
                  /* 
                    Only get the donations made to campaigns 
                    initiated by the Admin.. 
                    Dont need all the campaign dinations 
                  */
                }
                <Route path="/outgoing-donations" element={<AdminDonations single_admin={true} />} />


                {/* Dont need this route.. Its already handled */}
                {/* <Route path="/recent" element={<Recent />} /> */}


                {
                  /*
                    This needs serious makeovers!!
                      1. Need to make it so that it is campaign specific..
                      2. In-corporate multi-page form for collecting different information.
                      3. Custom forms for many different doation catagories.
                  */
                }
                <Route path="/donors" element={<Donors />} />
                <Route path="/createCampaign" element={<CreateCampaign />} />

                {/* Will look into this later-onn!! */}
                <Route path="/viewcampaign" element={<AllCampaigns />} />


                <Route path="/graphs" element={<Graphs />} />
                <Route path="/geography" element={<GeographyMap />} />
                <Route path="/adminanalytics" element={<AdminAnalytics />} />
                <Route path="/campaigninfo/:id" element={<CampaignInfo />} />
                <Route path="/superadmindonationinfo/:id" element={<SuperAdminDonationInfo />} />
                <Route path="/admindonationinfo/:id" element={<AdminDonationInfo />} />

                {/* <Route path="*" /> */}
                {/* </>
                  ) : accountType === "superadmin" ? (
                    <> */}
                <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
                <Route path="/viewcampaign" element={<AllCampaigns />} />
                <Route path="/admins" element={<Admins />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/donordonations" element={<DonorDonations />} />
                <Route path="/admindonations" element={<AdminDonations />} />
                <Route path="/superadmindonations" element={<SuperAdminDonations />} />
                <Route path="/categorydonations" element={<CategoryDonations />} />
                <Route path="/registerdonation" element={<DonationRegistration />} />
                <Route path="/superdonation" element={<SuperDonation />} />
                <Route path="/graphs" element={<Graphs />} />
                <Route path="/geography" element={<GeographyMap />} />
                <Route path="/superreports" element={<SuperReports />} />
                <Route path="/adminanalytics/:id" element={<AdminAnalytics />} />
                <Route path="/donorinfo/:id" element={<DonorInfo />} />
                <Route path="/campaigninfo/:id" element={<CampaignInfo />} />
                <Route path="/superadmindonationinfo/:id" element={<SuperAdminDonationInfo />} />
                <Route path="/admindonationinfo/:id" element={<AdminDonationInfo />} />
                <Route path="/donordonationinfo/:id" element={<DonorDonationInfo />} />

                {/* <Route path="*" /> */}
                {/* </>
                  ) : (
                    <> */}
                <Route path="/" element={<Login handleAccountTypeChange={handleAccountTypeChange} />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="*" /> */}
                {/* </> */}
                {/* ) */}
                {/* } */}
              </Routes>
            </main>
          </div>
        </AccountTypeContext.Provider>
        {/* // )} */}
        {/* {!user && (
          <main className="content">
            <Routes>
              <Route path="/" element={<Login handleAccountTypeChange={handleAccountTypeChange} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*"

              />
            </Routes>
          </main>
        )} */}



      </ThemeProvider>
    </ColorModeContext.Provider >
  );
}

export default App;