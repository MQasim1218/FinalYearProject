import { Box, Button, TextField, useTheme, Checkbox, Typography, FormControlLabel, InputAdornment, MenuItem, Avatar, Snackbar, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import { useCallback, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PersonIcon from '@mui/icons-material/Person';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import { ConstructionOutlined } from "@mui/icons-material";


//initializing all inputs with their keys
const initialValues = {
    case_title: "",
    description: "",
    category: "Education",
    url_docs: [],
    benefId: ""
};

//schema for validation
const uploadSchema = yup.object().shape({
    case_title: yup.string().required("Required"),
    category: yup.string().required("Required"),
    url_docs: yup.array().required("Required"),
});


const UploadDocuments = () => {



    let { user } = useAuthContext()

    //Code for the OnCLick POPUP
    const [urls, setUrls] = useState([]);
    const [fileUrl, setFileUrl] = useState(null);
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    //Options for For entry
    // TODO: This needs tobe made dynamic and linked to Google Maps
    const For = [
        {
            value: 'Self',
            label: 'Self',
        },
        {
            value: 'Family Member',
            label: 'Family Member',
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

        values.benefId = user?.user?._id
        console.log(values);

        values.url_docs = urls;

        console.log("Final values", values);

        if (values.url_docs.length == 0) {
            alert("Please upload documents")
        }
        else {
            //Write code to send values to backend here

            axios.post(`${process.env.REACT_APP_BACKEND_BASE_ROUTE}/beneficiary/appeal`, values)

            alert("Documents uploaded successfully")

            resetForm()
            setFileUrl(null)
            setUrls([])
            setOpen(true);
        }



    };



    const Dropzone = ({ setFieldValue }) => {
        const onDrop = useCallback(async (acceptedFiles) => {
            // Do something with the files
            console.log(acceptedFiles);


            // ! eslint-disable-next-line no-use-before-define
            // const uploadedImage = await uploadToCloudinary(acceptedFiles[0]);

            const URLs = [];

            for (let i = 0; i < acceptedFiles.length; i++) {
                const formData = new FormData();

                // Appending all the files to the formData.
                let file = acceptedFiles[i];

                formData.append('file', file);

                // Accept all the files from ??
                // fidazzwm => File upload access
                formData.append('preset', 'ycmbrvbg');


                const results = await axios.post('https://api.cloudinary.com/v1_1/deymti8ua/auto/upload', formData, {
                    params: {
                        upload_preset: 'ycmbrvbg',
                    },
                });

                console.log("URLS: " + results.data.secure_url)
                URLs.push(results.data.secure_url);

            }


            setFieldValue('file', acceptedFiles);

            setFileUrl(acceptedFiles.length + " files selected")

            setUrls(URLs);



        }, [setFieldValue]);


        const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

        return (
            <div {...getRootProps()} sx={{ gridColumn: 'span 1', display: 'flex', flexDirection: 'row' }}>
                <input {...getInputProps()} />

                {/* Technically we dont need this code as its simple file upload!! */}
                <Button sx={{
                    backgroundColor: colors.blueAccent[700],
                    color: colors.grey[100],
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                }} >

                    {/* Either display a  dummy person or the uploaded image */}

                    {
                        fileUrl ? <div sx={{ display: 'flex', flexDirection: 'row' }}>
                            <AttachFileOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                            <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                {fileUrl}
                            </Typography>
                        </div>
                            : (
                                <div sx={{ display: 'flex', flexDirection: 'row' }}>
                                    <AttachFileOutlinedIcon sx={{ fontSize: '1.5rem' }} />
                                    <Typography variant="body2" sx={{ textAlign: 'center' }}>
                                        Upload Documents
                                    </Typography>
                                </div>
                            )
                    }
                </Button>
            </div>
        );
    };


    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    return (
        <Box m="20px">
            <Header title="UPLOAD DOCUMENTS" subtitle="Upload Documents For Verification" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={uploadSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue
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
                                label="Case Title *"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.case_title}
                                name="case_title"
                                error={!!touched.case_title && !!errors.case_title}
                                helperText={touched.case_title && errors.case_title}
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
                                label="Case Description (optional)"
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

                            <Box>
                                <Dropzone value={values.url_docs} setFieldValue={setFieldValue} />
                            </Box>
                        </Box>

                        <Box display="flex" justifyContent="center" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Submit Case
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Case Submitted Successfully!
                </Alert>
            </Snackbar>
        </Box>
    );

}

export default UploadDocuments;