import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import Header from '../components/Header';
import { tokens } from '../theme';
import { borderRadius, color } from '@mui/system';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';

// ! Template for Single campaign
const Campaign = ({
    id,
    campaign_title,
    required_amount,
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
        <Card sx={{ backgroundImage: "none", backgroundColor: colors.primary[400], borderRadius: "0.55rem" }}>
            <CardContent>
                <Button onClick={() => navigate(`/campaigninfo/${id}`)}>
                <Typography variant='h4' color={colors.grey[100]} gutterBottom>
                    {campaign_title}
                </Typography>
                </Button>
                <Typography variant='h4' color={colors.blueAccent[400]}>
                    {category}
                </Typography>
                <Typography sx={{ mb: "0.5rem", mt: "0.3rem" }} variant='h5' color={colors.primary[200]}>
                    ${Number(required_amount).toFixed(2)}
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

// ! Bar showing the progress
function LinearProgressWithLabel(props) {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress color="success" sx={{ backgroundColor: colors.primary[900], color }} variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}


const HomeScreenCampaigns = ({ isDashboard = false, title, subtitle, data }) => {

    // dummy data
    // REVIEW: Replace this Dummy data with data for an Admins Campaigns
    data = [
        { id: 0, campaign_title: "Charity Drive for Salab Zadqan", required_amount: "1000", location: "Hyderabad", category: "Natural Disaster", description: "Donate", progress: 30 },
        { id: 1, campaign_title: "Test 2", required_amount: "5000", location: "Islamabad", category: "Meal", description: "Test 123", progress: 0 },
        { id: 2, campaign_title: "Test 3", required_amount: "10000", location: "Lahore", category: "Education", description: "Test 123", progress: 0 },
        { id: 3, campaign_title: "Test 4", required_amount: "1200", location: "Faislabad", category: "Meal", description: "Test 123", progress: 0 }
    ]
    //restrict for smaller screens

    const isNonMobile = useMediaQuery("(min-width: 1000px)")


    return (
        <Box m="1.5rem 2.5rem" >
            {/* <Header title={title} subtitle={subtitle} /> */}
            {/* <Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))"
                justifyContent="space-between" rowGap="20px" columnGap="1.33%"
                sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
            >
                {data.map((
                    {
                        id,
                        campaign_title,
                        required_amount,
                        location,
                        category,
                        description,
                        progress
                    }
                ) => (
                    <Campaign
                        key={id}
                        id={id}
                        campaign_title={campaign_title}
                        required_amount={required_amount}
                        location={location}
                        category={category}
                        description={description}
                        progress={progress} />
                ))}
            </Box> */}

            <Box>
                {!isDashboard ? (
                    <Box m="1.5rem 2.5rem">
                        <Header title={title} subtitle={subtitle} />
                        <Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}>
                            {data.map((
                                {
                                    id,
                                    campaign_title,
                                    required_amount,
                                    location,
                                    category,
                                    description,
                                    progress
                                }
                            ) => (
                                <Campaign
                                    key={id}
                                    id={id}
                                    campaign_title={campaign_title}
                                    required_amount={required_amount}
                                    location={location}
                                    category={category}
                                    description={description}
                                    progress={progress} />
                            ))}
                        </Box>
                    </Box>)

                    :

                    (<Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: undefined } }}>
                        {data.map((
                            {
                                id,
                                campaign_title,
                                required_amount,
                                location,
                                category,
                                description,
                                progress
                            }
                        ) => (
                            <Campaign
                                key={id}
                                id={id}
                                campaign_title={campaign_title}
                                required_amount={required_amount}
                                location={location}
                                category={category}
                                description={description}
                                progress={progress}
                                isDashboard={true}
                            />
                        ))}
                    </Box>)}
            </Box>
        </Box>


    )
}

export default HomeScreenCampaigns