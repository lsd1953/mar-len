import { useTheme } from "@mui/material/styles";
import H1Style from "../../assets/themes/h1Style";


const Styles = () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)

  
  return {
    area: { 
      marginTop:'80px'
    },
  }
};

export default Styles;
