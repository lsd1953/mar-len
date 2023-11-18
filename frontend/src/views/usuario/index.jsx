import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stack } from "@mui/material";


import Application from "../../components/application";
import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyPanel from "../../components/myPanel";
import MyInput from "../../components/myInput";
import MyCheckbox from "../../components/myCheckbox";
import MySelect from "../../components/mySelect";
import MyLoading from "../../components/myLoading";
import useUsuarioState from "../../hooks/useUsuarioState";

import Styles from "./style";

const Usuario = () => {
    const navigate = useNavigate();

    const states = useUsuarioState()

    useEffect(() => {
        states.get.set()
        
    }, []);


    let style = Styles()
    return (
        <Application>
            <Stack spacing={2} >
                <MyLoading render={states.submit.value || states.get.value} />
                <MyLabel sx={style.title} component="h1" text="Usuario" />
                <MyPanel>
                    <Stack spacing={2} >
                    <MyInput 
                        type='email'
                        id='email'
                        label='E-mail'
                        placeholder='Esse é o seu e-mail seguro para contato.'
                        value={states.email.value}
                        onChange={(e) => states.email.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='nome'
                        label='Nome'
                        value={states.nome.value}
                        onChange={(e) => states.nome.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='apelido'
                        placeholder='Esse será seu nome em toda a aplicação'
                        label='Apelido'
                        value={states.apelido.value}
                        onChange={(e) => states.apelido.set(e.target.value)}
                    />
                    <MyInput 
                        type='number'
                        id='salario'
                        label='Salario'
                        value={states.salario.value}
                        onChange={(e) => states.salario.set(e.target.value)}
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
                    <MyButton onClick={()=>states.submit.set()} text="Atualizar" variant="contained"/>
                    </Stack>
                </MyPanel>
            </Stack>
        </Application>
    )
}

export default Usuario;

