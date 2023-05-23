import { Box, Snackbar, Alert, TextField, InputAdornment, MenuItem, Button, IconButton, Typography, useTheme, Modal } from "@mui/material";
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
import { useDonateToCampaignMutation, useSingleCampaignDonationsQuery } from "../../app/redux-features/donations/AdminDonations/AdminDonsSlice";
import { useSingleCampaignQuery } from "../../app/redux-features/Campaigns/exporterSlice";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { mockDataDonationInfo3 } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import AlertModal from "../../components/AlertModal";
import { useParams } from "react-router-dom";
import { useGetAdminQuery } from "../../app/redux-features/users/AdminSlice";
import { CampaignOutlined, ConstructionOutlined, EmojiEventsOutlined, PersonOutlineOutlined, VolunteerActivismOutlined } from "@mui/icons-material";
import { useAllDonorsDonationsQuery } from "../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import { useGetSuperAdminDonationsToAdminQuery } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import JSZip from 'jszip';

//initializing all inputs with their keys
const initialValues = {
  amount: "",
  supAdminDonation: "",
  donorId: "",
  campaign: "",
  admin: ""

};

//schema for validation
const userSchema = yup.object().shape({
  amount: yup
    .string()
    .test('positive', 'Amount must be greater than 0', value => parseFloat(value) > 0)
    .required('Required'),
  supAdminDonation: yup.string().required("Required"),

});


const CampaignInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let { id } = useParams();

  //force width to not go below 600px
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [activeCampaigns, setActiveCamps] = useState([])
  const [donors, setDonors] = useState([])
  const [totDonations, setTotDon] = useState(0)
  const [activeDonors, setActiveDonors] = useState([])
  const [activeBenefs, setActiveBenefs] = useState([])
  const [donations, setDonations] = useState([])
  const [openModal, setModalOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [openDoc, setOpenDoc] = useState(false)


  let { user } = useAuthContext()

  const userType = localStorage.getItem("userType")

  console.log("USERTYPE: ", JSON.parse(userType))

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  let [
    setAdminToCampaignDonation,
    {
      data, isError,
      isLoading, isSuccess,
      error
    }
  ] = useDonateToCampaignMutation(id)


  const handleFormSubmit = async (values, { resetForm }) => {

    values.admin = user?.user?._id
    values.campaign = id


    const matchingDonor = allDonsToAdmin2?.find(don => don._id === values.supAdminDonation);

    let donorId = matchingDonor?.donor._id

    values.donorId = donorId

    console.log("111111", values)

    let response = await setAdminToCampaignDonation({ ...values })
    if (isError && !isLoading) {
      console.log(error)
    }

    console.log("Output: ", response)

    //To show the popup component.
    setOpen(true);

    //To reset the forms values after submit.
    resetForm()

    setModalOpen(false)
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenDoc(false);
  };

  // ! Get total donations donations for the campaingn

  let { data: campDonations, isError: isCampDonsError, isLoading: isCampDonsLoading, error: campDonsError, isSuccess: isCampDonsSuccess } = useSingleCampaignDonationsQuery(id)
  let { data: camp } = useSingleCampaignQuery(id)

  const { data: admin } = useGetAdminQuery(camp?.admin)


  console.log("Admin Details: ", admin)


  console.log("Campaign Details: ", camp)

  console.log("Campaign Donations: ", campDonations)

  var highestAmount = campDonations?.reduce(function (previousMax, current) {
    return (current.amount > previousMax) ? current.amount : previousMax;
  }, 0);


  let {
    data: allDonsToAdmin,
    error: allDonsToAdminError,
    isError: isAllDonsToAdminError,
    isLoading: allDonsToAdminLoading,
    isSuccess: allDonsToAdminSuccess
  } = useGetSuperAdminDonationsToAdminQuery(camp?.admin)

  let {
    data: allDonsToAdmin2
  } = useGetSuperAdminDonationsToAdminQuery(camp?.admin)



  if (!allDonsToAdminLoading) {
    if (allDonsToAdminSuccess) {
      console.log("Dons to the admins are", allDonsToAdmin)
      if (allDonsToAdmin?.length > 0) {
        allDonsToAdmin = allDonsToAdmin?.filter((don) => don.amount > 0) // NOTE: Filtering out the donations with amount 0 
          .map((don, index) => ({ name: don.donation_title, value: don._id, label: don.amount, id: index, category: don.category }))
          .map((opt) => (
            <MenuItem key={opt.id} value={opt.value} id={opt.id}>
              {opt.name + " ($" + opt.label + ")" + " - " + opt.category}
            </MenuItem>
          ))
      }
    }
  }
  else if (isAllDonsToAdminError) console.log(allDonsToAdminError.message)



  console.log("All Donations to Admin from the super admin: ", allDonsToAdmin)

  useEffect(() => {
    setTotDon(campDonations?.reduce((acc, curr) => acc + curr.amount, 0))
    setDonors(new Set(campDonations?.map(don => don.donorId._id)).size)




  }, [campDonations, camp])

  useEffect(() => {
  }, [campDonations, camp])

  const handleDownload = async () => {
    if (camp?.campaign_docs.length === 0) {
      setOpenDoc(true);
      return;
    }

    const date = camp?.createdAt.slice(0, 10);

    const zip = new JSZip();

    const downloadPromises = camp?.campaign_docs.map(async (fileUrl) => {
      const response = await fetch(fileUrl);
      const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
      const fileData = await response.blob();
      zip.file(fileName, fileData);
    });

    await Promise.all(downloadPromises);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const link = document.createElement('a');
      link.href = URL.createObjectURL(content);
      link.download = `${camp?.campaign_title} ${date}.zip`;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  };


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
        {
          isCampDonsLoading &&
          <h3>Content Loading</h3>
        }
        {
          isCampDonsSuccess &&
          <StatBox
            title={"Created By:"}
            subtitle={admin?.name}
            icon={
              <PersonOutlineOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        }
        {
          isCampDonsError &&
          <h3>{campDonsError.message}</h3>
        }
      </Box>

      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {
          isCampDonsLoading &&
          <h3>Content Loading</h3>
        }
        {
          isCampDonsSuccess &&
          <StatBox
            title={camp?.campaign_title}
            subtitle="Campaign Title"
            icon={
              <CampaignOutlined
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        }
        {
          isCampDonsError &&
          <h3>{campDonsError.message}</h3>
        }
      </Box>

      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <StatBox
          title={camp?.createdAt.slice(0, 10)}
          subtitle="Creation Date"
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
          title={"$" + camp?.donated_amount}
          subtitle="Donations Recieved"
          increase={"Goal: $" + camp?.required_amount}
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
          title={campDonations?.length}
          subtitle="Number of Donations"
          icon={
            <VolunteerActivismOutlined
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
          title={highestAmount}
          subtitle="Highest one time donation"
          icon={
            <EmojiEventsOutlined
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
        <Box sx={{ padding: "5px" }}>
          <Button sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }} onClick={handleDownload}>
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Docs
          </Button>

        </Box>
      </Box>
      {JSON.parse(userType) === "admin" ?
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ padding: "5px" }}>
            <Button sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }} onClick={handleModalOpen}>
              <AttachMoneyOutlinedIcon sx={{ mr: "10px" }} />
              Donate Now!
            </Button>

          </Box>
        </Box>
        : <Box>
        </Box>}
    </Box>
    <>
      <Box style={{ marginTop: '2%' }}>

        <Modal open={openModal} onClose={handleModalClose}>

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: "80%",
              height: "30%",
              bgcolor: colors.primary[400],
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Box>
              <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>Donate To Campaign</Typography>
            </Box>

            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={userSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    padding="40px"
                    margin="0 15% 0 15%"
                    borderRadius="50px"
                    sx={{
                      "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                  >
                    <TextField
                      fullWidth
                      variant="filled"
                      type="number"
                      label="Total Amount *"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.amount}
                      name="amount"
                      error={!!touched.amount && !!errors.amount}
                      helperText={touched.amount && errors.amount}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <TextField
                      fullWidth
                      select
                      variant="filled"
                      type="text"
                      label="From *"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.supAdminDonation}
                      name="supAdminDonation"
                      error={!!touched.supAdminDonation && !!errors.supAdminDonation}
                      helperText={touched.supAdminDonation && errors.supAdminDonation}
                      sx={{ gridColumn: "span 2" }}
                    >{allDonsToAdmin}
                    </TextField>
                  </Box>

                  <Box display="flex" justifyContent="center" mt="20px">
                    <Button onClick={handleFormSubmit} type="submit" color="secondary" variant="contained">
                      Make Donation
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      </Box>
    </>
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
            Donations to Campaign
          </Typography>
        </Box>
        {campDonations?.map((transaction) => (
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
                {transaction.donorId?.name}
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

    {/* <Box mt="2rem">
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "15px 0 10px 10px" }}>
        Browse Similar Campaigns - To make dynamic later on!!
      </Typography>
    </Box>
    <Box
      m="40px 0 0 0"
      height="40vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
        },
        "& .name-column--cell": {
          color: colors.greenAccent[300],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.blueAccent[700],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.primary[400],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.blueAccent[700],
        },
        "& .MuiCheckbox-root": {
          color: `${colors.greenAccent[200]} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${colors.grey[100]} !important`,
        },
      }}
    >
      <HomeScreenCampaigns isDashboard={true} title="" subtitle="" />
    </Box> */}
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
        Donation Made To Campaign Successfully!
      </Alert>
    </Snackbar>
    <Snackbar open={openDoc} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
        No Files Available For Download!
      </Alert>
    </Snackbar>
  </Box>)
}

export default CampaignInfo