import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar"
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
import UserSidebar from './scenes/global/UserSidebar';
import AreaAnalytics from './scenes/areaAnalytics';
import Donate from './scenes/donate';
import ViewDonations from './scenes/viewDonations';
import ViewCampaigns from './scenes/viewCampaigns';
import UserAnalytics from './scenes/userAnalytics';
import TimeAnalytics from './scenes/timeAnalytics';
import GeographyMapDonor from './scenes/geographyMapDonor';
import DonationReports from './scenes/donationReports';
import ExpenditureReports from './scenes/expenditureReports';
import CampaignInfo from './scenes/campaignInfo';
import DonorInfo from './scenes/donorInfo';
import { useAuthContext } from './hooks/useAuthContext';


function App() {
  const [theme, colorMode] = useMode()
  const location = useLocation()
  const { user } = useAuthContext();


  return (
    //Context for colormode, so we can use it anywhere.
    <ColorModeContext.Provider value={colorMode}>
      {/*ThemeProvider is used so that material UI has access to it as well.*/}
      <ThemeProvider theme={theme}>
        {/*CssBaseline resets the css to default on colorchange*/}
        <CssBaseline />

        {location.pathname === `/` || location.pathname === `/register` ? (
          <div className="app">
            <main className="content">
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </main>
          </div>
        ) :
          <div className="app">
            <UserSidebar />
            {/* <Sidebar /> */}
            <main className="content">
              <Topbar />
              <Routes>

                {/* ##### FREE ROUTES ##### */}

                <Route path="/donordashboard" element={<DonorDashboard />} />
                <Route path="/admindashboard" element={<Dashboard />} />
                <Route path="/donations" element={<Donations />} />
                <Route path="/users" element={<Users />} />
                <Route path="/recent" element={<Recent />} />
                <Route path="/createCampaign" element={<CreateCampaign />} />
                <Route path="/graphs" element={<Graphs />} />
                <Route path="/geography" element={<GeographyMap />} />
                <Route path="/viewcampaign" element={<AllCampaigns />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/viewdonations" element={<ViewDonations />} />
                <Route path="/viewcampaigns" element={<ViewCampaigns />} />
                <Route path="/useranalytics" element={<UserAnalytics />} />
                <Route path="/areaanalytics" element={<AreaAnalytics />} />
                <Route path="/timeanalytics" element={<TimeAnalytics />} />
                <Route path="/geographymap" element={<GeographyMapDonor />} />
                <Route path="/donationreports" element={<DonationReports />} />
                <Route path="/expenditurereports" element={<ExpenditureReports />} />
                <Route path="/campaigninfo" element={<CampaignInfo />} />
                <Route path="/donorinfo" element={<DonorInfo />} />


                {/* ##### Restricted Routes ##### */}
                {/* FIXME: These routes need to be user for the main deployment*/}
                {/* FIXME: Also need to shuffle the routes based on thier fucntionality */}
                {/* FIXME: Also need some restructuring */}
                {/* FIXME: Not all routes are accessible to all users, thus they need to be restricted from other users.. like benificiary cant donate */}
                {/* <Route path="/donordashboard" element={user ? <DonorDashboard /> : <Login />} />
                <Route path="/admindashboard" element={user ? <Dashboard /> : <Login />} />

                <Route path="/donations" element={user ? <Donations /> : <Login />} />
                <Route path="/users" element={user ? <Users /> : <Login />} />
                <Route path="/recent" element={user ? <Recent /> : <Login />} />

                <Route path="/createCampaign" element={user ? <CreateCampaign /> : <Login />} />
                <Route path="/graphs" element={user ? <Graphs /> : <Login />} />
                <Route path="/donate" element={user ? <Donate /> : <Login />} />
                <Route path="/geography" element={user ? <GeographyMap /> : <Login />} />
                <Route path="/viewcampaign" element={user ? <AllCampaigns /> : <Login />} />

                <Route path="/viewdonations" element={user ? <ViewDonations /> : <Login />} />
                <Route path="/viewcampaigns" element={user ? <ViewCampaigns /> : <Login />} />
                <Route path="/useranalytics" element={user ? <UserAnalytics /> : <Login />} />
                <Route path="/areaanalytics" element={user ? <AreaAnalytics /> : <Login />} />
                <Route path="/timeanalytics" element={user ? <TimeAnalytics /> : <Login />} />

                <Route path="/geographymap" element={user ? <GeographyMapDonor /> : <Login />} />
                <Route path="/donationreports" element={user ? <DonationReports /> : <Login />} />
                <Route path="/expenditurereports" element={user ? <ExpenditureReports /> : <Login />} />
                <Route path="/campaigninfo" element={user ? <CampaignInfo /> : <Login />} />
                <Route path="/donorinfo" element={user ? <DonorInfo /> : <Login />} /> */}

              </Routes>
            </main>
          </div>
        }
      </ThemeProvider>
    </ColorModeContext.Provider>

  );
}

export default App;
