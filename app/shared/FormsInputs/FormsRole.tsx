import {useState} from 'react';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function FormsRole ({value, onChange}:{value:string, onChange: (val:string) => void}){

    //Default value = FormControlLabel desired
    const [role, setRole] = useState('none');

    const handleRole = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRole(event.target.value);
        onChange(event.target.value);
    };

    return(
        <Box sx={{ display: 'flex', gap:'15px'}}>
            <span>Role:</span>
            <FormControl>
                <RadioGroup
                    value={value}
                    onChange={handleRole}
                >
                    <FormControlLabel value="none" control={<Radio />} label="(none selected)" />
                    <FormControlLabel value="je" control={<Radio />} label="Junior Engineer" />
                    <FormControlLabel value="pm" control={<Radio />} label="Project Manager" />
                    <FormControlLabel value="se" control={<Radio />} label="Senior Engineer" />
                    <FormControlLabel value="tm" control={<Radio />} label="Team Manager" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}