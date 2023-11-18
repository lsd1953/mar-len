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
    title2: { ...h2Style},
    title3: { ...h3Style},
    siglaArea:{
      backgroundColor:theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      borderRadius: '50px',
      padding: '5px',
    },
    areaInstancias:{
      display:'grid', 
      gridTemplateColumns: '1fr', 
      gap:'10px',

      '@media (min-width: 600px)': {
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap:'10px',
      }
    },
    siglaText:{
      color: theme.palette.primary.contrastText,
      fontSize:'10pt',
      fontWeight: 'bold',
    },
    image:{
      width: '200px'
    }
  };
};

export default Styles;
