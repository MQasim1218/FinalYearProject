import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const initialValues = {
    campaignName: "",
    campaignType: "",
    campaignGoal: "",
    campaignLocation: "",
    campaignGenre: "",
    campaignDescription: "",
}



const userSchema = yup.object().shape({
    campaignName: yup.string().required("Required"),
    campaignType: yup.string().required("Required"),
    campaignGoal: yup.string().required("Required"),
    campaignLocation: yup.string().required("Required"),
    campaignGenre: yup.string().required("Required"),
    campaignDescription: yup.string().required("Required"),
})
const CreateCampaign = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)")

    const handleFormSubmit = (values) => {
        console.log(values)
    }

    return (
    
    <Box m="20px">
        <Header title="CREATE CAMPAIGN" subtitle="Create A New Campaign"/>

        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
            {({values, errors, touches, handleBlur, handleChange, handleSubmit}) => (
                <form onSubmit={handleSubmit}>
                    <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0, 1fr)" sx={{ "& > div": {gridColumn: isNonMobile ? undefined : "span 4"} }}>
                        <TextField fullWidth variant="filled" type="text" lable="Campaign Name" onBlur={handleBlur} onChange={handleChange} value={values.campaignName} name="campaignName" error={!!touched.campaignName} />
                    </Box>
                </form>
            )}
        </Formik>
    </Box>
    )
}

export default CreateCampaign