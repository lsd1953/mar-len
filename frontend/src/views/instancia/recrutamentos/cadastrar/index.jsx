import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaRecrutamentosCadastrarState from "../../../../hooks/instancia/recrutamentos/useInstanciaRecrutamentosCadastrarState";

import Styles from "./style";
import MyInput from "../../../../components/myInput";
import MyDataInput from "../../../../components/myDataInput";


const InstanciaRecrutamentosCadastrar = () => {

    let { id } = useParams();    
    
    const states = useInstanciaRecrutamentosCadastrarState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    let style = Styles()
    return (
        <Application>
            <Box>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Recrutando(a)" />
                    <MyDataInput
                        label='Data de Inicio do recrutamento'
                        value={states.data.value}
                        onChange={(newValue) => states.data.set(newValue)}
                    />
                    <MyInput 
                        type='text'
                        id='nome'
                        label='Nome'
                        value={states.nome.value}
                        onChange={(e) => states.nome.set(e.target.value)}
                    />
                    <MyInput 
                        type='email'
                        id='email'
                        label='E-mail'
                        value={states.email.value}
                        onChange={(e) => states.email.set(e.target.value)}
                    />
                    <MyInput 
                        type='tel'
                        id='telefone'
                        label='Telefone'
                        value={states.telefone.value}
                        onChange={(e) => states.telefone.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='uf'
                        label='UF onde Mora'
                        value={states.ufMora.value}
                        onChange={(e) => states.ufMora.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='cidade'
                        label='Cidade onde Mora'
                        value={states.cidadeMora.value}
                        onChange={(e) => states.cidadeMora.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='origem'
                        label='Origem do Recrutamento'
                        value={states.origemRecrutamento.value}
                        onChange={(e) => states.origemRecrutamento.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Box>
        </Application>
    )
}

export default InstanciaRecrutamentosCadastrar;

