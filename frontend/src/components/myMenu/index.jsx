import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CoPresentIcon from '@mui/icons-material/CoPresent';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import Person3Icon from '@mui/icons-material/Person3';
import PaymentsIcon from '@mui/icons-material/Payments';

import { AuthContext } from "../../contexts/auth";
import MyLabel from "../myLabel";

import Styles from "./style";

const Item = ({item, navigate, style}) =>{
  return (
    <ListItem  disablePadding>
    <ListItemButton onClick={()=>navigate(item.url)}>
        <ListItemIcon sx={style.icon}>
            {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.text} />
    </ListItemButton>
    </ListItem>
)
}

const MyMenu = ({ open, handleDrawerClose }) => {
    let style = Styles()
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    let menu = [
      { icon: <DashboardIcon />,text: 'Dashboard', url: "/dashboard"},
      { icon: <Person3Icon />,text: 'Meus Dados', url: "/usuario"},
      { icon: <PaymentsIcon />,text: 'Contribuições', url: "/contribuicoes"},
  ]
    
    let menuAdm = [
        { icon: <GroupsIcon />,text: 'Criar Instância', url: "/administracao/instancia/cadastrar"},
        { icon: <CoPresentIcon />,text: 'Vincular Militante', url: "/administracao/instancia/vincular"},
        { icon: <WorkIcon />,text: 'Criar Função', url: "/administracao/funcao/cadastrar"},
        { icon: <AssignmentIndIcon />,text: 'Definir Função', url: "/administracao/funcao/vincular"},
    ]
    
    
  return (
    <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
            sx: style.drawer}}
      >
        <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
        }}>
          <IconButton onClick={handleDrawerClose} sx={style.icon}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
        <Divider />
        <List>
            <ListItem disablePadding sx={{marginLeft:'15px'}}>
                <MyLabel text={user.value.email} sx={{fontSize: "14pt", fontWeight: 600,}}/>
            </ListItem>
            <Divider />
            {menu.map((item, key) => <Item key={key} item={item} navigate={navigate} style={style} />)}
        </List>
        <Divider />
        {
            user.value.administrador ? 
            <>
                <List>
                    <ListItem disablePadding sx={{marginLeft:'15px'}}>
                        <MyLabel text={'Administração'} sx={{fontSize: "14pt", fontWeight: 600,}}/>
                    </ListItem>
                    {menuAdm.map((item, key) => <Item key={key} item={item} navigate={navigate} style={style} />)}
                </List>
                <Divider />
            </>

            : null
        }
        <List>
            <ListItem disablePadding>
              <ListItemButton onClick={()=>{signOut();navigate("/")}}>
                <ListItemIcon sx={style.icon}>
                   <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Sair'} />
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
  );
};

export default MyMenu;
