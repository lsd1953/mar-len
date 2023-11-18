import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { contribuicoesCadastrarPost } from "../../services/contribuicoes/contribuicoesCadastrarPost";
import formatDate from "../../utils/formatDate";
import { AuthContext } from "../../contexts/auth";


const useContribuicoesCadastrarState = () => {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [instancia, setInstancia] = useState(0);
    const [referencia, setReferencia] = useState(null);
    const [descricao, setDescricao] = useState('');
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState(null);
    const [data, setData] = useState(null);

    

    const [submit, setSubmit] = useState(false);

    const _contribuicoesCadastrarPost = async () => {
        if (submit) {
            return;
        }

        
        setSubmit(true)

        let isValorValid = false;
        let isInstanciaValid = false;
        let isDataValid = false;
        let isTipoValid = false;
        let isReferenciaValid = false;

        if (tipo === "" ) {
            toast.error('Informe um tipo válido');
        }
        else {
            isTipoValid = true;
        }

        if (data === null ) {
            toast.error('Informe uma data válida');
        }
        else {
            isDataValid = true;
        }

        if (valor === null ) {
            toast.error('Informe um valor');
        }
        else {
            isValorValid = true;
        }

        if (referencia === null ) {
            toast.error('Informe uma Referencia');
        }
        else {
            isReferenciaValid = true;
        }

        if (instancia < 1) {
            
            toast.error('Informe uma instancia válida');
        }
        else {
            isInstanciaValid = true;
        }


        if (isValorValid && isInstanciaValid && isDataValid && isTipoValid && isReferenciaValid){


            let json = {
                militante: user.value.militante_id,
                instancia: instancia,
                descricao: descricao,
                referencia: referencia,
                tipo: tipo,
                valor: valor,
                data: formatDate(new Date(data)),
            }
            
            let result = await contribuicoesCadastrarPost(json)
            if (result.type === 'error'){
                toast.error('Erro ao cadastrar.');
            }
            else if (result.type === 'success'){
                toast.success('Contribuição cadastrada com sucesso');
                navigate("/contribuicoes");
            }
            
        }

        setSubmit(false)

    }


    return {

        instancia: {
            value: instancia,
            set: setInstancia,
        },
        descricao: {
            value: descricao,
            set: setDescricao,
        },
        referencia:{
            value: referencia,
            set: setReferencia,
        },
        valor: {
            value: valor,
            set: setValor,
        },
        tipo: {
            value: tipo,
            set: setTipo,
        },
        data: {
            value: data,
            set: setData,
        },
        submit: {
            value: submit,
            set: _contribuicoesCadastrarPost,
        },
    }

}

export default useContribuicoesCadastrarState;
