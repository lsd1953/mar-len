import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const MyDataInput = (props) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker 
                {...props}
                format="DD/MMM/YYYY"
            />
        </LocalizationProvider>
    );
};

export default MyDataInput;