import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { administracaoOrganizacaoGet } from "../../../services/administracao/organizacoes/administracaoOrganizacaoGet";
import { administracaoInstanciasGet } from "../../../services/administracao/instancias/administracaoInstanciasGet";
import { administracaoInstanciasPost } from "../../../services/administracao/instancias/administracaoInstanciasPost";


const useAdministracaoInstanciaCadastrarState = () => {

    const navigate = useNavigate();


    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [organizacao, setOrganizacao] = useState(0);
    const [organizacoes, setOrganizacoes] = useState([]);
    
    const [instanciaSuperior, setInstanciaSuperior] = useState(0);
    const [instancias, setInstancias] = useState([]);
    const [tipo, setTipo] = useState(null);

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

        let isNomeValid = false;
        let isOrganizacaoValid = false;
        let isTipoValid = false

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

        if (tipo < 0) {
            
            toast.error('Informe um tipo válido');
        }
        else {
            isTipoValid = true;
        }

        if (isNomeValid && isOrganizacaoValid && isTipoValid){

            let json = {
                nome: nome,
                categoria: categoria,
                organizacao: organizacao,
                superior: instanciaSuperior,
                tipo: tipo,
                codigo:'-',
                slug:'-'
            }
            
            let result = await administracaoInstanciasPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Instancia criada com sucesso');
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
        categoria: {
            value: categoria,
            set: setCategoria,
        },
        organizacao: {
            value: organizacao,
            set: setOrganizacao,
        },
        organizacoes: {
            value: organizacoes,
            set: _getOrganizacoes,
        },
        instanciaSuperior: {
            value: instanciaSuperior,
            set: setInstanciaSuperior,
        },
        instancias: {
            value: instancias,
            set: _getInstancias,
        },
        tipo: {
            value: tipo,
            set: setTipo,
        },
        submit: {
            value: submit,
            set: _administracaoInstanciasPost,
        },
    }

}

export default useAdministracaoInstanciaCadastrarState;
