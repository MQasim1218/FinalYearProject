import { Box, Typography, useTheme, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataDonations } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useState } from "react";
import { useAllSuperAdminDonationsQuery, useGetSuperAdminDonationsToAdminQuery } from "../../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { flattenObj } from '../../../misc/ArrayFlatten'
import { Navigate, useNavigate } from "react-router-dom";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { UserContext } from "../../../context/UserContext";
import { useAuthContext } from "../../../hooks/useAuthContext";
import StatBox from "../../../components/StatBox";
import AssistWalkerOutlinedIcon from "@mui/icons-material/AssistWalkerOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import { AttachMoneyOutlined, EmojiEventsOutlined, PersonOutline, VolunteerActivismOutlined } from "@mui/icons-material";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';

const SuperAdminDonations = ({ single_admin }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let [view, setView] = useState("superadmin")


  const { user } = useAuthContext()
  let SupAdminDonsGrid = <></>
  // let Donations = [];

  console.log("User logged in is: ", user?.user?._id)

  let {
    isError,
    error,
    isLoading,
    isSuccess,
    data: Donations
  } = useAllSuperAdminDonationsQuery()

  console.log("Donations up above: ", Donations)



  let {
    data: DonsToAdmin,
    isError: adminIsErr,
    error: adminErr,
    isLoading: adminIsLoadn,
    isSuccess: adminIsSuccess,

  } = useGetSuperAdminDonationsToAdminQuery(user?.user?._id)


  if (single_admin) {

    const columns = [
      {
        field: "donation_title", 
        headerName: "Title",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      { field: "createdAt", headerName: "Given At", flex: 1 },
      {
        field: "name",
        headerName: "Admin Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },

      {
        field: "email",
        headerName: "Admin Email",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Given Amount ($)",
        flex: 1,
      },
      {
        field: "category",
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
      {
        field: "donation_title", 
        headerName: "Title",
        flex: 1,
        cellClassName: "name-column--cell",
      },
      { field: "createdAt", headerName: "Given At", flex: 1 },
      {
        field: "name",
        headerName: "Admin Name",
        flex: 1,
        cellClassName: "name-column--cell",
      },

      {
        field: "email",
        headerName: "Admin Email",
        flex: 1,
      },
      {
        field: "amount",
        headerName: "Given Amount ($)",
        flex: 1,
      },
      {
        field: "category",
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
          <GridActionsCellItem icon={<VisibilityOutlinedIcon />} label="View" onClick={() => navigate(`/superadmindonationinfo/${row.id}`)} />,
        ],
      },
    ];

    // Fetching data for all donations made by the superadmins to the donors!!

    if (isLoading) SupAdminDonsGrid = <h3>Content Loading 🏃🏼‍♂️🕺🏼</h3>
    else if (isSuccess) {
      console.log("Super Admin Doations data: ", Donations)

      let SupAdminDonations = Donations?.map((don, ind) => ({
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

  const adminDonationCount = {};


  console.log("Donations: ", Donations)

  // iterate through each donation object in DonsToAdmin
  // Donations?.forEach(donation => {
  //   const adminId = donation?._id;

  //   // if this is the first donation for this admin, initialize the count to 1
  //   if (!adminDonationCount[adminId]) {
  //     adminDonationCount[adminId] = 1;
  //   } else {
  //     // increment the count if this admin has already received donations
  //     adminDonationCount[adminId]++;
  //   }
  // });

  // // get the admin with the highest donation count
  // const maxDonationsAdmin = Object.keys(adminDonationCount)?.reduce((a, b) => adminDonationCount[a] > adminDonationCount[b] ? a : b, 0);

  // // get the admin object with the highest donation count
  // let maxDonationsAdminObj = Donations?.find(donation => donation?._id === maxDonationsAdmin).admin;


  const adminDonations = Donations?.reduce((acc, curr) => {
    const adminId = curr?.admin?._id;
    if (!acc[adminId]) {
      acc[adminId] = { admin: curr?.admin, count: 1 };
    } else {
      acc[adminId].count++;
    }
    return acc;
  }, {});
  
  // Get the admin with the most number of donations
  let maxAdmin = null;
  let maxCount = -Infinity;
  for (const adminId in adminDonations) {
    if (adminDonations[adminId]?.count > maxCount) {
      maxCount = adminDonations[adminId]?.count;
      maxAdmin = adminDonations[adminId]?.admin;
    }
  }
  
  console.log(`Admin ${maxAdmin?.name} (${maxAdmin?.email}) received the most donations (${maxCount})`);
  


  let highestOneTimeAmount = 0;

  Donations?.forEach(donation => {
    const amount = donation.amount;

    if (amount > highestOneTimeAmount) {
      highestOneTimeAmount = amount;
    }
  });

  return (

    <Box m="20px">

      <Header
        title={"SUPERADMIN DONATIONS"} subtitle={"Manage SuperAdmin donations"}
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
            title={single_admin ? DonsToAdmin?.length : Donations?.length}
            subtitle="Total Donations Made"
            progress={false}
            // increase={}
            icon={
              <VolunteerActivismOutlined
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
          {
            Donations && <StatBox
              title={single_admin ? DonsToAdmin[0]?.createdAt.slice(0, 10) : Donations[0]?.createdAt.slice(0, 10)}
              subtitle="Latest Donation"
              progress={false}
              icon={
                <CalendarMonthOutlinedIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          }
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
            title={maxAdmin?.name}
            increase={"Donations: "+maxCount}
            subtitle="Most Donations Made To"
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
            title={"$" + highestOneTimeAmount}
            subtitle="Highest One Time Donation"
            progress={false}
            icon={
              <EmojiEventsOutlined
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
        {SupAdminDonsGrid}
      </Box>
    </Box>
  );
};

export default SuperAdminDonations;