import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

import { useDispatch } from 'react-redux'
import { clearAuthDetails, setAuthDetails } from '../../app/redux-features/authSlice'


// Import Redux Hooks for ...
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useState } from "react";


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

const Login = (props) => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate();
  const { login } = useLogin()
  const dispatch = useDispatch()
  const { user } = useAuthContext()
  const [open, setOpen] = useState(false)

  const handleFormSubmit = async (values) => {
    //This setAccountType will help with the correct sidebar display on login.
    props.handleAccountTypeChange(values.userType);
    values.email = values.email.toLowerCase()
    // console.log(props)
    // console.log("Form values: ", values);
    // // console.log("Here trying to login with a user!!")
    // console.log("Form values: ", values);
    // console.log("Here trying to login with a user!!")
    let { email, password, userType } = values
    try{
    await login(email, password, userType)

    console.log(`${userType} login sucessful`)
    console.log(`navigating now!`)
    navigate(`/${userType}dashboard`)
    }
    catch(err){
      setOpen(true)
    }

  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    console.log("User from the Login Screen!!: ", user)
    if (user != null) {
      dispatch(setAuthDetails({ user: user.user, token: user.token }))
    }
  })

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
          isSubmitting,
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
                  <MenuItem value={"beneficiary"}>Beneficiary</MenuItem>
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"superadmin"}>Super Admin</MenuItem>

                </Select>
              </FormControl>

            </Box>

            <Box display="grid" justifyContent="center" mt="20px">
              {/* <Button type="submit" color="secondary" variant="contained" /> */}
              <Button type="submit" disabled={isSubmitting} color="secondary" variant="contained"> {isSubmitting? "Loading...":"Login"} </Button>
              <Typography variant="h6" color={colors.blueAccent[300]} sx={{ m: "20px 0 5px 0" }}>Dont have an account?</Typography>
              <Button onClick={() => navigate('/register')} type="submit" color="primary" variant="contained">
                Register
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Login Failed! Email or password is incorrect.
        </Alert>
      </Snackbar>
    </Box>

  )
}

export default Login