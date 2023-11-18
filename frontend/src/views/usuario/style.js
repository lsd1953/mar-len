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
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    area: { display: "grid", gridTemplateColumns: "1fr 1fr" },
    areaEsquerda: {maxWidth:'400px'},
    title: { ...h1Style},
    title2: { ...h2Style},
    title3: { ...h3Style},
    description:{color: theme.palette.primary.main},
    subtitle: {fontSize: "18pt", },
    text: {},
    image: { width: "300px" },
    siglaArea:{
      backgroundColor:theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      borderRadius: '50px',
      padding: '5px',
    },
    siglaText:{
      color: theme.palette.primary.contrastText,
      fontSize:'10pt',
      fontWeight: 'bold',
    },
  };
};

export default Styles;
