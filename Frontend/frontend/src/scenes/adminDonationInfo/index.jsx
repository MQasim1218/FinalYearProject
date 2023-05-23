import React from 'react'
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Geography from "../../components/Geography";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';
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
import { mockDataDonationInfo2 } from '../../data/mockData';
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import {useGetDonationQuery} from '../../app/redux-features/donations/AdminDonations/AdminDonsSlice'
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';

const AdminDonationInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let  {id}  = useParams();
  const [donations, setDonations] = useState([])

  const { data : adminDonationData, error, isLoading, isSuccess } = useGetDonationQuery(id)

  let Camapign_Category = "Loading..."
  let Campaign_Amount = "Loading..."
  let Campaign_DonatedBy = "Loading..."
  let Campaign_DonatedAt = "Loading..."
  let Campaign_Title = "Loading..."

if(isSuccess){
  console.log("Data: ",adminDonationData)
  Camapign_Category = adminDonationData[0]?.campaign.category;
  Campaign_Amount = adminDonationData[0]?.amount;
  Campaign_DonatedBy = adminDonationData[0]?.admin.name;
  Campaign_DonatedAt = adminDonationData[0]?.createdAt.slice(0,10);
  Campaign_Title = adminDonationData[0]?.campaign.campaign_title;
}

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.5 },
    {
      field: "givenby",
      headerName: "Given By",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
        field: "givento",
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
      <Header title="Admin Donation Info" subtitle="View Admin to Campaign Donation Information" />
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
          title={Campaign_Title}
          subtitle="Campaign Title"
          icon={<CampaignOutlinedIcon
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
          title={Campaign_Amount}
          subtitle="Donation amount"
          increase={`Admin: ${Campaign_DonatedBy}`}
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
          title={Camapign_Category}
          subtitle="Donation Category"
          icon={
            <CategoryOutlinedIcon
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
          title={Campaign_DonatedAt}
          subtitle="Date Donation Given To Campaign"
          icon={
            <CalendarMonthOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
    <Box mt="1rem">
      <Typography variant="h4" color={colors.blueAccent[500]} >Donation Flow</Typography>
    </Box>
      <Box
        m="20px 0 0 0"
        height="55vh"
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
          rows={mockDataDonationInfo2}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
  </Box>)
}

export default AdminDonationInfo