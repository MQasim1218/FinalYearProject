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
import { useAuthContext } from "../../hooks/useAuthContext";


const Settings = () => {

  const { user } = useAuthContext()
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const [openTrue, setOpenTrue] = useState(false)
  const [profileImage, setProfileImage] = useState(user?.user?.picture);
  const [fileUrl, setFileUrl] = useState(user?.user?.picture);

  const initialValues = {
    name: user?.user?.name || "",
    email: user?.user?.email || "",
    password: "",
    chatId: "",
    picture: user?.user?.picture,
  };

  const userSchema = yup.object().shape({
    name: yup.string().required("Required"),
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
    chatId: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const id = user?.user?._id;

  console.log("Checking Admin ID: ", id)

  const userType = JSON.parse(localStorage.getItem('userType'));

  const handleFormSubmit = async (values) => {

    // values.picture = picture;

    console.log("Checking Values: ", values)
    const { name, email, password, chatId, picture } = values;
    const data = { name, email, password, chatId, picture: profileImage };
    console.log("Checking Data: ", data)
    try {
      const response = await axios.patch(`${process.env.REACT_APP_BACKEND_BASE_ROUTE}/${userType}/update/${id}`, data);
      console.log("Update Response: ", response);

      const { email, chatId } = response.data

      const userChatID = localStorage.getItem('chatId');

      const chatUpdate = await axios.patch(`https://api.chatengine.io/users/${userChatID}/`, {
        username: email,
        secret: chatId,
      }, {
        headers: {
          'Private-Key': process.env.REACT_APP_PRIVATE_KEY,
        },
      });
    } catch (error) {
      console.log(error);
      setOpen(true);
    }
    setOpenTrue(true)
  };





  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setOpenTrue(false);

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
    <Box margin padding="20px" m="0 0 0 30%" height="auto" width="40%" border={`1px solid ${colors.grey[100]}`} borderRadius="4px" backgroundColor={colors.primary[400]}>
      <Header title="Settings" subtitle="Update your account details" />

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
                <Dropzone value={profileImage} setFieldValue={setFieldValue} />
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
            </Box>

            <Box display="grid" justifyContent="center" mt="20px">
              <Button disabled={isSubmitting} type="submit" color="secondary" variant="contained">
                {isSubmitting ? "Loading..." : "Update"}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Update Failed!
        </Alert>
      </Snackbar>
      <Snackbar open={openTrue} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Update Successful! Please log in again to view changes.
        </Alert>
      </Snackbar>
    </Box>

  )
}

export default Settings