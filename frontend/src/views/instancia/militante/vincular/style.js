import { useTheme } from "@mui/material/styles";
import H1Style from "../../../../assets/themes/h1Style";





const Styles = () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)

  
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
    subtitle: {fontSize: "18pt", },
    text: {},
    image: { maxWidth: "600px" },
  };
};

export default Styles;
