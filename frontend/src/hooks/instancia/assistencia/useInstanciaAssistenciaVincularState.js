import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { militantesGet } from "../../../services/militantes/militantesGet";
import { instanciasGet } from "../../../services/instancias/instanciasGet";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import { instanciasAssistenteVinculaPost } from "../../../services/instancias/assistencia/instanciasAssistenteVinculaPost";



const useInstanciaAssistenciaVincularState = () => {

    const navigate = useNavigate();


    const [assistente, setAssistente] = useState(0);
    const [militantes, setMilitantes] = useState([]);
  
    const [instancia, setInstancia] = useState(0);
    const [instanciaInferior, setInstanciaInferior] = useState(0);
    const [instancias, setInstancias] = useState([]);

    const [submit, setSubmit] = useState(false);

    const _getMilitantes = async (id) => {

        let result = await militantesGet(id)

        if (result.type === 'success'){
            setMilitantes(result.data.map(item=>{return({id:item.id, nome:item.apelido})}))
        }
    }

    const _getInstancia= async (id) => {
        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstancia(result.data)
        }
    }

    const _getInstanciasInferiores = async (id, organizacao) => {
        let result = await instanciasGet(id, organizacao)
        if (result.type === 'success'){
            setInstancias(result.data)
        }

    }


    const _instanciasAssistenteVinculaPost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isAsssitentValid = false;
        let isIstanciaValid = false


        if (assistente < 0 ) {
            toast.error('Informe um assistente válido');
        }
        else {
            isAsssitentValid = true;
        }

        if (instanciaInferior < 1) {
            
            toast.error('Informe uma instancia válida');
        }
        else {
            isIstanciaValid = true;
        }

        if (isAsssitentValid && isIstanciaValid){

            let json = {
                assistente: assistente,
                instancia: instanciaInferior,
            }
            
            let result = await instanciasAssistenteVinculaPost(json)
            
            if (result.type === 'error'){
                if (result.data?.detail.non_field_errors){
                    toast.error(result.data?.detail.non_field_errors[0])
                }
                if (result.data?.detail.militante){
                    toast.error(result.data?.detail.militante[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Assistente vinculado com sucesso');
                navigate(`/instancia/${instancia.id}`);
            }
            
        }

        setSubmit(false)

    }

    return {
        assistente: {
            value: assistente,
            set: setAssistente
        },
        militantes: {
            value: militantes,
            set: _getMilitantes
        },
        instanciaInferior: {
            value: instanciaInferior,
            set: setInstanciaInferior,
        },
        instancia: {
            value: instancia,
            set: _getInstancia,
        },
        instancias: {
            value: instancias,
            set: _getInstanciasInferiores,
        },
        submit: {
            value: submit,
            set: _instanciasAssistenteVinculaPost,
        },
    }

}

export default useInstanciaAssistenciaVincularState;
