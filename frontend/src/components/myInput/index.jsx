import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import SchoolIcon from '@mui/icons-material/School';


const MyInput = (props) => {


    let icon = props.icon

    if (!icon){
        return <TextField {...props} variant="outlined" />

    }
    else {

        let IconConponent = AccountCircle

        if (icon ==='password'){
            IconConponent = LockIcon
        }
        else if (icon ==='school'){
            IconConponent = SchoolIcon
        }

        return (
            <TextField 
                {...props} 
                variant="outlined" 
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconConponent />
                      </InputAdornment>
                    ),
                  }}
            />
        )
    }

};

export default MyInput;