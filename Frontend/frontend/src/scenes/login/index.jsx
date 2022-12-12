import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";


const initialValues = {
  email: "",
  password: "",
  userType: "",
};

const userSchema = yup.object().shape({
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
  userType: yup.string().required("Required"),
});



// ! Frontend

const Login = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate();
  const { login } = useLogin()

  const handleFormSubmit = async (values) => {
    console.log("Form values: ", values);
    // console.log("Here trying to login with a user!!")
    let { email, password, userType } = values
    await login(email, password, userType)
    console.log("no error so far")
    // navigate('/admin')
  };

  // console.log("first")
  return (
    <Box padding="20px" height="auto" width="50vh" m="10% 0 0 38%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px" backgroundColor={colors.primary[400]} >
      <Header title="LOGIN" subtitle="Enter your Login details" />

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
          <form
            onSubmit={handleSubmit}>

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
              {/* <Button type="submit" color="secondary" variant="contained" /> */}
              <Button onClick={() => navigate('/donordashboard')} type="submit" color="secondary" variant="contained"> Login </Button>
              <Typography variant="h6" color={colors.blueAccent[300]} sx={{ m: "20px 0 5px 0" }}>Dont have an account?</Typography>
              <Button onClick={() => navigate('/register')} type="submit" color="primary" variant="contained">
                Register
              </Button>
            </Box>

          </form>
        )}
      </Formik>
    </Box>

  )
}

export default Login