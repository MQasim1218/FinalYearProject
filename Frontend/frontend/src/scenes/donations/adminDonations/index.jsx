import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import { useAllAdminsDonationsQuery } from '../../../app/redux-features/Donations/AdminDonations/AdminDonsSlice'
import { flattenObj } from "../../../misc/ArrayFlatten";

const AdminDonations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "createdAt", headerName: "Date" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "contact",
      headerName: "Phone Number",
      flex: 1,
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

  // Fetching data for donor donations!!
  const { isError, error, isLoading, isSuccess, data: Donations } = useAllAdminsDonationsQuery()
  let AdminsDonsGrid = <></>

  if (isLoading) AdminsDonsGrid = <h3>Content Loading</h3>
  else if (isSuccess) {
    // console.log("Admins Doations data: ", adminDonations)
    let adminDonations = []
    adminDonations = Donations
      .map((don, index) => ({ ...don, id: index }))
      .map((don) => flattenObj(don))
    console.log("Admin donations are: ", adminDonations)

    AdminsDonsGrid = <DataGrid
      checkboxSelection
      rows={adminDonations}
      columns={columns}
      components={{ Toolbar: GridToolbar }}
    />
  } else if (isError) { AdminsDonsGrid = <h3>Error: {error.message}</h3> }




  return (
    <Box m="20px">
      <Header
        title="ADMIN DONATIONS" subtitle={"Manage All Admins donations"}
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
        {"Printing the donations of the Admins"}
        {AdminsDonsGrid}
      </Box>
    </Box>
  );
};

export default AdminDonations;