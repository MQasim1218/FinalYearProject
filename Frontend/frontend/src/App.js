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
import AdminAnalytics from './scenes/adminAnalytics';
import SuperSidebar from './scenes/global/SuperSidebar';
import SuperReports from './scenes/superReports';
import SuperDonation from './scenes/superDonation';
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
          <Route path="/" element = { <Login/>}/>
          <Route path="/register" element = { <Register/>}/>
        </Routes>
      </main>
    </div>
    ) : 
      <div className="app">
         {location.pathname === `/admindashboard` || location.pathname === `/donations` || location.pathname === `/users`|| location.pathname === `/recent` || location.pathname === `/createCampaign` || location.pathname === `/graphs` || location.pathname === `/geography` || location.pathname === `/viewcampaign` || location.pathname === `/adminanalytics` || location.pathname === `/superreports` || location.pathname === `/superdonation` ? (<SuperSidebar/>) : (<UserSidebar/>)}
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
            <Route path="/useranalytics" element = { <DonorInfo/>}/>
            <Route path="/areaanalytics" element = { <AreaAnalytics/>}/>
            <Route path="/timeanalytics" element = { <TimeAnalytics/>}/>
            <Route path="/donorgeographymap" element = { <GeographyMapDonor/>}/>
            <Route path="/donationreports" element = { <DonationReports/>}/>
            <Route path="/expenditurereports" element = { <ExpenditureReports/>}/>
            <Route path="/campaigninfo" element = { <CampaignInfo/>}/>
            <Route path="/donorinfo" element = { <DonorInfo/>}/>

          </Routes>
        </main>
      </div>
      }
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;






			



