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
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { mockDataDonationInfo3 } from "../../data/mockData";
import { useParams } from "react-router-dom";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import AlertModal from "../../components/AlertModal";

//initializing all inputs with their keys
const initialValues = {
  total_amount: "",
  donor: "Donor1",

};

//schema for validation
const userSchema = yup.object().shape({
  total_amount: yup.string().required("Required"),
  donor: yup.string().required("Required"),

});


const CampaignInfo = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let { id } = useParams();

    //force width to not go below 600px
    const isNonMobile = useMediaQuery("(min-width:600px)");
  const [activeCampaigns, setActiveCamps] = useState([])
  const [totDonations, setTotDon] = useState(0)
  const [activeDonors, setActiveDonors] = useState([])
  const [activeBenifs, setActiveBenifs] = useState([])
  const [donations, setDonations] = useState([])
  const [openModal, setModalOpen] = useState(false)
  const [open, setOpen] = useState(false)

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleModalOpen = () => {
    setModalOpen(true)
  }

  const handleFormSubmit = async (values, {resetForm}) => {
    console.log(values);

    // let data = await axios.post("http://localhost:3000/", JSON.stringify(values))
    // JSON.parse(data)

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
  };

    //options for donors
    const donors = [
      {
        value: 'Donor1',
        label: 'Donor 1',
      },
      {
        value: 'Donor2',
        label: 'Donor 2',
      },
      {
        value: 'Donor3',
        label: 'Donor 3',
      },
      {
        value: 'Donor4',
        label: 'Donor 4',
      },
    ];

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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "date", headerName: "Date", flex: 0.5 },
    {
      field: "recievedfrom",
      headerName: "Recieved From",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
        field: "madeby",
        headerName: "Made By",
        flex: 0.5,
        cellClassName: "name-column--cell",
      },
    {
      field: "amountused",
      headerName: "Amount Allocated",
      headerAlign: "left",
      align: "left",
      flex: 0.5
    },
  ];

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
        <Box>
          <Button sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }} onClick={handleModalOpen}>
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Donate Now!
          </Button>
        </Box>
      </Box>
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
                value={values.total_amount}
                name="total_amount"
                error={!!touched.total_amount && !!errors.total_amount}
                helperText={touched.total_amount && errors.total_amount}
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
                value={values.donor}
                name="donor"
                error={!!touched.donor && !!errors.donor}
                helperText={touched.donor && errors.donor}
                sx={{ gridColumn: "span 2" }}
              >{donors.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
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
    <Box mt="5rem">
      <Typography variant="h4" color={colors.blueAccent[500]} sx={{ m: "0 0 10px 10px" }}>Donations Made To This Campaign</Typography>
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
        <DataGrid
          checkboxSelection
          rows={mockDataDonationInfo3}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
    Donation Made To Campaign Successfully!
    </Alert>
</Snackbar>
  </Box>)
}

export default CampaignInfo