import React from 'react'
import { Box, Button, IconButton, Typography, useTheme, Modal } from "@mui/material";
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
import { useGetDonorQuery } from '../../app/redux-features/users/DonorSlice';
import { useDonorSingleDonationsQuery } from '../../app/redux-features/donations/DonorDonations/DonorDonsSlice';
import { useAllSA_DonsFromDonorDonationQuery, useAllSuperAdminDonationsQuery } from '../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const DonorDonationInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let { id } = useParams();
  const [donations, setDonations] = useState([])
  const [open, setOpen] = useState(false)

  console.log("Donor donation id is: ", id)


  const handleClose = () => {
    setOpen(false)
  }

  let { user } = useAuthContext()

  const handleOpen = () => {
    setOpen(true)
  }

  let {
    data: donor_donation,
    isSuccess: donationIsSuccess
  } = useDonorSingleDonationsQuery(id)

  
  if (donationIsSuccess) {
    console.log("Retrieved donor donation is: ", donor_donation)
  }

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "ind", headerName: "Num" },
    {
      field: "admin_name",
      headerName: "Admin Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "admin_email",
      headerName: "Admin Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "createdAt",
      headerName: "Transferred On",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount Given (To Admin)",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "donated",
      headerName: "Amount Donated (By Admin)",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: "category",
      headerName: "Category",
      flex: 0.5,
    },
    // {

    //   // Okay
    //   field: 'View',
    //   type: 'actions',
    //   headerName: "View",
    //   width: 100,
    //   getActions: (row) => [
    //     <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={handleOpen} />,
    //   ],
    // },
  ];

  // Get the SuperAdmin Donations where this donor donation went.
  let { data: sa_dons, isSuccess: sa_donsIsSuccess } = useAllSA_DonsFromDonorDonationQuery(id)
  if (sa_donsIsSuccess) {
    console.log("Retrieved SuperAdmin donations are: ", sa_dons)
    sa_dons = sa_dons?.map((don, ind) => ({
      ...don,
      ind: ind,
      id: don._id,
      createdAt: don.createdAt?.slice(0, 10),
      admin_name: don.admin?.name,
      admin_email: don.admin?.email,
    }))
  }

  return (<Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Donor Donation Info" subtitle="View Donor to SuperAdmin donation information" />
    </Box>

    <Box>
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0px 0 10px 10px" }}>General Information</Typography>
    </Box>

    <>
      <Box style={{ marginTop: '2%' }}>

        <Modal open={open} onClose={handleClose}>
          
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: "80%",
              height: "60%",
              bgcolor: colors.primary[500],
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box>
        <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>Donation Breakdown</Typography>
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
          </Box>
        </Modal>
      </Box>
    </>


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
        <UserBox
          name={`${donor_donation?.donor?.name}`}
          accounttype="Donor"
          picture={<PersonOutlineOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />}
          participated="5"
          joindate={`${donor_donation?.donor?.createdAt?.slice(0, 10)}`}
        // latestdonation="10-Dec-22"
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
          title={`${donor_donation?.amount}`}
          subtitle="Donation amount"
          increase={"Date: " + donor_donation?.createdAt?.slice(0, 10)}
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
          title={donor_donation?.donation_title}
          subtitle="Donation Title"
          // increase="Made through: SuperAdmin"
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
          title={donor_donation?.catagory}
          subtitle="Donation Category"
          // increase="To: Admin1"
          icon={
            <CalendarMonthOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
    </Box>
    <Box mt="5rem">
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>SuperAdmin Donations from this donation</Typography>
    </Box>
    <Box
      m="40px 0 0 0"
      height="60vh"
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
      {
        sa_donsIsSuccess &&
        <DataGrid
          checkboxSelection
          rows={sa_dons}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          columnVisibilityModel={{
            id: false
          }}
        />
      }
    </Box>
  </Box>)
}

export default DonorDonationInfo