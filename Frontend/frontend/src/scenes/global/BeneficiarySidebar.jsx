import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import StickyBox from "react-sticky-box";
import VolunteerActivismOutlinedIcon from "@mui/icons-material/VolunteerActivismOutlined";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import InsertChartOutlinedOutlinedIcon from "@mui/icons-material/InsertChartOutlinedOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import { useAuthContext } from "../../hooks/useAuthContext";
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // Creating a template using react-pro-side for menu items, so we dont have to do it again and again
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const UserSidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const { user } = useAuthContext();


    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
                "& .pro-sidebar .pro-menu": {
                    height: "100vh",
                },
            }}
        >
            <StickyBox>
                <ProSidebar collapsed={isCollapsed}>
                    <Menu iconShape="square">
                        {/*Logo and Menu Icons*/}
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                            style={{ margin: "10px 0 20px 0", color: colors.grey[100] }}
                        >
                            {!isCollapsed && (
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    ml="15px"
                                >
                                    <Typography variant="h3" color={colors.grey[100]}>
                                        Beneficiary
                                    </Typography>
                                    <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                        <MenuOutlinedIcon />
                                    </IconButton>
                                </Box>
                            )}
                        </MenuItem>

                        {/* Donor profile and name etc */}
                        {!isCollapsed && (
                            <Box mb="25px">
                                <Box display="flex" justifyContent="center" alignItems="center">
                                    <img
                                        alt="User-photo"
                                        width="100px"
                                        height="100px"
                                        src={user.user.picture}
                                        style={{ borderRadius: "50%", objectFit: "cover" }}
                                    />
                                </Box>

                                <Box textAlign="center">
                                    <Typography
                                        variant="h3"
                                        color={colors.grey[100]}
                                        fontWeight="bold"
                                        sx={{ m: "10px 0 0 0" }}
                                    >
                                        {user?.user?.name || "User"}

                                    </Typography>
                                </Box>
                            </Box>
                        )}

                        {/* Menu Items here */}
                        <Box paddingLeft={isCollapsed ? undefined : '10%'}>
                            <Item title="Dashboard" to="/beneficiarydashboard" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Verification</Typography>
                            <Item title="Upload Documents" to="/viewdonations" icon={<DriveFolderUploadOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Verification Status" to="/viewdonations" icon={<VerifiedOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Request</Typography>
                            {/* <Item title="Donate" to="/donate" icon={<VolunteerActivismOutlinedIcon/>} selected={selected} setSelected={setSelected} /> */}
                            <Item title="Donation" to="/viewdonations" icon={<VolunteerActivismOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Item title="Campaign" to="/viewdonations" icon={<CampaignOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Requested Donations</Typography>
                            <Item title="View Donations" to="/viewdonations" icon={< VisibilityOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Requested Campaigns</Typography>
                            <Item title="View Campaigns" to="/viewcampaigns" icon={<CampaignOutlinedIcon />} selected={selected} setSelected={setSelected} />
                            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>Analytics</Typography>
                            <Item title="User Analytics" to="/useranalytics" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
                        </Box>


                    </Menu>
                </ProSidebar>
            </StickyBox>
        </Box>
    );
};

export default UserSidebar;
