import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { militantesGet } from "../../../services/militantes/militantesGet";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import { administracaoFuncoesGet } from "../../../services/administracao/funcao/administracaoFuncoesGet";
import { instanciasSecretarioCadastraPost } from "../../../services/instancias/secretarias/instanciasSecretarioCadastraPost";
import formatDate from "../../../utils/formatDate";
import { instanciasRecrutamentosCadastraPost } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosCadastraPost";
import { instanciasRecrutandoGet } from "../../../services/instancias/recrutamentos/instanciasRecrutandoGet";
import { instanciasRecrutamentosAcoesGet } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosAcoesGet";



const useInstanciaRecrutamentosDetalheState = () => {

    const navigate = useNavigate();


    const [recrutando, setRecrutando] = useState(null);
    const [acoes, setAcoes] = useState([]);


  
    const [instancia, setInstancia] = useState(null);
    

    const [submit, setSubmit] = useState(false);

    const _getRecrutando = async (id) =>{
        let result = await instanciasRecrutandoGet(instancia, id)
        if (result.type === 'success'){
            setRecrutando(result.data)
        }
    }

    const _getAcoes= async (id) =>{
        let result = await instanciasRecrutamentosAcoesGet(instancia, recrutando.id)
        console.log("🚀 ~ file: useInstanciaRecrutamentosDetalheState.js:40 ~ const_getAcoes= ~ result.data:", result.data)
        if (result.type === 'success'){
            setAcoes(result.data)
        }
    }
    

    return {

        recrutando:{
            value: recrutando,
            set: _getRecrutando
        },
        instancia: {
            value: instancia,
            set: setInstancia,
        },
        acoes: {
            value: acoes,
            set: _getAcoes,
        },
        submit: {
            value: submit,
            set: ()=>console.log('Não imprementado'),
        },
    }

}

export default useInstanciaRecrutamentosDetalheState;

