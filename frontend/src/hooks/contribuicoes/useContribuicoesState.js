import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioGet } from "../../services/user/usuarioGet";
import { instanciasGet }from "../../services/instancias/instanciasGet"
import { contribuicoesGet } from "../../services/contribuicoes/contribuicoesGet";


const useContribuicoesState = () => {

    const navigate = useNavigate();

    const [instancias, setInstancias] = useState([]);
    const [salario, setSalario] = useState(null);

    

    const [submit, setSubmit] = useState(false);

    const _getSalario = async () => {
        let result = await usuarioGet()
        if (result.type === 'success'){
            setSalario(result.data.salario)
        }
    }

    const _getInstancias= async () => {

        let result = await instanciasGet()
        if (result.type === 'success'){
            setInstancias(result.data.filter(item=>item.tipo===3))
        }

    }

    const _getContribuicoes = async (instancia) => {

        let result = await contribuicoesGet(instancia)
        if (result.type === 'success'){
            return result.data
        }
        else{
            return null
        }

    }


    return {
         
        instancias: {
            value: instancias,
            set: _getInstancias,
        },
        contribuicoes: {
            value: ()=>{console.log('não implementado')},
            set: _getContribuicoes,
        },
        salario: {
            value: salario,
            set: _getSalario,
        },
        submit: {
            value: submit,
            set: ()=>{console.log('não implementado')},
        },
    }

}

export default useContribuicoesState;
