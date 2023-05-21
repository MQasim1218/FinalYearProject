import { useTheme } from "@mui/material";
import { ResponsiveCalendar } from "@nivo/calendar"
import { tokens } from "../theme";
import { useAllDonorsDonationsQuery } from "../app/redux-features/donations/DonorDonations/DonorDonsSlice";
import { useState } from 'react';
import { useAllAdminsDonationsQuery } from "../app/redux-features/donations/AdminDonations/AdminDonsSlice";

const CalendarChart = ({ isDashboard = false , isAdmin = false}) => {

  let queryResult = null;

  if (!isAdmin) {
    queryResult = useAllDonorsDonationsQuery();
  } else {
    queryResult = useAllAdminsDonationsQuery();
  }

  const { data: donorDons } = queryResult;

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const currentYear = new Date().getFullYear();

  // Set the date to the last day of the current year
  const lastDayOfYear = new Date(currentYear, 12, 0);

  // Get the last month of the current year (zero-based index)
  const lastMonthOfYear = lastDayOfYear.getMonth() + 1;

  // Get the number of days in the last month of the current year
  const lastMonthDays = lastDayOfYear.getDate();

  // Format the result in the desired format
  const formattedDate = `${currentYear}-${lastMonthOfYear.toString().padStart(2, '0')}-${lastMonthDays.toString().padStart(2, '0')}`;


  const counts = {};

  // Iterate over the donorDons array
  donorDons?.forEach(don => {
    // Extract the date from the createdAt property
    const date = don.createdAt.split('T')[0];

    console.log("Date: "+date)

    // If the date already exists in the counts object, increment its value by 1
    if (counts[date]) {
      counts[date]++;
    } else {
      // Otherwise, initialize the count to 1
      counts[date] = 1;
    }
  });

  // Convert the counts object to an array of objects in the desired format
  const activityData = Object.entries(counts).map(([day, value]) => ({ day, value }));


  return (
    <ResponsiveCalendar
      data={activityData}
      theme={{
        textColor: colors.grey[100],
        fontSize: "18",
        // added
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
        grid: {
          line: {
            stroke: colors.grey[100],
            strokeWidth: 1,
          }
        },
        annotations: {
          text: {
            fill: colors.grey[100],
          }

        },
        tooltip: {
          container: {
            color: "black",
          }
        }

      }}
      keys={[
        'Education',
        'Meals',
        'NaturalDisaster',
        'Medical'
      ]}
      from={`${currentYear}-01-01`}
      to={formattedDate}
      emptyColor={colors.primary[500]}
      colors={[colors.greenAccent[500]]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor={colors.primary[400]}
      dayBorderWidth={2}
      dayBorderColor={colors.primary[400]}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'row',
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: 'right-to-left'
        }
      ]}
    />
  );
};

export default CalendarChart;