import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
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

function App() {
  const [theme, colorMode] = useMode();
  const location = useLocation()

  return ( 
    //Context for colormode, so we can use it anywhere.
  <ColorModeContext.Provider value={colorMode}>
    {/*ThemeProvider is used so that material UI has access to it as well.*/}
    <ThemeProvider theme={theme}>
    {/*CssBaseline resets the css to default on colorchange*/}
      <CssBaseline/>

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
        <UserSidebar/>
        <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/donordashboard" element = { <DonorDashboard/>}/>
            <Route path="/donations" element = { <Donations/>}/>
            <Route path="/users" element = { <Users/>}/>
            <Route path="/recent" element = { <Recent/>}/>
            <Route path="/createCampaign" element = { <CreateCampaign/>}/>
            <Route path="/graphs" element = { <Graphs/>}/>
            <Route path="/geography" element = { <GeographyMap/>}/>
            <Route path="/viewcampaign" element = { <AllCampaigns/>}/>
          </Routes>
        </main>
      </div>
      }
    </ThemeProvider>
    </ColorModeContext.Provider>
  
  );
}

export default App;
