import {ColorModeContext, useMode} from './theme';
import {CssBaseline, ThemeProvider} from '@mui/material';
import Topbar from "./scenes/global/Topbar"

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
        <main className="content">
          <Topbar/>
        </main>
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
