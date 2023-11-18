import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Container, Stack } from "@mui/material";


import Styles from "./style";
import Application from "../../../components/application";
import MyPanel from "../../../components/myPanel";
import MyLabel from "../../../components/myLabel";
import MyInput from "../../../components/myInput";
import MyButton from "../../../components/myButton";
import { DataGrid } from "@mui/x-data-grid";
import useInstanciaRecrutamentosState from "../../../hooks/instancia/recrutamentos/useInstanciaRecrutamentosState";

const InstanciaRecrutamentos = () => {

    let { id } = useParams();    
    const navigate = useNavigate();

    const handlerCadastrar = () => {
        navigate(`/instancia/${id}/recrutamentos/cadastrar`);
    }
    
    const states = useInstanciaRecrutamentosState()

    
    useEffect(() => {
        states.instancia.set(id)
    }, [id]);

    useEffect(() => {
        if (states.instancia.value.id > 0)
        {
            states.recrutandos.set(states.instancia.value.id)
        }
    }, [states.instancia.value]);
    

    let style = Styles()

    const columns = [
        { field: "data", headerName: "Data", width: 130 },
        { field: "status_texto", headerName: "Status", width: 130 },
        { field: "nome", headerName: "Nome", width: 250 },        
        { field: "telefone", headerName: "Telefone", width: 150 },
        { field: "uf_mora", headerName: "UF Mora", width: 80 },
        { field: "origem", headerName: "Origem Recrutamento", width: 170 },
      ];

    const handlerRowClick = (params, event, detail) => {
        navigate(`/instancia/${id}/recrutamentos/detalhe/${params.row.id}`);
    }
      
    return (
        <Application>
            <MyPanel >
                <Box >
                    <Box sx={{display: 'flex', marginBottom:'10px'}}>
                        <Box sx={style.siglaArea}>
                            <MyLabel sx={style.siglaText} component="p" text={states.instancia.value.organizacao_sigla}/>
                        </Box>
                        <MyLabel sx={{marginLeft:'5px'}} component="h3" text={`Recrutamentos: ${states.instancia.value.nome}`}/>
                    </Box>
                    <Box sx={{display: "grid", gridTemplateColumns: "1fr" , gap:'5px'}}>
                        <MyButton onClick={handlerCadastrar} color="success"  text="Cadastrar" variant="contained"/>
                    </Box>

                    {
                        states.recrutandos.value.length > 0 ?
                        <Box sx={{ height: 400, width: "100%" }}>
                            <DataGrid
                                onRowClick={handlerRowClick}
                                rows={states.recrutandos.value}
                                columns={columns}
                                initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 5 },
                                },
                                }}
                                pageSizeOptions={[5, 10]}
                                disableColumnSelector
                            />
                        </Box> : null
                    }

                </Box>
            
            </MyPanel>
        </Application>
    )
}

export default InstanciaRecrutamentos;

