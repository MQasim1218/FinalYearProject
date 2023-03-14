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
import { useGetSingleDonationQuery } from '../../app/redux-features/Donations/SupAdminDonations/SupAdminDonationsSlice';


const SuperAdminDonationInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sa_donation, setSA_Donation] = useState([])

  let { id } = useParams();

  const {
    data: singleDonation,
    error: donError,
    isError: donIsError,
    isSuccess: donIsSuccess,
    isLoading: donIsLoading
  } = useGetSingleDonationQuery(id)

  console.log("Single Donation retrieved is: ", singleDonation)


  // Time to get all the Admin Donations where the Admin spent money using this donation
  // The hook takes the `id` of the SuperAdmin Donation
  const { } = useGetDonationsFromSingle_SADonationQuery(id)


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "madeby", headerName: "Made By", flex: 0.5 },
    {
      field: "givenby",
      headerName: "Given To",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "amountused",
      headerName: "Amount Allocated",
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
          title={singleDonation?.admin.name}
          subtitle="Person Donation Allocated"
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
          title={singleDonation?.amount}
          subtitle="Donation amount"
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
          title={singleDonation?.donated}
          subtitle="Campaigns Supported"
          icon={
            <CalendarMonthOutlinedIcon
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
          title={singleDonation?.remaining}
          subtitle="Remaining Amount"
          icon={
            <CalendarMonthOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>

      {/* 
        This was the Donation Date! I am adding it to the top
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="22-Feb-2023"
            subtitle="Date Donation Given To Admin"
            icon={
              <CalendarMonthOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> 
      */}
    </Box>
    <Box mt="5rem">
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>Donation Flow</Typography>
    </Box>
    <Box
      m="40px 0 0 0"
      height="40vh"
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
      <DataGrid
        checkboxSelection
        rows={mockDataDonationInfo}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    </Box>
  </Box>)
}

export default SuperAdminDonationInfo