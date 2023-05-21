import { ResponsiveLine } from "@nivo/line";
import { useTheme, Box } from "@mui/material";
import { tokens } from "../theme";
import { useAllDonorsDonationsQuery } from "../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import { useState } from 'react';

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [chartData, setChartData] = useState(null);
  const [categoryCheck, setCategoryCheck] = useState(null);

  const { data: donorDons, isError: isDonorDonsErr, isLoading: isDonorDonsLoading, isSuccess: isDonorDonsSuccess, error: donorDonsErr } = useAllDonorsDonationsQuery()


  // Array of months
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Initialize an empty object to store the line chart data
  const lineChartData = {};

  const currentYear = new Date().getFullYear();

  // Iterate over the donorDons array
  donorDons?.forEach((don) => {
    const { catagory, amount, amountDonated, createdAt } = don;
    const month = new Date(createdAt).getMonth(); // Get the month index (0-11)
    const monthName = months[month]; // Get the month name
    const donationYear = new Date(createdAt).getFullYear();

    if (donationYear === currentYear) { // If the donation was made in a different year, skip it

      // If the catagory doesn't exist in lineChartData, create an empty array for it
      if (!lineChartData[catagory]) {
        lineChartData[catagory] = [];
        // Populate the array with objects for each month, starting with 0 values
        months.forEach((month) => {
          lineChartData[catagory].push({ x: month, y: 0 });
        });
      }

      // Update the corresponding month's value in the lineChartData array
      lineChartData[catagory][month].y += amount + amountDonated;
    }
  });

  // Transform the lineChartData object into an array of objects
  const mockLineData = Object.entries(lineChartData).map(([id, data]) => ({
    id,
    data,
  }));


  const handleClick = (data) => {

    if (categoryCheck === data.id) {
      setChartData(mockLineData);
      setCategoryCheck(null);
      return;
    }
    else {
      const category = data.id;
      setCategoryCheck(data.id);
      const filteredData = mockLineData?.filter((data) => data.id === category);
      setChartData(filteredData);
    }
  }


  return (
  
      <ResponsiveLine
        data={chartData === null ? mockLineData : chartData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
          tooltip: {
            container: {
              color: colors.primary[500],
            },
          },
        }}
        colors={{ scheme: "nivo" }}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false
        }}
        yFormat=" >-.2f"
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : 'Months',
          legendOffset: 36,
          legendPosition: 'middle'
        }}
        axisLeft={{
          orient: 'left',
          tickValues: 10,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : 'Amount Of Donations',
          legendOffset: -50,
          legendPosition: 'middle'
        }}
        enableGridX={false}
        enableGridY={false}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: 'left-to-right',
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: 'circle',
            symbolBorderColor: 'rgba(0, 0, 0, .5)',
            onClick: handleClick,
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
      />

  );
};

export default LineChart;