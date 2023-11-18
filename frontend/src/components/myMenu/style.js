import { useTheme } from "@mui/material/styles";
import H1Style from "../../assets/themes/h1Style";


const Styles = () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)

  
  return {
    drawer: {
      width:'300px', 
      backgroundColor:theme.palette.primary.light,
      color: theme.palette.primary.contrastText,
      justifyCOntent:'center'
    },
    icon: {color:'#FFF'},
  };
};

export default Styles;
