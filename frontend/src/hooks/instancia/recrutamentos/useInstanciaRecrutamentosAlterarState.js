import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciaGet } from "../../../services/instancias/instanciaGet";
import formatDate from "../../../utils/formatDate";
import { instanciasRecrutamentosCadastraPost } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosCadastraPost";
import { instanciasRecrutandoGet } from "../../../services/instancias/recrutamentos/instanciasRecrutandoGet";
import { instanciasRecrutamentosAlterarPut } from "../../../services/instancias/recrutamentos/instanciasRecrutamentosAlterarPut";



const useInstanciaRecrutamentosAlterarState = () => {

    const navigate = useNavigate();


    const [nome, setNome] = useState('');
    const [recrutamento, setRecrutamento] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [ufMora, setUfMora] = useState('');
    const [cidadeMora, setCidadeMora] = useState('');
    const [status, setStatus] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [sindicato, setSindicato] = useState('');
    const [sindicalizado, setSindicalizado] = useState(false);
    const [atuacao, setAtuacao] = useState('');
    const [vinculoTrabalhista, setVinculoTrabalhista] = useState('');
    const [tipoTrabalho, setTipoTrabalho] = useState('');
    const [instancia, setInstancia] = useState(null);
    

    const [submit, setSubmit] = useState(false);
    

    const _getRecrutando = async (id) =>{
        let result = await instanciasRecrutandoGet(instancia, id)
        if (result.type === 'success'){
            setNome(result.data.nome)
            setRecrutamento(id)
            setEmail(result.data.email)
            setTelefone(result.data.telefone)
            setUfMora(result.data.uf_mora)
            setCidadeMora(result.data.cidade_mora)
            setCategoria(result.data.categoria)
            setSindicato(result.data.sindicato)
            setSindicalizado(result.data.sindicalizado)
            setAtuacao(result.data.atuacao)
            setVinculoTrabalhista(result.data.vinculo_trabalhista)
            setTipoTrabalho(result.data.tipo_trabalho)
        }
    }

    const _instanciasRecrutamentosAlteraPut = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)


        let isNomeValid = false;
        let isTelefoneValid = false;
        let isIstanciaValid = false;

        if (nome === '' ) {
            toast.error('Informe um nome válido');
        }
        else {
            isNomeValid = true;
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
                instancia: instancia,
                recrutamento: recrutamento,
                nome: nome,
                email: email,
                telefone: telefone,
                uf_mora: ufMora,
                cidade_mora: cidadeMora,
                status: status,
                categoria: categoria,
                sindicato: sindicato,
                sindicalizado: sindicalizado,
                atuacao: atuacao,
                vinculo_trabalhista: vinculoTrabalhista,
                tipo_trabalho: tipoTrabalho
            }
            
            let result = await instanciasRecrutamentosAlterarPut(json)

            if (result.type === 'error'){
                if (result.data?.detail?.telefone){
                    toast.error(result.data.detail.telefone[0])
                }
                if (result.data?.detail?.instancia){
                    toast.error(result.data.detail.instancia[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Recrutando alterado com sucesso');
                navigate(`/instancia/${instancia}/recrutamentos/detalhe/${recrutamento}`);
            }
            
        }

        setSubmit(false)

    }


    return {
        recrutamento: {
            value: recrutamento,
            set: _getRecrutando,
        },
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
        instancia: {
            value: instancia,
            set: setInstancia,
        },
        categoria: {
            value: categoria,
            set: setCategoria,
        },
        sindicato: {
            value: sindicato,
            set: setSindicato,
        },
        sindicalizado: {
            value: sindicalizado,
            set: setSindicalizado,
        },
        atuacao: {
            value: atuacao,
            set: setAtuacao,
        },
        vinculoTrabalhista: {
            value: vinculoTrabalhista,
            set: setVinculoTrabalhista,
        },
        tipoTrabalho: {
            value: tipoTrabalho,
            set: setTipoTrabalho,
        },
        status: {
            value: status,
            set: setStatus,
        },
        submit: {
            value: submit,
            set: _instanciasRecrutamentosAlteraPut,
        },
    }

}

export default useInstanciaRecrutamentosAlterarState;

