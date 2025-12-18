import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';

export default function FormsDropdown({sets, setName, value, updt}:{sets:string[], setName?:string, value:string, updt: (val:string) => void}) {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'15px'}}>
            {setName ? <span>{setName}: </span> : null}
            <Select
                autoComplete='false'
                id="set"
                value={value}
                onChange={(e) => updt(e.target.value)}
                input={<OutlinedInput/>}
            >
                {sets?.map((data) => (
                    <MenuItem
                        key={data}
                        value={data}
                    >
                        {data}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}