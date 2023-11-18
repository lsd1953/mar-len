import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const MyCheckbox = (props) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Checkbox checked={props.checked} onChange={props.onChange} />}
        label={
          props.size === "small" ? (
            <span style={{ fontSize: "0.8rem" }}>{props.label}</span>
          ) : (
            props.label
          )
        }
      />
    </FormGroup>
  );
};

export default MyCheckbox;
