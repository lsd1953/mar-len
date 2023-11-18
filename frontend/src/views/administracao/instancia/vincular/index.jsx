import { useEffect } from "react";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyInput from "../../../../components/myInput";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useAdministracaoInstanciaVincularState from "../../../../hooks/administracao/instancia/useAdministracaoInstanciaVincularState";

import Styles from "./style";

const AdministracaoInstanciaVincular = () => {

    const states = useAdministracaoInstanciaVincularState()

    useEffect(() => {
        states.organizacoes.set()
        
    }, []);

    useEffect(() => {
        if (states.organizacao.value > 0 ){
            states.instancias.set()
        }
        
    }, [states.organizacao.value]);

    let style = Styles()
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Vincular Militante" />
                    <MySelect
                        id="organizacao"
                        label="Organização"
                        options={states.organizacoes.value}
                        value={states.organizacao.value}
                        onChange={(e)=>states.organizacao.set(e.target.value)}
                    
                    />
                    <MySelect
                        id="Instancia"
                        label="Instancia"
                        options={states.instancias.value}
                        value={states.instancia.value}
                        onChange={(e)=>states.instancia.set(e.target.value)}
                    
                    />
                    <MyInput
                        type='text'
                        id='nome'
                        label='Código do Militante'
                        required={true}
                        value={states.militante.value}
                        onChange={(e) => states.militante.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Vincular" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default AdministracaoInstanciaVincular;

