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
import useConviteState from "../../hooks/useConviteState";

const Convite = () => {
    const navigate = useNavigate();

    const states = useConviteState()


    let style = Styles()
    return (
        <Application>
            <Stack spacing={2} >
                <MyLoading render={states.submit.value} />
                <MyLabel sx={style.title} component="h1" text="Entrar em uma instância por convite." />
                <MyPanel>
                    <Stack spacing={2} >
                    <MyInput 
                        type='text'
                        id='convite'
                        label='Convite'
                        value={states.convite.value}
                        onChange={(e) => states.convite.set(e.target.value)}
                    />
                    <MyButton onClick={()=>states.submit.set()} text="Atualizar" variant="contained"/>
                    </Stack>
                </MyPanel>
            </Stack>
        </Application>
    )
}

export default Convite;

