import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { militantesGet } from "../../../services/militantes/militantesGet";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import { administracaoFuncoesGet } from "../../../services/administracao/funcao/administracaoFuncoesGet";
import { instanciasSecretarioCadastraPost } from "../../../services/instancias/secretarias/instanciasSecretarioCadastraPost";



const useInstanciaSecretariasCadastrarState = () => {

    const navigate = useNavigate();


    const [militante, setMilitante] = useState(0);
    const [militantes, setMilitantes] = useState([]);

    const [funcao, setFuncao] = useState(0);
    const [funcoes, setFuncoes] = useState([]);
  
    const [instancia, setInstancia] = useState(null);
    

    const [submit, setSubmit] = useState(false);
    

    const _getFuncoes = async () => {

        let result = await administracaoFuncoesGet(instancia.organizacao_id)
        if (result.type === 'success'){
            setFuncoes(result.data)
        }

    }

    const _getMilitantes = async () => {

        let result = await militantesGet(instancia.id)
        
        
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

    const _instanciasSecretariosCadastraPost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isMilitanteValid = false;
        let isIstanciaValid = false;
        let isFuncaoValid = false;


        if (militante < 1 ) {
            toast.error('Informe um militante válido');
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

        if (funcao < 1) {
            
            toast.error('Informe uma função válida');
        }
        else {
            isFuncaoValid = true;
        }

        if (isMilitanteValid && isIstanciaValid && isFuncaoValid){

            let json = {
                militante: militante,
                instancia: instancia.id,
                funcao: funcao,
            }
            
            let result = await instanciasSecretarioCadastraPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Secretário adicionado com sucesso');
                navigate(`/instancia/${instancia.id}`);
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
        funcao: {
            value: funcao,
            set: setFuncao,
        },
        funcoes: {
            value: funcoes,
            set: _getFuncoes,
        },
        instancia: {
            value: instancia,
            set: _getInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasSecretariosCadastraPost,
        },
    }

}

export default useInstanciaSecretariasCadastrarState;

