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
import { useGetDonorQuery } from '../../app/redux-features/users/DonorSlice';

const DonorInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donations, setDonations] = useState([])

  //COMMENTING OUT CUZ OF WHITESCREEN FOR ME (AOWN)
  //const { user } = useAuthContext('aown')

  /**
   * Lazy fetch all the dynamic data needed for the dashboard.
   */

  //####################Commenting out useEffect cuz it gives me whitescreen as there is no backend######################//

  // useEffect(() => {
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
  // }, [])

  // let { } = useGetDonorQuery(id)

  return (<Box m="20px">
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
          name={"donor.name"}
          accounttype="Donor"
          picture={<PersonOutlineOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />}
          participated="5"
          joindate="{user.user.user.createdAt.slice(0, 10)}"
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
            Recent Donations
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
      //backgroundColor={colors.primary[400]}
      >
        <HomeScreenCampaigns isDashboard={true} title="Latest Donated Campaigns" subtitle="The last three recently donated campaigns of this user" />
      </Box>
    </Box>
  </Box>)
}

export default DonorInfo