import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2c3032",
      paper: "#191b1c",
    },
  },
});

export default responsiveFontSizes(theme);
