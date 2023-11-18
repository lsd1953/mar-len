import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaSecretariasCadastrarState from "../../../../hooks/instancia/secretarias/useInstanciaSecretariasCadastrarState";

import Styles from "./style";

const InstanciaSecretariasCadastrar = () => {

    let { id } = useParams();    
    
    const states = useInstanciaSecretariasCadastrarState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    useEffect(() => {
        if (states.instancia.value !== null ){
            states.militantes.set()
            states.funcoes.set()
        }
        
    }, [states.instancia.value]);

    let style = Styles()
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Secretário" />
                    <MySelect
                        id="funcao"
                        label="Funcao"
                        options={states.funcoes.value}
                        value={states.funcao.value}
                        onChange={(e)=>states.funcao.set(e.target.value)}
                    />
                    <MySelect
                        id="militante"
                        label="Militante"
                        options={states.militantes.value}
                        value={states.militante.value}
                        onChange={(e)=>states.militante.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaSecretariasCadastrar;

