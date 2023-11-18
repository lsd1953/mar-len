import { useEffect } from "react";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useAdministracaoFuncaoVincularState from "../../../../hooks/administracao/funcao/useAdministracaoFuncaoVincularState";

import Styles from "./style";

const AdministracaoFuncaoVincular = () => {
    

    const states = useAdministracaoFuncaoVincularState()

    useEffect(() => {
        states.organizacoes.set()
        
    }, []);

    useEffect(() => {
        if (states.organizacao.value > 0 ){
            states.instancias.set()
        }
        
    }, [states.organizacao.value]);

    useEffect(() => {
        if (states.organizacao.value > 0 ){
            states.funcoes.set()
        }
        
    }, [states.organizacao.value]);

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
                    <MyLabel sx={style.title} component="h1" text="Definir Função" />
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
                    <MySelect
                        id="militante"
                        label="Militante"
                        options={states.militantes.value}
                        value={states.militante.value}
                        onChange={(e)=>states.militante.set(e.target.value)}
                    />
                    <MySelect
                        id="funcao"
                        label="Funcao"
                        options={states.funcoes.value}
                        value={states.funcao.value}
                        onChange={(e)=>states.funcao.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Vincular" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default AdministracaoFuncaoVincular;

