import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataUsers, mockDataBeneficiary, mockDataDonor } from "../../data/mockData"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';


const Users = () => {
  const navigate = useNavigate();
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
              colors.greenAccent[400]
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

      // Okay
      field: 'View',
      type: 'actions',
      headerName: "View",
      width: 100,
      getActions: (row) => [
        <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/donorinfo/${row.id}`)} />,
      ],
    },

    {
      // Okay
      field: 'actions',
      type: 'actions',
      width: 100,
      getActions: () => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      ],
    },
  ];

  // ! Data
  let [users, setUsers] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  let [view, setView] = useState("donors") // True for Donor
  let { user } = useAuthContext()

  useEffect(() => {

    console.log("Re run use Effect")
    const fetchUsers = async () => {
      try {
        let res = null
        if (view === "donors") {
          res = await axios.get(
            `${process.env.REACT_APP_BACKEND_BASE_ROUTE}/donor/allDonors`,
            {
              headers: {
                'Authorization': `Bearer ${user.user.token}`
              }
            }

          )
          setIsLoading(false)
        } else {
          res = await axios.get(`${process.env.REACT_APP_BACKEND_BASE_ROUTE}/beneficiary`)
          setIsLoading(false)
        }

        if (res.status < 300) {
          let data = res.data
          if (data !== null) return data
          else console.log("No data recieved!")
        }
      } catch (error) {
        console.log(error)
      }
    }
    // console.log("kdfiodno")
    fetchUsers().then((data) => {
      console.log(data)
      setIsLoading(false)
      let usrz = data.map((usr, indx) => ({ ...usr, id: indx + 1 }))
      setUsers(usrz)
    })
    return (() => {
      console.log("Nothing for clean up")
      setIsLoading(false)
    })
  }, [view])

  return (
    <Box m="20px">

      <Header title={view.toLocaleUpperCase()} subtitle={"Manage " + view} />
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

          isLoading ?
            <Typography varient="h4" alignItems="center" justifyContent="center">
              Data Grid Loading
            </Typography> :
            <DataGrid checkboxSelection rows={mockDataUsers} columns={columns} components={{ Toolbar: GridToolbar }} />
        }
      </Box>
    </Box>
  );
};

export default Users;