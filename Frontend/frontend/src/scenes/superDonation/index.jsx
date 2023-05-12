import { Box, Button, TextField, useTheme, Alert, Checkbox, FormControlLabel, InputAdornment, MenuItem, Snackbar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState } from "react";
import axois from "axios"
import AlertModal from "../../components/AlertModal";

import { useEffect } from "react";
import axios from "axios";
import { useDonateToAdminMutation } from "../../app/redux-features/donations/SupAdminDonations/SupAdminDonationsSlice";
import { useAllAdminsQuery } from "../../app/redux-features/users/AdminSlice";
import { useAllDonorsDonationsQuery } from "../../app/redux-features/donations/DonorDonations/DonorDonsSlice";
// import axios from "axios"

//initializing all inputs with their keys
const initialValues = {
  donation_title: "",
  amount: 0,
  description: "",
  admin: "",
  catagory: "",
  donordonationId: "",

};

//schema for validation
const userSchema = yup.object().shape({
  donation_title: yup.string().required("Required"),
  amount: yup.string().required("Required"),
  catagory: yup.string().required("Required"),
  admin: yup.string().required("Required"),
  donordonationId: yup.string().required("Required"),
});


const SuperDonation = () => {

  //Code for the OnCLick POPUP
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [open, setOpen] = useState(false)


  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };



  // NOTE: Getting all Admins for the admin entry
  let { isError: adminsIsError, isSuccess: adminsIsSuccess, isLoading: adminsIsLoading, error: adminsError, data: admins } = useAllAdminsQuery()

  if (!adminsIsLoading) {
    if (adminsIsSuccess)
      admins = admins
        .map((admin, index) => ({ value: admin._id, label: admin.name, id: index }))
        .map((option) => (
          <MenuItem key={option.id} value={option.value} id={option.id}>
            {option.label}
          </MenuItem>
        ))

    else if (adminsIsError)
      console.log(adminsError)
  }


  // NOTE: Options for donor Donations

  let { isError: donsIsError, isSuccess: donsIsSuccess, error: donsError, data: dons, isLoading: donsIsLoading } = useAllDonorsDonationsQuery()

  if (!donsIsLoading) {
    if (donsIsSuccess)
      dons = dons
        .filter((don) => don.amount !== 0) // NOTE: Filtering out the donations with amount 0 
        .map((don, index) => ({ value: don._id, label: don.amount, id: index, name: don.donor.name, category: don.catagory }))
        .map((opt) => (
          <MenuItem key={opt.id} value={opt.value} id={opt.id}>
            {opt.name + " ($" + opt.label + ")" + " - " + opt.category}
          </MenuItem>
        ))
    else if (donsIsError) console.log(donsError.message)
  }


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



  // REVIEW: Old code!! Not a good idea to delete!
  // useEffect(() => {

  //   const getData = async () => {
  //     const res = await fetch('http://localhost:5000/admin')
  //     console.log("Got some data!")

  //     if (res.ok) {
  //       let data = await res.json()
  //       console.log(data)
  //       if (data !== null) console.log(data)
  //       else console.log("No data recieved!")
  //     }
  //   }

  //   getData()
  //   return (() => console.log("No clean up"))

  // }
  //   , [])


  //force width to not go below 600px
  const isNonMobile = useMediaQuery("(min-width:600px)");

  let [set_donation, { data, isLoading, error, isError }] = useDonateToAdminMutation()


  //on submit, all inputs are stored in values
  const handleFormSubmit = async (values, { resetForm }) => {
    console.log(values);
    console.log('About to send the backend request@@!')

    await set_donation(values)
    if (isError && !isLoading) {
      console.log(error)
    }

    //To show the popup component.
    setOpen(true);

    //To reset the forms values after submit.
    resetForm()
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


      <Header title="ALLOCATE DONATIONS" subtitle="Give Donations to an Admin" />

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


              {
                !adminsIsLoading &&
                <TextField
                  fullWidth
                  select
                  variant="filled"
                  type="text"
                  label="To *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.admin}
                  name="admin"
                  error={!!touched.admin && !!errors.admin}
                  helperText={touched.admin && errors.admin}
                  sx={{ gridColumn: "span 2" }}
                >
                  {admins}
                </TextField>
              }

              {
                !donsIsLoading &&
                <TextField
                  fullWidth
                  select
                  variant="filled"
                  type="text"
                  label="From *"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.donordonationId}
                  name="donordonationId"
                  error={!!touched.donordonationId && !!errors.donordonationId}
                  helperText={touched.donordonationId && errors.donordonationId}
                  sx={{ gridColumn: "span 2" }}
                >
                  {dons}
                </TextField>
              }

              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Category *"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.catagory}
                name="catagory"
                error={!!touched.catagory && !!errors.catagory}
                helperText={touched.catagory && errors.catagory}
                sx={{ gridColumn: "span 2" }}
              >
                {
                  catagorys.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                }
              </TextField>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Campaign Description (optional)"
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
                Allocate Donation
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Donation Given To Admin Successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default SuperDonation