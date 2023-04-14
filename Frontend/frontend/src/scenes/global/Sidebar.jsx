import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import 'react-pro-sidebar/dist/css/styles.css'
import { Avatar, Box, IconButton, Typography, useTheme } from '@mui/material'
import { Link } from "react-router-dom"
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import ViewCozyOutlinedIcon from '@mui/icons-material/ViewCozyOutlined';
import StickyBox from "react-sticky-box";
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined'
import { useAuthContext } from "../../hooks/useAuthContext";



const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    // Creating a template using react-pro-side for menu items, so we dont have to do it again and again
    return (
        <MenuItem active={selected === title} style={{ color: colors.grey[100] }} onClick={() => setSelected(title)} icon={icon}  >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    )
}

const Sidebar = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")

    let { user } = useAuthContext()
    return (

        <Box
            sx={{
                "& .pro-sidebar-inner": { background: `${colors.primary[400]} !important` },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important"
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important"
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important"
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important"
                },
                "& .pro-sidebar .pro-menu": {
                    height: "100vh"
                }
            }}>
            <StickyBox>
                <ProSidebar collapsed={isCollapsed} >
                    <Menu iconShape="square">
                        {/*Logo and Menu Icons*/}
                        <MenuItem onClick={() => setIsCollapsed(!isCollapsed)} icon={isCollapsed ? <MenuOutlinedIcon /> : undefined} style={{ margin: "10px 0 20px 0", color: colors.grey[100], }}>
                            {!isCollapsed && (
                                <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                                    <Typography variant="h3" color={colors.grey[100]} >
                                        Admin
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)} >
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {/* Admin profile and name etc */}
                        {!isCollapsed && (
                            <Box mb="25px" >
                                <Box display="flex" justifyContent="center" alignItems="center" >

                                        <img
                                            alt="Admin-photo"
                                            width="100px"
                                            height="100px"
                                            src={user.user.picture}
                                            style={{ cursor: "pointer", borderRadius: "50%", objectFit: "cover" }}
                                        />

                                </Box>

                                <Box textAlign="center">
                                    <Typography
                                        variant="h3"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: "10px 0 0 0" }}
                                    >
                                        {user?.user?.name | "admion" }
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Menu Items here */}
                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item title="Dashboard" to="/admindashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Account Data</Typography>
                            <Item title="Donors" to="/donors" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            {/* <Item title="Donation Info" to="/donations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} /> */}
                            <Item title="Incoming Donations" to="/incoming-donations" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Outgoing Donations" to="/outgoing-donations" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Forms</Typography>
                            <Item title="Create Campaign" to="/createCampaign" icon={<BorderColorOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            {/* <Item title="Manage Loans" to="/loans" icon={<CurrencyExchangeOutlinedIcon/>} selected={selected} setSelected={setSelected} /> */}
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>View</Typography>
                            <Item title="View Campaigns" to="/viewcampaign" icon={<ViewCozyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Analytics</Typography>
                            <Item title="Graphs" to="/graphs" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Geography Map" to="/geography" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Self Analytics" to="/adminanalytics" icon={<AnalyticsOutlinedIcon />} selected={selected} setSelected={setSelected} />



                        </Box>


                    </Menu>
                </ProSidebar>
            </StickyBox>

        </Box>

    )
}

export default Sidebar;