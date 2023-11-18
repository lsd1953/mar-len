import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import formatDate from "../../../utils/formatDate";
import { instanciasRecrutamentosCadastraPost } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosCadastraPost";



const useInstanciaRecrutamentosCadastrarState = () => {

    const navigate = useNavigate();


    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ufMora, setUfMora] = useState('');
    const [cidadeMora, setCidadeMora] = useState('');
    const [origemRecrutamento, setOrigemRecrutamento] = useState('');
    const [data, setData] = useState(null);

  
    const [instancia, setInstancia] = useState(null);
    

    const [submit, setSubmit] = useState(false);
    

    const _getInstancia= async (id) => {

        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstancia(result.data)
        }

    }

    const _instanciasRecrutamentosCadastraPost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isNomeValid = false;
        let isTelefoneValid = false;
        let isIstanciaValid = false;
        let isDataValid = false;
        


        if (nome === '' ) {
            toast.error('Informe um nome válido');
        }
        else {
            isNomeValid = true;
        }
        if (data === null ) {
            toast.error('Informe uma data válida');
        }
        else {
            isDataValid = true;
        }

        if (telefone === '' ) {
            toast.error('Informe um telefone válido');
        }
        else {
            isTelefoneValid = true;
        }

        if (instancia < 1) {
            
            toast.error('Informe uma instancia válida');
        }
        else {
            isIstanciaValid = true;
        }

       

        if (isNomeValid && isIstanciaValid && isTelefoneValid){

            let json = {
                instancia: instancia.id,
                nome: nome,
                email: email,
                telefone: telefone,
                ufMora: ufMora,
                cidadeMora: cidadeMora,
                origemRecrutamento: origemRecrutamento,
                data: formatDate(new Date(data)),
            }
            
            let result = await instanciasRecrutamentosCadastraPost(json)

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
                navigate(`/instancia/${instancia.id}/recrutamentos`);
            }
            
        }

        setSubmit(false)

    }


    return {

        nome: {
            value: nome,
            set: setNome,
        },
        email: {
            value: email,
            set: setEmail,
        },
        telefone: {
            value: telefone,
            set: setTelefone,
        },
        ufMora: {
            value: ufMora,
            set: setUfMora,
        },
        cidadeMora: {
            value: cidadeMora,
            set: setCidadeMora,
        },
        origemRecrutamento: {
            value: origemRecrutamento,
            set: setOrigemRecrutamento,
        },
        data:{
            value: data,
            set: setData,
        },
        instancia: {
            value: instancia,
            set: _getInstancia,
        },
        submit: {
            value: submit,
            set: _instanciasRecrutamentosCadastraPost,
        },
    }

}

export default useInstanciaRecrutamentosCadastrarState;

