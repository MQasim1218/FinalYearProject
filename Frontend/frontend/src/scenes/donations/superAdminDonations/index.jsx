import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useState } from "react";
import { useAllSuperAdminDonationsQuery } from "../../../app/redux-features/Donations/SupAdminDonations/SupAdminDonationsSlice";
import { flattenObj } from '../../../misc/ArrayFlatten'import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const SuperAdminDonations = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let [users, setUsers] = useState([])
  let [view, setView] = useState("superadmin")


  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "createdAt", headerName: "Donation Date" },
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
      field: "phone",
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
        <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/donationinfo/${row.id}`)}  />,
      ],
    },
  ];

  // Fetching data for donor donations!!
  const { isError, error, isLoading, isSuccess, data: Donations } = useAllSuperAdminDonationsQuery()
  let SupAdminDonsGrid = <></>

  if (isLoading) SupAdminDonsGrid = <h3>Content Loading</h3>
  else if (isSuccess) {
    console.log("Super Admin Doations data: ", Donations)

    let SupAdminDonations = Donations
      .map((don, ind) => ({ ...don, id: ind + 1 }))
      .map((don) => flattenObj(don))

    SupAdminDonsGrid = <DataGrid
      checkboxSelection
      rows={SupAdminDonations}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
    />
  } else if (isError) { SupAdminDonsGrid = <h3>Content Loading</h3> }

  return (
    <Box m="20px">
      <Header
        title={view.toLocaleUpperCase() + " DONATIONS"} subtitle={"Manage " + view + " donations"}
      />
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
        {SupAdminDonsGrid}
      </Box>
    </Box>
  );
};

export default SuperAdminDonations;