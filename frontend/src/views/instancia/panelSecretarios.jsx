import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import MyLabel from "../../components/myLabel";
import MyButton from "../../components/myButton";
import MyPanel from "../../components/myPanel";

import Styles from "./style";


const PanelSecretarios = ({ instancia, secretario, permissao }) => {

  const navigate = useNavigate();

  const cadastra = () =>{
    return permissao.cadastra || permissao.assistente
  }

  const handlerRemover = () => {
    navigate(`/instancia/${instancia}/secretarias/remover`);
  };

  const handlerCadastrar = () => {
    navigate(`/instancia/${instancia}/secretarias/cadastrar`);
  };

  let style = Styles();
  return (
    <MyPanel>
      <Stack spacing={2}>
        <MyLabel sx={style.title2} component="h2" text="Secretarias" />
        {
          cadastra() ?
          <Box sx={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr" , gap:'5px'}}>
            <MyButton color="success" onClick={handlerCadastrar} text="Cadastrar" variant="contained"/>
            <MyButton color="error" onClick={handlerRemover} text="Remover" variant="contained"/>
          </Box> : null
        }
        <Box sx={{ width: "100%" }}>
          {
            secretario?.map((item, key)=>{
              return (
                <Box key={key} sx={{display:'flex'}}>
                  <Box>
                    <MyLabel sx={{ fontSize: "12pt", fontWeight: 600,}} component="p" text={`${item.funcao.nome}:`} />
                  </Box>
                  <Box sx={{marginLeft:'5px'}}>
                    <MyLabel component="p" text={item.militante.apelido} />
                  </Box>
                </Box>
              )
            })
          }
        </Box>
      </Stack>
    </MyPanel>
  );
};

export default PanelSecretarios;
