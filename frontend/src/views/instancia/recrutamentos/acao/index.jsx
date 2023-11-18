import { useEffect } from "react";
import { Box, Stack } from "@mui/material";



import Styles from "./style";
import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyInput from "../../../../components/myInput";
import MyButton from "../../../../components/myButton";
import useInstanciaRecrutamentosAcaoState from "../../../../hooks/instancia/recrutamentos/useInstanciaRecrutamentosAcaoState";
import MyDataInput from "../../../../components/myDataInput";
import { useParams } from "react-router-dom";

const InstanciaRecrutamentosAcao = () => {

    let { id, idRecruta } = useParams();
    const states = useInstanciaRecrutamentosAcaoState()

    useEffect(() => {
        states.instancia.set(id)
        states.recrutamento.set(idRecruta)
        
    }, []);


    let style = Styles()

    return (
        <Application>
            <Box >
                <MyLoading render={states.submit.value} />
                <MyPanel>
                <Stack spacing={2} >
                    <MyLabel sx={style.title} component="h1" text="Cadastrar Ação" />
                    <MyDataInput
                        label='Data da ação'
                        value={states.data.value}
                        required={true}
                        onChange={(newValue) => states.data.set(newValue)}
                    />
                    <MyInput
                        type='text'
                        id='tipo'
                        label='Tipo'
                        required={true}
                        value={states.tipo.value}
                        onChange={(e) => states.tipo.set(e.target.value)}
                    />
                    <MyInput 
                        type='text'
                        required={true}
                        id='descricao'
                        label='descricao'
                        value={states.descricao.value}
                        onChange={(e) => states.descricao.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Cadastrar" variant="contained"/>
                </Stack>

                </MyPanel>
                
            </Box>
        </Application>
    )
}

export default InstanciaRecrutamentosAcao;


