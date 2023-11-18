const endpoints = {
    csrf: "csrf/",
    user:{
        register: "user/register/",
        login: "user/login/",
    },
    administracao:{
        organizacoes:{
            lista: "administracao/organizacao/"
        },
        instancias:{
            lista: "administracao/instancia/",
            cadastra:"administracao/instancia/",
            vincula:"administracao/instancia/vincula/",
        },
        funcao:{
            cadastra:"administracao/funcao/",
            lista: "administracao/funcao/",
            vincula:"administracao/funcao/vincula/",
        },
    },
    instancias:{
        lista: "instancias/",
        busca: "instancia/",
        cadastra:"instancias/",
        convite:"instancias/convite/",
        permissao:"instancias/permissao/",
        militante:{
            cadastra:"instancias/militante/", 
            delete:"instancias/militante/remover/", 
            vincula:"instancias/militante/vincular/",
        },
        assistente:{
            vincula:"instancias/assistente/vincular/",
            delete:"instancias/assistente/remover/",
        },
        secretario:{
            cadastra:"instancias/secretario/cadastra/", 
            delete:"instancias/secretario/remover/", 
        },
        recrutamentos:{
            cadastra:"instancias/recrutamentos/cadastra/", 
            altera:"instancias/recrutamentos/altera/", 
            lista:"instancias/recrutamentos/", 
            detalhe:"instancias/recrutamento/", 
            acao:"instancias/recrutamentos/acao/",
        },
    },
    militantes:{
        lista: "militantes/",
        busca: "militancia/",
    },
    assistentes:{
        lista: "assistentes/",
    },
    secretarios:{
        lista: "secretarios/",
    },
    usuario:{
        buscar:'usuario/',
        atualizar:'usuario/',
    },
    contribuicoes:{
        cadastrar:"contribuicoes/", 
        lista: "contribuicoes/",
    }
};

export default endpoints;