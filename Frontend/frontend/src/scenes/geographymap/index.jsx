
import { Box } from "@mui/material";
import Header from "../../components/Header";
import Geography from "../../components/Geography";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const GeographyMap = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box m="20px">
      <Header title="GEOGRAPHY MAP" subtitle="A Geographical Map With Values" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <Geography />
      </Box>
    </Box>
  );
};

export default GeographyMap;