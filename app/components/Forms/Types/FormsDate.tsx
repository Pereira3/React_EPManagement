import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

//TODO: Treat Exceptions for Under 2500 years and add more bits

export default function FormsDate({value, onChange}:{value:string, onChange: (val:string) => void}){
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'15px'}}>
            <span>Date: </span>
            <TextField
                autoFocus
                autoComplete='false'
                required
                margin="normal"
                id="startDate"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="date"
            />
        </Box>
    )
}