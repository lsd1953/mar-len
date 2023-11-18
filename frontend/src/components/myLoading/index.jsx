import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


const MyLoading = ({ render }) => {

    return (
    <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={render}
    >
        <CircularProgress color="primary" />
    </Backdrop>)

};
export default MyLoading;