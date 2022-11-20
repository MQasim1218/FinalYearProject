
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";

const Graphs = () => {
  return (
    <Box m="20px">
      <Header title="GRAPHS" subtitle="View All Graphs and Charts" />
      <Header heading="Bar Graph for City Wise Donation Categorization:" />
      <Box height="75vh">
        <BarChart />
      </Box>
      <Header heading="Pie Chart for Total Donations in each Category:" />
      <Box height="75vh">
        <PieChart />
      </Box>
      <Header heading="Line Chart for Monthly Donations in each Category:" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Graphs;