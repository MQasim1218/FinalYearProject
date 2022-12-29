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

const AdminAnalytics = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [activeCampaigns, setActiveCamps] = useState([])
  const [totDonations, setTotDon] = useState(0)
  const [activeDonors, setActiveDonors] = useState([])
  const [activeBenifs, setActiveBenifs] = useState([])
  const [donations, setDonations] = useState([])

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="User Info" subtitle="View user information" />
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
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <UserBox
            name="Aown R."
            accounttype="Donor"
            picture={<PersonOutlineOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />}
            participated="5"
            joindate="16-Oct-2019"
            latestdonation="10-Dec-22"
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
            title="$500"
            subtitle="Highest One Time Donation"
            increase="This Month: $190"
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
            title="Account Tier"
            subtitle="Gold"
            increase="Awarded by: ADMIN"
            icon={
              <LocalPoliceOutlinedIcon
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
              All Donations
            </Typography>
          </Box>
          {donations.map((transaction, i) => (
            <Box

              key={`${transaction._id}`}
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
                  {transaction.donor.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.createdAt}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                color={colors.grey[900]}
              >
                ${transaction.amount}
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography padding="10px 0 0 10px" variant="h6" color={colors.grey[100]}>Yearly Donations</Typography>
          <UserLineChart isDashboard={true} />
        </Box>

        {/* <Box
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
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
                color={colors.grey[900]}
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box> */}
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