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
import { mockDataDonationInfo2 } from '../../data/mockData';
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';


const AdminDonationInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let  {id}  = useParams();
  const [donations, setDonations] = useState([])

  //COMMENTING OUT CUZ OF WHITESCREEN FOR ME (AOWN)
  //const { user } = useAuthContext('aown')

  /**
   * Lazy fetch all the dynamic data needed for the dashboard.
   */

  //####################Commenting out useEffect cuz it gives me whitescreen as there is no backend######################//

  useEffect(() => {

    //   //   // Get all the campaigns and count them
    //   //   // TODO: Cache these campaigns using context API
    //   const getCampaigns = async () => {
    //     // const res = await fetch('http://localhost:5000/admin')
    //     try {
    //       let gen_res = await axios.get("http://localhost:5000/gen_campaigns/")
    //       let spec_res = await axios.get("http://localhost:5000/spec_campaigns")

    //       if (gen_res.status < 300 && gen_res.status < 300) {
    //         let data = gen_res.data.concat(spec_res.data)
    //         if (data !== null) return data
    //         else console.log("No data recieved!")
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    //   const getDonors = async () => {
    //     // const res = await fetch('http://localhost:5000/admin')
    //     try {
    //       let res = await axios.get("http://localhost:5000/donor/allDonors")
    //       if (res.status < 300) {
    //         let data = res.data
    //         console.log(data)
    //         setActiveDonors(data)
    //         if (data !== null) return data
    //         else console.log("No data recieved!")
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    //   const getBenificiries = async () => {
    //     // const res = await fetch('http://localhost:5000/admin')
    //     try {
    //       let res = await axios.get("http://localhost:5000/benificiary/")
    //       if (res.status < 300) {
    //         let data = res.data
    //         console.log(data)
    //         if (data !== null) return data
    //         else console.log("No data recieved!")
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    //COMMENTING OUT CUZ OF WHITESCREEN FOR ME (AOWN)
    // const getDonations = async () => {
    //   try {
    //     let donor_id = user.user.user._id
    //     let res = await axios.get(
    //       `http://localhost:5000/donor/${donor_id}/donations`,
    //       {
    //         headers: {
    //           'Authorization': `Bearer ${user.user.token}`
    //         }
    //       }
    //     )
    //     if (res.status < 400) {
    //       if (res.data !== null) return res.data
    //       else console.log("No data recieved!")
    //     }

    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // getDonations().then((dons) => {
    //   console.log(dons)
    //   setDonations(dons)
    // })

    // //   getCampaigns().then((camps) => {
    // //     setActiveCamps(camps)
    // //   })
    // //   getDonors().then((dons) => {
    // //     setActiveDonors(dons)
    // //   })
    // //   getBenificiries().then((benifs) => {
    // //     setActiveBenifs(benifs)
    // //   })

    // return (() => console.log("No clean up"))
  }, [])

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
      <Header title="Admin Donation Info" subtitle="View Admin to Beneficiary donation information" />
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
          title="Beneficiary 1"
          subtitle="Donation Given To"
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
          title="$60"
          subtitle="Donation amount"
          increase={"Donation ID: "+id}
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
          title="Food"
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
          title="22-Feb-2023"
          subtitle="Date Donation Given To Beneficiary"
          icon={
            <CalendarMonthOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      </Box>
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
          rows={mockDataDonationInfo2}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
  </Box>)
}

export default AdminDonationInfo