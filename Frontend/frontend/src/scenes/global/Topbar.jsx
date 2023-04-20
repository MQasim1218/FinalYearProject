import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Navigate, useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import { useAuthContext } from "../../hooks/useAuthContext";



const Topbar = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext()

    const userType = JSON.parse(localStorage.getItem('userType'));


    //Grabs the theme in react using mui
    const theme = useTheme()
    //token for light/dark theme, goes to theme.js
    const colors = tokens(theme.palette.mode)
    //to allow to toggle states for colormode
    const colorMode = useContext(ColorModeContext)

    // Get the logout function from the context-hook
    const { logout } = useLogout()


    return (
        //Box is basically div component from mui, but you can put CSS props in it
        <Box display="flex" justifyContent="space-between" p={2}>


            {/*Header Tags if needed*/}
            <Box>
            </Box>


            {/*Icons*/}
            <Box display="flex">
                {userType === "admin" || "superadmin" ? (<IconButton onClick={async () => { navigate('/chat')
                        ;
                    }}>
                    <MessageOutlinedIcon />
                </IconButton>) : (null)}
                
                

                <IconButton onClick={async () => { navigate('/settings')
                        ;
                    }}>
                    <SettingsOutlinedIcon />
                </IconButton>

                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>

                <IconButton
                    onClick={async () => {
                        logout()
                        navigate('/')
                    }}
                >
                    <LogoutOutlinedIcon />
                </IconButton>

            </Box>
        </Box>
    )
}

export default Topbar;