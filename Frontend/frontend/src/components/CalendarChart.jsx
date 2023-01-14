import { useTheme } from "@mui/material";
import { ResponsiveCalendar } from "@nivo/calendar"
import { tokens } from "../theme";
import { activityData as data } from "../data/mockData";

const CalendarChart = ({ isDashboard = false, data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveCalendar
      data={data}
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
      from="2021-01-01"
      to="2021-12-30"
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