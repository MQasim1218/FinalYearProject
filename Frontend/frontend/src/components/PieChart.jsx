import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useAllDonorsDonationsQuery } from "../app/redux-features/donations/DonorDonations/DonorDonsSlice";



const PieChart = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { data: donorDons, isError: isDonorDonsErr, isLoading: isDonorDonsLoading, isSuccess: isDonorDonsSuccess, error: donorDonsErr } = useAllDonorsDonationsQuery()

  console.log("Donations by all donors: ", donorDons)

  const donationCounts = donorDons?.reduce((acc, cur) => {
    // Check if the category exists in the accumulator object
    if (acc.hasOwnProperty(cur.catagory)) {
      // If it does, increment the count for that catagory
      acc[cur.catagory]++;
    } else {
      // If it doesn't, initialize the count for that catagory to 1
      acc[cur.catagory] = 1;
    }
    return acc;
  }, {});

  let mockPieData = []

  if (donorDons) {

    let MealCount = donationCounts.Meal
    let EducationCount = donationCounts.Education
    let NaturalDisasterCount = donationCounts.NaturalDisaster
    let MedicalCount = donationCounts.Medical

    mockPieData = [
      {
        id: "Education",
        label: "Education",
        value: EducationCount,
        color: "hsl(104, 70%, 50%)",
      },
      {
        id: "Meals",
        label: "Meals",
        value: MealCount,
        color: "hsl(229, 70%, 50%)",
      },
      {
        id: "NaturalDisaster",
        label: "NaturalDisaster",
        value: NaturalDisasterCount,
        color: "hsl(291, 70%, 50%)",
      },
      {
        id: "Medical",
        label: "Medical",
        value: MedicalCount,
        color: "hsl(162, 70%, 50%)",
      },
    ];
  
  }


  return (
    <ResponsivePie
      data={mockPieData}
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
            color: "black",
          }
        }
      }}
      colors={{ scheme: 'nivo' }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.grey[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      enableArcLabels={false}
      arcLabelsRadiusOffset={0.4}
      arcLabelsSkipAngle={7}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      // legends={[
      //   {
      //     anchor: "bottom",
      //     direction: "row",
      //     justify: false,
      //     translateX: 0,
      //     translateY: 56,
      //     itemsSpacing: 0,
      //     itemWidth: 100,
      //     itemHeight: 18,
      //     itemTextColor: "#999",
      //     itemDirection: "left-to-right",
      //     itemOpacity: 1,
      //     symbolSize: 18,
      //     symbolShape: "circle",
      //     effects: [
      //       {
      //         on: "hover",
      //         style: {
      //           itemTextColor: colors.blueAccent[500],
      //         },
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};

export default PieChart;