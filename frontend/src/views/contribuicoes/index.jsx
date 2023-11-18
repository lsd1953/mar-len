import { useEffect } from "react";
import { Stack } from "@mui/material";

import MyLabel from "../../components/myLabel";
import Application from "../../components/application";
import MyLoading from "../../components/myLoading";
import useContribuicoesState from "../../hooks/contribuicoes/useContribuicoesState";

import PanelContribuicaoInstancia from "./panelContribuicaoInstancia";
import Styles from "./style";

const Contribuicoes = () => {

    const states = useContribuicoesState()

    useEffect(() => {
        states.instancias.set()
        states.salario.set()
        
    }, []);


    let style = Styles()
    return (
        <Application>
            <Stack spacing={2} >
                <MyLoading render={states.submit.value} />
                <MyLabel sx={style.title} component="h1" text="Contribuições" />
                <PanelContribuicaoInstancia instancias={states.instancias.value} salario={states.salario.value} getContribuicoes={states.contribuicoes.set}/>
            </Stack>
        </Application>
    )
}

export default Contribuicoes;

