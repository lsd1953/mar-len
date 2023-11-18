import { useNavigate } from "react-router-dom";
import { Box, Container, Fade, Stack } from "@mui/material";

import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyImage from "../../components/myImage";
import backgroundPNG from '../../assets/imgs/marxis-leninis.png'
import logoPNG from '../../assets/imgs/logo.png'

import Styles from "./style";

const Index = () => {
    const navigate = useNavigate();

    const handlerLogin = () => {navigate('/login')}
    const handlerCadastro= () => {navigate('/registration')}

    let style = Styles()
    return (
        <Fade in={true} timeout={500}>
            <Container sx={style.container}>
                <Box sx={style.area}>
                    <Stack spacing={2} sx={style.areaEsquerda}>
                        <Box sx={style.areaTitle}>
                            <MyImage src={logoPNG} sx={style.logo} alt='marxismo-leninismo'/>
                            <MyLabel sx={style.title} component="h1" text="Mar-Len" />
                        </Box>
                        <MyLabel sx={style.subtitle} component="h2" text="Marxismo-Leninismo" />
                        <MyLabel sx={style.text} component="p" text="Uma forma simples de gerenciar a sua organização" />
                        <MyButton onClick={handlerLogin} text="Login" variant="contained"/>
                        <MyButton onClick={handlerCadastro} text="Cadastro" variant="outlined"/>
                    </Stack>
                    <Box sx={style.areaDireita}>
                        <MyImage src={backgroundPNG} sx={style.image} alt='marxismo-leninismo'/>
                    </Box>
                </Box>
            </Container>
        </Fade>
    )
}

export default Index;
