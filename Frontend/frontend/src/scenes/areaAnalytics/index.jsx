import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const AreaAnalytics = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box m="20px" height="auto">
      <Header title="AREA ANALYTICS" subtitle="View Graphical Donation Distribution" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <BarChart />
      </Box>
    </Box>
  )
}

export default AreaAnalytics