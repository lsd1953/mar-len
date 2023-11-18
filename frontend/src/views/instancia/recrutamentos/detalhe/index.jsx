import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";

import Application from "../../../../components/application";
import MyLoading from "../../../../components/myLoading";
import MyPanel from "../../../../components/myPanel";
import MyLabel from "../../../../components/myLabel";
import MyButton from "../../../../components/myButton";
import MySelect from "../../../../components/mySelect";
import useInstanciaRecrutamentosCadastrarState from "../../../../hooks/instancia/recrutamentos/useInstanciaRecrutamentosCadastrarState";

import Styles from "./style";
import MyInput from "../../../../components/myInput";
import MyDataInput from "../../../../components/myDataInput";
import useInstanciaRecrutamentosDetalheState from "../../../../hooks/instancia/recrutamentos/useInstanciaRecrutamentosDetalheState";
import { DataGrid } from "@mui/x-data-grid";


const Linha = ({children}) => {

    return (
        <Box sx={{display:'flex', justifyContent:'space-between'}}>
            {children}
        </Box>
    )
}

const Informacao = ({title, value}) => {

    return (
        <Box sx={{display:'flex'}}>
            <Box>
                <MyLabel sx={{ fontSize: "12pt", fontWeight: 600,}} component="p" text={`${title}:`} />
            </Box>

            {
                title === 'Sindicalizado' ?
                <Box sx={{marginLeft:'5px'}}>
                    <MyLabel component="p"  text={value?'Sim':'Não'} />
                </Box>
                :
                <Box sx={{marginLeft:'5px'}}>
                    <MyLabel component="p"  text={value !==''?value:'Indefinido'} />
                </Box>
            }
        </Box>
    )

}
const InstanciaRecrutamentosDetalhe = () => {

    let { id, idRecruta } = useParams();   
    const navigate = useNavigate(); 
    
    const states = useInstanciaRecrutamentosDetalheState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, []);

    useEffect(() => {
        if (states.instancia.value > 0){
            states.recrutando.set(idRecruta)
        }
        
    }, [states.instancia.value]);

    useEffect(() => {
        if (states.recrutando.value?.id > 0){
            states.acoes.set()
        }
    }, [states.recrutando.value]);

    const columns = [
        { field: "data", headerName: "Data", width: 130 },
        { field: "tipo", headerName: "Tipo", width: 250 },
        { field: "descricao", headerName: "Descricao", width: 400 },        
      ];

    const handlerAcao = () => {
        navigate(`/instancia/${id}/recrutamentos/detalhe/${idRecruta}/acao`);
    }

    const handlerAlterar = () => {
        navigate(`/instancia/${id}/recrutamentos/detalhe/${idRecruta}/alterar`);
    }

    let style = Styles()

    return (
        <Application>
            <Box>
                <MyLoading render={states.submit.value} />
                <Stack spacing={2} >
                <MyLabel sx={style.title} component="h1" text="Recrutando" />
                <MyPanel>
                    
                    {
                        states.recrutando.value ?
                        <Stack spacing={2} >
                            <Linha>
                                <MyLabel sx={style.title2} component="h2" text={states.recrutando.value.nome} />
                            </Linha>
                            <Linha>
                                
                                <Informacao title='Data Cadastro' value={states.recrutando.value.data} />
                                <Informacao title='Status' value={states.recrutando.value.status_texto} />
                            </Linha>
                            <Linha>
                                <Informacao title='Telefone' value={states.recrutando.value.telefone} />
                                <Informacao title='E-mail' value={states.recrutando.value.email} />
                            </Linha>
                            <Linha>
                                <Informacao title='Cidade' value={states.recrutando.value.cidade_mora} />
                                <Informacao title='UF' value={states.recrutando.value.uf_mora} />
                            </Linha>
                            <Linha>
                                <Informacao title='Categoria' value={states.recrutando.value.categoria} />
                                <Informacao title='Tipo de Trabalho:' value={states.recrutando.value.tipo_trabalho} />
                                <Informacao title='Vinculo trabalhista:' value={states.recrutando.value.vinculo_trabalhista} />
                            </Linha>                            
                            <Linha>
                                <Informacao title='Sindicalizado' value={states.recrutando.value.sindicalizado} />
                            </Linha>
                            <Linha>
                                <Informacao title='Sindicato' value={states.recrutando.value.sindicato} />
                                <Informacao title='Atuação' value={states.recrutando.value.atuacao} />
                            </Linha>
                            <Linha>
                                <Informacao title='Origem do recrutamento' value={states.recrutando.value.origem} />
                            </Linha>

                            <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr" , gap:'5px'}}>
                                <MyButton onClick={handlerAcao} color="success" text="Cadastrar Ação" variant="contained"/>
                                <MyButton onClick={handlerAlterar} color="warning" text="Alterar Informações" variant="contained"/>
                                <MyButton color="error" text="Vincular Militante" variant="contained"/>
                            </Box> 
                            
                            <MyLabel sx={style.title3} component="h3" text='Ações executadas:' />
                            <Box sx={{ height: 400, width: "100%" }}>
                                <DataGrid
                                    rows={states.acoes.value}
                                    columns={columns}
                                    initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                    }}
                                    pageSizeOptions={[5, 10]}
                                    disableColumnSelector
                                />
                            </Box> 
                        </Stack>
                        : null
                    }
                </MyPanel>
                </Stack>
                
            </Box>
        </Application>
    )
}

export default InstanciaRecrutamentosDetalhe;

