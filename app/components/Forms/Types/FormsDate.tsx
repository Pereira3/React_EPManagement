import Box from '@mui/material/Box';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import 'dayjs/locale/en-gb';

export default function FormsDate({value, updt}:{value:Dayjs, updt: (val: string) => void}){
    
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'15px'}}>
            <span>Date: </span>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker
                    autoFocus
                    minDate={dayjs('1903-01-01')}
                    maxDate={dayjs()}
                    value={value}
                    onChange={(e) => (e !== null ? updt(e.format("DD-MM-YYYY")) : '')}
                    slotProps={{
                        textField:{required:true}
                    }}
                />
            </LocalizationProvider>
        </Box>
    )
}