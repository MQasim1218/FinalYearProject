import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Topbar from "./scenes/global/Topbar"
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/dashboard"
import Donations from "./scenes/donations"
import Recent from "./scenes/recentDonations"
import Users from "./scenes/users"
// import Bar from "./scenes/bar"
import CreateCampaign from "./scenes/createCampaign"
// import Line from "./scenes/line"
// import Pie from "./scenes/pie"
// import FAQ from "./scenes/faq"
// import Geography from "./scenes/geography"

function App() {
  const [theme, colorMode] = useMode();
  
  return ( 
    //Context for colormode, so we can use it anywhere.
  <ColorModeContext.Provider value={colorMode}>
    {/*ThemeProvider is used so that material UI has access to it as well.*/}
    <ThemeProvider theme={theme}>
    {/*CssBaseline resets the css to default on colorchange*/}
      <CssBaseline/>
      <div className="app">
        <Sidebar/>
        <main className="content">
          <Topbar/>
          <Routes>
            <Route path="/" element = { <Dashboard/>}/>
            <Route path="/donations" element = { <Donations/>}/>
            <Route path="/users" element = { <Users/>}/>
            <Route path="/recent" element = { <Recent/>}/>
            {/* <Route path="/bar" element = { <Bar/>}/> */}
            <Route path="/createCampaign" element = { <CreateCampaign/>}/>
            {/* <Route path="/line" element = { <Line/>}/> */}
            {/* <Route path="/pie" element = { <Pie/>}/> */}
            {/* <Route path="/faq" element = { <FAQ/>}/> */}
            {/* <Route path="/geography" element = { <Geography/>}/> */}
          </Routes>
        </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
