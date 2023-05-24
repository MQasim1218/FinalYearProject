import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridActionsCellItem } from "@mui/x-data-grid"
import { tokens } from "../../theme"
import Header from "../../components/Header";
import DeleteIcon from '@mui/icons-material/Delete';
import StatBox from "../../components/StatBox";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CalendarChart from "../../components/CalendarChart";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useAllDonorsQuery } from "../../app/redux-features/users/DonorSlice";
import { useAllSuperAdminDonationsQuery } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { activityData as data } from "../../data/mockData";
import { Navigation } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";
import { useSingleAdminDonationsQuery } from "../../app/redux-features/donations/AdminDonations/AdminDonsSlice";
import { useGetDonorsForSingleAdminQuery } from "../../app/redux-features/users/AdminSlice";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useAllDonorsDonationsQuery } from "../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import { PersonOutlineOutlined } from "@mui/icons-material";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const Donors = ({ single_donor }) => {
  let { data: donsFromDonors, isLoading: isDonsLoading, error: donsError, isError: isDonsError, isSuccess: IsDonsSuccess } = useAllDonorsDonationsQuery()

  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const currentYear = new Date().getFullYear();

  let { user } = useAuthContext()

  let DonorsStatBox = <></>, DonorsDataGrid = <></>, DonsByDonorsStatBox = <></>
  let {
    data: donors,
    isLoading: isDonorsLoading,
    error: donorsError,
    isError: isDonorsError,
    isSuccess: isDonorsSuccess
  } = useAllDonorsQuery()

  let {
    data: singleAdmin_donors,
    isLoading: isSA_DonorsLoading,
    error: saDonorsError,
    isError: isSA_DonorsError,
    isSuccess: isSA_DonorsSuccess
  } = useGetDonorsForSingleAdminQuery(user?.user?._id)




  if (!single_donor) {


    // Get all the donors that have donated to a perticular campaign.

    /**
     * Step 1: Get all the admin donations of this admin
     * Step 2: Filter AdminDonations to get all the donorIds
     * Step 3: Get all the donors from the donorIds
     * Step 4: Send all the Donors..
     * 
     * This is all suited for the backend.. Only one query is enough.
     */

    // Get all Admin Donations




    const columns = [
      { field: "ind", headerName: "Num" },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Date Joined",
        flex: 0.5,
      },
      {
        field: "total",
        headerName: "Number of Campaigns Supported",
        flex: 1,
      },
      {

        // Okay
        field: 'download',
        type: 'actions',
        headerName: "Download Files",
        width: 100,
        getActions: (row) => [
          <GridActionsCellItem icon={<DownloadOutlinedIcon />} label="View" onClick={() => navigate(`/donorinfo/${row.id}`)} />,
        ],
      },
      {

        // Okay
        field: 'verify',
        type: 'actions',
        headerName: "Verify",
        width: 100,
        getActions: (row) => [
          <GridActionsCellItem icon={<CheckOutlinedIcon />} label="View" onClick={() => navigate(`/donorinfo/${row.id}`)} />,
        ],
      },
    ];


    if (isDonorsLoading) DonorsStatBox = <h3>Loading Content</h3>

    else if (isDonorsSuccess) {
      // donors.forEach((donor) => { donor.id = donor._id })
      console.log("donors recieved are: ", donors)
      donors = donors.map((donor, ind) => ({ ...donor, createdAt: donor?.createdAt.slice(0, 10), ind, id: donor?._id, total: donor?.donated_campaigns_specific.length + donor?.donated_campaigns_general.length }))
      DonorsStatBox = (
        <StatBox
          title={donors?.length}
          subtitle="Total Donors"
          progress={false}
          // increase="+9% This Month dyn"
          icon={
            <PersonOutlineOutlined
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      )



      DonsByDonorsStatBox = < StatBox
        // ! title={donors?.reduce((prev, val) => prev + val.amount, 0)}
        title={donsFromDonors?.length}
        subtitle="Total Donations Made By Donors"
        progress={false}
        // increase={"+25% in " + currentYear}
        icon={
          < VolunteerActivismOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }
            }
          />
        }
      />

      DonorsDataGrid = < DataGrid checkboxSelection rows={donors} columns={columns} components={{ Toolbar: GridToolbar }} />
    }
    else if (isDonorsError) DonorsStatBox = <h3>{`Error: ${donorsError.message}`}</h3>
  } else {

    const columns = [
      { field: "ind", headerName: "Num" },
      {
        field: "name",
        headerName: "Name",
        flex: 0.5,
        cellClassName: "name-column--cell",
      },
      {
        field: "email",
        headerName: "Email",
        flex: 1,
      },
      {
        field: "createdAt",
        headerName: "Date Joined",
        flex: 0.5,
      },
      {
        field: "total",
        headerName: "Number of Campaigns Supported",
        flex: 1,
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
    ];

    if (isSA_DonorsLoading) DonorsStatBox = <h3>Loading Content</h3>

    else if (isSA_DonorsSuccess) {

      console.log("Donors who donated to this single admin: ", singleAdmin_donors)
      singleAdmin_donors = singleAdmin_donors.map((donor, ind) => ({ ...donor, id: donor._id, ind: ind }))
      DonorsStatBox = (
        <StatBox
          title={singleAdmin_donors?.length}
          subtitle="Total Donors"
          progress={false}
          // increase="+9% This Month dyn"
          icon={
            <AttachMoneyOutlinedIcon
              sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
            />
          }
        />
      )
      DonorsDataGrid = <DataGrid
        checkboxSelection
        rows={singleAdmin_donors}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
      />
      DonsByDonorsStatBox = < StatBox
        // ! title={donors?.reduce((prev, val) => prev + val.amount, 0)}
        title={"0"}
        subtitle="Total Donations"
        progress={false}
        // increase={"+25% in " + currentYear}
        icon={
          < AttachMoneyOutlinedIcon
            sx={{ color: colors.greenAccent[600], fontSize: "26px" }
            }
          />
        }
      />
    } else if (isSA_DonorsError) DonorsStatBox = <h3>{`Error: ${saDonorsError.message}`}</h3>
  }



  return (
    <Box m="20px">

      <Header title="VERIFICATION CASES" subtitle={"Manage Beneficiary Cases"} />
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
          {/* <StatBox
            title="110"
            subtitle="Total Donors"
            progress={false}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          /> */}
          {DonorsStatBox}
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >

          {DonsByDonorsStatBox}
        </Box>


        {/* ROW 2 */}


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
          isDonorsLoading ?
            <Typography varient="h4" alignItems="center" justifyContent="center">
              Data Grid Loading
            </Typography> : DonorsDataGrid
        }
      </Box>
    </Box>
  );
};

export default Donors;