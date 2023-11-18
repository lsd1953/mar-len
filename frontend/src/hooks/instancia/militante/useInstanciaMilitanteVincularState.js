import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciasMilitanteVinculaPost } from "../../../services/instancias/militante/instanciasMilitanteVinculaPost";



const useInstanciaMilitanteVincularState = () => {

    const navigate = useNavigate();


    const [militante, setMilitante] = useState('');
  
    const [instancia, setInstancia] = useState(0);

    const [submit, setSubmit] = useState(false);


    const _instanciasMilitanteVinculaPost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isMilitanteValid = false;
        let isIstanciaValid = false


        if (militante === '' ) {
            toast.error('Informe um código de militante válido');
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
                militante: militante,
                instancia: instancia,
            }
            
            let result = await instanciasMilitanteVinculaPost(json)

            if (result.type === 'error'){
                if (result.data?.detail.non_field_errors){
                    toast.error(result.data?.detail.non_field_errors[0])
                }
                if (result.data?.detail.militante){
                    toast.error(result.data?.detail.militante[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Militante vinculado com sucesso');
                navigate(`/instancia/${instancia}`);
            }
            
        }

        setSubmit(false)

    }


    return {
        militante: {
            value: militante,
            set: setMilitante
        },
        instancia: {
            value: instancia,
            set: setInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasMilitanteVinculaPost,
        },
    }

}

export default useInstanciaMilitanteVincularState;
