import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { instanciasPost } from "../../services/instancias/instanciasPost";
import { instanciaGet } from "../../services/instancias/instanciaGet";



const useInstanciaCadastrarState = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [nome, setNome] = useState("");
    const [categoria, setCategoria] = useState("");
    const [instanciaSuperior, setInstanciaSuperior] = useState(0);
    const [organizacao, setOrganizacao] = useState(null);
    const [tipo, setTipo] = useState(null);
    const [tipos, setTipos] = useState(null);
    
    const [submit, setSubmit] = useState(false);


    const _getInstanciaSuperior = async (id) =>{

        let result = await instanciaGet(id)
        if (result.type === 'success'){
            setInstanciaSuperior(result.data.id)
            setOrganizacao(result.data.organizacao_id)
            if (result.data.tipo === 2){
                setTipo(3)
            }
            else if (result.data.tipo === 0){
                setTipos([
                    {id:1, nome: 'Fração'},
                    {id:2, nome: 'Estadual'},
                ])
            }
            setLoading(false)
            
        }
        
    }

    const _administracaoInstanciasPost= async () => {
        if (submit) {
            return;
        }

        setSubmit(true)

        let isNomeValid = false;

        if (nome === "" ) {
            toast.error('Informe um nome válido');
        }
        else {
            isNomeValid = true;
        }



        if (isNomeValid ){

            let json = {
                nome: nome,
                categoria: categoria,
                organizacao: organizacao,
                superior: instanciaSuperior,
                tipo: tipo,
                codigo:'-',
                slug:'-'
            }
            
            let result = await instanciasPost(json)
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
                navigate(`/instancia/${instanciaSuperior}`);
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
        instanciaSuperior: {
            value: instanciaSuperior,
            set: _getInstanciaSuperior,
        },
        tipo:{
            value: tipo,
            set:setTipo
        },
        tipos:{
            value: tipos,
            set:()=>console.log('não implementado')
        },
        loading:{
            value: loading,
            set:()=>console.log('não implementado')
        },
        submit: {
            value: submit,
            set: _administracaoInstanciasPost,
        },
    }

}

export default useInstanciaCadastrarState;
