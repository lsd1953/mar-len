import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { administracaoOrganizacaoGet } from "../../../services/administracao/organizacoes/administracaoOrganizacaoGet";
import { administracaoFuncaoPost } from "../../../services/administracao/funcao/administracaoFuncaoPost";


const useAdministracaoFuncaoCadastrarState = () => {

    const navigate = useNavigate();


    const [nome, setNome] = useState("");
    const [organizacao, setOrganizacao] = useState(0);
    const [organizacoes, setOrganizacoes] = useState([]);
    const [cadastra, setCadastra ] = useState(false);
    const [financeiro, setFinanceiro] = useState(false);
    const [assistencia, setAssistencia] = useState(false);
    

    const [submit, setSubmit] = useState(false);


    const _getOrganizacoes = async () => {

        let result = await administracaoOrganizacaoGet()
        if (result.type === 'success'){
            setOrganizacoes(result.data)
        }

    }

    const _administracaoFuncaoPost= async () => {
        if (submit) {
            return;
        }

        setSubmit(true)

        let isNomeValid = false;
        let isOrganizacaoValid = false;

        if (nome === "" ) {
            toast.error('Informe um nome válido');
        }
        else {
            isNomeValid = true;
        }

        if (organizacao < 1) {
            
            toast.error('Informe uma organização válida');
        }
        else {
            isOrganizacaoValid = true;
        }


        if (isNomeValid && isOrganizacaoValid){

            let json = {
                nome: nome,
                organizacao: organizacao,
                cadastra: cadastra,
                financeiro: financeiro,
                assistencia: assistencia,
            }
            
            let result = await administracaoFuncaoPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Função criada com sucesso');
                navigate("/dashboard");
            }
            
        }

        setSubmit(false)

    }


    return {
        nome: {
            value: nome,
            set: setNome,
        },
        organizacao: {
            value: organizacao,
            set: setOrganizacao,
        },
        organizacoes: {
            value: organizacoes,
            set: _getOrganizacoes,
        },
        cadastra: {
            value: cadastra,
            set: setCadastra,
        },
        financeiro: {
            value: financeiro,
            set: setFinanceiro,
        },
        assistencia: {
            value: assistencia,
            set: setAssistencia,
        },
        submit: {
            value: submit,
            set: _administracaoFuncaoPost,
        },
    }

}

export default useAdministracaoFuncaoCadastrarState;
