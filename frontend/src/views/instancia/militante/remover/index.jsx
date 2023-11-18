import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaMilitanteRemoverState from "../../../../hooks/instancia/militante/useInstanciaMilitanteRemoverState";

import Styles from "./style";

const InstanciaMilitanteRemover = () => {

    let { id } = useParams();    
    
    const states = useInstanciaMilitanteRemoverState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, [id]);

    useEffect(() => {
        if (states.instancia.value > 0 ){
            states.militantes.set()
        }
        
    }, [states.instancia.value]);

    let style = Styles()
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Remover Militante" />
                    <MySelect
                        id="militante"
                        label="Militante"
                        options={states.militantes.value}
                        value={states.militante.value}
                        onChange={(e)=>states.militante.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Remover" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaMilitanteRemover;

