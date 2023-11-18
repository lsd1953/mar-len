import { useContext, useEffect } from "react";
import { Alert, AlertTitle, Box, Stack } from "@mui/material";

import MyLabel from "../../components/myLabel";
import Application from "../../components/application";
import MyPanelInstancia from "../../components/myPanelInstancia";
import { AuthContext } from "../../contexts/auth";
import useDashboardState from "../../hooks/useDashboardState";

import Styles from "./style";
import MyButton from "../../components/myButton";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const states = useDashboardState()

    const handlerConvite = ()=>{navigate('/convite')}

    useEffect(() => {
        states.instancias.set()
        states.assistencias.set(user.value.id)
        
    }, []);


    let style = Styles()

    return (
        <Application>
            <Stack spacing={2} >
                <MyLabel sx={style.title} component="h1" text="Dashboard" />
                    <Box sx={style.areaButton}>
                        <MyButton onClick={handlerConvite} color="success" text="Convite" variant="contained"/>
                    </Box>
                {
                    states.instancias.value?.length < 1 ?
                    <Alert severity="warning">
                        <AlertTitle>Aviso</AlertTitle>
                        "Você não foi vinculado em nenhuma instancia."
                    </Alert>
                    : <MyPanelInstancia instancias={states.instancias.value} title='Minhas Instancias' />
                }
                {
                    states.assistencias.value?.length < 1 ?
                    null
                    : <MyPanelInstancia instancias={states.assistencias.value} title='Assistencias' />
                }
            </Stack>
        </Application>
    )
}

export default Dashboard;
