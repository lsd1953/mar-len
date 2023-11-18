import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";


import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyInput from "../../../../components/myInput";
import MyButton from "../../../../components/myButton";
import useInstanciaMilitanteVincularState from "../../../../hooks/instancia/militante/useInstanciaMilitanteVincularState";

import Styles from "./style";

const InstanciaMilitanteVincular = () => {

    let { id } = useParams();    
    
    const states = useInstanciaMilitanteVincularState()

    
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
                    <MyLabel sx={style.title} component="h1" text="Vincular Militante" />
                    <MyInput
                        type='text'
                        id='nome'
                        label='Código do Militante'
                        required={true}
                        value={states.militante.value}
                        onChange={(e) => states.militante.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default InstanciaMilitanteVincular;

