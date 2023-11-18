import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyInput from "../../../../components/myInput";
import MyButton from "../../../../components/myButton";
import useInstanciaMilitanteCadastrarState from "../../../../hooks/instancia/militante/useInstanciaMilitanteCadastrarState";

import Styles from "./style";

const InstanciaMilitanteCadastrar = () => {

    let { id } = useParams();    
    
    const states = useInstanciaMilitanteCadastrarState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, [id]);

    let style = Styles()
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Militante" />
                    <MyInput
                        type='text'
                        id='apelido'
                        label='Apelido'
                        required={true}
                        value={states.apelido.value}
                        onChange={(e) => states.apelido.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaMilitanteCadastrar;

