import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import copy from "copy-to-clipboard";

import { instanciaGet } from "../../services/instancias/instanciaGet";
import { militantesGet } from "../../services/militantes/militantesGet";
import { instanciasGet } from "../../services/instancias/instanciasGet";
import { secretariosGet } from "../../services/secretarios/secretariosGet";
import { instanciasConviteGet } from "../../services/instancias/instanciasConviteGet";
import formatDateTime from "../../utils/formatDateTime";
import { instanciaPermissaoGet } from "../../services/instancias/instanciaPermissaoGet";


const useInstanciaState = () => {

    const navigate = useNavigate();


    const [instancia, setInstancia] = useState(null);
    const [permissao, setPermissao] = useState({
        "assistente": false,
        "cadastra": false,
        "financeiro": false
      });
    const [militantes, setMilitantes] = useState([]);
    const [secretarios, setSecretarios] = useState([]);
    
    const [instanciasInferiores, setInstanciasInferiores] = useState([]);
    

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    const _getConvite = async (id) => {

        let result = await instanciasConviteGet(id)
        if (result.type === 'success'){
            copy(result.data.codigo);
            toast.success(`Convite válido até ${formatDateTime(new Date(result.data.expira))} e copiado.`);
        }

    }

    const _getSecretarios = async (id) => {

        let result = await secretariosGet(id)
        if (result.type === 'success'){
            setSecretarios(result.data)
        }

    }

    const _getMilitantes = async (id) => {

        let result = await militantesGet(id)
        if (result.type === 'success'){
            setMilitantes(result.data)
        }

    }

    const _getInstanciasInferiores = async (id, organizacao) => {
        let result = await instanciasGet(id, organizacao)
        if (result.type === 'success'){
            setInstanciasInferiores(result.data)
        }

    }

    const _getPermissao = async (id) => {
        let result = await instanciaPermissaoGet(id)
        if (result.type === 'success'){
            setPermissao(result.data)
        }
    }

    const _getInstancia = async (id) => {

        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstancia(result.data)
        }
        setLoading(false)

    }


    return {

        instancia: {
            value: instancia,
            set: _getInstancia,
        },
        permissao: {
            value: permissao,
            set: _getPermissao,
        },
        militantes: {
            value: militantes,
            set: _getMilitantes,
        },
        secretarios: {
            value: secretarios,
            set: _getSecretarios,
        },
        loading:{
            value: loading,
            set: ()=>{console.log('não implementado')},            
        },
        instanciasInferiores: {
            value: instanciasInferiores,
            set: _getInstanciasInferiores,
        },
        convite: {
            value: ()=>{console.log('não implementado')},
            set: _getConvite,
        },
        submit: {
            value: submit,
            set: ()=>{console.log('não implementado')},
        },
    }

}

export default useInstanciaState;

