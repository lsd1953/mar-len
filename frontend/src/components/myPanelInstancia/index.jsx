import Box from '@mui/material/Box';
import MyPanel from '../myPanel';
import MyLabel from '../myLabel';
import MyImage from '../myImage';
import instanciaPNG from '../../assets/imgs/instancia.png'
import { useNavigate } from 'react-router-dom';
import Styles from './style';

const PanelInstancia = ({ instancia, style, onClick }) => {
    
    let tipo = 'Base';
    if (instancia.tipo ===0){
        tipo = 'Nacional'
    } else if (instancia.tipo ===1){
        tipo = 'Fração'
    } else if (instancia.tipo ===2){
        tipo = 'Estadual'
    } 

  return (
    <MyPanel onClick={onClick}>
        <Box >
            <Box><MyLabel sx={style.title3} component="h3" text={instancia.nome}/></Box>
            <Box sx={{display:'flex', justifyContent:'center'}}>

                <MyImage src={instanciaPNG} sx={style.image} alt='marxismo-leninismo'/>
            </Box>
            <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                <Box sx={style.siglaArea}>
                    <MyLabel sx={style.siglaText} component="p" text={instancia.organizacao_sigla}/>
                </Box>
                <Box>
                    <MyLabel component="p" text={tipo}/>
                </Box>
            </Box>

        </Box>
    
    </MyPanel>);
};

const MyPanelInstancia  = ({ instancias, title }) => {
    const navigate = useNavigate();
  
    const handlerPanelInstancia = (id) =>{
      navigate(`/instancia/${id}`)
    }
  
    let style = Styles();
    return (
      <MyPanel>
          <MyLabel sx={style.title2} component="h2" text={title ? title: "Instâncias"} />
          <Box sx={style.areaInstancias}>
              {instancias?.map((instancia) => (
                  <PanelInstancia onClick={()=>handlerPanelInstancia(instancia.id)} key={instancia.id} instancia={instancia} style={style} />
              ))}
        </Box>
      </MyPanel>
    );
}

export default MyPanelInstancia;