import { Box, Button, Snackbar, Alert, TextField, useTheme, Checkbox, FormControlLabel, InputAdornment, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useAllDonorsQuery } from "../../app/redux-features/users/DonorSlice";
import { useRegisterDonorDonationMutation } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import AlertModal from "../../components/AlertModal";
import { useState } from "react";
import { useSA_RegisterDonorDonationMutation } from "../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import { useAuthContext } from '../../hooks/useAuthContext';
import axios from "axios";

// import axios from "axios"

//initializing all inputs with their keys
const initialValues = {
    donation_title: "",
    amount: "",
    description: "",
    catagory: "Education",
    donor: "",
};

//schema for validation
const userSchema = yup.object().shape({
    donation_title: yup.string().required("Required"),
    amount: yup.string().required("Required"),
    catagory: yup.string().required("Required"),
});

const DonorDonation = () => {

    const { user } = useAuthContext()

    let userID = user?.user?._id

    //Code for the OnCLick POPUP
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [open, setOpen] = useState(false)

    //Options for category entry
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

    // NOTE: Options for donor Donations
    // Get LL THE available donors
    let { isError: donorsIsError, isSuccess: donorsIsSuccess, error: donorsError, data: donors, isLoading: donorsIsLoading } = useAllDonorsQuery()

    if (!donorsIsLoading) {
        if (donorsIsSuccess)
            donors = donors
                .map((don, index) => ({ value: don._id, label: don.name, id: index }))
                .map((opt) => (
                    <MenuItem key={opt.id} value={opt.value} id={opt.id}>
                        {opt.label}
                    </MenuItem>
                ))
        else if (donorsIsError) console.log(donorsError.message)
    }

    // NOTE: Get the Mutator for Donor Donation
    let [
        setDonorDonation,
        {
            data, isError,
            isLoading, isSuccess,
            error
        }
    ] = useSA_RegisterDonorDonationMutation()

    // On submit, all inputs are stored in values
    const handleFormSubmit = async (values) => {

        values.donor = userID

        console.log("HERE: ", values);

        let donateResult = await axios.post(
            `http://localhost:5000/donorDonations/donate/${userID}`,
            //{values}
        )

        console.log("DONATE RESULT: ", donateResult)

        const sessionUrl = donateResult.data.sessionUrl;

        console.log("SESSION URL: ", sessionUrl)

        // Redirect the user to the Stripe URL
        //window.location.href = sessionUrl;

        //To show the popup component.
        setOpen(true);

        //To reset the forms values after submit.
        //resetForm()
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Donation Made Successfully!
                </Alert>
            </Snackbar>

            <Header title="MAKE DONATIONS" subtitle="Donate To Our Charity" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={userSchema}
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
                                variant="filled"
                                type="number"
                                label="Total Amount *"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                name="amount"
                                error={!!touched.amount && !!errors.amount}
                                helperText={touched.amount && errors.amount}
                                sx={{ gridColumn: "span 2" }}
                            />

                            <TextField
                                fullWidth
                                select
                                variant="filled"
                                type="text"
                                label="Catagory *"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.catagory}
                                name="catagory"
                                error={!!touched.catagory && !!errors.catagory}
                                helperText={touched.catagory && errors.catagory}
                                sx={{ gridColumn: "span 2" }}
                            >
                                {
                                    catagorys.map((option, index) => (
                                        <MenuItem key={index} value={option.value} id={index}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description (optional)"
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
                            <Button onClick={handleFormSubmit} type="submit" color="secondary" variant="contained">
                                Register Donation
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>

        </Box>
    );
}

export default DonorDonation