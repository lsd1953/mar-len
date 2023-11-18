import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { secretariosGet } from "../../../services/secretarios/secretariosGet";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import { instanciasSecretarioRemovePost } from "../../../services/instancias/secretarias/instanciasSecretarioRemovePost";



const useInstanciaSecretariasRemoverState = () => {

    const navigate = useNavigate();


    const [secretario, setSecretario] = useState(0);
    const [secretarios, setSecretarios] = useState([]);
  
    const [instancia, setInstancia] = useState(null);

    const [submit, setSubmit] = useState(false);

    const _getSecretarios = async () => {

        let result = await secretariosGet(instancia.id)

        if (result.type === 'success'){
            setSecretarios(result.data.map(item=>{return({id:item.militante.id, nome:item.militante.apelido, secretaria:item.funcao.nome})}))
        }

    }

    const _getInstancia= async (id) => {

        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstancia(result.data)
        }

    }

    const _instanciasSecretariosRemovePost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isMilitanteValid = false;
        let isIstanciaValid = false


        if (secretario < 1 ) {
            toast.error('Informe um secretário válido');
        }
        else {
            isMilitanteValid = true;
        }

        if (instancia < 1) {
            
            toast.error('Informe uma instancia válida');
        }
        else {
            isIstanciaValid = true;
        }

        if (isMilitanteValid && isIstanciaValid){

            let json = {
                secretario: secretario,
                instancia: instancia.id,
            }
            
            let result = await instanciasSecretarioRemovePost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Secretário removido com sucesso');
                navigate(`/instancia/${instancia.id}`);
            }
            
        }

        setSubmit(false)

    }


    return {
        secretario: {
            value: secretario,
            set: setSecretario
        },
        secretarios: {
            value: secretarios,
            set: _getSecretarios,
        },
        instancia: {
            value: instancia,
            set: _getInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasSecretariosRemovePost,
        },
    }

}

export default useInstanciaSecretariasRemoverState;
