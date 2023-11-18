import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciasMilitantePost } from "../../../services/instancias/militante/instanciasMilitantePost";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import { instanciasRecrutamentosGet } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosGet";


const useInstanciaRecrutamentosState = () => {

    const navigate = useNavigate();


    const [recrutandos, setRecrutandos] = useState([]);
  
    const [instancia, setInstancia] = useState(0);

    const [submit, setSubmit] = useState(false);

    
    const _getInstancia= async (id) => {

        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstancia(result.data)
        }

    }

    const _getRecrutandos= async (id) => {

        let result = await instanciasRecrutamentosGet(id)
        if (result.type === 'success'){
            setRecrutandos(result.data)
        }

    }

    return {
        recrutandos: {
            value: recrutandos,
            set: _getRecrutandos
        },
        instancia: {
            value: instancia,
            set: _getInstancia,
        },
        submit: {
            value: submit,
            set: ()=>{console.log('não implementado')},
        },
    }

}

export default useInstanciaRecrutamentosState;
