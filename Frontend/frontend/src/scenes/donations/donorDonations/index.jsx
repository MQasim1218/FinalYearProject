import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useAllDonorsDonationsQuery } from "../../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import { flattenObj } from "../../../misc/ArrayFlatten";
import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useRef } from "react";
import StatBox from "../../../components/StatBox";
import { AttachMoneyOutlined } from "@mui/icons-material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { PersonOutline } from "@mui/icons-material";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { useQuery } from 'react-query';


const DonorDonations = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let ref = useRef(null)


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "ind", headerName: "Num", flex: 0.5 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    {
      field: "name",
      headerName: "Donor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
    }, 
    {
      field: "total",
      headerName: "Initial Donation ($)",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Remaining Donation Amount ($)",
      flex: 1,
    },
    {
      field: "amountDonated",
      headerName: "Allocated Amount ($)",
      flex: 1,
    },
    {
      field: "catagory",
      headerName: "Category",
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
          onClick={() => {
            navigate(
              `/donordonationinfo/${row.id}`
            )
          }}
        />,
      ],
    },
  ];


  // Fetching data for donor donations!!
  const { isError, error, isLoading, isSuccess, data: Donations } = useAllDonorsDonationsQuery()
  let DonorsDonsGrid = <></>

  let { data: donsFromDonors, isLoading: isDonsLoading, error: donsError, isError: isDonsError, isSuccess: IsDonsSuccess } = useAllDonorsDonationsQuery()

  console.log("Donor Data",donsFromDonors)

  if(donsFromDonors === undefined) donsFromDonors = []

  if (isLoading) DonorsDonsGrid = <h3>Content Loading</h3>
  else if (isSuccess) {

    let DonorDonations = Donations
      .map((don, ind) => ({ ...don, createdAt: don?.createdAt.slice(0, 10), id: don._id, ind, total: don.amount + don.amountDonated }))
      .map((don) => flattenObj(don))

    DonorsDonsGrid = <DataGrid
      ref={ref}
      checkboxSelection
      rows={DonorDonations}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
      columnVisibilityModel={{
        id: false
      }}
    />
  } else if (isError) { DonorsDonsGrid = <h3>Content Loading</h3> }


  const donationCount = {};
  const maxDonation = {};
  for (const donation of donsFromDonors) {
    
    const donorname = donation?.donor?.name;
    const donationAmount = donation.amountDonated + donation.amount;
  
    // Update donation count for each donor
    if (!donationCount[donorname]) {
      donationCount[donorname] = 0;
    }
    donationCount[donorname]++;
  
    // Update maximum donation amount for each donor
    if (!maxDonation[donorname] || donationAmount > maxDonation[donorname]) {
      maxDonation[donorname] = donationAmount;
    }
  }
  
  // Find the donor with the maximum donations
  let maxDonorname = null;
  let maxDonations = 0;
  for (const [name, count] of Object.entries(donationCount)) {
    if (count > maxDonations) {
      maxDonorname = name;
      maxDonations = count;
    }
  }
  
  // Find the donor with the highest one-time donation
  let maxOneTimeDonorname = null;
  let maxOneTimeDonation = 0;
  for (const [name, amountDonate] of Object.entries(maxDonation)) {
    if (amountDonate > maxOneTimeDonation) {
      maxOneTimeDonorname = name;
      maxOneTimeDonation = amountDonate;
    }
  }


  return (
    <Box m="20px">
      <Header
        title="Donor DONATIONS" subtitle={"Manage Donor donations"}
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
            title={"$"+donsFromDonors.reduce((partialTot, don) => partialTot + don.amount + don.amountDonated, 0)}
            subtitle="Total Funds Recieved"
            progress={false}
            icon={
              <VolunteerActivismOutlinedIcon
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
            title={"$"+donsFromDonors.reduce((partialTot, don) => partialTot + don.amount, 0)}
            subtitle="Total Unallocated Funds"
            progress={false}
            icon={
              <AttachMoneyOutlined
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
            title={maxDonorname?maxDonorname:"No one"}
            subtitle={ maxDonorname? "Most Donations Made By": "No Donations"}
            increase={"Donations: "+maxDonations}
            progress={false}
            icon={
              <PersonOutline
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
            title={"$"+maxOneTimeDonation}
            subtitle="Highest One Time Donation"
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
        {DonorsDonsGrid}
      </Box>
    </Box>
  );
};

export default DonorDonations;