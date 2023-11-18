import { useNavigate } from "react-router-dom";
import { Container, Fade, Stack } from "@mui/material";

import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyPanel from "../../components/myPanel";
import MyInput from "../../components/myInput";
import MyLoading from "../../components/myLoading";
import useUserRegisterState from "../../hooks/user/useUserRegisterState";


import Styles from "./style";

const Registration = () => {
    const navigate = useNavigate();

    const states = useUserRegisterState()

    const handlerLogin = () => {navigate('/login')}
    const handlerVoltar= () => {navigate('/')}

    let style = Styles()
    return (
        <Fade in={true} timeout={500}>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastro" />
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
                    <MyInput 
                        icon="password"
                        //error={errors.value.email}
                        type='password'
                        id='password2'
                        label='Repetir Senha'
                        required={true}
                        value={states.password2.value}
                        onChange={(e) => states.password2.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                    <MyButton onClick={handlerVoltar} text="Voltar" variant="outlined"/>
                    <MyButton onClick={handlerLogin} text="Já tenho usuário" variant="text"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Fade>
    )
}

export default Registration;

