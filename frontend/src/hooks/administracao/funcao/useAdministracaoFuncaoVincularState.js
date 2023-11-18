import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { administracaoOrganizacaoGet } from "../../../services/administracao/organizacoes/administracaoOrganizacaoGet";
import { administracaoInstanciasGet } from "../../../services/administracao/instancias/administracaoInstanciasGet";

import { militantesGet } from "../../../services/militantes/militantesGet";
import { administracaoFuncoesGet } from "../../../services/administracao/funcao/administracaoFuncoesGet";
import { administracaoFuncoesVincularPost } from "../../../services/administracao/funcao/administracaoFuncoesVincularPost";


const useAdministracaoFuncaoVincularState = () => {

    const navigate = useNavigate();



    const [organizacao, setOrganizacao] = useState(0);
    const [organizacoes, setOrganizacoes] = useState([]);
    
    const [instancia, setInstancia] = useState(0);
    const [instancias, setInstancias] = useState([]);

    const [militante, setMilitante] = useState(0);
    const [militantes, setMilitantes] = useState([]);

    const [funcao, setFuncao] = useState(0);
    const [funcoes, setFuncoes] = useState([]);

    const [submit, setSubmit] = useState(false);

    const _getMilitantes= async () => {

        let result = await militantesGet(instancia)
        if (result.type === 'success'){
            setMilitantes(result.data.map(item=>{ return ({id:item.id, nome: item.apelido})}))
        }

    }

    const _getInstancias= async () => {

        let result = await administracaoInstanciasGet(organizacao)
        if (result.type === 'success'){
            setInstancias(result.data)
        }

    }

    const _getFuncoes = async () => {

        let result = await administracaoFuncoesGet(organizacao)
        if (result.type === 'success'){
            setFuncoes(result.data)
        }

    }

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

        let isMilitanteValid = false;
        let isOrganizacaoValid = false;
        let isIstanciaValid = false
        let isFuncaoValid = false

        if (militante < 1 ) {
            toast.error('Informe um código de militante válido');
        }
        else {
            isMilitanteValid = true;
        }

        

        if (organizacao < 1) {
            
            toast.error('Informe uma organização válida');
        }
        else {
            isOrganizacaoValid = true;
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


        

        if (isMilitanteValid && isOrganizacaoValid && isIstanciaValid && isFuncaoValid){

            let json = {
                organizacao: organizacao,
                instancia: instancia,
                militante: militante,
                funcao: funcao,
            }
            
            let result = await administracaoFuncoesVincularPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Função definida com sucesso');
                navigate("/dashboard");
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
        organizacao: {
            value: organizacao,
            set: setOrganizacao,
        },
        organizacoes: {
            value: organizacoes,
            set: _getOrganizacoes,
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
            set: setInstancia,
        },
        instancias: {
            value: instancias,
            set: _getInstancias,
        },
        submit: {
            value: submit,
            set: _administracaoFuncaoPost,
        },
    }

}

export default useAdministracaoFuncaoVincularState;
