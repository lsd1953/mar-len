import { createContext, useState } from "react";
import api from "../services/api";
import Cookies from 'js-cookie'

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();

    const signIn = (register) => {
        let token = register.token;
        api.defaults.headers.common.Authorization = `Bearer ${register.token}`;

        let user = register.user;

        let data = {
            user: user,
            token: token,
        };

        Cookies.set("marlen@data", JSON.stringify(data), { expires: 1 });
        setUser(user);
        return "SUCCESS";
    };

    const signOut = () => {
        api.defaults.headers.common.Authorization = `Bearer `;

        Cookies.remove("marlen@data");
        return "SUCCESS";
    };

    
    return (
        <AuthContext.Provider
            value={
                { 
                    user: {value:user, set: setUser}, 
                    signIn, 
                    signOut, 
                }}
        >
            {children}
        </AuthContext.Provider>
    );
};