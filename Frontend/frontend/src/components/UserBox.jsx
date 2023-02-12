import React from 'react'
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const UserBox = ({ name, accounttype, picture, participated, latestdonation, joindate }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box mb="0.5rem">
          {picture}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {name}
          </Typography>
          <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
            {accounttype}
          </Typography>

        </Box>
        <Box display="flex" justifyContent="space-between" mt="2.1rem">
          {/* <Typography variant='h5' sx={{ color: colors.grey[100] }}>Campaigns Participated: {participated}</Typography> */}
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography
          variant="h5"
          sx={{ color: colors.greenAccent[600] }}
        >
          Date Joined: {joindate}
        </Typography>
        <Typography
          variant="h6"
          fontStyle="italic"
          sx={{ color: colors.grey[400] }}
        >
          Last Donation: {latestdonation}
        </Typography>
      </Box>


    </Box>
  );
}

export default UserBox