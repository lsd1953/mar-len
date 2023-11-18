import { useTheme } from "@mui/material/styles";
import H1Style from "../../assets/themes/h1Style";
import H2Style from "../../assets/themes/h2Style";
import H3Style from "../../assets/themes/h3Style";


const Styles = () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)
  const h2Style = H2Style(theme)
  const h3Style = H3Style(theme)

  
  return {
    title: { ...h1Style},
    title2: { ...h2Style},
    siglaArea:{
      backgroundColor:theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      borderRadius: '50px',
      padding: '5px',
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    siglaText:{
      color: theme.palette.primary.contrastText,
      fontSize:'10pt',
      fontWeight: 'bold',
    },
    areaInstancias:{
      display:'grid', 
      gridTemplateColumns: '1fr', 
      gap:'10px',

    },
  };
};

export default Styles;
