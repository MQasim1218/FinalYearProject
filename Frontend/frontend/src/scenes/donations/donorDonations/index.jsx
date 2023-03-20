import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useAllDonorsDonationsQuery } from "../../../app/redux-features/Donations/DonorDonations/DonorDonsSlice";
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


const DonorDonations = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let ref = useRef(null)

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "ind", headerName: "Num", flex: 0.5 },
    { field: "createdAt", headerName: "Date" },
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
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
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

  if (isLoading) DonorsDonsGrid = <h3>Content Loading</h3>
  else if (isSuccess) {
    console.log("Donors Doations data: ", Donations)

    let DonorDonations = Donations
      .map((don, ind) => ({ ...don, id: don._id, ind }))
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
            title="55"
            subtitle="Total Donations Made"
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
            title="18-Mar-23"
            subtitle="Latest Donation"
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
            title="Donor 1"
            subtitle="Most Donations Made By"
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
            title="$10,000"
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