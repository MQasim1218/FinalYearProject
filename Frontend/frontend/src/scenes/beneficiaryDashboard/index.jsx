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
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import HourglassBottomOutlinedIcon from '@mui/icons-material/HourglassBottomOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { useGetSuperAdminDonationsToAdminQuery } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { useAuthContext } from "../../hooks/useAuthContext";



const BeneficiaryDashboard = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let {user} = useAuthContext()

  let {
    data: sa_donations,
    isLoading: isDonationsLoading,
    error: donationsError,
    isError: isDonationsError,
    isSuccess: isDonationsSuccess
  } = useGetSuperAdminDonationsToAdminQuery (user?.user?._id) //Change this mutation query with the one for beneficiary when it is created.

  const total = sa_donations?.reduce((partialTot, don) => partialTot + don.amount, 0)
  const used = sa_donations?.reduce((partialTot, don) => partialTot + don.donated, 0)

  let remainingPercent = 0

  if (total === 0) {
    remainingPercent = 0
  }
  else {
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

    return (<Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="Beneficiary Dashboard" subtitle="Welcome to beneficiary dashboard" />
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
              <Typography variant="h4" color={colors.blueAccent[500]} sx={{m: "0px 0 10px 10px"}}>Your Analytics</Typography>
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
            title="$550"
            subtitle="Donations Recieved"
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
            title="3"
            subtitle="Campaigns Requested"
            icon={
              <VolunteerActivismOutlinedIcon
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
            title="1"
            subtitle="Campaign Active"
            //increase="This Month: 1"
            icon={
              <CampaignOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
      <Box> 
              <Typography variant="h4" color={colors.blueAccent[500]} sx={{m: "15px 0 10px 10px"}}>Charity Analytics</Typography>
            </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
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
                $59,342.32
              </Typography>
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
              Recent Donations Reveived
            </Typography>
          </Box>
          {DonationsList}
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

        <Box> 
              <Typography variant="h4" color={colors.blueAccent[500]} sx={{m: "15px 0 10px 10px"}}>...</Typography>
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
            Requested VS Recieved Donations
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={remainingPercent} beneficiary={1} size="130" />

          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" mt="15px">
            <Box>
              <Typography
                variant="h5"
                sx={{ mt: "15px" }}
              >
                {"$" + total}
              </Typography>
              <Typography color={colors.greenAccent[500]}>Total Donations Requested</Typography>
            </Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ mt: "15px" }}
              >
                {"$" + used}
              </Typography>
              <Typography color={colors.blueAccent[500]}>Total Donations Recieved</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          {/* <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            City Wise Donations
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box> */}
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          {/* <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Map
          </Typography>
          <Box height="200px" >
            <Geography isDashboard={true}/>
          </Box> */}
        </Box>
      </Box>
    </Box>)
}

export default BeneficiaryDashboard;