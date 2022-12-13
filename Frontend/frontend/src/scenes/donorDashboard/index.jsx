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
import { useState, useEffect } from "react";
import useAxiosGet from '../../hooks/useAxiosGet'
import axios from "axios";
import HomeScreenCampaigns from "../../components/HomeScreenCampaigns";

const DonorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [donorDonations, setDonorDonations] = useState([])
  const [totDonations, setTotalDonations] = useState(0)


  useEffect(() => {
    const DonorDonations = async () => {
      // FIXME !!
      let donor_id = "63875b08b5a303b2acbf5c6d" // Hardconded value for the sake of testing purpose!!
      let res = await axios.get(
        `http://localhost:5000/donor/${donor_id}/donations`,
        {
          headers: {
            // 'Authorization': `Bearer ${}`
          }
        }
      )
      if (res.status < 400) return res.data
      else return null
    }
    // let donations_data = useAxiosGet("http://localhost:5000/donor/donations").then((data) => {

    DonorDonations().then((donations) => {
      if (donations === null) throw Error("No data recieved")

      let tot = 0
      donations.forEach(don => tot += don.amount);
      setTotalDonations(tot)
      setDonorDonations(donations)
      console.log(donorDonations)
    }).catch((error) => console.log("Error: ", error.message))

    return () => {
      console.log("Cleaning up the mess.. not quite actually.")
    }
  }, [])



  return (<Box m="20px">
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Header title="Donor Dashboard" subtitle="Welcome to donor dashboard" />
      {/* <Box>
                    <Button sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                    }} >
                        <DownloadOutlinedIcon sx={{mr: "10px"}}/>
                        Download Reports
                    </Button>
                </Box> */}
    </Box>

    <Box>
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0px 0 10px 10px" }}>Your Analytics</Typography>
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
        <StatBox
          title={totDonations}
          subtitle="Total Donated"
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
        gridColumn="span 4"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title="36"
          subtitle="Beneficiaries Helped"
          progress="0.50"
          increase="This Month: 4"
          icon={
            <AssistWalkerOutlinedIcon
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
        >
          <StatBox
            title="3,441"
            subtitle="Active Donors"
            progress="0.80"
            increase="+15% This Month"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="4"
            subtitle="Campaigns Participated"
            progress="0.85"
            increase="This Month: 1"
            icon={
              <CampaignOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      <Box> 
              <Typography variant="h4" color={colors.blueAccent[500]} sx={{m: "15px 0 0 10px"}}>Latest Campaigns</Typography>
            </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 2 */}
        
        <Box
          gridColumn="span 12"
          //gridRow="span 1"
          //backgroundColor={colors.primary[400]}
        >
          <HomeScreenCampaigns isDashboard= {true}/>
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

        <Box mt="5rem"> 
              <Typography variant="h4" color={colors.blueAccent[500]} sx={{m: "15px 0 10px 10px"}}>Charity Analytics</Typography>
            </Box>

    <Box
      display="grid"
      gridTemplateColumns="repeat(12, 1fr)"
      gridAutoRows="140px"
      gap="20px"
    >
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
            $28,352 revenue generated for campaigns
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
  </Box>)
}

export default DonorDashboard;