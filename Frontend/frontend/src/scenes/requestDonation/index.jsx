import { Box, Button, TextField, useTheme, Checkbox, Typography, FormControlLabel, InputAdornment, MenuItem, Avatar, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useCallback, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { ConstructionOutlined } from "@mui/icons-material";

//initializing all inputs with their keys
const initialValues = {
    donation_title: "",
    description: "",
    For: "",
    amount: "",
};

//schema for validation
const uploadSchema = yup.object().shape({
    donation_title: yup.string().required("Required"),
    For: yup.string().required("Required"),
    amount: yup
        .string()
        .test('positive', 'Amount must be greater than 0', value => parseFloat(value) > 0)
        .required('Required'),
});


const RequestDonation = () => {

    let { user } = useAuthContext()

    //Code for the OnCLick POPUP
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    //Options for For entry
    // TODO: This needs tobe made dynamic and linked to Google Maps
    const For = [
        {
            value: 'Case 1',
            label: 'Case 1',
        },
        {
            value: 'Case 2',
            label: 'Case 2',
        },
    ];

    // STUB: Options for amount entry
    // TODO: MAke Dynamic based on Registered Campaign tpyes..
    const catagorys = [
        {
            value: 'Education',
            label: 'Education',
        },
        {
            value: 'Meal',
            label: 'Meal',
        },
        {
            value: 'Medical',
            label: 'Medical',
        },
        {
            value: 'NaturalDisaster',
            label: 'Natural Disaster',
        },
    ];



    //force width to not go below 600px
    const isNonMobile = useMediaQuery("(min-width:600px)");


    //on submit, all inputs are stored in values
    const handleFormSubmit = async (values, { resetForm }) => {
        console.log(values);
        alert("Request Submitted Successfully")
        resetForm()
        setOpen(true);




    };


    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Header title="DONATION REQUEST" subtitle="Submit A Request For Donation" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={uploadSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            backgroundColor={colors.primary[400]}
                            padding="40px"
                            margin="0 15% 0 15%"
                            borderRadius="50px"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Donation Title *"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.donation_title}
                                name="donation_title"
                                error={!!touched.donation_title && !!errors.donation_title}
                                helperText={touched.donation_title && errors.donation_title}
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                select
                                variant="filled"
                                type="text"
                                label="For *"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.For}
                                name="For"
                                error={!!touched.For && !!errors.For}
                                helperText={touched.For && errors.For}
                                sx={{ gridColumn: "span 2" }}
                            >{For.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Amount *"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                name="amount"
                                error={!!touched.amount && !!errors.amount}
                                helperText={touched.amount && errors.amount}
                                sx={{ gridColumn: "span 2" }}
                            >
                            </TextField>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Request Description (optional)"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                                multiline
                                rows={4}
                            />
                        </Box>

                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Submit Request
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Request Submitted Successfully!
                </Alert>
            </Snackbar>
        </Box>
    );

}

export default RequestDonation;