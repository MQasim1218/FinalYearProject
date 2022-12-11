import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";

const initialValues = {
  name: "",
  email: "",
  password: "",
  userType: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
  userType: yup.string().required("Required"),
});


const Register = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate();


  // UseSignUp hook to authenticate and store user to the database!
  const { signup, loadn, err } = useSignUp()

  const handleFormSubmit = async (values) => {
    console.log("Form values: ", values);
    await signup(values)
    // navigate('/')
  };


  return (
    <Box padding="20px" height="auto" width="50vh" m="10% 0 0 38%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px" backgroundColor={colors.primary[400]}>
      <Header title="Register" subtitle="Enter your Registeration details" />
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
                "& > div": { gridColumn: "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                // helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                // helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                // helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Account Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="filled"
                  type="text"
                  value={values.userType}
                  name="userType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.userType && !!errors.userType}
                  // helperText={touched.userType && errors.userType}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value={"donor"}>Donor</MenuItem>
                  <MenuItem value={"benificiary"}>Beneficiary</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box display="grid" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Register
              </Button>
              <Typography variant="h6" color={colors.blueAccent[300]} sx={{ m: "20px 0 5px 0" }}>Already have an account?</Typography>
              <Button onClick={() => navigate('/')} type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>

  )
}

export default Register