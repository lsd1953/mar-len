import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


export const style = {

    card:{
        position:'relative',
        padding: '5px',
        display:'flex',
        boxShadow: '10px 7px 10px 0px rgba(0, 0, 0, 0.36)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content:{
        display:'flex',
        width: '100%',
        height:'100%',
        justifyContent: 'left',
        alignItems: 'left',
        flexDirection: 'column',
        marginTop:'5pt'
    },
}

const MyPanel = ({ onClick, children, sx}) => {

    let styleCard = {...style.card, ...sx, cursor: onClick? 'pointer':'none'}

    
    return (
        <Card onClick={onClick} sx={styleCard}>
            <CardContent sx={style.content}>
                {children}
            </CardContent>
        </Card>
    )
};

export default MyPanel;