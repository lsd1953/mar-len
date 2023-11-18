import { useNavigate } from "react-router-dom";
import { Container, Fade, Stack } from "@mui/material";

import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyPanel from "../../components/myPanel";
import MyInput from "../../components/myInput";
import MyLoading from "../../components/myLoading";
import useUserLoginState from "../../hooks/user/useUserLoginState";

import Styles from "./style";

const Login = () => {
    const navigate = useNavigate();

    const states = useUserLoginState()

    const handlerRegister = () => {navigate('/registration')}
    const handlerVoltar= () => {navigate('/')}

    let style = Styles()
    return (
        <Fade in={true} timeout={500}>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Login" />
                    <MyInput 
                        icon="email"
                        type='email'
                        id='email'
                        label='E-mail'
                        required={true}
                        value={states.email.value}
                        onChange={(e) => states.email.set(e.target.value)}
                    />
                    <MyInput 
                        icon="password"
                        //error={errors.value.email}
                        type='password'
                        id='password'
                        label='Senha'
                        required={true}
                        value={states.password.value}
                        onChange={(e) => states.password.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Acessar" variant="contained"/>
                    <MyButton onClick={handlerVoltar} text="Voltar" variant="outlined"/>
                    <MyButton onClick={handlerRegister} text="Não tenho usuário" variant="text"/>
                </Stack>
                </MyPanel>
            </Container>
        </Fade>
    )
}

export default Login;
