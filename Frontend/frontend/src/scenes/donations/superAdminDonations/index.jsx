import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useState } from "react";
import { useAllSuperAdminDonationsQuery, useGetSuperAdminDonationsToAdminQuery } from "../../../app/redux-features/Donations/SupAdminDonations/SupAdminDonationsSlice";
import { flattenObj } from '../../../misc/ArrayFlatten'
import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { UserContext } from "../../../context/UserContext";
import { useAuthContext } from "../../../hooks/useAuthContext";


const SuperAdminDonations = ({ single_admin }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let [view, setView] = useState("superadmin")


  const { user } = useAuthContext()
  let SupAdminDonsGrid = <></>

  // console.log("User logged in is: ", user?.user?._id)

  const {
    isError,
    error,
    isLoading,
    isSuccess,
    data: Donations
  } = useAllSuperAdminDonationsQuery()
  const {
    isError: adminIsErr,
    error: adminErr,
    isLoading: adminIsLoadn,
    isSuccess: adminIsSuccess,
    data: DonsToAdmin
  } = useGetSuperAdminDonationsToAdminQuery(user?.user?._id)


  if (single_admin) {

    const columns = [
      { field: "id", headerName: "ID" },
      { field: "ind", headerName: "Num" },
      { field: "index", headerName: "Count" },
      {
        field: "donation_title", // Need to get the donor name somehoww...
        headerName: "Title",
        flex: 1,
        cellClassName: "name-column--cell",
      },

      {
        field: "donor_name", // Need to get the donor name somehoww...
        headerName: "Donor Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      {
        field: "donor_phone",
        headerName: "Phone Number",
        flex: 1,
      },
      { field: "donated_on", headerName: "Donated On" },
      { field: "createdAt", headerName: "Transferred On" },

      // Lets only have a map marker.. jis ko click krke location pr bnda chala jai
      {
        field: "category",
        headerName: "Category",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Total",
        flex: 1,
      },
      {
        field: "donated",
        headerName: "Amount Donated",
        flex: 1,
      },
      {
        field: "remaining",
        headerName: "Amount remaining",
        flex: 1,
      },

      {

        // Okay
        field: 'View',
        type: 'actions',
        headerName: "View",
        width: 100,
        getActions: (row) => [
          <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/superadmindonationinfo/${row.id}`)} />,
        ],
      },
    ];

    // Fetching data for all donations made by the superadmins to the donors!!
    if (adminIsLoadn) SupAdminDonsGrid = <h3>Content Loading 🏃🏼‍♂️🕺🏼</h3>

    else if (adminIsSuccess) {
      console.log("Super Admin Doations to Admin data: ", DonsToAdmin)



      let SupAdminDonations = DonsToAdmin?.map((don, ind) => ({
        ...don,
        createdAt: don.createdAt.slice(0, 10),
        id: don._id,
        index: ind + 1,
        donor_name: don?.donor.name,
        donor_phone: don?.donor.contact,
        donated_on: don?.donordonationId?.createdAt.slice(0, 10)
      }))

      // lets see if we need to flatten the objects 
      // .map((don) => flattenObj(don))

      SupAdminDonsGrid = <DataGrid
        columnVisibilityModel={{
          // Hide columns status and traderName, the other columns will remain visible
          id: false,

        }}
        checkboxSelection
        rows={SupAdminDonations}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    } else if (adminIsErr) { SupAdminDonsGrid = <h3>Error: {adminErr?.message}</h3> }

  } else {

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
          <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/superadmindonationinfo/${row.id}`)} />,
        ],
      },
    ];

    // Fetching data for all donations made by the superadmins to the donors!!

    if (isLoading) SupAdminDonsGrid = <h3>Content Loading 🏃🏼‍♂️🕺🏼</h3>
    else if (isSuccess) {
      console.log("Super Admin Doations data: ", Donations)

      let SupAdminDonations = Donations
        .map((don, ind) => ({
          ...don,
          createdAt: don?.createdAt.slice(0, 10),
          id: don._id,
          ind: ind + 1,
          // donor_name: don.donor.name,
          // donor_phone: don.donor.contact,
          // donated_on: don?.donordonationId?.createdAt.slice(0, 10)
        }))
        .map((don) => flattenObj(don))

      SupAdminDonsGrid = <DataGrid
        checkboxSelection
        rows={SupAdminDonations}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
    } else if (isError) { SupAdminDonsGrid = <h3>Error: {error.message}</h3> }
  }

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