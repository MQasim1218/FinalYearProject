import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../theme";

const ProgressCircle = ({ progress = "0", size = "35", beneficiary = 0 }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const angle = progress * 360;
  let percentage = Math.round(progress * 100);
  if (percentage > 100) {
    percentage = 100;
  }
  return (
    <Box
      sx={{
        background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, ${colors.greenAccent[500]} ${angle}deg 360deg),
            ${colors.blueAccent[500]}`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <Box mt="40%" ml="15%">
      <Typography variant="h6" color={colors.greenAccent[500]}>{percentage} {beneficiary === 0 ? "% Allocated" : "% Recieved"}</Typography>
      </Box>
      </Box>
  );
};

export default ProgressCircle;