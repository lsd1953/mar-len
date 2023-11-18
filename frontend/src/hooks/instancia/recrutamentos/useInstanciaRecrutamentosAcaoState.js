import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import formatDate from "../../../utils/formatDate";
import { instanciasRecrutamentosCadastraPost } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosCadastraPost";
import { instanciasRecrutamentosAcaoPost } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosAcaoPost";



const useInstanciaRecrutamentosAcaoState = () => {

    const navigate = useNavigate();


    const [tipo, setTipo] = useState('');
    const [descricao, setDescricao] = useState('');
 
    const [instancia, setInstancia] = useState(0);
    const [recrutamento, setRecrutamento] = useState(0);
    const [data, setData] = useState(null);

    const [submit, setSubmit] = useState(false);

    const _instanciasRecrutamentosAcaoPost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isTipoValid = false;
        let isDescricaoValid = false;
        let isIstanciaValid = false;
        let isRecrutamentoValid = false;
        let isDataValid = false;


        if (tipo === '' ) {
            toast.error('Informe um tipo válido');
        }
        else {
            isTipoValid = true;
        }
        if (descricao === '' ) {
            toast.error('Informe uma descrição válida');
        }
        else {
            isDescricaoValid = true;
        }

        if (instancia < 1) {
            
            toast.error('Informe uma instancia válida');
        }
        else {
            isIstanciaValid = true;
        }

        if (recrutamento < 1) {
            
            toast.error('Informe um recrutamento válido');
        }
        else {
            isRecrutamentoValid = true;
        }

        if (data === null) {
            
            toast.error('Informe uma data válida');
        }
        else {
            isDataValid = true;
        }
       

        if (isTipoValid && isDescricaoValid && isIstanciaValid && isRecrutamentoValid){

            let json = {
                instancia: instancia,
                recrutamento: recrutamento,
                descricao: descricao,
                tipo: tipo,
                data: formatDate(new Date(data)),
            }
            
            let result = await instanciasRecrutamentosAcaoPost(json)

            if (result.type === 'error'){
                if (result.data?.detail?.telefone){
                    toast.error(result.data.detail.telefone[0])
                }
                if (result.data?.detail?.instancia){
                    toast.error(result.data.detail.instancia[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Recrutando adicionado com sucesso');
                navigate(`/instancia/${instancia}/recrutamentos/detalhe/${recrutamento}`);
            }
            
        }

        setSubmit(false)

    }


    return {

        tipo: {
            value: tipo,
            set: setTipo,
        },
        descricao: {
            value: descricao,
            set: setDescricao,
        },
        data: {
            value: data,
            set: setData,
        },
        recrutamento:{
            value: recrutamento,
            set: setRecrutamento,
        },
        instancia: {
            value: instancia,
            set: setInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasRecrutamentosAcaoPost,
        },
    }

}

export default useInstanciaRecrutamentosAcaoState;

