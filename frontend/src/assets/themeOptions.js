import { createTheme } from "@mui/material/styles";

export const themeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#930909",
    },
    secondary: {
      main: "#e7bd00",
    },
    background: {
      default: '#f2f2f2',
    },
  },
  typography: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
  },
});
