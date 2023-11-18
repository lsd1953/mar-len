import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usuarioGet } from "../services/user/usuarioGet";
import { usuarioPut } from "../services/user/usuarioPut";
import toast from "react-hot-toast";
import { instanciasConvitePost } from "../services/instancias/instanciasConvitePost";


const useConviteState = () => {

    const navigate = useNavigate();

    const [convite, setConvite] = useState('');

    const [submit, setSubmit] = useState(false);


    
    const _postConvite = async () => {
        if (submit){
            return ;
        }

        setSubmit(true)

        let json = {
            convite: convite
        }

        let result = await instanciasConvitePost(json)
       
        if (result.type === 'success'){
            toast.success('Convite Utilziado com sucesso!');
            navigate('/dashboard')
        }
        else if (result.data.detail?.convite){
            toast.error(result.data.detail?.convite[0]);
        }
        else {
            toast.error('Convite não localizado!');
        }
        setSubmit(false)
    }



    return {
        convite: {
            value: convite,
            set: setConvite,
        },
  
        submit: {
            value: submit,
            set: _postConvite,
        },
    }

}

export default useConviteState;
