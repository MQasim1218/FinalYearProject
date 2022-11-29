
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";

const Graphs = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  return (
    <Box m="20px" height="auto">
      <Header title="GRAPHS" subtitle="View All Graphs and Charts" />
      <Header heading="Bar Graph for City Wise Donation Categorization:" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <BarChart />
      </Box>
      <Box margin="50px"></Box>
      <Header heading="Pie Chart for Total Donations in each Category:" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <PieChart />
      </Box>
      <Box margin="50px"></Box>
      <Header heading="Line Chart for Monthly Donations in each Category:" />
      <Box height="75vh" border={`1px solid ${colors.grey[100]}`} borderRadius="4px">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Graphs;