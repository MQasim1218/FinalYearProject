import { useEffect } from "react"
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";

const initialValues = {
    Username: "",
    Email: "",
    Password: "",
    AccountType: "",
  };

const userSchema = yup.object().shape({
    Username: yup.string().required("Required"),
    Email: yup.string().required("Required"),
    Password: yup.string().required("Required"),
    AccountType: yup.string().required("Required"),
});

const handleFormSubmit = async (values) => {
    console.log(values);
    //onClick={()=>navigate('/admin')}

  };

const Login = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate();
    return (
        <Box padding="20px" height="auto" width="50vh" m="10% 0 0 38%"  border={`1px solid ${colors.grey[100]}`} borderRadius="4px" backgroundColor={colors.primary[400]} >
            <Header title="LOGIN" subtitle="Enter your Login details"/>
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
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Email}
                name="Email"
                error={!!touched.Email && !!errors.Email}
                helperText={touched.Email && errors.Email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Password}
                name="Password"
                error={!!touched.Password && !!errors.Password}
                helperText={touched.Password && errors.Password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Box display="grid" justifyContent="center" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Login
              </Button>
              <Typography variant="h6" color={colors.blueAccent[300]} sx={{m: "20px 0 5px 0"}}>Dont have an account?</Typography>
              <Button onClick={()=>navigate('/register')} type="submit" color="primary" variant="contained">
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