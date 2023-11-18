import Box from '@mui/material/Box';

import { useNavigate } from 'react-router-dom';
import Styles from './style';
import MyPanel from '../../components/myPanel';
import MyLabel from '../../components/myLabel';
import MyButton from '../../components/myButton';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const PanelInstancia = ({ salario, instancia, style, getContribuicoes }) => {

    const navigate = useNavigate();
    const [contribuicoes, setContribuicoes] = useState([])

    const handlerCadastrar = () => {
        navigate(`/contribuicoes/${instancia.id}/cadastrar`);
    }

    const _getContribuicoes = async ()=>{
        let result = await getContribuicoes(instancia.id)
        if (result){
            setContribuicoes(result)
        }
    }

    useEffect(() => {
        _getContribuicoes()
    }, []);


    const columns = [
        { field: "data", headerName: "Data", width: 130 },
        { field: "valor", headerName: "Valor", width: 100 },
        { field: "tipo", headerName: "Tipo", width: 100 },
        { field: "referencia_texto", headerName: "Referencia", width: 170 },
        { field: "descricao", headerName: "Descrição", width: 300 },
       
    
      ];
    

  return (
    <MyPanel >
        <Box >
            <Box sx={{display: 'flex'}}>
                <Box sx={style.siglaArea}>
                    <MyLabel sx={style.siglaText} component="p" text={instancia.organizacao_sigla}/>
                </Box>
                <MyLabel sx={{marginLeft:'5px'}} component="h3" text={instancia.nome}/>
            </Box>
            <Box sx={{marginTop:'20px', display: 'flex', justifyContent:'right'}}>
                <MyLabel sx={{marginRight:'5px',fontWeight: 'bold'}} component="p" text='Valor da contribuição mensal: '/>
                <MyLabel text={salario? salario / 100 * instancia.organizacao_contribuicao:0.0}/>
            </Box>
            <Box sx={{display: "grid", gridTemplateColumns: "1fr" , gap:'5px'}}>
                <MyButton color="success" onClick={handlerCadastrar} text="Cadastrar" variant="contained"/>
            </Box>

            {
                contribuicoes.length > 0 ?
                <Box sx={{ height: 400, width: "100%" }}>
                    <DataGrid
                        rows={contribuicoes}
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
    
    </MyPanel>);
};

const PanelContribuicaoInstancia  = ({ instancias, salario, getContribuicoes }) => {

  
    let style = Styles();
    
    return (
      <MyPanel>
          <MyLabel sx={style.title2} component="h2" text={"Instancias"} />
          <Box sx={style.areaInstancias}>
              {instancias?.map((instancia) => (
                  <PanelInstancia key={instancia.id} instancia={instancia} style={style} salario={salario} getContribuicoes={getContribuicoes}/>
              ))}
        </Box>
      </MyPanel>
    );
}

export default PanelContribuicaoInstancia;