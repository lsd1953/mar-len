import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const MyDataTimeInput = ({value, onChange}) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker 
            value={value} 
            onChange={onChange} 
            format="DD/MMM/YYYY HH:mm"
            />
        </LocalizationProvider>
    );
};

export default MyDataTimeInput;