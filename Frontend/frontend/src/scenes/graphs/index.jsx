
import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";

const Graphs = () => {
  return (
    <Box m="20px">
      <Header title="GRAPHS" subtitle="View All Graphs and Charts" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default Graphs;