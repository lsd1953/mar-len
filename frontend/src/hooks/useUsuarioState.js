import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioGet } from "../services/user/usuarioGet";
import { usuarioPut } from "../services/user/usuarioPut";
import toast from "react-hot-toast";


const useUsuarioState = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [salario, setSalario] = useState(null);
    const [categoria, setCategoria] = useState('');
    const [sindicato, setSindicato] = useState('');
    const [sindicalizado, setSindicalizado] = useState(false);
    const [atuacao, setAtuacao] = useState('');
    const [vinculoTrabalhista, setVinculoTrabalhista] = useState('');
    const [tipoTrabalho, setTipoTrabalho] = useState('');
    

    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(true);

    const _getUsuario = async () => {
        setLoading(true)
        let result = await usuarioGet()
        if (result.type === 'success'){
            setEmail(result.data.email)
            setNome(result.data.nome)
            setApelido(result.data.apelido)
            setSalario(result.data.salario)
            setCategoria(result.data.categoria)
            setSindicato(result.data.sindicato)
            setSindicalizado(result.data.sindicalizado)
            setAtuacao(result.data.atuacao)
            setVinculoTrabalhista(result.data.vinculo_trabalhista)
            setTipoTrabalho(result.data.tipo_trabalho)
        }
        setLoading(false)
    }

    const _postUsuario = async () => {
        if (submit){
            return ;
        }

        setSubmit(true)

        let json = {
            email: email,
            nome: nome,
            apelido: apelido,
            salario: salario,
            categoria: categoria,
            sindicato: sindicato,
            sindicalizado: sindicalizado,
            atuacao: atuacao,
            vinculo_trabalhista: vinculoTrabalhista,
            tipo_trabalho: tipoTrabalho
        }

        let result = await usuarioPut(json)
       
        if (result.type === 'success'){
            toast.success('Dados de usuário atualziados com sucesso!');
        }
        setSubmit(false)
    }



    return {
        nome: {
            value: nome,
            set: setNome,
        },
        sindicato: {
            value: sindicato,
            set: setSindicato,
        },
        apelido: {
            value: apelido,
            set: setApelido,
        },        
        salario: {
            value: salario,
            set: setSalario,
        },        
        vinculoTrabalhista: {
            value: vinculoTrabalhista,
            set: setVinculoTrabalhista,
        },        
        tipoTrabalho: {
            value: tipoTrabalho,
            set: setTipoTrabalho,
        },        
        email: {
            value: email,
            set: setEmail,
        },        
        sindicalizado: {
            value: sindicalizado,
            set: setSindicalizado,
        },   
        atuacao: {
            value: atuacao,
            set: setAtuacao,
        },
        categoria: {
            value: categoria,
            set: setCategoria,
        },    
        get: {
            value: loading,
            set: _getUsuario,
        },   
        submit: {
            value: submit,
            set: _postUsuario,
        },
    }

}

export default useUsuarioState;
