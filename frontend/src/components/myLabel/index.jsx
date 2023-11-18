import Typography from "@mui/material/Typography";

const MyLabel = ({ onClick, variant, component, text, sx }) => {
  return (
    <Typography
      onClick={onClick}
      variant={variant}
      component={component}
      sx={sx}
    >
      {text}
    </Typography>
  );
};

export default MyLabel;
