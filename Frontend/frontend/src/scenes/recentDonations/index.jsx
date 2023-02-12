import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataRecent } from "../../data/mockData";
import Header from "../../components/Header";
import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

const Recent = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
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
      field: "donation",
      headerName: "Donation",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.donation}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
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

  return (
    <Box m="20px">
      <Header title="RECENT DONATIONS" subtitle="List of Recent Donations" />
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
        <DataGrid components={{ Toolbar: GridToolbar }} checkboxSelection  rows={mockDataRecent} columns={columns} />
      </Box>
    </Box>
  );
};

export default Recent;