import Box from '@mui/material/Box';

import Styles from "./style";
import { Container, Fade } from '@mui/material';
import { useState } from 'react';
import MyHeader from '../myHeader';
import MyMenu from '../myMenu';

const drawerWidth = 240;

const Application = ({children}) => {

    const [open, setOpen] = useState(false);

    let style = Styles()

    
    return (
        <Fade in={true} timeout={500}>
            <Container >
                <MyHeader handleDrawerOpen={()=>setOpen(true)} open={open} />
                <MyMenu open={open} drawerWidth={drawerWidth} handleDrawerClose={()=>setOpen(false)}   />
                <Box variant='main' sx={style.area}>
                    {children}
                </Box>
            </Container>
        </Fade>
    )
};

export default Application;