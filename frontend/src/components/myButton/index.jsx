import Button from "@mui/material/Button";

const MyButton = (props) => {
  return <Button {...props}>{props.text}</Button>;
};

export default MyButton;
