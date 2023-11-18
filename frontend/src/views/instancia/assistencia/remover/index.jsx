import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaAssistenciaRemoverState from "../../../../hooks/instancia/assistencia/useInstanciaAssistenciaRemoverState";

import Styles from "./style";

const InstanciaAssistenciaRemover = () => {

    let { id } = useParams();    
    
    const states = useInstanciaAssistenciaRemoverState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    useEffect(() => {
        if (states.instancia.value !== null ){
            states.instancias.set()
        }
        
    }, [states.instancia.value]);

    useEffect(() => {
        if (states.instanciaInferior.value  > 0 ){
            states.assistentes.set()
        }
        
    }, [states.instanciaInferior.value]);

    

    let style = Styles()
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Remover Assistencia" />
                    <MySelect
                        id="Instancia"
                        label="Instancia"
                        options={states.instancias.value}
                        value={states.instanciaInferior.value}
                        onChange={(e)=>states.instanciaInferior.set(e.target.value)}
                    
                    />
                    <MySelect
                        id="assistencia"
                        label="assistencia"
                        options={states.assistentes.value}
                        value={states.assistente.value}
                        onChange={(e)=>states.assistente.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Remover" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaAssistenciaRemover;

