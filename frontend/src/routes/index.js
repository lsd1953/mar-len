import { Fragment, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Cookies from 'js-cookie'

import { AuthContext } from "../contexts/auth";
import MyLoading from "../components/myLoading";
import Contribuicoes from "../views/contribuicoes";
import Dashboard from "../views/dashboard";
import Index from "../views/index";
import Instancia from "../views/instancia";
import InstanciaCadastrar from "../views/instanciaCadastrar";
import Login from "../views/login";
import Registration from "../views/registration";
import Usuario from "../views/usuario";
import AdministracaoInstanciaCadastrar from "../views/administracao/instancia/cadastrar";
import AdministracaoInstanciaVincular from "../views/administracao/instancia/vincular";
import AdministracaoFuncaoCadastrar from "../views/administracao/funcao/cadastrar";
import AdministracaoFuncaoVincular from "../views/administracao/funcao/vincular";
import InstanciaMilitanteCadastrar from "../views/instancia/militante/cadastrar";
import InstanciaMilitanteRemover from "../views/instancia/militante/remover";
import InstanciaMilitanteVincular from "../views/instancia/militante/vincular";
import InstanciaAssistenciaVincular from "../views/instancia/assistencia/vincular";
import InstanciaSecretariasRemover from "../views/instancia/secretarias/remover";
import InstanciaSecretariasCadastrar from "../views/instancia/secretarias/cadastrar";
import InstanciaAssistenciaRemover from "../views/instancia/assistencia/remover";
import ContribuicoesCadastrar from "../views/contribuicoes/cadastrar";
import Convite from "../views/convite";
import InstanciaRecrutamentos from "../views/instancia/recrutamentos";
import InstanciaRecrutamentosCadastrar from "../views/instancia/recrutamentos/cadastrar";
import InstanciaRecrutamentosDetalhe from "../views/instancia/recrutamentos/detalhe";
import InstanciaRecrutamentosAcao from "../views/instancia/recrutamentos/acao";
import InstanciaRecrutamentosAlterar from "../views/instancia/recrutamentos/alterar";



const Private = ({ Item }) => {
  const { user, signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(!user.value);
  
  
  
  useEffect(() => {
      const session = Cookies.get('marlen@data') && JSON.parse(Cookies.get('marlen@data'))
      if (session && session.user !== "" && session.token !== "" && !user.value) {
        signIn(session);
      }
      setLoading(false);
      
  }, []);

  return loading? <MyLoading render={true}/> : user.value ? <Item /> : <Login />;
};



const RoutesApp = () => {

    return (
        <>
            <BrowserRouter>
                <Fragment>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route
                            exact
                            path="/registration"
                            element={<Registration />}
                        />
                        <Route path="/dashboard" element={<Private Item={Dashboard} />} />
                        <Route path="/usuario" element={<Private Item={Usuario} />} />
                        <Route path="/contribuicoes" element={<Private Item={Contribuicoes} />} />
                        <Route path="/convite" element={<Private Item={Convite} />} />
                        <Route path="/contribuicoes/:id/cadastrar" element={<Private Item={ContribuicoesCadastrar} />} />

                        <Route path="/instancia/:id/cadastrar" element={<Private Item={InstanciaCadastrar} />} />
                        <Route path="/instancia/:id/recrutamentos/cadastrar" element={<Private Item={InstanciaRecrutamentosCadastrar} />} />
                        <Route path="/instancia/:id/recrutamentos" element={<Private Item={InstanciaRecrutamentos} />} />
                        <Route path="/instancia/:id/recrutamentos/detalhe/:idRecruta" element={<Private Item={InstanciaRecrutamentosDetalhe} />} />
                        <Route path="/instancia/:id/recrutamentos/detalhe/:idRecruta/acao" element={<Private Item={InstanciaRecrutamentosAcao} />} />
                        <Route path="/instancia/:id/recrutamentos/detalhe/:idRecruta/alterar" element={<Private Item={InstanciaRecrutamentosAlterar} />} />
                        
                        
                        
                        
                        <Route path="/instancia/:id/militante/cadastrar" element={<Private Item={InstanciaMilitanteCadastrar} />} />
                        <Route path="/instancia/:id/militante/remover" element={<Private Item={InstanciaMilitanteRemover} />} />
                        <Route path="/instancia/:id/militante/vincular" element={<Private Item={InstanciaMilitanteVincular} />} />
                        <Route path="/instancia/:id/assistencia/vincular" element={<Private Item={InstanciaAssistenciaVincular} />} />
                        <Route path="/instancia/:id/assistencia/remover" element={<Private Item={InstanciaAssistenciaRemover} />} />
                        <Route path="/instancia/:id/secretarias/remover" element={<Private Item={InstanciaSecretariasRemover} />} />
                        <Route path="/instancia/:id/secretarias/cadastrar" element={<Private Item={InstanciaSecretariasCadastrar} />} />
                        <Route path="/instancia/:id" element={<Private Item={Instancia} />} />
                        

                        <Route path="/administracao/instancia/cadastrar" element={<Private Item={AdministracaoInstanciaCadastrar} />} />
                        <Route path="/administracao/instancia/vincular" element={<Private Item={AdministracaoInstanciaVincular} />} />
                        <Route path="/administracao/funcao/cadastrar" element={<Private Item={AdministracaoFuncaoCadastrar} />} />
                        <Route path="/administracao/funcao/vincular" element={<Private Item={AdministracaoFuncaoVincular} />} />
                        
                        <Route path="/" element={<Index />} />
                        <Route path="*" element={<Index />} />
                    </Routes>
                </Fragment>
            </BrowserRouter>


            <Toaster 
            position="top-center" 
            containerStyle={{

            }}
            toastOptions={{
                success: {
                    style: {
                      background: '#e3fff5',
                      border: '1px solid #00eeb0',
                    },
                  },
                  error: {
                    style: {
                      background: '#fff1f1',
                      border: '1px solid #ff6c6c',
                    },
                  },

                style: {
                    padding:'10px',
                    color: 'black',
                    fontSize: '13pt',
                    boxShadow: '10px 7px 10px 0px rgba(0, 0, 0, 0.36)',
                },
              }}/>
        
        </>
    );
};

export default RoutesApp;
