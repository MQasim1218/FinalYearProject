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
import AccountTypeContext from '../../accountTypeContext';
import { useSingleAdminDonationsQuery } from '../../app/redux-features/Donations/AdminDonations/AdminDonsSlice';
import { useSingleDonorDonationsQuery } from '../../app/redux-features/Donations/DonorDonations/DonorDonsSlice';

const DonorInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let { id } = useParams();
  const [donations, setDonations] = useState([])

  // COMMENTING OUT CUZ OF WHITESCREEN FOR ME (AOWN)
  const { user } = useAuthContext()
  let accountType = useContext(AccountTypeContext)

  const { data: adminDons, isError: isAdminErr, isLoading: isAdminLoading, isSuccess: isAdminSuccess, error: AdminErr } = useSingleAdminDonationsQuery(id)
  const { data: donorDons, isError: isDonorErr, isLoading: isDonorLoading, isSuccess: isDonorSuccess, error: donorErr } = useSingleDonorDonationsQuery(id)



  accountType = "Admin"
  let RecDonations = <></>

  switch (accountType) {
    case "Admin":
      console.log("Donations by this user: ", adminDons)

      if (isAdminLoading) console.log("Donations content loading")
      if (isAdminSuccess) {
        // setDonations(adminDons)
        RecDonations = (
          adminDons.map((transaction, i) => (
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
          ))
        )
      }
      if (isAdminErr) console.log("Error: ", AdminErr.message)


    case "Donor":
      console.log("Donations by this user: ", donorDons)

      if (isDonorLoading) console.log("Donations content loading")
      if (isDonorSuccess) {
        // setDonations(donorDons)
        RecDonations = (
          donorDons.map((transaction, i) => (
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
          ))
        )
      }
      if (isDonorErr) console.log("Error: ", donorErr.message)

    default:
      console.log("The user scenario is not a part of the system!!")
      break;
  }

  useEffect(() => {
    if (isAdminSuccess) {
      setDonations(adminDons)
    }
    if (isDonorSuccess) {
      setDonations(donorDons)
    }
  }, [isAdminSuccess, isDonorSuccess, adminDons, donorDons])


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
          name={user?.user?.name || "loading"}
          accounttype={accountType || ""}
          picture={<PersonOutlineOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />}
          // participated="5"
          joindate={user?.user?.createdAt.slice(0, 10) || ""}
          latestdonation={donations && donations[donations.length - 1]?.createdAt}
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