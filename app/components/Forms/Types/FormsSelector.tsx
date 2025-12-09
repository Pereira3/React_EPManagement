import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { StringifyOptions } from 'querystring';

export default function FormsSelector ({value, updt}:{value:string, updt: (val: string) => void}){
    return(
        <Box sx={{ display: 'flex', gap:'15px'}}>
            <span>Role: </span>
            <FormControl>
                <RadioGroup
                    value={value}
                    onChange={(e) => updt(e.target.value)}
                >
                    <FormControlLabel value='None' control={<Radio />} label="(none selected)" />
                    <FormControlLabel value="Junior Engineer" control={<Radio />} label="Junior Engineer" />
                    <FormControlLabel value="Project Manager" control={<Radio />} label="Project Manager" />
                    <FormControlLabel value="Senior Engineer" control={<Radio />} label="Senior Engineer" />
                    <FormControlLabel value="Team Manager" control={<Radio />} label="Team Manager" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}