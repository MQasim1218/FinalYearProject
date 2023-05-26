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
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import JSZip from 'jszip';


const CaseVerification = ({ single_donor }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // const [adminDonations, setAdminDonations] = useState([])
  const [donationInfo, setDonationInfo] = useState([])

  // This is the id of the SuperAdmin donation
  let { id } = useParams();

  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "index", headerName: "Num" },
    {
      field: "case_title",
      headerName: "Case Title",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "verified",
      headerName: "Verified",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "Appealed On",
      headerAlign: "left",
      align: "left",
      flex: 0.5
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
    },
    {

      // Okay
      field: 'Download',
      type: 'actions',
      headerName: "Download Files",
      width: 100,
      getActions: (row) => [
        <GridActionsCellItem icon={<DownloadOutlinedIcon />} label="View" onClick={handleDownload} />,
      ],
    },
    {

      // Okay
      field: 'Approve',
      type: 'actions',
      headerName: "Approve Case",
      width: 100,
      getActions: (row) => [
        <GridActionsCellItem icon={<CheckOutlinedIcon />} label="View" onClick={(row) => {
          
          axios.post(`${REACT_APP_BACKEND_BASE_ROUTE}/admin/approveappeal/${row._id}`)
        }} />,
      ],
    },
  ];


  useEffect(() => {
    const getData = async () => {

      console.log("Called getData")

      try {
        const benefCaseData = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_ROUTE}/admin/appealedCases`);
        console.log(benefCaseData)
        setDonationInfo(benefCaseData.data);
        console.log("The applead case sre: ", donationInfo)
      } catch (error) {
        // Handle error if necessary
      }
    };

    getData();
  }, []);

  console.log("The applead case sre: ", donationInfo)


  let AdminDonsDataGrid = <></>



  let adminDons = donationInfo?.map((don, ind) => ({ ...don, id: don._id, index: ind + 1 }))


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
    // const campaignId = item.campaign._id;
    // uniqueCampaignIds.add(campaignId);
    console.log("kfasdkf: ", item)
  });

  // Get the count of unique campaign IDs
  const uniqueCampaignCount = uniqueCampaignIds.size;

  console.log(uniqueCampaignCount);



  const handleDownload = async () => {
    const date = adminDons?.createdAt.slice(0, 10);

    const zip = new JSZip();

    const downloadPromises = adminDons?.campaign_docs.map(async (fileUrl) => {
      const response = await fetch(fileUrl);
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      const fileData = await response.blob();
      zip.file(fileName, fileData);
    });

    await Promise.all(downloadPromises);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `BeneFiles.zip`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }

  const handleApprove = (row) => {
    clg
  }

  return (<Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Beneficiary Case Verification" />
    </Box>


    <Box mt="0.5rem">
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