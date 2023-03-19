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
import { useParams } from "react-router-dom";
import { useSingleAdminDonationsQuery } from '../../app/redux-features/Donations/AdminDonations/AdminDonsSlice';
import { useGetAdminQuery } from '../../app/redux-features/users/AdminSlice';

const AdminAnalytics = () => {
  let { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);



  const {
    data: adminDons,
    isError: isAdminErr,
    isLoading: isAdminLoading,
    isSuccess: isAdminSuccess,
    error: AdminErr
  } = useSingleAdminDonationsQuery(id)


  const { data: admin } = useGetAdminQuery(id)
  let RecDonations = <></>

  console.log("We are in this page!!!")


  if (isAdminLoading) console.log("Donations content loading")
  if (isAdminSuccess) {
    // setDonations(adminDons)

    console.log("Donations by this Admin: ", adminDons)
    console.log("Admin recieved is: ", admin)

    RecDonations = (
      adminDons?.map((transaction, i) => (
        <Box

          key={`${i}`}
          display="flex"

          justifyContent="space-between"
          alignItems="center"
          borderBottom={`4px solid ${colors.primary[500]}`}
          p="15px"
        >
          {/* {console.log(transaction)} */}
          <Box>

            <Typography
              color={colors.greenAccent[500]}
              variant="h5"
              fontWeight="600"
            >
              {transaction._id.slice(0, 8)}
            </Typography>

            <Typography color={colors.grey[100]}>
              {transaction.admin.name}
            </Typography>

          </Box>
          <Box color={colors.grey[100]}>{transaction.createdAt.slice(0, 10)}</Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
            color={colors.grey[900]}
          >
            ${transaction.amount}
          </Box>
        </Box>
      ))
    )
  }
  if (isAdminErr) console.log("Error: ", AdminErr.message)



  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Admin Info" subtitle="View Admin information" />
      </Box>

      <Box>
        <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0px 0 10px 10px" }}>General Information</Typography>
      </Box>

      {/* Grids and Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(8, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <UserBox
            name={admin?.name}
            accounttype={admin?.email}
            picture={<PersonOutlineOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />}
            participated="5"
            joindate={admin?.createdAt.slice(0, 10)}
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Account Tier"
            subtitle="Gold"
            // increase="Awarded by: ADMIN"
            icon={
              <LocalPoliceOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${admin?.total_donation}` | -1}
            subtitle="Total Donation Received"
            // increase="This Month: $190"
            icon={
              <AttachMoneyOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>


        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${admin?.amount_available}` | -1}
            subtitle="Available Amount"
            // increase="This Month: $190"
            icon={
              <AttachMoneyOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>



      </Box>
      <Box mt="2rem">
        <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>User Analyitcs</Typography>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              All Donations by the Admin
            </Typography>
          </Box>
          {RecDonations}
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography padding="10px 0 0 10px" variant="h6" color={colors.grey[100]}>Yearly Donations</Typography>
          <UserLineChart isDashboard={true} />
        </Box>
      </Box>

      <Box mt="2rem">
        <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "15px 0 10px 10px" }}>Campaigns Info</Typography>
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 3 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <AllCampaigns isDashboard={true} title="Latest Donated Campaigns" subtitle="The last three recently donated campaigns of this user" />
        </Box>
      </Box>
    </Box>)
}

export default AdminAnalytics