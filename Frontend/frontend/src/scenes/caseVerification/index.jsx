import React, { useRef } from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Geography from "../../components/Geography";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AllCampaigns from "../allCampaigns";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useState, useEffect } from "react";
import axios from "axios";
import LineChart from "../../components/LineChart";
import CampaignLineChart from "../../components/CampaignLineChart";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import UserBox from '../../components/UserBox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import UserLineChart from '../../components/UserLineChart';
import HomeScreenCampaigns from '../../components/HomeScreenCampaigns';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from "react-router-dom";
import { mockDataDonationInfo } from '../../data/mockData';
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { useGetSingleDonationQuery } from '../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice';
import { useGetDonationsFromSingle_SADonationQuery } from '../../app/redux-features/donations/AdminDonations/AdminDonsSlice';
import { VolunteerActivismOutlined } from '@mui/icons-material';

const CaseVerification = ({ single_donor }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [adminDonations, setAdminDonations] = useState([])
  const [donationInfo, setDonationInfo] = useState([])

  // This is the id of the SuperAdmin donation
  let { id } = useParams();

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "index", headerName: "Num" },
    {
      field: "case_title",
      headerName: "Case Title",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "",
      headerName: "Campaign Goal",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Donated On",
      headerAlign: "left",
      align: "left",
      flex: 0.5
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
    },
  ];

  const getData = async () => {
    let benefCaseData = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_ROUTE}/admin/appealedCases`)
  }

  getData().then((res) => {
    setDonationInfo(res.data)
  })

  let AdminDonsDataGrid = <></>



  adminDons = donationInfo?.map((don, ind) => ({ ...don, id: don._id, index: ind + 1, campaign_name: don.campaign.campaign_title, campaign_goal: don.campaign.required_amount, createdAt: don.createdAt.slice(0, 10) }))


  console.log("Admin donations made from this SuperAdmin Donation are: ", adminDons)



  AdminDonsDataGrid = <DataGrid
    columnVisibilityModel={{
      id: false,
    }}
    checkboxSelection
    rows={adminDons}
    columns={columns}
    components={{ Toolbar: GridToolbar }}
  />

  // }, [adminDons])


  const uniqueCampaignIds = new Set();

  // Iterate over each object in adminDons and add the IDs to the Set
  adminDons?.forEach(item => {
    const campaignId = item.campaign._id;
    uniqueCampaignIds.add(campaignId);
  });

  // Get the count of unique campaign IDs
  const uniqueCampaignCount = uniqueCampaignIds.size;

  console.log(uniqueCampaignCount);


  return (<Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Super Admin Donation Info" subtitle="View SuperAdmin to Admin donation information" />
    </Box>

    <Box>
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0px 0 10px 10px" }}>General Information</Typography>
    </Box>

    {/* Grids and Charts */}
    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
      {/* ROW 1 */}
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={singleDonation?.admin?.name}
          subtitle="Admin Donation Allocated To"
          icon={<PersonOutlineOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />}
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={"$" + singleDonation?.amount}
          subtitle="Donation Amount"
          icon={
            <AttachMoneyOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={uniqueCampaignCount}
          subtitle="Campaigns Supported"
          icon={
            <VolunteerActivismOutlined
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={"$" + singleDonation?.donated}
          subtitle="Donated To Campaign"
          icon={
            <AttachMoneyOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
    <Box mt="5rem">
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>Admin Donations from this Super Donations</Typography>
    </Box>
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      {AdminDonsDataGrid}

    </Box>
  </Box>)
}

export default CaseVerification;