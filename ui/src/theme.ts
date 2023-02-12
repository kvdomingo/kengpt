import { createTheme, responsiveFontSizes } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#2c3032",
      paper: "#191b1c",
    },
  },
  typography: {
    fontFamily: [
      "ui-sans-serif",
      "system-ui",
      "-apple-system",
      "Segoe UI Variable Display",
      "Segoe UI",
      "Roboto",
      "Ubuntu",
      "Cantarell",
      "Noto Sans",
      "sans-serif",
      "Helvetica Neue",
    ].join(", "),
  },
});

export default responsiveFontSizes(theme);
