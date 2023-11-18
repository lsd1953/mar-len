import { useTheme } from "@mui/material/styles";
import H1Style from "../../assets/themes/h1Style";

const Styles = () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)

  
  return {
    title: { ...h1Style},
    areaButton: {
      display: "grid", gridTemplateColumns: "1fr 1fr 1fr" , gap:'5px', marginBottom:'20px'
    },
  };
};

export default Styles;
