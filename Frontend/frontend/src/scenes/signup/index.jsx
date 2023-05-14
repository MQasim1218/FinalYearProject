import { Box, Button, Snackbar, Alert, TextField, Typography, Select, MenuItem, FormControl, InputLabel, Avatar } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { Navigate, useNavigate } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp";
import { useState, useCallback } from "react";
import axios from "axios";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import { useDropzone } from "react-dropzone";


const initialValues = {
  name: "",
  email: "",
  password: "",
  chatId: "",
  userType: "",
  picture: "",
};

const userSchema = yup.object().shape({
  name: yup.string().required("Required"),
  email: yup.string().required("Required"),
  password: yup.string().required("Required"),
  chatId: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  userType: yup.string().required("Required"),
});




const Register = () => {


  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [picture, setProfileImage] = useState("https://res-console.cloudinary.com/deymti8ua/thumbnails/v1/image/upload/v1680606112/Y2xkLXNhbXBsZS0y/grid_landscape");
  const [fileUrl, setFileUrl] = useState(null);


  // UseSignUp hook to authenticate and store user to the database!
  const { signup, loadn, err } = useSignUp()

  const handleFormSubmit = async (values) => {
    values.picture = picture;
    console.log("Form values: ", values);
    console.log("Checking with mubashir:", values.picture)
    try {
      const response = await signup(values);
      console.log("SignUP Response: ", response);
      if (response === false) {
        navigate("/");
      } else {
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Dropzone = ({ setFieldValue }) => {
    const onDrop = useCallback(async (acceptedFiles) => {
      // Do something with the files
      console.log(acceptedFiles[0]);
      // eslint-disable-next-line no-use-before-define
      // const uploadedImage = await uploadToCloudinary(acceptedFiles[0]);
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);
      formData.append('preset', 'fidazzwm');
      const results = await axios.post('https://api.cloudinary.com/v1_1/deymti8ua/image/upload', formData, {
        params: {
          upload_preset: 'fidazzwm',
        },
      });

      console.log(results);
      console.log(results.data.secure_url);
      setProfileImage(results.data.secure_url);

      setFieldValue('file', acceptedFiles[0]);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    }, [setFieldValue]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
      <div {...getRootProps()} sx={{ gridColumn: 'span 1', display: 'flex', }}>
        <input {...getInputProps()} />
        <Avatar sx={{ alignItems: 'stretch', width: '100px', height: '100px', borderWidth: '1px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', marginTop: '3em', marginBottom: '-2em', cursor: 'pointer' }}>
          {fileUrl ? <img src={fileUrl} alt="file preview" /> : isDragActive ? <CloudUploadIcon color="primary" sx={{ fontSize: '3rem' }} />
            : (
              <div sx={{ display: 'flex', flexDirection: 'column' }}>
                <PersonIcon sx={{ fontSize: '3rem' }} />
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Upload Here
                </Typography>
              </div>
            )}
        </Avatar>
      </div>
    );
  };


  return (
    <Box padding="20px" height="auto" width="50vh" m="2% 0 0 38%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px" backgroundColor={colors.primary[400]}>
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
          setFieldValue,
          isSubmitting,
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
              <Box>
                <Dropzone value={values.picture} setFieldValue={setFieldValue} />
              </Box>
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
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.chatId}
                name="chatId"
                error={!!touched.chatId && !!errors.chatId}
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
                </Select>
              </FormControl>
            </Box>

            <Box display="grid" justifyContent="center" mt="20px">
              <Button disabled={isSubmitting} type="submit" color="secondary" variant="contained">
                {isSubmitting ? "Loading..." : "Register"}
              </Button>
              <Typography variant="h6" color={colors.blueAccent[300]} sx={{ m: "20px 0 5px 0" }}>Already have an account?</Typography>
              <Button onClick={() => navigate('/')} type="submit" color="primary" variant="contained">
                Login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Registeration Failed!
        </Alert>
      </Snackbar>
    </Box>

  )
}

export default Register