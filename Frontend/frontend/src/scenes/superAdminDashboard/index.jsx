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
import { useAllAdminsQuery } from "../../app/redux-features/users/AdminSlice";
import { useAllDonorsQuery } from "../../app/redux-features/users/DonorSlice";
import { useAllBenefsQuery } from "../../app/redux-features/users/BeneficiarySlice";
import { useAllCampaignsQuery } from "../../app/redux-features/Campaigns/exporterSlice";
import { useAllSuperAdminDonationsQuery } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { useAllDonorsDonationsQuery } from "../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
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
 * @returns Dynamic Dashboard Component
 */

const SuperAdminDashboard = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let { data: donsFromDonors } = useAllDonorsDonationsQuery()

  console.log("Donor Donations", donsFromDonors)

  if (donsFromDonors === undefined) donsFromDonors = []


  let {
    data: admins,
    isLoading: adminsIsLoading,
    error: adminsError,
    isError: isAdminsError,
    isSuccess: adminsIsSuccess
  } = useAllAdminsQuery()
  let AdminsStatBox = null
  if (adminsIsLoading) AdminsStatBox = <h3>Loading Content</h3>
  else if (adminsIsSuccess) {
    console.log("Admins Data recieved is: ", admins)
    AdminsStatBox = (

      <StatBox
        // title={ }
        title={admins.length}
        subtitle="Active Admins"
        progress={false}
        //increase="+14% This Month dyn"
        icon={
          <PersonOutlineOutlined
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    )
  }
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
  else if (isDonorsSuccess) {
    console.log("Donors Data: ", donors)
    // donors.forEach((donor => { donor.id = donor._id }))
    // ! need to add an ID field !@!@!@!@!@!@!@!@!@!
    DonorsStatBox = (
      <StatBox
        title={donors.length}
        subtitle="Active Donors"
        progress={false}
        //increase="+14% This Month dyn"
        icon={
          <PersonOutlineOutlined
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    )
  }
  else if (isDonorsError) DonorsStatBox = <h3>{`Error: ${donorsError.message}`}</h3>




  // ! Beneficiaries StatBox
  let {
    data: benefs,
    error: benefsError,
    isError: isBenefError,
    isSuccess: isBenefsSuccess,
    isLoading: isBenefsLoading
  } = useAllBenefsQuery()
  let BenefsStatBox = null
  if (isBenefsLoading) BenefsStatBox = <h3>Loading Content</h3>
  else if (isBenefsSuccess) {
    // console.log("Benefs data: ", benefs)
    // benefs.forEach((benef => { benef.id = benef._id }))

    BenefsStatBox = (
      <StatBox
        // title={ }
        title={benefs.length}
        subtitle="Active Beneficaries"
        progress={false}
        //increase="+14% This Month dyn"
        icon={
          <PersonOutlineOutlined
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    )
  }
  else if (isBenefError) BenefsStatBox = <h3>{`Error: ${benefsError.message}`}</h3>




  // ! Campaigns StatBox
  let {
    data: camps,
    error: campsError,
    isError: isCampsError,
    isSuccess: isCampsSuccess,
    isLoading: isCampsLoading
  } = useAllCampaignsQuery()

  // console.log("Logging benefs data", benefs)
  let CampsStatBox = <></>
  if (isCampsLoading) CampsStatBox = <h3>Loading Content</h3>
  else if (isCampsSuccess) {
    // console.log("Benefs data: ", benefs)
    // benefs.forEach((benef => { benef.id = benef._id }))
    CampsStatBox = (
      <StatBox
        title={camps.length}
        subtitle="Active Campaigns"
        progress={false}
        //increase="+43% This Month dyn"
        icon={
          <CampaignOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    )
  }
  else if (isCampsError) CampsStatBox = <h3>{`Error: ${campsError.message}`}</h3>


  // ! Recent Donations by the SuperAdmin
  let {
    data: donations,
    error: donsError,
    isError: isDonsError,
    isSuccess: isDonsSuccess,
    isLoading: isDonsLoading
  } = useAllSuperAdminDonationsQuery()

  if (isDonorsSuccess) {
    console.log("Donations by the SuperAdmin", donations)
  }


  const total = donsFromDonors.reduce((partialTot, don) => partialTot + don.amount + don.amountDonated, 0)
  const used = donsFromDonors.reduce((partialTot, don) => partialTot + don.amountDonated, 0)
  
  let remainingPercent = 0

  if (total === 0) {
    remainingPercent = 0
  }
  else {
    remainingPercent = used / total
  }

  console.log("%: ", remainingPercent)

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to the Super Admin dashboard" />
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
          {/* <StatBox
            title="10"
            subtitle="Donations Recieved"
            progress={false}
            increase="+14% This Month dyn"
            icon={
              <AttachMoneyOutlinedIcon
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
          {
            /* <StatBox
              title="10"
              subtitle="Active Donors"
              progress={false}
              increase="+15% This Month dyn"
              icon={
                <PersonAddIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            /> */
          }
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

          {
            /* 
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
            */
          }
          {CampsStatBox}
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
                Donations Registered
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {donsFromDonors?.length}
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
              Recent Donations - SuperAdmin to Admin
            </Typography>
          </Box>
          {
            donations && donations.map((transaction, i) => (
              <Box
                key={`${transaction.donation_title}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >

                <Box>
                  <Typography color={colors.grey[100]}>
                    {transaction?.admin?.name}
                  </Typography>
                </Box>
                <Box color={colors.grey[100]}>{transaction.createdAt.slice(0, 10)}</Box>
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
          }
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Allocation To Admin
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle progress={remainingPercent} size="125" />

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

export default SuperAdminDashboard;