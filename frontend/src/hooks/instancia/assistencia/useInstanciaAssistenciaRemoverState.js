import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciasGet } from "../../../services/instancias/instanciasGet";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import { assistentesGet } from "../../../services/assistentes/assistentesGet";
import { instanciasAssistenteRemovePost } from "../../../services/instancias/assistencia/instanciasAssistenteRemovePost";



const useInstanciaAssistenciaRemoverState = () => {

    const navigate = useNavigate();


    const [assistente, setAssistente] = useState(0);
    const [assistentes, setAssistentes] = useState([]);
  
    const [instancia, setInstancia] = useState(0);
    const [instanciaInferior, setInstanciaInferior] = useState(0);
    const [instancias, setInstancias] = useState([]);

    const [submit, setSubmit] = useState(false);

    const _getAssistentes = async () => {

        let result = await assistentesGet(instanciaInferior)
        if (result.type === 'success'){
            setAssistentes(result.data.map(item=>{return({id:item.militante.id, nome:item.militante.apelido})}))
        }
    }

    const _getInstancia= async (id) => {
        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstancia(result.data)
        }
    }

    const _getInstanciasInferiores = async () => {
        let result = await instanciasGet(instancia.id, instancia.organizacao_id)
        if (result.type === 'success'){
            setInstancias(result.data)
        }

    }


    const _instanciasAssistenciaRemovePost = async () => {
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
            
            let result = await instanciasAssistenteRemovePost(json)
            
            if (result.type === 'error'){
                if (result.data?.detail.non_field_errors){
                    toast.error(result.data?.detail.non_field_errors[0])
                }
                if (result.data?.detail.militante){
                    toast.error(result.data?.detail.militante[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Assistente removido com sucesso');
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
        assistentes: {
            value: assistentes,
            set: _getAssistentes
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
            set: _instanciasAssistenciaRemovePost,
        },
    }

}

export default useInstanciaAssistenciaRemoverState;
