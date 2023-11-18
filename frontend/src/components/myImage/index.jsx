import Box from '@mui/material/Box';

const MyImage = ({ src, alt, sx, onClick}) => {
    return (
        <Box sx={sx} component="img" alt={alt} src={src} onClick={onClick} />
    )
};

export default MyImage;