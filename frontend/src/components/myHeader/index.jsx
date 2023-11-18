import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MyButton from "../myButton";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

const MyHeader = ({ open, handleDrawerOpen }) => {

    const { user } = useContext(AuthContext);

    const handlerCopia = () => {

        copy(user.value.militante_codigo);
        toast.success('Código copiado');

    }

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Mar-Len
        </Typography>
        <MyButton />
        {
            user.value.militante_codigo !== '' ?
            <MyButton color="inherit" onClick={handlerCopia} text="Código do Militante" />
            : null
        }
      </Toolbar>
    </AppBar>
  );
};

export default MyHeader;
