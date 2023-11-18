import { useEffect } from "react";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyInput from "../../../../components/myInput";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useAdministracaoInstanciaCadastrarState from "../../../../hooks/administracao/instancia/useAdministracaoInstanciaCadastrarState";

import Styles from "./style";

const AdministracaoInstanciaCadastrar = () => {

    const states = useAdministracaoInstanciaCadastrarState()

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
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Instancia" />
                    <MySelect
                        id="organizacao"
                        label="Organização"
                        options={states.organizacoes.value}
                        value={states.organizacao.value}
                        onChange={(e)=>states.organizacao.set(e.target.value)}
                    
                    />
                    <MySelect
                        id="superior"
                        label="Instancia Superior"
                        options={states.instancias.value}
                        value={states.instanciaSuperior.value}
                        onChange={(e)=>states.instanciaSuperior.set(e.target.value)}
                    
                    />
                     <MySelect
                        id="tipo"
                        label="Tipo"
                        options={[
                            {id:0, nome: 'Nacional'},
                            {id:1, nome: 'Fração'},
                            {id:2, nome: 'Estadual'},
                            {id:3, nome: 'Base'},
                        ]}
                        value={states.tipo.value}
                        onChange={(e)=>states.tipo.set(e.target.value)}
                    
                    />
                    <MyInput
                        type='text'
                        id='nome'
                        label='Nome'
                        required={true}
                        value={states.nome.value}
                        onChange={(e) => states.nome.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        id='categoria'
                        label='Categoria'
                        value={states.categoria.value}
                        onChange={(e) => states.categoria.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default AdministracaoInstanciaCadastrar;

