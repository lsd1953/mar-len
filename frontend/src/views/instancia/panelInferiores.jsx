import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyPanel from "../../components/myPanel";

import Styles from "./style";

const PanelInferiores = ({ instancia, inferiores, permissao }) => {


  const navigate = useNavigate();

  const cadastra = () =>{
    return permissao.cadastra || permissao.assistente
  }

  const handlerCriar= () => {
    navigate(`/instancia/${instancia}/cadastrar`);
  };

  const handlerVincularAssistencia = () => {
    navigate(`/instancia/${instancia}/assistencia/vincular`);
  }

  const handlerRemoverAssistencia = () => {
    navigate(`/instancia/${instancia}/assistencia/remover`);
  }

  const columns = [
    { field: "nome", headerName: "Nome", width: 400 },
    { field: "militantes", headerName: "Militantes", width: 85 },
    { field: "assistencias", headerName: "Assistentes", width: 250 },
  ]

  if (cadastra()){
    columns.push(
      { field: "", headerName: "Açoes", width: 160, renderCell: (cellValues) => {

          return (
              <Box sx={{display:'grid', gap:'5px', gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <MyButton text='editar' color="success" size='small' variant="contained"/>
                  <MyButton text='apagar' color="warning" size='small' variant="contained"/>
              </Box>
          )
       }}
    )
  }
  

  let style = Styles();
  

  return (
    <MyPanel>
      <Stack spacing={2}>
        <Box>
          <MyLabel sx={style.title2} component="h2" text="Instancias Inferiores" />
          <Box sx={{display:'flex'}}>
            <Box>
              <MyLabel component="h2" text="Total de Instancias:" />
            </Box>
            <Box sx={{marginLeft:'5px'}}>
                <MyLabel component="h2" text={inferiores.length} />
            </Box>
          </Box>
          <Box sx={{display:'flex'}}>
            <Box>
              <MyLabel component="h2" text="Total de Militantes:" />
            </Box>
            <Box sx={{marginLeft:'5px'}}>
                <MyLabel component="h2" text={`${inferiores.length > 0 ? inferiores.reduce((n,{militantes})=>n+militantes,0): 0}`} />
            </Box>
          </Box>
        </Box>
        {
          cadastra() ?
          <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr" , gap:'5px'}}>
              <MyButton onClick={handlerCriar} color="success" text="Criar" variant="contained"/>
              <MyButton onClick={handlerVincularAssistencia} color="warning" text="Vincular assistencia" variant="contained"/>
              <MyButton onClick={handlerRemoverAssistencia} color="error" text="Remover assistencia" variant="contained"/>
          </Box> : null
        }
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={inferiores}
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
    </MyPanel>
  );
};

export default PanelInferiores;
