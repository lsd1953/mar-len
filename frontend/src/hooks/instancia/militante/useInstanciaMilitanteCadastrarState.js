import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciasMilitantePost } from "../../../services/instancias/militante/instanciasMilitantePost";


const useInstanciaMilitanteCadastrarState = () => {

    const navigate = useNavigate();


    const [apelido, setApelido] = useState("");
  
    const [instancia, setInstancia] = useState(0);

    const [submit, setSubmit] = useState(false);

    const _instanciasMilitantePost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)

        let isApelidoValid = false;
        let isIstanciaValid = false

        if (apelido === "" ) {
            toast.error('Informe um apelido para o militante válido');
        }
        else {
            isApelidoValid = true;
        }

        if (instancia < 1) {
            
            toast.error('Informe uma instancia válida');
        }
        else {
            isIstanciaValid = true;
        }

        if (isApelidoValid && isIstanciaValid){

            let json = {
                apelido: apelido,
                instancia: instancia,
            }
            
            let result = await instanciasMilitantePost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Militante cadastrado com sucesso');
                navigate(`/instancia/${instancia}`);
            }
            
        }

        setSubmit(false)

    }


    return {
        apelido: {
            value: apelido,
            set: setApelido
        },
        instancia: {
            value: instancia,
            set: setInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasMilitantePost,
        },
    }

}

export default useInstanciaMilitanteCadastrarState;
