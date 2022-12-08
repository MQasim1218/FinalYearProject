import React, { useState } from 'react'
import {Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery} from "@mui/material";
import Header from '../../components/Header';

const AllCampaigns = () => {

    const {data, setData} = useState({id:0, campaign_title:"test1",required_amount:"123",location:"Islamabad",category:"Meal",description:"Test 123"})


  return (
    <Box>
        <Header title="ALL CAMPAIGNS" subtitle="See the list of all campaigns"/>
    </Box>
  )
}

export default AllCampaigns