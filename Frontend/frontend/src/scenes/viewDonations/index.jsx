import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataDonations } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

const ViewDonations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [donations, setDonations] = useState([])
  const { user } = useAuthContext()

  const columns = [
    {
      field: "id",
      headerName: "ID",
      flex: 0.5
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1
    },

    {
      field: "name",
      headerName: "Donor Name",
      type: "number",
      flex: 1

      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "isLoan",
      headerName: "Donation Type",
      flex: 1,
    },
    // {
    //   field: "email",
    //   headerName: "Email Used",
    //   flex: 1,
    // },
    // {
    //   field: "address",
    //   headerName: "Address",
    //   flex: 1,
    // },
    // {
    //   field: "city",
    //   headerName: "City",
    //   flex: 1,
    // },
    // {
    //   field: "donationamount",
    //   headerName: "Donation Amount",
    //   flex: 1,
    // },
  ];


  useEffect(() => {

    const getDonations = async () => {
      let id = user.user.user._id
      console.log("Token: ", user.user.token)
      console.log("User Id: ", user.user.user._id)
      let res = await axios.get(
        `http://localhost:5000/donor/${id}/donations`,
        {
          headers: {
            'Authorization': `Bearer ${user.user.token}`,
            'Content-Type': 'application-json'
          }
        }
      )

      if (res.status < 400) {
        // FIXME: Needs to get rid of user.user.user.name! Only user.obj.name
        console.log("I guess we getting the donations for ", user.user.user.name)
        return res.data
      }
      else return null
    }


    getDonations().then((donations) => {
      let dons = donations.map((don, indx) => ({
        id: indx + 1,
        name: don.donor.name,
        date: don.createdAt,
        amount: don.amount,
        isLoan: don.isLoan
      }))
      setDonations(dons)
    })

    return () => { }
  }, [])


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
        <DataGrid
          checkboxSelection
          // rows={mockDataDonations}
          rows={donations}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
}

export default ViewDonations