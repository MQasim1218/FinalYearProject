import { Box } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDonations } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useSingleDonorDonationsQuery } from "../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import { flattenObj } from "../../misc/ArrayFlatten";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Navigate, useNavigate } from "react-router-dom";

const ViewDonations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [donations, setDonations] = useState([])
  const { user } = useAuthContext()
  let ref = useRef(null)
  const navigate = useNavigate();

  let id = user?.user?._id


  const { data: donorDonations, isLoading, isSuccess } = useSingleDonorDonationsQuery(id)

  console.log(donorDonations)
  

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "ind", headerName: "Num", flex: 0.5 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    {
      field: "total",
      headerName: "Initial Donation ($)",
      flex: 1,
    },
    {
      field: "amountRemaining",
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

  let DonorsDonsGrid = <></>

  if (isLoading) DonorsDonsGrid = <h3>Content Loading</h3>
  else if (isSuccess) {

    let DonorDonations = donorDonations
      .map((don, ind) => ({ ...don, createdAt: don?.createdAt.slice(0, 10), id: don._id, ind, total: don.amount, amountRemaining: don.amount - don.amountDonated }))
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
        title="DONATIONS"
        subtitle="List of Users and Donation Info"
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
        {DonorsDonsGrid}
      </Box>
    </Box>
  );
}

export default ViewDonations