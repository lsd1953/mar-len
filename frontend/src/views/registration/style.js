import { useTheme } from '@mui/material/styles';
import H1Style from '../../assets/themes/h1Style';

import backgroundPNG from '../../assets/imgs/background02.png'

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
      backgroundImage:`url(${backgroundPNG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
    title: { ...h1Style},
  }
}

export default Styles;