import { useTheme } from "@mui/material/styles";


const Styles = () => {
  const theme = useTheme();

  
  return {
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
