import { Box, IconButton, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import { mockDataUsers, mockDataBeneficiary, mockDataDonor } from "../../data/mockData"
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { useEffect, useState } from "react";
import StatBox from "../../components/StatBox";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../components/LineChart";
import PersonOutlineOutlined from "@mui/icons-material/PersonOutlineOutlined";
import CalendarChart from "../../components/CalendarChart";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Navigation } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";


const Donors = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentYear = new Date().getFullYear();


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
      field: "totaldonations",
      headerName: "Total Donations",
      flex: 1,
    },
    
    {
      
      // Okay
      field: 'View',
      type: 'actions',
      headerName: "View",
      width: 100,
      getActions: (row) => [
        <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/donorinfo/${row.id}`)}  />,
      ],
    },
    {
      // Okay
      field: 'Delete',
      type: 'actions',
      headerName: "Delete",
      width: 100,
      getActions: () => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
      ],
    },
  ];

  // ! Data
  let [users, setUsers] = useState([])
  let [isLoading, setIsLoading] = useState(true)

  //PLEASE USE THE CORRECT LABEL FOR DONORS IN THE DB IF "DONORS" IS WRONG
  let [view, setView] = useState("donors")

  useEffect(() => {

    console.log("Re run use Effect")
    const fetchUsers = async () => {
      try {
        let res = null
  //PLEASE USE THE CORRECT LABEL FOR DONORS IN THE DB IF "DONORS" IS WRONG
        if (view === "donors") {
          res = await axios.get("http://localhost:5000/donor/allDonors")
          setIsLoading(false)
        } else {
          res = await axios.get("http://localhost:5000/benificiary")
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
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px">
        {/* ROW 1 */}
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="110"
            subtitle="Total Donors"
            progress={false}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="$10,500"
            subtitle="Total Donations"
            progress={false}
            increase={"+25% in "+currentYear} 
            icon={
              <AttachMoneyOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        

        {/* ROW 2 */}
        <Box
          gridColumn="span 12"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Activity Calendar
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <CalendarChart isDashboard={true} />
          </Box>
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
            <DataGrid checkboxSelection rows={mockDataDonor} columns={columns} components={{ Toolbar: GridToolbar }} />
        }
      </Box>
    </Box>
  );
};

export default Donors;