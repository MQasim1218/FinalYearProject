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


/**
 * NOTE: Data to be fetched 
 * ! Data we need on the dashboard
 * ? Total number of active campaigns
 * ? Total donations made
 * ? Total number of Active donors (Donated in last 6 months)
 * ? Total number of Benificiries (Have a campaign running)
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


  // ANCHOR: ### Data feilds for the page ###
  const [activeCampaigns, setActiveCamps] = useState([]) // Not yet implemented!!
  const [totDonations, setTotDon] = useState(0) // Not yet implemented in statemanagment
  const [activeDonors, setActiveDonors] = useState([])
  const [activeAdmin, setActiveAdmins] = useState([])
  const [activeBenifs, setActiveBenifs] = useState([])
  const [donations, setDonations] = useState([])


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
  //   getBenificiries().then((benifs) => {
  //     setActiveBenifs(benifs)
  //   })

  //   return (() => console.log("No clean up"))
  // }, [])


  // ! Admins StatBox
  let { data: admins, isLoading: adminsIsLoading, error: adminsError, isError: isAdminsError, isSuccess: adminsIsSuccess } = useAllAdminsQuery()
  let AdminsStatBox = null
  if (adminsIsLoading) AdminsStatBox = <h3>Loading Content</h3>
  else if (adminsIsSuccess) AdminsStatBox = (
    <StatBox
      // title={ }
      title={admins.length}
      subtitle="Active Admins"
      progress={false}
      increase="+14% This Month dyn"
      icon={
        <AttachMoneyOutlinedIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      }
    />
  )
  else if (isAdminsError) AdminsStatBox = <h3>{`Error: ${adminsError.message}`}</h3>


  // ! Donors StatBox
  let { data: donors, isLoading: isDonorsLoading, error: donorsError, isError: isDonorsError, isSuccess: isDonorsSuccess } = useAllDonorsQuery()
  let DonorsStatBox = null
  if (isDonorsLoading) DonorsStatBox = <h3>Loading Content</h3>
  else if (isDonorsSuccess) DonorsStatBox = (
    <StatBox
      // title={ }
      title={donors.length}
      subtitle="Active Admins"
      progress={false}
      increase="+14% This Month dyn"
      icon={
        <AttachMoneyOutlinedIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      }
    />
  )
  else if (isDonorsError) DonorsStatBox = <h3>{`Error: ${donorsError.message}`}</h3>

  // ! Benificiaries StatBox
  let { data: benifs, isLoading: isBenifsLoading, error: benifsError, isError: isBenifError, isSuccess: isBenifsSuccess } = useAllDonorsQuery()
  let BenifsStatBox = null
  if (isBenifsLoading) BenifsStatBox = <h3>Loading Content</h3>
  else if (isBenifsSuccess) BenifsStatBox = (
    <StatBox
      // title={ }
      title={benifs.length}
      subtitle="Active Benificaries"
      progress={false}
      increase="+14% This Month dyn"
      icon={
        <AttachMoneyOutlinedIcon
          sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
        />
      }
    />
  )
  else if (isBenifError) BenifsStatBox = <h3>{`Error: ${benifsError.message}`}</h3>


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
          {BenifsStatBox}
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
            title="10"
            subtitle="Active Campaigns"
            progress={false}
            increase="+43% This Month dyn"
            icon={
              <CampaignOutlinedIcon
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
        </Box>

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
                "10"
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
              Recent Donations
            </Typography>
          </Box>
          {/* FIXME: To make Dynamic Just asap */}
          {/* {donations.map((transaction, i) => (
            <Box

              key={`${transaction._id}`}
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
          ))} */}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaigns
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $28,352 revenue generated for campaigns dyn
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
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