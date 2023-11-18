import { useEffect } from "react";
import { Box, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Application from "../../components/application";
import MyLabel from "../../components/myLabel";
import MyLoading from "../../components/myLoading";
import MyPanel from "../../components/myPanel";
import useInstanciaState from "../../hooks/instancia/useInstanciaState";

import PanelMilitantes from "./panelMilitantes";
import PanelInferiores from "./panelInferiores";
import PanelSecretarios from "./panelSecretarios";
import Styles from "./style";
import MyButton from "../../components/myButton";

const Instancia = () => {

    let { id } = useParams();
    const navigate = useNavigate();

    const states = useInstanciaState()
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    useEffect(() => {
        if (states.instancia.value){
            states.militantes.set(id)
            states.secretarios.set(id)
            states.permissao.set(id)
            if (states.instancia.value.tipo !== 3 || states.instancia.value.tipo !== 1){
                states.instanciasInferiores.set(id, states.instancia.value.organizacao_id)
            }
        }
    }, [states.instancia.value]);

    const handlerConvite = () => {states.convite.set(id)}
    const handlerRecrutamento = () => {
        navigate(`/instancia/${id}/recrutamentos`);
    }

    let style = Styles()

    return (
        <Application>
            <Stack spacing={2} >
                <MyLoading render={states.submit.value || states.loading.value} />
                <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                    <MyLabel sx={style.title} component="h1" text={states.instancia.value?.nome} />
                    <MyLabel sx={style.title} component="h1" text={states.instancia.value?.organizacao_sigla} />
                </Box>
                <MyPanel>
                    <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr" , gap:'5px', marginBottom:'20px'}}>
                        
                        {
                            states.instancia.value?.tipo === 3 && (states.permissao.value.cadastra || states.permissao.value.assistente) ?
                            <>
                                <MyButton onClick={handlerRecrutamento} text="Recrutamentos" variant="contained"/>
                                <MyButton onClick={handlerConvite} color="success" text="Convite" variant="contained"/>
                            </>
                            : null
                        }
                    </Box>
                    <Box sx={{display: 'flex'}}>
                        <MyLabel sx={{marginRight:'5px',fontWeight: 'bold'}}component="p" text='Assistencia:' />
                        <MyLabel component="p" text={states.instancia.value?.assistencias} />
                    </Box>
                </MyPanel>
                <PanelSecretarios permissao={states.permissao.value} secretario={states.secretarios.value} instancia={states.instancia.value?.id}/>
                <PanelMilitantes permissao={states.permissao.value} militantes={states.militantes.value} instancia={states.instancia.value?.id}/>
                {
                    states.instancia.value?.tipo !==3 && states.instancia.value?.tipo !== 1?
                        <PanelInferiores permissao={states.permissao.value} instancia={states.instancia.value?.id} inferiores={states.instanciasInferiores.value} />
                        : null
                }
            </Stack>
        </Application>
    )
}

export default Instancia;
