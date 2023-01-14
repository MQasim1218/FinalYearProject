import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation, redirect as Redirect } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar"
import Dashboard from "./scenes/dashboard"
import Donations from "./scenes/donations"
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
import AccountTypeContext from './accountTypeContext';
import { useAuthContext } from './hooks/useAuthContext';
import DonationRegistration from './scenes/donationRegisteration';
import Sidebars from './scenes/global/Sidebars';
import { useState, useEffect } from 'react';
import SuperAdminDashboard from './scenes/superAdminDashboard';


function App(props) {


  const [accountType, setAccountType] = useState('');
  const [theme, colorMode] = useMode()
  const location = useLocation()
  //const { user } = useAuthContext();
  const user = "donor"
  //IMPORTANT: UNCOMMENT THIS CODE AND TRY TO RUN IT. MERE PAS PAGE BAR BAR RELOAD KRTA REHTA HA I THINK
  // useEffect(() => {
  //   if (!user) {
  //     setTimeout(() => {
  //       window.location.href = '/';
  //     }, 0);
  //   }
  // }, [user]);

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
        {/* {location.pathname === `/` || location.pathname === `/register` ? (
      <div className="app">
        <AccountTypeContext.Provider value={accountType}>
      <main className="content">
        <Routes>
          <Route path="/" element = { <Login handleAccountTypeChange={handleAccountTypeChange}/>}/>
          <Route path="/register" element = { <Register/>}/>
        </Routes>
      </main>
      </AccountTypeContext.Provider>
    </div>
    
    ) : 
    <AccountTypeContext.Provider value={accountType}>
      {console.log("In app.js = "+accountType)}
      <div className="app">
         <Sidebars/>
        <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/donordashboard" element = { <DonorDashboard/>}/>
            <Route path="/admindashboard" element = { <Dashboard/>}/>
            <Route path="/donations" element = { <Donations/>}/>
            <Route path="/users" element = { <Users/>}/>
            <Route path="/recent" element = { <Recent/>}/>
            <Route path="/createCampaign" element = { <CreateCampaign/>}/>
            <Route path="/graphs" element = { <Graphs/>}/>
            <Route path="/geography" element = { <GeographyMap/>}/>
            <Route path="/viewcampaign" element = { <AllCampaigns/>}/>
            <Route path="/donate" element = { <Donate/>}/>
            <Route path="/viewdonations" element = { <ViewDonations/>}/>
            <Route path="/viewcampaigns" element = { <AllCampaigns/>}/>
            <Route path="/useranalytics/:id" element = { <DonorInfo/>}/>
            <Route path="/areaanalytics" element = { <AreaAnalytics/>}/>
            <Route path="/timeanalytics" element = { <TimeAnalytics/>}/>
            <Route path="/donorgeographymap" element = { <GeographyMapDonor/>}/>
            <Route path="/donationreports" element = { <DonationReports/>}/>
            <Route path="/expenditurereports" element = { <ExpenditureReports/>}/>
            <Route path="/campaigninfo/:id" element = { <CampaignInfo/>}/>
            <Route path="/donorinfo/:id" element = { <DonorInfo/>}/>    
            <Route path="/adminanalytics" element = { <AdminAnalytics/> }/>
            <Route path="/superreports" element = { <SuperReports/> }/>
            <Route path="/superdonation" element = { <SuperDonation/> }/>
            <Route path="/admins" element = { <Admins/> }/>
            <Route path="/donors" element = { <Donors/> }/>
            <Route path="/donordonations" element = { <DonorDonations/> }/>
            <Route path="/admindonations" element = { <AdminDonations/> }/>
            <Route path="/superadmindonations" element = { <SuperAdminDonations/> }/>
            <Route path="/categorydonations" element = { <CategoryDonations/> }/>
            <Route path="/registerdonation" element = { <DonationRegistration/> }/>
            <Route path="/superadmindashboard" element = { <SuperAdminDashboard/> }/>
          </Routes>
        </main>
      </div>
      </AccountTypeContext.Provider>
      } */}
        {user && (
          <AccountTypeContext.Provider value={accountType}>
            <div className="app">
            <Sidebars/>
            <main className="content">
              <Topbar/>
              <Routes>
                {accountType === "donor" ? (
                  <>
                    <Route path="/donordashboard" element={<DonorDashboard />} />
                    <Route path="/viewdonations" element={<ViewDonations />} />
                    <Route path="/viewcampaigns" element={<AllCampaigns />} />
                    <Route path="/useranalytics" element={< DonorInfo />} />
                    <Route path="/useranalytics/:id" element={< DonorInfo />} />
                    <Route path="/areaanalytics" element={<AreaAnalytics />} />
                    <Route path="/timeanalytics" element={<TimeAnalytics />} />
                    <Route path="/geographymap" element={<GeographyMap />} />
                    <Route path="/donationreports" element={<DonationReports />} />
                    <Route path="/expenditurereports" element={<ExpenditureReports />} />

                    <Route path="*"
                      render={() => <Redirect to='/donordashboard' />}
                    />
                  </>
                ) : accountType === "admin" ? (
                  <>
                    <Route path="/admindashboard" element={<Dashboard />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/donations" element={<Donations />} />
                    <Route path="/recent" element={<Recent />} />
                    <Route path="/createCampaign" element={<CreateCampaign />} />
                    <Route path="/viewcampaign" element={<AllCampaigns />} />
                    <Route path="/graphs" element={<Graphs />} />
                    <Route path="/geography" element={<GeographyMap />} />
                    <Route path="/adminanalytics" element={<AdminAnalytics />} />
                    <Route path="*"
                      render={() => <Redirect to='/admindashboard' />}
                    />
                  </>
                ) : accountType === "superadmin" ? (
                  <>
                    <Route path="/superadmindashboard" element={<SuperAdminDashboard />} />
                    <Route path="/viewcampaign" element={<AllCampaigns />} />
                    <Route path="/admins" element={<Admins />} />
                    <Route path="/donors" element={<Donors />} />
                    <Route path="/donordonations" element={<DonorDonations />} />
                    <Route path="/admindonations" element={<AdminDonations />} />
                    <Route path="/superadmindonations" element={<SuperAdminDonations />} />
                    <Route path="/categorydonations" element={<CategoryDonations />} />
                    <Route path="/registerdonation" element = { <DonationRegistration/> }/>
                    <Route path="/superdonation" element={<SuperDonation />} />
                    <Route path="/graphs" element={<Graphs />} />
                    <Route path="/geography" element={<GeographyMap />} />
                    <Route path="/superreports" element={<SuperReports />} />

                    <Route path="*"
                      render={() => <Redirect to='/superadmindashboard' />}
                    />
                  </>
                ) : (
                  <>
                    <Route path="/" element={<Login handleAccountTypeChange={handleAccountTypeChange} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*"
                      render={() => <Redirect to='/' />}
                    />
                  </>
                )}
              </Routes>
            </main>
            </div>
          </AccountTypeContext.Provider>
        )}
        {!user && (
          <main className="content">
            <Routes>
              <Route path="/" element={<Login handleAccountTypeChange={handleAccountTypeChange} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*"
                render={() => <Redirect to='/' />}
              />
            </Routes>
          </main>
        )}



      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;










