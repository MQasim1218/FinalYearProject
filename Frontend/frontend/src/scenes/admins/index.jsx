import { Box, IconButton, Typography, useTheme, Alert, Snackbar } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import StatBox from "../../components/StatBox";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import CalendarChart from "../../components/CalendarChart";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAllAdminsQuery } from "../../app/redux-features/users/AdminSlice";
import { useAllSuperAdminDonationsQuery } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { VolunteerActivismOutlined } from "@mui/icons-material";

const Admins = () => {
  let {
    data: donsToAdmins,
    isLoading: isDonsLoading,
    error: donsError,
    isError: isDonsError,
    isSuccess: IsDonsSuccess
  } = useAllSuperAdminDonationsQuery()


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const userType = JSON.parse(localStorage.getItem('userType'));

  const handleDelete = async (id) => {

    const getRespose = await axios.get(`http://localhost:5000/admin/get/${id}`);
    let chatEmail = getRespose.data.email
    let chatPassword = getRespose.data.chatId
    console.log(chatEmail, chatPassword)


    const chatGet = await axios.delete(`https://api.chatengine.io/users/me/`, {
      headers: {
        "Project-ID": process.env.REACT_APP_PROJECT_ID,
        "User-Name": chatEmail,
        "User-Secret": chatPassword
      }
    }
    )



    console.log("Chat Get:", chatGet)


    const response = await axios.delete(`http://localhost:5000/admin/delete/${id}`);


    setOpen(true);

    setRefresh(!refresh)

  }



  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  // The columns gets all the data we specify below from the mockdata file and store it
  // ! We might hit some error here as most fields here are not part of Admin object
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "totalcampaigns",
      headerName: "Total Campaigns",
      flex: 1,
    },
    {
      field: "runningcampaigns",
      headerName: "Running Campaigns",
      flex: 1,
    },
    {
      // Okay
      field: 'View',
      type: 'actions',
      headerName: "View",
      width: 100,

      getActions: (row) => [
        <GridActionsCellItem
          icon={<VisibilityOutlinedIcon />}
          label="View"
          onClick={() => navigate(`/adminanalytics/${row.id}`)} />,
      ],
    },
    {
      // Okay
      field: 'Delete',
      type: 'actions',
      headerName: "Delete",
      width: 100,

      getActions: (row) => [
        <GridActionsCellItem icon={<DeleteIcon />} onClick={() => handleDelete(row.id)} label="Delete" />,
      ],

    },
  ];



  let {
    data: admins,
    error: adminsError,
    isError: isAdminsError,
    isSuccess: adminsIsSuccess,
    isLoading: adminsIsLoading,
  } = useAllAdminsQuery()

  let AdminsStatBox = <></>, AdminsDataGrid = <></>, DonsToAdminsStatBox = <></>

  if (adminsIsLoading) {
    AdminsStatBox = <h3>Loading Content 🧇🧇🍖</h3>
  }
  else if (adminsIsSuccess) {
    admins = admins.map(admin => ({ ...admin, id: admin._id }))

    AdminsStatBox = (
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


    AdminsDataGrid = < DataGrid checkboxSelection rows={admins} columns={columns} components={{ Toolbar: GridToolbar }} />
  }
  else if (isAdminsError) AdminsStatBox = <h3>{`Error: ${adminsError.message}`}</h3>



  // ! Donations to Admin
  if (isDonsLoading) DonsToAdminsStatBox = <h3>Loading Content</h3>

  else if (IsDonsSuccess) {
    DonsToAdminsStatBox = (
      <StatBox
        // title={ }
        title={donsToAdmins.length}
        subtitle="Number of Donations Made to Admins"
        progress={false}
        icon={
          <VolunteerActivismOutlined
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
          />
        }
      />
    )
  }
  else if (isDonsError) DonsToAdminsStatBox = <h3>{`Error: ${donsError.message}`}</h3>



  return (
    <Box m="20px">

      <Header title="ADMINS" subtitle={"Manage ADMINS"} />
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {AdminsStatBox}
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {DonsToAdminsStatBox}

        </Box>


        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
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
                Activity Calendar
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
            {/* <CalendarChart isDashboard={true} /> */}
          </Box>
        </Box>

      </Box>
      <Box
        m="40px 0 0 0"
        height="75vh"
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text ": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        {

          adminsIsLoading ?
            <Typography
              varient="h4"
              alignItems="center"
              justifyContent="center"
            >
              Data Grid Loading
            </Typography> : AdminsDataGrid
        }
      </Box>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          User Deleted! Please Refresh
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Admins;