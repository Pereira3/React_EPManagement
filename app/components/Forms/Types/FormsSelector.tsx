import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function FormsSelector ({value, onChange}:{value:string, onChange: (val:string) => void}){
    return(
        <Box sx={{ display: 'flex', gap:'15px'}}>
            <span>Role: </span>
            <FormControl>
                <RadioGroup
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                >
                    <FormControlLabel value='None' control={<Radio />} label="(none selected)" />
                    <FormControlLabel value="JE" control={<Radio />} label="Junior Engineer" />
                    <FormControlLabel value="PM" control={<Radio />} label="Project Manager" />
                    <FormControlLabel value="SE" control={<Radio />} label="Senior Engineer" />
                    <FormControlLabel value="TM" control={<Radio />} label="Team Manager" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}