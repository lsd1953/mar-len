import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Stack } from "@mui/material";

import Application from "../../components/application";
import MyLoading from "../../components/myLoading";
import MyPanel from "../../components/myPanel";
import MyLabel from "../../components/myLabel";
import MyInput from "../../components/myInput";
import MyButton from "../../components/myButton";
import MySelect from "../../components/mySelect";
import useInstanciaCadastrarState from "../../hooks/instancia/useInstanciaCadastrarState";

import Styles from "./style";

const InstanciaCadastrar = () => {

    let { id } = useParams();    
    
    const states = useInstanciaCadastrarState();
    
    useEffect(() => {
        states.instanciaSuperior.set(id)
    }, []);

    let style = Styles()
    
    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value || states.loading.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Instancia" />

                    {
                        states.tipos.value?.length > 0 ? 
                        <MySelect
                            id="tipo"
                            label="Tipo"
                            options={states.tipos.value}
                            value={states.tipo.value}
                            onChange={(e)=>states.tipo.set(e.target.value)}
                        
                        /> : null
                    }
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

export default InstanciaCadastrar;

