import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { instanciasGet } from "../services/instancias/instanciasGet";


const useDashboardState = () => {

    const navigate = useNavigate();


    const [instancias, setInstancias] = useState([]);
    const [assistencias, setAssistencias] = useState([]);

    const [submit, setSubmit] = useState(false);

    const _getInstancias= async () => {

        let result = await instanciasGet()
        if (result.type === 'success'){
            setInstancias(result.data)
        }

    }

    const _getAssistencias= async (user_id) => {

        let result = await instanciasGet(null, null, user_id) 
        if (result.type === 'success'){
            setAssistencias(result.data)
        }

    }


    return {

        instancias: {
            value: instancias,
            set: _getInstancias,
        },
        assistencias: {
            value: assistencias,
            set: _getAssistencias,
        },
        submit: {
            value: submit,
            set: ()=>{console.log('não implementado')},
        },
    }

}

export default useDashboardState;
