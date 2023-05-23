import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAllAdminsDonationsQuery, useSingleAdminDonationsQuery } from '../../../app/redux-features/donations/AdminDonations/AdminDonsSlice'
import { flattenObj } from "../../../misc/ArrayFlatten";
import { UserContext } from "../../../context/UserContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import StatBox from "../../../components/StatBox";
import { AttachMoneyOutlined, VolunteerActivismOutlined } from "@mui/icons-material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { PersonOutline } from "@mui/icons-material";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';


const AdminDonations = ({ single_admin }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Fetching data for donor donations!!
  let AdminsDonsGrid = <></>

  let { user } = useAuthContext()



  const { isError, error, isLoading, isSuccess, data: Donations } = useAllAdminsDonationsQuery()
  const {
    isError: singleIsError,
    error: singleError,
    isLoading: sngleIsLoading,
    isSuccess: singleIsSuccess,
    data: singleDonations
  } = useSingleAdminDonationsQuery(user?.user?._id)

  console.log("Single Admin donations are: ", singleDonations)


  if (!single_admin) {
    const columns = [
      { field: "ind", headerName: "Num", flex: 0.5 },
      { field: "createdAt", headerName: "Date" },
      {
        field: "name",
        headerName: "Admin Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Admin Email",
        flex: 1,
      },
      {
        field: "category",
        headerName: "Category",
        flex: 1,
      },
      {
        field: "campaign_title",
        headerName: "Campaign",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Donation Amount",
        flex: 1,
      },
      {

        // Okay
        field: 'View',
        type: 'actions',
        headerName: "View",
        width: 100,
        getActions: (row) => [
          <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/admindonationinfo/${row.id}`)} />,
        ],
      },
    ];

    console.log("Donations by the Admin are: ", singleDonations)

    if (isLoading) AdminsDonsGrid = <h3>Content Loading</h3>
    else if (isSuccess) {
      // console.log("Admins Doations data: ", adminDonations)
      let adminDonations = []
      adminDonations = Donations
        .map((don, ind) => ({ ...don,createdAt: don?.createdAt.slice(0, 10), id: don._id, ind }))
        .map((don) => flattenObj(don))
      console.log("Admin donations are: ", adminDonations)

      AdminsDonsGrid = <DataGrid
        checkboxSelection
        rows={adminDonations}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        columnVisibilityModel={{
          id: false
        }}
      />
    } else if (isError) { AdminsDonsGrid = <h3>Error: {error.message}</h3> }

  } else {
    const columns = [
      { field: "ind", headerName: "Num", flex: 0.5 },
      { field: "createdAt", headerName: "Date" },
      {
        field: "name",
        headerName: "Admin Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Admin Email",
        flex: 1,
      },
      {
        field: "category",
        headerName: "Category",
        flex: 1,
      },
      {
        field: "campaign_title",
        headerName: "Campaign",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Donation Amount",
        flex: 1,
      },
    ];



    if (sngleIsLoading) AdminsDonsGrid = <h3>Content Loading</h3>
    else if (singleIsSuccess) {
      // console.log("Admins Doations data: ", adminDonations)
      let adminDonations = []
      adminDonations = singleDonations
        .map((don, index) => ({ ...don, id: don._id, createdAt: don?.createdAt.slice(0, 10), count: index + 1 }))
        .map((don) => flattenObj(don))
      console.log("Admin donations are: ", adminDonations)

      AdminsDonsGrid = <DataGrid
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          id: false,
        }}
        checkboxSelection
        rows={adminDonations}
        columns={columns}
        components={{ Toolbar: GridToolbar }}

      />
    } else if (singleIsError) { AdminsDonsGrid = <h3>Error: {singleError.message}</h3> }
  }

  let donationsForStats = single_admin ? singleDonations : Donations
   
  let maxDonation = 0;
  // Loop through each donation object in the singleDonations array
  donationsForStats?.forEach(donation => {
    // Check if the current donation amount is greater than the previous maximum donation amount
    if (donation.amount > maxDonation) {
      // Update the maximum donation amount if the current donation amount is greater
      maxDonation = donation.amount;
    }
  });

  console.log("Max donation amount:", maxDonation)
  
  let allDonations = 0;
  donationsForStats?.forEach(donation => {
    allDonations += donation.amount;
  });

  console.log("All donations amount:", allDonations)

  let latestCreatedAt = null;

  donationsForStats?.forEach(donation => {
  const createdAtDate = new Date(donation.createdAt);
  if (!latestCreatedAt || createdAtDate > latestCreatedAt) {
    latestCreatedAt = createdAtDate;
  }
});

console.log(latestCreatedAt)

console.log("Latest createdAt date:", latestCreatedAt);
  

  return (
    <Box m="20px">
      <Header
        title="ADMIN DONATIONS" subtitle={"Manage All Admins donations"}
      />

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
          <StatBox
            title={single_admin ? donationsForStats?.length : Donations?.length}
            subtitle="Total Donations Made"
            progress={false}
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
          borderRadius="10px"
        >
          <StatBox
            title={latestCreatedAt ? latestCreatedAt.toISOString().slice(0, 10).replace(/-/g, '/') : "None"}
            subtitle={ latestCreatedAt ? "Latest Donation" : "No Donations"}
            progress={false}
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
          borderRadius="10px"
        >
          <StatBox
            title={`$${allDonations}`}
            subtitle="Total Donations To Campaigns"
            progress={false}
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
            title={maxDonation}
            subtitle="Highest Donation To Campaign"
            progress={false}
            icon={
              <EmojiEventsOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <Typography mb="1em" variant="h4" color={colors.blueAccent[500]}>Donation Breakdown</Typography>
        {AdminsDonsGrid}
      </Box>
    </Box>
  );
};

export default AdminDonations;