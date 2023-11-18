import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";

import Styles from "./style";
import MyInput from "../../../../components/myInput";
import MyDataInput from "../../../../components/myDataInput";
import useInstanciaRecrutamentosAlterarState from "../../../../hooks/instancia/recrutamentos/useInstanciaRecrutamentosAlterarState";
import MySelect from "../../../../components/mySelect";
import MyCheckbox from "../../../../components/myCheckbox";


const InstanciaRecrutamentosAlterar = () => {

    let { id, idRecruta } = useParams();
    const states = useInstanciaRecrutamentosAlterarState()

    useEffect(() => {
        states.instancia.set(id)
    }, []);  
    
    useEffect(() => {
        if (states.instancia.value > 0){
            states.recrutamento.set(idRecruta)
        }
        
    }, [states.instancia.value]);

    let style = Styles()
    return (
        <Application>
            <Box>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Alterar Recrutando(a)" />
                    <MySelect
                        id="status"
                        label="Status"
                        options={[
                            {id:0, nome: 'Andamento'},
                            {id:1, nome: 'Recrutado'},
                            {id:2, nome: 'Não Recrutado'}
                        ]}
                        value={states.status.value}
                        onChange={(e)=>states.status.set(e.target.value)}
                    
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
                        id='categoria'
                        label='Categoria'
                        value={states.categoria.value}
                        onChange={(e) => states.categoria.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='sindicato'
                        label='Sindicato'
                        value={states.sindicato.value}
                        onChange={(e) => states.sindicato.set(e.target.value)}
                    />
                    <MyCheckbox 
                        checked={states.sindicalizado.value}
                        label="Sindicalizado?" 
                        value={states.sindicalizado.value}
                        onChange={(e) => states.sindicalizado.set(!states.financeiro.value)}
                    />
                    <MySelect
                        id="atuacao"
                        label="Atuação"
                        options={[
                            {id:'base',nome:'Base'},
                            {id:'diretoria',nome:'Diretoria'},
                        ]}
                        value={states.atuacao.value}
                        onChange={(e)=>states.atuacao.set(e.target.value)}
                    
                    />
                    <MySelect
                        id="tipoTrabalho"
                        label="Tipo de Trabalho"
                        options={[
                            {id:'desempregado',nome:'Desempregado'},
                            {id:'publico',nome:'Publico'},
                            {id:'privado',nome:'Privado'},
                            {id:'publico/privado',nome:'Publico/Privado'},
                        ]}
                        value={states.tipoTrabalho.value}
                        onChange={(e)=>states.tipoTrabalho.set(e.target.value)}
                    />
                    <MySelect
                        id="vinculoTrabalhista"
                        label="Vinculo Trabalhista"
                        options={[
                            {id:'desempregado',nome:'Desempregado'},
                            {id:'clt',nome:'clt'},
                            {id:'pj',nome:'PJ'},
                            {id:'autonomo',nome:'Autonomo'},
                        ]}
                        value={states.vinculoTrabalhista.value}
                        onChange={(e)=>states.vinculoTrabalhista.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Box>
        </Application>
    )
}

export default InstanciaRecrutamentosAlterar;

