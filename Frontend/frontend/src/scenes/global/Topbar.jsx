import {Box, IconButton, useTheme} from "@mui/material";
import { useContext } from "react";
import {ColorModeContext, tokens} from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Navigate, useNavigate } from "react-router-dom";


const Topbar = () => {
    const navigate = useNavigate();

    //Grabs the theme in react using mui
    const theme = useTheme()
    //token for light/dark theme, goes to theme.js
    const colors = tokens(theme.palette.mode)
    //to allow to toggle states for colormode
    const colorMode = useContext(ColorModeContext)

    return(
        //Box is basically div component from mui, but you can put CSS props in it
        <Box display="flex" justifyContent="space-between" p={2}>
            {/*Search Bar*/}
            <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px" >
                <InputBase sx={{ml: 2, flex: 1}} placeholder="Search"/>
                <IconButton type="button" sx={{ p:1 }}>
                    <SearchIcon/>
                </IconButton>
            </Box>

            {/*Header Tags if needed*/}
            <Box> 
            </Box>


            {/*Icons*/}
            <Box display="flex"> 
                <IconButton>
                    <NotificationsOutlinedIcon/>
                </IconButton>

                <IconButton>
                    <SettingsOutlinedIcon/>
                </IconButton>

                <IconButton>
                    <PersonOutlinedIcon/>
                </IconButton>

                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon/>
                    ) : (
                        <LightModeOutlinedIcon/>
                    )} 
                </IconButton>

                <IconButton onClick={()=> navigate('/') } >
                    <LogoutOutlinedIcon/>
                </IconButton>

            </Box>
        </Box>
    )
}

export default Topbar;