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
// import axios from "axios"

//initializing all inputs with their keys
const initialValues = {
  campaign_title: "",
  required_amount: "",
  description: "",
  location: "Islamabad",
  archived: false,
  catagory: "Education",
  completed: false,
};

//schema for validation
const userSchema = yup.object().shape({
  campaign_title: yup.string().required("Required"),
  required_amount: yup.string().required("Required"),
  catagory: yup.string().required("Required"),
  description: yup.string().required("Required"),
  location: yup.string().required("Required"),
});


const CreateCampaign = () => {

  //Options for location entry
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

  useEffect(() => {

    const getData = async () => {
      const res = await fetch('http://localhost:5000/admin')
      console.log("Got some data!")

      if (res.ok) {
        let data = await res.json()
        console.log(data)
        if (data !== null) console.log(data)
        else console.log("No data recieved!")
      }
    }

    getData()
    return (() => console.log("No clean up"))

  }
    , [])


  //force width to not go below 600px
  const isNonMobile = useMediaQuery("(min-width:600px)");


  //on submit, all inputs are stored in values
  const handleFormSubmit = async (values) => {
    console.log(values);

    // let data = await axios.post("http://localhost:3000/", JSON.stringify(values))
    // JSON.parse(data)
  };


  const theme = useTheme()
  const colors = tokens(theme.palette.mode)

  return (
    <Box m="20px">
      <Header title="CREATE CAMPAIGN" subtitle="Create A New Campaign" />

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
              <Button onClick={handleFormSubmit} type="submit" color="secondary" variant="contained">
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