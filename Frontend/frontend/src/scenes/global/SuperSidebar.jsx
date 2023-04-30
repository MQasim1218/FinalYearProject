import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar"
import 'react-pro-sidebar/dist/css/styles.css'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
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
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import PriceCheckOutlinedIcon from '@mui/icons-material/PriceCheckOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
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


const SuperSidebar = () => {
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
                                        SUPER ADMIN
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
                                    <Typography variant="h3" color={colors.grey[100]} fontWeight="bold" sx={{ m: "10px 0 0 0" }} >
                                        {user?.user?.name || "SuperAdmin"}
                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Menu Items here */}
                        {/* <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item title="Dashboard" to="/superadmindashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>View</Typography>
                            <Item title="All Campaigns" to="/viewcampaign" icon={<ViewCozyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Users</Typography>
                            <Item title="Admins" to="/admins" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Donors" to="/donors" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Donations</Typography>

                            <Item title="Donor Donations" to="/donordonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Admin Donations" to="/admindonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Super Admin Donations" to="/superadmindonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Category Donations" to="/categorydonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />

                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Allocate Donations</Typography>
                            <Item title="Register Donations" to="/registerdonation" icon={<PriceCheckOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Give Donations" to="/superdonation" icon={<PriceCheckOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        </Box> */}


                        {/* Menu Items here */}
                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item title="Dashboard" to="/superadmindashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>View</Typography>
                            <Item title="All Campaigns" to="/viewcampaign" icon={<ViewCozyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Users</Typography>
                            <Item title="Admins" to="/admins" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Donors" to="/donors" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />

                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Donations</Typography>
                            <Item title="Donor Donations" to="/donordonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Super Admin Donations" to="/superadmindonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Admin Donations" to="/admindonations" icon={<AttachMoneyOutlinedIcon />} selected={selected} setSelected={setSelected} />

                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Allocate Donations</Typography>
                            <Item title="Register Donations" to="/registerdonation" icon={<PriceCheckOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Give Donations" to="/superdonation" icon={<PriceCheckOutlinedIcon />} selected={selected} setSelected={setSelected} />


                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Analytics</Typography>
                            <Item title="Graphs" to="/graphs" icon={<BarChartOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Geography Map" to="/geography" icon={<MapOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Reports" to="/superreports" icon={<SummarizeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        </Box>


                    </Menu>
                </ProSidebar>
            </StickyBox>

        </Box>

    )
}

export default SuperSidebar