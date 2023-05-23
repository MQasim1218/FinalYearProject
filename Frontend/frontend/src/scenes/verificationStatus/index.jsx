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
            flex: 0.5
        },
        {
            field: "title",
            headerName: "Case Title",
            flex: 1
        },
        {
            field: "category",
            headerName: "Category",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "for",
            headerName: "For",
            flex: 1,
        },
    ];


    return (
        <Box m="20px">
            <Header
                title="VERIFICATION STATUS"
                subtitle="List of All Pending and Approved Cases"
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