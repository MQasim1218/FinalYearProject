import { Box } from "@mui/material";
import Header from "../../components/Header";
import Geography from "../../components/Geography";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const GeographyMapDonor = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box m="20px">
      <Header title="GEOGRAPHY MAP" subtitle="A Geographical Map Showcasing Donations Recieved From Around the World" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <Geography />
      </Box>
    </Box>
  );
}

export default GeographyMapDonor