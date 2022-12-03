import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useEffect } from "react";
// import axios from "axios"

//initializing all inputs with their keys
const initialValues = {
  campaignName: "",
  campaignType: "",
  campaignGoal: "",
  campaignLocation: "",
  campaignGenre: "",
  campaignDescription: "",
};

//schema for validation
const userSchema = yup.object().shape({
  campaignName: yup.string().required("Required"),
  campaignType: yup.string().required("Required"),
  campaignGoal: yup.string().required("Required"),
  campaignLocation: yup.string().required("Required"),
  campaignGenre: yup.string().required("Required"),
  campaignDescription: yup.string().required("Required"),
});


const CreateCampaign = () => {

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
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Campaign Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaignName}
                name="campaignName"
                error={!!touched.campaignName && !!errors.campaignName}
                helperText={touched.campaignName && errors.campaignName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Campaign Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaignType}
                name="campaignType"
                error={!!touched.campaignType && !!errors.campaignType}
                helperText={touched.campaignType && errors.campaignType}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Campaign Goal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaignGoal}
                name="campaignGoal"
                error={!!touched.campaignGoal && !!errors.campaignGoal}
                helperText={touched.campaignGoal && errors.campaignGoal}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Campaign Genre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaignGenre}
                name="campaignGenre"
                error={!!touched.campaignGenre && !!errors.campaignGenre}
                helperText={touched.campaignGenre && errors.campaignGenre}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Campaign Location"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaignLocation}
                name="campaignLocation"
                error={!!touched.campaignLocation && !!errors.campaignLocation}
                helperText={touched.campaignLocation && errors.campaignLocation}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Campaign Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.campaignDescription}
                name="campaignDescription"
                error={
                  !!touched.campaignDescription && !!errors.campaignDescription
                }
                helperText={
                  touched.campaignDescription && errors.campaignDescription
                }
                sx={{ gridColumn: "span 4" }}
              />
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