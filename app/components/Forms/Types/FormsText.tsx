import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormsText ({value, onChange }: {value: string; onChange: (val: string) => void }){
    
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'15px'}}>
            <span>Name: </span>
            <TextField
                autoFocus
                autoComplete='off'
                required
                margin="normal"
                name="name"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                type="text"
            />
        </Box>
    );
}