import { Box, Button, TextField, useTheme, Checkbox, FormControlLabel, InputAdornment, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState } from "react";
import axois from "axios"
import { useEffect } from "react";
import axios from "axios";
import AlertModal from "../../components/AlertModal";
// import axios from "axios"

//initializing all inputs with their keys
const initialValues = {
  donation_title: "",
  total_amount: "",
  description: "",
  catagory: "Education",
  donor: "",
};

//schema for validation
const userSchema = yup.object().shape({
  donation_title: yup.string().required("Required"),
  total_amount: yup.string().required("Required"),
  catagory: yup.string().required("Required"),
  donor: yup.string().required("Required"),
});

const DonationRegistration = () => {

  //Code for the OnCLick POPUP
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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

  
//   useEffect(() => {

//     const getData = async () => {
//       const res = await fetch('http://localhost:5000/admin')
//       console.log("Got some data!")

//       if (res.ok) {
//         let data = await res.json()
//         console.log(data)
//         if (data !== null) console.log(data)
//         else console.log("No data recieved!")
//       }
//     }

//     getData()
//     return (() => console.log("No clean up"))

//   }, [])


  //force width to not go below 600px
  const isNonMobile = useMediaQuery("(min-width:600px)");


  //on submit, all inputs are stored in values
  const handleFormSubmit = async (values, {resetForm}) => {
    console.log(values);

    // let data = await axios.post("http://localhost:3000/", JSON.stringify(values))
    // JSON.parse(data)

    //To show the popup component.
    openModal()

    //To reset the forms values after submit.
    resetForm()
  };


  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <AlertModal isOpen={modalIsOpen} onClose={closeModal} message="Donation Registered!"/>

      <Header title="REGISTER DONATIONS" subtitle="Register Donations from Donors" />

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
                value={values.total_amount}
                name="total_amount"
                error={!!touched.total_amount && !!errors.total_amount}
                helperText={touched.total_amount && errors.total_amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Donor Name *"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.donor}
                name="donor"
                error={!!touched.donor && !!errors.donor}
                helperText={touched.donor && errors.donor}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Category *"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.catagory}
                name=""
                error={!!touched.catagory && !!errors.catagory}
                helperText={touched.catagory && errors.catagory}
                sx={{ gridColumn: "span 2" }}
              >{catagorys.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
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
                Register Donation
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
}

export default DonationRegistration