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
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import HomeScreenCampaigns from "../../components/HomeScreenCampaigns";


const CampaignInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [activeCampaigns, setActiveCamps] = useState([])
  const [totDonations, setTotDon] = useState(0)
  const [activeDonors, setActiveDonors] = useState([])
  const [activeBenifs, setActiveBenifs] = useState([])
  const [donations, setDonations] = useState([])


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

  return (<Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Camapign Info" subtitle="View information about your selected campaign" />
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
          title="$587"
          subtitle="Donations Recieved"
          progress="0.65"
          increase="This Month: $110"
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
          title="36"
          subtitle="Donors Participated"
          progress="0.50"
          increase="This Month: 4"
          icon={
            <PeopleOutlinedIcon
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
          title="22/Dec/2021"
          subtitle="Creation Time"
          increase="Initiated by: ADMIN"
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
          title="Campaign Status"
          subtitle="Approved:"
          increase="Yes"
          icon={
            <VerifiedOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
            
          }
          
        />
      </Box>
    </Box>
    <Box mt="2rem">
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>Campaign Analyitcs</Typography>
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
        <Typography padding="10px 0 0 10px" variant="h6" color={colors.grey[100]}>Weekly Donations</Typography>
        <CampaignLineChart isDashboard={true} />
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
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "15px 0 10px 10px" }}>Browse Similar Campaigns</Typography>
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
      >
          <HomeScreenCampaigns isDashboard= {true} title = "" subtitle=""/>
      </Box>
    </Box>
  </Box>)
}

export default CampaignInfo