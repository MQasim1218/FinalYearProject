import { Box, Button, TextField, useTheme, Checkbox, FormControlLabel, InputAdornment, MenuItem } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useState } from "react";
import AlertModal from "../../components/AlertModal";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";

//initializing all inputs with their keys
const initialValues = {
  campaign_title: "",
  required_amount: "",
  description: "",
  location: "ISL",
  archived: false,
  category: "Education",
  completed: false,
};

//schema for validation
const campaignSchema = yup.object().shape({
  campaign_title: yup.string().required("Required"),
  required_amount: yup.string().required("Required"),
  category: yup.string().required("Required"),
  description: yup.string().required("Required"),
  location: yup.string().required("Required"),
});


const CreateCampaign = () => {

  let { user } = useAuthContext()

  //Code for the OnCLick POPUP
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  //Options for location entry
  // TODO: This needs tobe made dynamic and linked to Google Maps
  const locations = [
    {
      value: 'Islamabad',
      label: 'ISL',
    },
    {
      value: 'Rawalpindi',
      label: 'RWP',
    },
    {
      value: 'Lahore',
      label: 'LHR',
    },
    {
      value: 'Faisalabad',
      label: 'FSD',
    },
  ];

  // STUB: Options for category entry
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

    // ! We are using a hard coded value for the LoggedIn Admin.



    let camp = await axios.post(
      `http://localhost:5000/admin/${user?.user?._id}/addGeneralCampaign`,
      { ...values, admin: user?.user?._id }
    )
    // let data = await axios.post("http://localhost:3000/", JSON.stringify(values))
    // JSON.parse(data)

    console.log("camp created: ", camp)
    //To show the popup component.
    openModal()

    //To reset the forms values after submit.
    resetForm()
  };


  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <AlertModal isOpen={modalIsOpen} onClose={closeModal} message="Campaign Created Sucessfully!" />
      <Header title="CREATE CAMPAIGN" subtitle="Create A New Campaign" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={campaignSchema}
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
                label="Campaign Title *"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaign_title}
                name="campaign_title"
                error={!!touched.campaign_title && !!errors.campaign_title}
                helperText={touched.campaign_title && errors.campaign_title}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Required Amount *"
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.required_amount}
                name="required_amount"
                error={!!touched.required_amount && !!errors.required_amount}
                helperText={touched.required_amount && errors.required_amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Location *"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name="location"
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: "span 2" }}
              >{locations.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
              <TextField
                fullWidth
                select
                variant="filled"
                type="text"
                label="Category *"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.category}
                name="category"
                error={!!touched.category && !!errors.category}
                helperText={touched.category && errors.category}
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
                label="Campaign Description *"
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

              <FormControlLabel control={<Checkbox name="archived" onBlur={handleBlur} onChange={handleChange} value={values.archived} sx={{ color: "white", '&.Mui-checked': { color: "white", }, }} />} label="Archived" />
              <FormControlLabel control={<Checkbox name="completed" onBlur={handleBlur} onChange={handleChange} value={values.completed} sx={{ color: "white", '&.Mui-checked': { color: "white", }, }} />} label="Completed" />

            </Box>

            <Box display="flex" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Campaign
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );

}

export default CreateCampaign;