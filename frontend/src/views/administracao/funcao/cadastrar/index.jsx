import { useEffect } from "react";
import { Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyInput from "../../../../components/myInput";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import MyCheckbox from "../../../../components/myCheckbox";
import useAdministracaoFuncaoCadastrarState from "../../../../hooks/administracao/funcao/useAdministracaoFuncaoCadastrarState";

import Styles from "./style";

const AdministracaoFuncaoCadastrar = () => {


    const states = useAdministracaoFuncaoCadastrarState()

    useEffect(() => {
        states.organizacoes.set()
        
    }, []);


    let style = Styles()

    return (
        <Application>
            <Container  sx={style.container}>
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Função" />
                    <MySelect
                        id="organizacao"
                        label="Organização"
                        options={states.organizacoes.value}
                        value={states.organizacao.value}
                        onChange={(e)=>states.organizacao.set(e.target.value)}
                    
                    />
                    <MyInput
                        type='text'
                        id='nome'
                        label='Nome'
                        required={true}
                        value={states.nome.value}
                        onChange={(e) => states.nome.set(e.target.value)}
                    />
                    <MyCheckbox 
                        size='small'
                        checked={states.cadastra.value}
                        label="Cadastra" 
                        value={states.cadastra.value}
                        onChange={(e) => states.cadastra.set(!states.cadastra.value)}
                    />
                    <MyCheckbox 
                        size='small'
                        checked={states.financeiro.value}
                        label="Financeiro" 
                        value={states.financeiro.value}
                        onChange={(e) => states.financeiro.set(!states.financeiro.value)}
                    />
                    <MyCheckbox 
                        size='small'
                        checked={states.assistencia.value}
                        label="Assistencia" 
                        value={states.assistencia.value}
                        onChange={(e) => states.assistencia.set(!states.assistencia.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Container>
        </Application>
    )
}

export default AdministracaoFuncaoCadastrar;

