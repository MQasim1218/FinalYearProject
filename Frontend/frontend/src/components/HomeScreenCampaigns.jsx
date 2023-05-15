import React, { useEffect, useState } from 'react'
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from "@mui/material";
import Header from '../components/Header';
import { tokens } from '../theme';
import { borderRadius, color } from '@mui/system';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
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
                    Campaign Target: ${"" + Number(required_amount).toFixed(2)}
                </Typography>
                <Typography sx={{ mb: "0.5rem", mt: "0.3rem" }} variant='h5' color={colors.primary[200]}>
                    Accumulated: ${"" + Number(donated_amount).toFixed(2)}
                </Typography>
                <Typography sx={{ mb: "0.5rem", mt: "0.3rem" }} variant='h5' color={colors.primary[200]}>
                    Completed:
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
                <LinearProgress
                    color="success"
                    sx={{ backgroundColor: colors.primary[900], color }}
                    variant="determinate"
                    {...props} />
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

    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    // Msg while data is Loading!!
    const [isLoadn, setIsLoadn] = useState(true)
    const [campaigns, setCampaigns] = useState([])
    const { user } = useAuthContext()


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
                console.log("HERE IS CAMPAIGN DATA:" + camps)
                setCampaigns(camps)
            })
        } else {
            console.log("No user is Logged in")
        }

        return (() => {
            console.log("Nothing for clean up")
            setIsLoadn(false)
        })

    }, [])

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
                            {campaigns.map((
                                {
                                    _id,
                                    campaign_title,
                                    required_amount,
                                    donated_amount,
                                    location,
                                    category,
                                    description,
                                    progress = donated_amount / required_amount * 100
                                }
                            ) => (
                                <Campaign
                                    id={_id}
                                    campaign_title={campaign_title}
                                    required_amount={required_amount}
                                    donated_amount={donated_amount}
                                    location={location}
                                    category={category}
                                    description={description}
                                    progress={progress} />
                            ))}
                        </Box>
                    </Box>)

                    :

                    (<Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{ "& > div": { gridColumn: undefined } }}>
                        {campaigns.map((
                            {
                                _id,
                                campaign_title,
                                required_amount,
                                donated_amount,
                                location,
                                category,
                                description,
                                progress = donated_amount / required_amount * 100
                            }
                        ) => (
                            <Campaign
                                id={_id}
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
        </Box>


    )
}

export default HomeScreenCampaigns