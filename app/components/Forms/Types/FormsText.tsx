import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormsText ({value, updt }: {value: string; updt: (val: string) => void }){
    
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
                onChange={(e) => updt(e.target.value)}
                type="text"
            />
        </Box>
    );
}