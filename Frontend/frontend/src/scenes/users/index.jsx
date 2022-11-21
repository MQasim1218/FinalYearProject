import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataUsers } from "../../data/mockData"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';

const Users = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    // The columns gets all the data we specify below from the mockdata file and store it
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
        field: "accounttype",
        headerName: "Account Type",
        flex: 1,
        renderCell: ({ row: { accounttype } }) => {
          return (
            <Box
              width="60%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={
                colors.greenAccent[600]
              }
              borderRadius="4px"
            >
              {accounttype === "admin" && <AdminPanelSettingsOutlinedIcon />}
              <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                {accounttype}
              </Typography>
            </Box>
          );
        },
      },
      {
        field: 'actions',
        type: 'actions',
        width: 100,
        getActions: () => [
          <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        ],
      },
    ];
    
    
    return (
      <Box m="20px">
        <Header title="USERS" subtitle="Manage All The Users" />
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
          <DataGrid checkboxSelection rows={mockDataUsers} columns={columns} components={{ Toolbar: GridToolbar }} />
        </Box>
      </Box>
    );
  };

  export default Users;