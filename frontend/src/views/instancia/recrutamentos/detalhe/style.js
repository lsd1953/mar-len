import { useTheme } from "@mui/material/styles";
import H1Style from "../../../../assets/themes/h1Style";
import H2Style from "../../../../assets/themes/h2Style";



const Styles = () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)
  const h2Style = H2Style(theme)

  
  return {
    
    title: { ...h1Style},
    title2: { ...h2Style},
    title3: {     
      fontSize: "12pt",
      fontWeight: 'bold',
    },
    subtitle: {fontSize: "18pt", },
    text: {},
    image: { maxWidth: "600px" },
  };
};

export default Styles;
