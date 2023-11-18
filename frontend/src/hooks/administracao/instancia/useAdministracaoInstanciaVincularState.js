import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { administracaoOrganizacaoGet } from "../../../services/administracao/organizacoes/administracaoOrganizacaoGet";
import { administracaoInstanciasGet } from "../../../services/administracao/instancias/administracaoInstanciasGet";

import { administracaoInstanciasVincularPost } from "../../../services/administracao/instancias/administracaoInstanciasVincularPost";


const useAdministracaoInstanciaVincularState = () => {

    const navigate = useNavigate();


    const [militante, setMilitante] = useState("");
    const [organizacao, setOrganizacao] = useState(0);
    const [organizacoes, setOrganizacoes] = useState([]);
    
    const [instancia, setInstancia] = useState(0);
    const [instancias, setInstancias] = useState([]);

    const [submit, setSubmit] = useState(false);

    const _getInstancias= async () => {

        let result = await administracaoInstanciasGet(organizacao)
        if (result.type === 'success'){
            setInstancias(result.data)
        }

    }

    const _getOrganizacoes = async () => {

        let result = await administracaoOrganizacaoGet()
        if (result.type === 'success'){
            setOrganizacoes(result.data)
        }

    }

    const _administracaoInstanciasPost= async () => {
        if (submit) {
            return;
        }

        setSubmit(true)

        let isMilitanteValid = false;
        let isOrganizacaoValid = false;
        let isIstanciaValid = false

        if (militante === "" ) {
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


        

        if (isMilitanteValid && isOrganizacaoValid && isIstanciaValid){

            let json = {
                organizacao: organizacao,
                instancia: instancia,
                militante: militante,
            }
            
            let result = await administracaoInstanciasVincularPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Militante vinculado a instancia com sucesso');
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
        organizacao: {
            value: organizacao,
            set: setOrganizacao,
        },
        organizacoes: {
            value: organizacoes,
            set: _getOrganizacoes,
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
            set: _administracaoInstanciasPost,
        },
    }

}

export default useAdministracaoInstanciaVincularState;
