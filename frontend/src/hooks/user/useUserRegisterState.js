import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import validPassword from "../../utils/validPassword";
import validEmail from "../../utils/validEmail";
import { userRegisterPost } from "../../services/user/userRegisterPost";


const useUserRegisterState = () => {

    const navigate = useNavigate();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const [submit, setSubmit] = useState(false);

    const _userRegisterPost = async () => {
        if (submit) {
            return;
        }

        setSubmit(true)

        let isEmailValid = false;
        let isPasswordValid = false;

        if (email === "" || !validEmail(email)) {
            
            toast.error('Informe um e-mail válido');
        }
        else {
            isEmailValid = true;
        }
        if (password === "" || !validPassword(password)) {
            
            toast.error(
                'A senha é muito fraca. A senha precisa ter 8 caracteres ou mais, letras e numeros.'
            );
        }
        else if (password2 !== password) {
            toast.error(
                'As senhas são diferentes'
             );
        } else {
            isPasswordValid = true;
        }

        if (isEmailValid && isPasswordValid){
            let json = {
                email: email,
                senha: password,
                senha2: password2
            }
            
            let result = await userRegisterPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                toast.success('Usuário criado com sucesso');
                navigate("/login");
            }
            
        }

        setSubmit(false)

    }

    return {
        email: {
            value: email,
            set: setEmail,
        },
        password: {
            value: password,
            set: setPassword,
        },
        password2: {
            value: password2,
            set: setPassword2,
        },
        submit: {
            value: submit,
            set: _userRegisterPost,
        },
    }

}

export default useUserRegisterState;