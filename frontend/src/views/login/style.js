import { useTheme } from '@mui/material/styles';
import H1Style from '../../assets/themes/h1Style';
import backgroundJPG from '../../assets/imgs/background01.jpg'

const Styles= () => {
  const theme = useTheme();
  const h1Style = H1Style(theme)

  return {
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundImage:`url(${backgroundJPG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    },
    title: { ...h1Style},
  }
}

export default Styles;