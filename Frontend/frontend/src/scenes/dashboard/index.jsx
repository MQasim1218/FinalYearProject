import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Geography from "../../components/Geography";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import axios from "axios";
import { useState, useEffect } from "react";



// Import Redux Hooks for ...
import { useAllAdminsQuery } from '../../app/redux-features/users/AdminSlice'
import { useAllDonorsQuery } from '../../app/redux-features/users/DonorSlice'
import { useGetSuperAdminDonationsToAdminQuery } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAllBenefsQuery } from "../../app/redux-features/users/BeneficiarySlice";
import { useAdminCampaignsQuery } from "../../app/redux-features/Campaigns/exporterSlice";
import { PersonOutlineOutlined } from "@mui/icons-material";


/**
 * NOTE: Data to be fetched 
 * ! Data we need on the dashboard
 * ? Total number of active campaigns
 * ? Total donations made
 * ? Total number of Active donors (Donated in last 6 months)
 * ? Total number of Beneficiries (Have a campaign running)
 * ? Total number of Active Campaigns (Completed::false, Approved::true)
 * ? Recent donations made (fetch last 4-5)
 * ? 
 * 
 * @returns Dynamic Dashboard Component
 */

const Dashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // console.log('user obtained is: ', user)



  /**
   * Lazy fetch all the dynamic data needed for the dashboard.
   * Previously, all this was done using Axios Right within the component!
   * However, due to complexity, the statemanagement logic has been offloaded from componenets into redux
   */
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

  //   const geeBeneficiries = async () => {
  //     // const res = await fetch('http://localhost:5000/admin')
  //     try {
  //       let res = await axios.get("http://localhost:5000/beneficiary/")
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

  //   const getDonations = async () => {
  //     try {
  //       let res = await axios.get("http://localhost:5000/donations/all/")
  //       if (res.status < 400) {
  //         let data = res.data
  //         if (data !== null) return data
  //         else console.log("No data recieved!")
  //       }

  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  //   getDonations().then((dons) => {
  //     console.log(dons)
  //     setDonations(dons)

  //     let tot = 0
  //     dons.forEach(don => {
  //       tot += don.amount
  //     });
  //     console.log(tot)
  //     // alert(tot)
  //     setTotDon(tot)
  //   })

  //   getCampaigns().then((camps) => {
  //     setActiveCamps(camps)
  //   })
  //   getDonors().then((dons) => {
  //     setActiveDonors(dons)
  //   })
  //   e().then((benefs) => {
  //     setActiveBenefs(benefs)
  //   })

  //   return (() => console.log("No clean up"))
  // }, [])





  // ! Admins StatBox

  /**
   * We are getting the All Admins Data
   */

  const { user } = useAuthContext()

  let {
    data: admins,
    isLoading: adminsIsLoading,
    error: adminsError,
    isError: isAdminsError,
    isSuccess: adminsIsSuccess
  } = useAllAdminsQuery()

  let AdminsStatBox = null

  if (adminsIsLoading) AdminsStatBox = <h3>Loading Content</h3>
  else if (adminsIsSuccess) AdminsStatBox = (
    <StatBox
      // title={ }
      title={admins.length}
      subtitle="Active Admins"
      progress={false}
      // increase="+14% This Month dyn"
      icon={
        <PersonOutlineOutlined
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      }
    />
  )
  else if (isAdminsError) AdminsStatBox = <h3>{`Error: ${adminsError.message}`}</h3>


  // ! Donors StatBox
  let {
    data: donors,
    isLoading: isDonorsLoading,
    error: donorsError,
    isError: isDonorsError,
    isSuccess: isDonorsSuccess
  } = useAllDonorsQuery()


  let DonorsStatBox = null
  if (isDonorsLoading) DonorsStatBox = <h3>Loading Content</h3>
  else if (isDonorsSuccess) DonorsStatBox = (
    <StatBox
      // title={ }
      title={donors.length}
      subtitle="Active Donors"
      progress={false}
      // increase="+14% This Month dyn"
      icon={
        <PersonOutlineOutlined
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      }
    />
  )
  else if (isDonorsError) DonorsStatBox = <h3>{`Error: ${donorsError.message}`}</h3>

  // ! Beneficiaries StatBox
  let {
    data: benefs,
    isLoading: isBenefsLoading,
    error: benefsError,
    isError: isBenefError,
    isSuccess: isBenefsSuccess
  } = useAllBenefsQuery()


  let BenefsStatBox = <></>
  if (isBenefsLoading) BenefsStatBox = <h3>Loading Content</h3>
  else if (isBenefsSuccess) BenefsStatBox = (
    <StatBox
      // title={ }
      title={benefs.length}
      subtitle="Active Beneficaries"
      progress={false}
      // increase="+14% This Month dyn"
      icon={
        <PersonOutlineOutlined
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      }
    />
  )
  else if (isBenefError) BenefsStatBox = <h3>{`Error: ${benefsError.message}`}</h3>


  // ! Recent Donations
  let {
    data: sa_donations,
    isLoading: isDonationsLoading,
    error: donationsError,
    isError: isDonationsError,
    isSuccess: isDonationsSuccess
  } = useGetSuperAdminDonationsToAdminQuery(user?.user?._id)

  const total = sa_donations?.reduce((partialTot, don) => partialTot + don.amount + don.donated, 0)
  const used = sa_donations?.reduce((partialTot, don) => partialTot + don.donated, 0)

  let remainingPercent = 0

  if (total === 0) {
     remainingPercent = 0
  }
  else{
   remainingPercent = used / total
  }

  console.log("%: ", remainingPercent)


  let DonationsList = <></>
  if (isDonationsLoading) DonationsList = <h3>Loading Content</h3>
  else if (isDonationsSuccess) {
    console.log("Donations", sa_donations)
    DonationsList = (
      sa_donations?.map((transaction, i) => (
        <Box
          key={`${i}`}
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
              {transaction?._id.slice(0, 8)}
            </Typography>
            <Typography color={colors.grey[100]}>
              {transaction?.donor.name}
            </Typography>
          </Box>
          <Box color={colors.grey[100]}>{transaction.createdAt.slice(0, 10)}</Box>
          <Box
            backgroundColor={colors.greenAccent[500]}
            p="5px 10px"
            borderRadius="4px"
            color={colors.grey[900]}
          >
            ${transaction?.amount}
          </Box>
        </Box>
      ))
    )
  }
  else if (isDonationsError) DonationsList = <h3>{`Error: ${donationsError.message}`}</h3>



  // ! Recent Donations
  let {
    data: campaigns,
    isLoading: isCampaignsLoading,
    error: campaignsError,
    isError: isCampaignsError,
    isSuccess: isCampaignsSuccess
  } = useAdminCampaignsQuery(user?.user?._id)

  let AdminCampaigns = <></>
  if (isCampaignsLoading) AdminCampaigns = <h3>Loading Content... 🍜🍷</h3>
  else if (isCampaignsSuccess) {
    console.log("Admin Campaigns", campaigns)
    // AdminCampaigns = (
    //   campaigns?.map((transaction, i) => (
    //     <Box
    //       key={`${transaction._id}`}
    //       display="flex"
    //       justifyContent="space-between"
    //       alignItems="center"
    //       borderBottom={`4px solid ${colors.primary[500]}`}
    //       p="15px"
    //     >

    //       <Box>
    //         <Typography
    //           color={colors.greenAccent[500]}
    //           variant="h5"
    //           fontWeight="600"
    //         >
    //           {transaction._id.slice(0, 8)}
    //         </Typography>
    //         <Typography color={colors.grey[100]}>
    //           {transaction.donor.name}
    //         </Typography>
    //       </Box>
    //       <Box color={colors.grey[100]}>{transaction.createdAt}</Box>
    //       <Box
    //         backgroundColor={colors.greenAccent[500]}
    //         p="5px 10px"
    //         borderRadius="4px"
    //         color={colors.grey[900]}
    //       >
    //         ${transaction.amount}
    //       </Box>
    //     </Box>
    //   ))
    // )
  }
  else if (isCampaignsError) AdminCampaigns = <h3>{`Error: ${campaignsError.message}`}</h3>

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to admin dashboard" />
        <Box>
          <Button sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }} >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* Grids and Charts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px">

        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          {/* NOTE: Stat Box for Total donations recieced */}
          {AdminsStatBox}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          {/* <StatBox
            title="10"
            subtitle="Active Beneficiaries"
            progress={false}
            increase="-21% This Month dyn"
            icon={
              <AssistWalkerOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /> */}
          {BenefsStatBox}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          {/* NOTE: Donors StatBox here */}
          {DonorsStatBox}
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title={campaigns?.length}
            subtitle="Active Admin Campaigns"
            progress={false}
            // increase="+43% This Month dyn"
            icon={
              <CampaignOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="10"
            subtitle="Total Donations"
            progress={false}
            increase="+43% This Month dyn"
            icon={
              <CampaignOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Donations Accumulated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {sa_donations?.length}
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
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
              Recent Donations Reveived from Super Admin
            </Typography>
          </Box>
          {DonationsList}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Allocation To Campaigns
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={remainingPercent} size="130" />

          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt="15px">
            <Box>
              <Typography
                variant="h5"
                sx={{ mt: "15px" }}
              >
                {"$" + total}
              </Typography>
              <Typography color={colors.greenAccent[500]}>Total Donations Recieved</Typography>
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ mt: "15px" }}
              >
                {"$" + used}
              </Typography>
              <Typography color={colors.blueAccent[500]}>Total Donations Used</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            City Wise Donations
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Map
          </Typography>
          <Box height="200px" >
            <Geography isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box >
  )
}

export default Dashboard;