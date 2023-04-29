import React, { useEffect, useState } from 'react'
import {
    Box, Card, IconButton, CardActions, CardContent, Collapse, Button, Typography, ListItemText, FormGroup, Rating, useTheme, useMediaQuery, Slider,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    InputAdornment,
    RadioGroup,
    Radio,
} from "@mui/material";
import Header from '../../components/Header';
import { tokens } from '../../theme';
import { borderRadius, color } from '@mui/system';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import axios from 'axios';
import { useAuthContext } from "../../hooks/useAuthContext"
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

const locationsData = [
    'Islamabad',
    'Lahore',
    'Karachi',
    'Faisalabad',
    'Rawalpindi',
    'Multan',
    'Quetta',
];

const categoriesData = [
    'Food',
    'Education',
    'Natural Disaster',
    'Widow Support',
    'Housing',
];

const adminsData = [
    'Admin1',
    'Admin2',
    'Admin3',
    'Admin4',
];

const servicesData = ['Completed'];

//template for each campaign
const Campaign = ({
    id,
    campaign_title,
    required_amount,
    donated_amount,
    location,
    category,
    description,
    progress,
    isDashboard = false,

}) => {

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const navigate = useNavigate()

    //defining the see more button for each campaign
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <Card sx={{ backgroundImage: "none", backgroundColor: colors.primary[400], borderRadius: "0.55rem", }}>
            <CardContent>
            <Button onClick={() => navigate(`/campaigninfo/${id}`)}>
                <Typography variant='h3' color={colors.grey[100]} gutterBottom>
                    {campaign_title}
                </Typography>
                </Button>
                <Typography variant='h4' color={colors.blueAccent[400]}>
                    {category}
                </Typography>
                <Typography sx={{ mb: "0.5rem", mt: "0.3rem" }} variant='h5' color={colors.primary[200]}>
                    Campaign Target: ${""+Number(required_amount).toFixed(2)}
                </Typography>
                <Typography sx={{ mb: "0.5rem", mt: "0.3rem" }} variant='h5' color={colors.primary[200]}>
                Accumulated: ${""+Number(donated_amount).toFixed(2)}
                </Typography>
                <Typography sx={{ mb: "0.5rem", mt: "0.3rem" }} variant='h5' color={colors.primary[200]}>
                Completed: {""+Number(donated_amount/required_amount*100).toFixed(0)}%
                </Typography>
                
                <LinearProgressWithLabel value={progress} />


                {!isDashboard ? (<Collapse sx={{ justifyContent: "center", backgroundColor: colors.primary[500], borderRadius: "0.55rem", mt: "0.5rem" }} in={isExpanded} timeout="auto" unmountOnExit>
                    <CardContent >
                        <Typography variant='h5' color={colors.blueAccent[400]}>
                            Description:
                        </Typography>
                        <Typography variant='h5' color={colors.grey[100]}>
                            {description}
                        </Typography>
                        <Typography sx={{ mt: "0.8em" }} variant='h6' color={colors.blueAccent[400]}>
                            Location:
                        </Typography>
                        <Typography variant='h6' color={colors.grey[100]}>
                            {location}
                        </Typography>
                    </CardContent>
                </Collapse>) : undefined}

                {!isDashboard ? (<CardActions sx={{ justifyContent: "center" }}>
                    <Button variant='primary' size='small' onClick={() => setIsExpanded(!isExpanded)}>See more</Button>
                </CardActions>) : undefined}

            </CardContent>
        </Card>
    )
}

function LinearProgressWithLabel(props) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress
                    color="success"
                    sx={{ backgroundColor: colors.primary[900], color }}
                    variant="determinate"
                    {...props} /
                >
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const AllCampaigns = ({ isDashboard = false, title, subtitle }) => {


    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    //restrict for smaller screens
    const isNonMobile = useMediaQuery("(min-width: 1000px)")

    // Msg while data is Loading!!
    const [isLoadn, setIsLoadn] = useState(true)
    const [campaigns, setCampaigns] = useState([])
    const { user } = useAuthContext()

    const [isExpanded, setIsExpanded] = useState(false);
    const [budget, setBudget] = useState(0);
    const [categories, setCategories] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [locations, setLocations] = useState([]);
    const [search, setSearch] = useState('');
    const [services, setServices] = useState([]);
    const [startingBudget, setStartingBudget] = useState(0);
    const [endingBudget, setEndingBudget] = useState(10000);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };


    const handleCategoryChange = (event) => {
        setCategories(event.target.value);
    };

    const handleAdminChange = (event) => {
        setAdmins(event.target.value);
    };

    const handleLocationChange = (event) => {
        setLocations(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    };

    const handleBudgetChange = (event, newValue) => {
        setBudget(newValue);
        setStartingBudget(newValue[0]);
        setEndingBudget(newValue[1]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Searched For: ${search}`);
        console.log(`Locations: ${locations}`);
        console.log(`Categories: ${categories}`);
        console.log(`Status: ${services}`);
        console.log(`Selected Budget: ${budget}`);
        console.log(`Selected Start Date: ${selectedStartDate}`);
        console.log(`Selected End Date: ${selectedEndDate}`);
        console.log(`Selected Admins: ${admins}`);

    };

    const handleServiceChange = (event) => {
        setServices(event.target.value);
    };

    const handleSearched = (event) => {
        alert(`Searched: ${search}`)
    };

    // ############### USE Effect Hook #################
    useEffect(() => {

        console.log(user)
        // console.log("Re run use Effect")
        const fetchCampaigns = async () => {
            try {
                let gen_res = await axios.get(
                    "http://localhost:5000/gen_campaigns/",
                    {
                        headers: {
                            'Content-Type': 'application-json',
                            'Authorization': `Bearer ${user.token}`,
                        },

                    }
                )
                let spec_res = await axios.get(
                    "http://localhost:5000/spec_campaigns",
                    {
                        headers: {
                            'Content-Type': 'application-json',
                            'Authorization': `Bearer ${user.token}`,
                        },

                    }
                )

                if (gen_res.status < 300 && gen_res.status < 300) {
                    let data = gen_res.data.concat(spec_res.data)
                    // console.log(data)
                    if (data !== null) return data
                    else console.log("No data recieved!")
                }

            } catch (error) {
                console.log(error)
            }
        }
        // console.log("kdfiodno")

        if (user) {
            fetchCampaigns().then((data) => {
                setIsLoadn(false)
                let camps = data.map((camp, indx) => ({ ...camp, id: indx + 1 }))
                console.log("HERE IS CAMPAIGN DATA:"+camps)             
                setCampaigns(camps)
            })
        } else {
            console.log("No user is Logged in")
            alert("No user is logged in!!")
        }

        return (() => {
            console.log("Nothing for clean up")
            setIsLoadn(false)
        })

    }, [])


    return (
        <Box m="1.5rem 2.5rem" >
            <Header title={title} subtitle={subtitle} />
            <Box>
                {!isDashboard ? (
                    <Box m="1.5rem 2.5rem">
                        <Header title="ALL CAMPAIGNS" subtitle="See the list of all campaigns" />

                        <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <FormControl fullWidth variant='outlined' sx={{ mb: 2, mr: 2 }}>
                                <InputLabel id='category-input-label'>Category</InputLabel>
                                <Select
                                    id='category-input'
                                    label='Category'
                                    multiple
                                    value={categories}
                                    onChange={handleCategoryChange}
                                    renderValue={(selected) => selected.join(', ')}
                                    labelId='category-input-label'
                                >
                                    {categoriesData.map((category) => (
                                        <MenuItem key={category} value={category}>
                                            <Checkbox checked={categories.indexOf(category) > -1} />
                                            <ListItemText primary={category} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth variant='outlined' sx={{ mb: 2, mr: 2 }}>
                                <InputLabel id='search-input-label'>Search</InputLabel>
                                <OutlinedInput
                                    id='search-input'
                                    label='Search'
                                    value={search}
                                    onChange={handleSearchChange}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton edge='end' onClick={handleSearched}>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelId='search-input-label'
                                />
                            </FormControl>

                            <IconButton onClick={() => setIsExpanded(!isExpanded)} >
                                <TuneOutlinedIcon />
                            </IconButton>
                        </Box>
                        <Collapse in={isExpanded}>
                            <Box m={2} p={5} sx={{ border: '1px solid gray', borderRadius: '4px', backgroundColor: colors.primary[400] }}>
                                <Typography variant='h6' mb={2} color={colors.greenAccent[400]}>
                                    Filter Campaigns
                                </Typography>
                                <FormControl fullWidth variant='outlined' sx={{ mb: 2 }}>
                                    <InputLabel id='location-input-label'>Location</InputLabel>
                                    <Select
                                        id='location-input'
                                        label='Location'
                                        multiple
                                        value={locations}
                                        onChange={handleLocationChange}
                                        renderValue={(selected) => selected.join(', ')}
                                        labelId='location-input-label'
                                    >
                                        {locationsData.map((location) => (
                                            <MenuItem key={location} value={location}>
                                                <Checkbox checked={locations.indexOf(location) > -1} />
                                                <ListItemText primary={location} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <Typography variant='h6' mb={2} color={colors.greenAccent[400]}>
                                    Start Date
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={selectedStartDate} onChange={handleStartDateChange} />
                                </LocalizationProvider>
                                <Typography variant='h6' mb={2} mt={2} color={colors.greenAccent[400]}>
                                    End Date
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker value={selectedEndDate} onChange={handleEndDateChange} />
                                </LocalizationProvider>
                                <FormControl fullWidth>
                                    <Typography variant='h6' mb='2' mt={2} width='100%' color={colors.greenAccent[400]}>
                                        Donation Goal
                                    </Typography>

                                    <Slider
                                        value={budget}
                                        onChange={handleBudgetChange}
                                        valueLabelDisplay='auto'
                                        min={0}
                                        max={10000}
                                        step={100}
                                        aria-labelledby='range-slider'
                                        style={{ width: 'auto' }}
                                        marks={[
                                            { value: 0, label: '$0' },
                                            { value: 5000, label: '$5000' },
                                            { value: 10000, label: '$10,000' },
                                        ]}
                                    />
                                    <Typography variant='h6' mb={2} mt={2} width='100%' color={colors.greenAccent[400]}>
                                        Admin
                                    </Typography>
                                    <FormControl fullWidth variant='outlined'>
                                        <InputLabel id='admin-input-label'>Admin</InputLabel>
                                        <Select
                                            id='admin-input'
                                            label='Admin'
                                            multiple
                                            value={admins}
                                            onChange={handleAdminChange}
                                            renderValue={(selected) => selected.join(', ')}
                                            labelId='admin-input-label'
                                        >
                                            {adminsData.map((admin) => (
                                                <MenuItem key={admin} value={admin}>
                                                    <Checkbox checked={admins.indexOf(admin) > -1} />
                                                    <ListItemText primary={admin} />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </FormControl>
                                <Typography variant='h6' mt={2} color={colors.greenAccent[400]}>Status</Typography>
                                <FormGroup>
                                    {servicesData.map((service) => (
                                        <FormControlLabel
                                            key={service}
                                            control={
                                                <Checkbox
                                                    checked={services.indexOf(service) > -1}
                                                    onChange={handleServiceChange}
                                                    value={service}
                                                />
                                            }
                                            label={service}
                                        />
                                    ))}
                                </FormGroup>
                                <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                    <Button variant='contained' color='secondary' onClick={handleSubmit}>
                                        Apply Filters
                                    </Button>
                                </Box>
                            </Box>
                        </Collapse>
                        <Box mt="20px" display="grid"
                            gridTemplateColumns="repeat(4,minmax(0,1fr))"
                            justifyContent="space-between"
                            rowGap="20px"
                            columnGap="1.33%"
                            sx={{
                                "& > div": {
                                    gridColumn:
                                        isNonMobile ? undefined : "span 4"
                                }
                            }}
                        >
                            {
                                campaigns.map((
                                    {
                                        id,
                                        campaign_title,
                                        required_amount,
                                        donated_amount,
                                        location,
                                        category,
                                        description,
                                        progress
                                    }
                                ) => (
                                    <Campaign
                                        id={id}
                                        campaign_title={campaign_title}
                                        required_amount={required_amount}
                                        donated_amount={donated_amount}
                                        location={location}
                                        category={category}
                                        description={description}
                                        progress={progress} />
                                ))
                            }
                        </Box>
                    </Box>)

                    :

                    (<Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: undefined } }}>
                        {campaigns.map((
                            {
                                id,
                                campaign_title,
                                required_amount,
                                donated_amount,
                                location,
                                category,
                                description,
                                progress
                            }
                        ) => (
                            <Campaign
                                id={id}
                                campaign_title={campaign_title}
                                required_amount={required_amount}
                                donated_amount={donated_amount}
                                location={location}
                                category={category}
                                description={description}
                                progress={progress}
                                isDashboard={true}
                            />
                        ))}
                    </Box>)}
            </Box>
        </Box >


    )
}

export default AllCampaigns