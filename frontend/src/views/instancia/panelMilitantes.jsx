
import { useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BlockIcon from '@mui/icons-material/Block';
import PersonIcon from '@mui/icons-material/Person';

import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyPanel from "../../components/myPanel";

import Styles from "./style";

const PanelMilitantes = ({ instancia, militantes, permissao }) => {

  const navigate = useNavigate();

  const cadastra = () =>{
    return permissao.cadastra || permissao.assistente
  }

  const handlerRemover = () => {
    navigate(`/instancia/${instancia}/militante/remover`);
  };

  const handlerCadastrar = () => {
    navigate(`/instancia/${instancia}/militante/cadastrar`);
  };

  const handlerVincular = () => {
    navigate(`/instancia/${instancia}/militante/vincular`);
  };

  const columns = [
    { field: "apelido", headerName: "Apelido", width: 300 },
    { field: "isUser", headerName: "Usuario", width: 70, renderCell: (cellValues) => {
        if (cellValues?.row?.isUser){
            return <PersonIcon sx={{color:'green'}}/>
        }
        return <BlockIcon sx={{color:'red'}}/>
    } },

  ];

  let style = Styles();
  return (
    <MyPanel>
      <Stack spacing={2}>
        <Box>
          <MyLabel sx={style.title2} component="h2" text="Militantes" />
          <Box sx={{display:'flex'}}>
              <Box>
                <MyLabel component="h2" text="Total de militantes:" />
              </Box>
              <Box sx={{marginLeft:'5px'}}>
                  <MyLabel component="h2" text={militantes.length} />
              </Box>
            </Box>
        </Box>
        {
          cadastra() ?
          <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr" , gap:'5px'}}>
            <MyButton color="success" onClick={handlerCadastrar} text="Cadastrar" variant="contained"/>
            <MyButton color="warning" onClick={handlerVincular} text="Vincular" variant="contained"/>
            <MyButton color="error" onClick={handlerRemover} text="Remover" variant="contained"/>
          </Box> : null
        }
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={militantes}
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

export default PanelMilitantes;
