import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { militantesGet } from "../../../services/militantes/militantesGet";
import { instanciasMilitanteRemovePost } from "../../../services/instancias/militante/instanciasMilitanteRemovePost";



const useInstanciaMilitanteRemoverState = () => {

    const navigate = useNavigate();


    const [militante, setMilitante] = useState(0);
    const [militantes, setMilitantes] = useState([]);
  
    const [instancia, setInstancia] = useState(0);

    const [submit, setSubmit] = useState(false);

    const _getMilitantes= async () => {

        let result = await militantesGet(instancia)
        if (result.type === 'success'){
            setMilitantes(result.data.map(item=>{ return ({id:item.id, nome: item.apelido})}))
        }

    }

    const _instanciasMilitanteRemovePost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isMilitanteValid = false;
        let isIstanciaValid = false


        if (militante < 1 ) {
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
            
            let result = await instanciasMilitanteRemovePost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Militante removido com sucesso');
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
        militantes: {
            value: militantes,
            set: _getMilitantes,
        },
        instancia: {
            value: instancia,
            set: setInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasMilitanteRemovePost,
        },
    }

}

export default useInstanciaMilitanteRemoverState;
