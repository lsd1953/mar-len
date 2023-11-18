import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaSecretariasRemoverState from "../../../../hooks/instancia/secretarias/useInstanciaSecretariasRemoverState";

import Styles from "./style";

const InstanciaSecretariasRemover = () => {

    let { id } = useParams();    
    
    const states = useInstanciaSecretariasRemoverState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    useEffect(() => {
        if (states.instancia.value !== null ){
            states.secretarios.set()
        }
        
    }, [states.instancia.value]);

    let style = Styles()
    
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Remover Secretário" />
                    <MySelect
                        id="secretario"
                        label="Secretario"
                        options={states.secretarios.value}
                        value={states.secretario.value}
                        onChange={(e)=>states.secretario.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Remover" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaSecretariasRemover;

