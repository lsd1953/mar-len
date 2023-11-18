import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import validEmail from "../../utils/validEmail";
import { userLoginPost } from "../../services/user/userLoginPost";
import { AuthContext } from "../../contexts/auth";

const useUserLoginState = () => {

    const navigate = useNavigate();
    const { signIn } = useContext(AuthContext);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [submit, setSubmit] = useState(false);

    const _userLoginPost = async () => {
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
        if (password === "" ) {
            
            toast.error('Informe uma senha válido');
        }
        else {
            isPasswordValid = true;
        }

        if (isEmailValid && isPasswordValid){
            let json = {
                email: email,
                senha: password
            }
            
            let result = await userLoginPost(json)
            if (result.type === 'error'){
                if (result.data.email){
                    toast.error(result.data.email[0])
                }
                if (result.data.senha){
                    toast.error(result.data.senha[0])
                }
            }
            else if (result.type === 'success'){
                let state = await signIn(result.data);
                navigate("/dashboard");
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
        submit: {
            value: submit,
            set: _userLoginPost,
        },
    }

}

export default useUserLoginState;