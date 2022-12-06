import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import Geography from "../../components/Geography";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import GeographyMap from "../geographymap";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import axios from "axios";
import { useState, useEffect } from "react";


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

  // ANCHOR: ### Data feilds for the page ###
  const [activeCampaigns, setActiveCamps] = useState([])
  const [totDonations, setTotDon] = useState(0)
  const [activeDonors, setActiveDonors] = useState([])
  const [activeBenifs, setActiveBenifs] = useState([])
  const [Donations, setDonations] = useState([])


  /**
   * Lazy fetch all the dynamic data needed for the dashboard.
   */
  useEffect(() => {

    //   // Get all the campaigns and count them
    //   // TODO: Cache these campaigns using context API
    const getCampaigns = async () => {
      // const res = await fetch('http://localhost:5000/admin')
      try {
        let res = await axios.get("http://localhost:5000/campaigns/")
        if (res.status < 300) {
          let data = res.data
          console.log(data)
          setActiveCamps(data)
          if (data !== null) return data
          else console.log("No data recieved!")
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getDonors = async () => {
      // const res = await fetch('http://localhost:5000/admin')
      try {
        let res = await axios.get("http://localhost:5000/donor/allDonors")
        if (res.status < 300) {
          let data = res.data
          console.log(data)
          setActiveDonors(data)
          if (data !== null) return data
          else console.log("No data recieved!")
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getBenificiries = async () => {
      // const res = await fetch('http://localhost:5000/admin')
      try {
        let res = await axios.get("http://localhost:5000/benificiary/")
        if (res.status < 300) {
          let data = res.data
          console.log(data)
          setActiveBenifs(data)
          if (data !== null) return data
          else console.log("No data recieved!")
        }
      } catch (error) {
        console.log(error)
      }
    }

    const getDonations = async () => {
      try {
        let res = await axios.get("http://localhost:5000/donations/all/")
        if (res.status < 300) {
          let data = res.data
          console.log(data)
          setDonations(data)
          if (data !== null) return data
          else console.log("No data recieved!")
          // new
        }
      } catch (error) {
        console.log(error)
      }
    }

    getDonations()
    getCampaigns()
    getDonors()
    getBenificiries()

    return (() => console.log("No clean up"))
  })



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
        >
          <StatBox
            title="7,361 dyn"
            subtitle="Donations Recieved"
            progress={false}
            increase="+14% This Month dyn"
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
            title={activeBenifs.length}
            subtitle="Active Beneficiaries"
            progress={false}
            increase="-21% This Month dyn"
            icon={
              <AssistWalkerOutlinedIcon
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
            title={activeDonors.length}
            subtitle="Active Donors"
            progress={false}
            increase="+15% This Month dyn"
            icon={
              <PersonAddIcon
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
            title={activeCampaigns.length}
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
                $59,342.32 dyn
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
              Recent Donations::dyn
            </Typography>
          </Box>
          {Donations.map((transaction, i) => (
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