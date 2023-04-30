import React, { useContext, useEffect } from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { useState } from "react";
import UserBox from '../../components/UserBox';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import UserLineChart from '../../components/UserLineChart';
import HomeScreenCampaigns from '../../components/HomeScreenCampaigns';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useParams } from "react-router-dom";
import { AccountTypeContext } from '../../accountTypeContext';
import { useSingleAdminDonationsQuery } from '../../app/redux-features/donations/AdminDonations/AdminDonsSlice';
import { useSingleDonorDonationsQuery } from '../../app/redux-features/donations/DonorDonations/DonorDonsSlice';
import { useGetDonorQuery } from '../../app/redux-features/users/DonorSlice';

const DonorInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let { id } = useParams();
  const [donations, setDonations] = useState([])
  const [max_don, setMaxDon] = useState(-1)
  const [accountTier, setAccountTier] = useState("")

  // COMMENTING OUT CUZ OF WHITESCREEN FOR ME (AOWN)
  const { user } = useAuthContext()
  let accountType = useContext(AccountTypeContext)

  const { data: donorDons, isError: isDonorDonsErr, isLoading: isDonorDonsLoading, isSuccess: isDonorDonsSuccess, error: donorDonsErr } = useSingleDonorDonationsQuery(id)
  const { data: donor } = useGetDonorQuery(id)



  accountType = "donor"
  let RecDonations = <></>


  console.log("Donations by this donor: ", donorDons)

  if (isDonorDonsLoading) console.log("Donations content loading")
  if (isDonorDonsSuccess) {
    // setDonations(donorDons)
    RecDonations = (
      donorDons?.map((transaction, i) => (
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
              {transaction.donation_title}
            </Typography>
  
          </Box>
          <Box color={colors.grey[100]}>{transaction.createdAt.slice(0, 10)}</Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
            color={colors.grey[900]}
          >
            ${transaction.amount + transaction.amountDonated}
          </Box>
        </Box>
      ))
    )
  }
  if (isDonorDonsErr) console.log("Error: ", donorDonsErr.message)



  // useEffect(() => {
  //   if (isDonorDonsSuccess) {
  //     setDonations(donorDons)
  //     setMaxDon(donorDons?.reduce((max, don) => don.amount > max ? don.amount : max, 0));
  //   }
  // }, [isDonorDonsSuccess, donorDons])


  let maxDonation = 0;

  for (let i = 0; i < donorDons?.length; i++) {
    const donation = donorDons[i];
    if (donation.amountDonated > maxDonation) {
      maxDonation = donation.amountDonated;
    }
  }

  let totalDonations = 0;

for (let i = 0; i < donorDons?.length; i++) {
  const donation = donorDons[i];
  totalDonations += donation.amountDonated + donation.amount;
}

useEffect(() => {
  if(totalDonations <= 500){
    setAccountTier("Bronze")
  }
  else if(totalDonations <= 1000){
    setAccountTier("Silver")
  }
  else if(totalDonations >= 5000){
    setAccountTier("Gold")
  }
}, [totalDonations]);


  return (<Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="User Info" subtitle="View user information" />
    </Box>

    <Box>
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0px 0 10px 10px" }}>User Information</Typography>
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
          name={donor?.name || "loading"}
          accounttype={accountType || ""}
          picture={
            <PersonOutlineOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
          // participated="5"
          joindate={donor?.createdAt.slice(0, 10) || ""}
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
          title={"Number of Donations: "+donorDons?.length}
          subtitle={"Highest One Time Donation: $"+maxDonation}
          increase={"Total Donations: $"+totalDonations}
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
          subtitle={accountTier}
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
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "15px 0 10px 10px" }}>
        Campaigns Info - Change this with Campaigns Donated by the Donor
      </Typography>
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