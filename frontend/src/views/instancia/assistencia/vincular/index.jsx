import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaAssistenciaVincularState from "../../../../hooks/instancia/assistencia/useInstanciaAssistenciaVincularState";

import Styles from "./style";

const InstanciaAssistenciaVincular = () => {

    let { id } = useParams();    
    
    const states = useInstanciaAssistenciaVincularState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    useEffect(() => {
        if (states.instancia.value){
            states.militantes.set(id)
            if (states.instancia.value.tipo !== 3 || states.instancia.value.tipo !== 1){
                states.instancias.set(id, states.instancia.value.organizacao_id)
            }
        }
    }, [states.instancia.value]);

    let style = Styles()
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Vincular Assistencia" />
                    <MySelect
                        id="Instancia"
                        label="Instancia"
                        options={states.instancias.value}
                        value={states.instanciaInferior.value}
                        onChange={(e)=>states.instanciaInferior.set(e.target.value)}
                    
                    />
                    <MySelect
                        id="assistente"
                        label="Assistente"
                        options={states.militantes.value}
                        value={states.assistente.value}
                        onChange={(e)=>states.assistente.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaAssistenciaVincular;

