import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';



const MySelect = (props) => {

    const renderOptions = (option, key) => {
          return <MenuItem key={key} value={key}>{option}</MenuItem>  
      };

    return (

    <FormControl fullWidth>
      <InputLabel id={`labelId${props.label}`}>{props.label}</InputLabel>
      <Select
        id={props.id}
        labelId={`labelId${props.label}`}
        value={props.value}
        label={props.label}
        onChange={props.onChange}
        size={props.size}
        sx={props.sx}
      >
        {props.options?.map((option) => renderOptions(option.nome, option.id)
        )}
      </Select>
    </FormControl>

      );


};

export default MySelect;