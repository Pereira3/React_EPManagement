import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';

import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';

const teamsAvailable = [
    'Not Defined',
    'Team A',
    'Team B',
    'Team C',
    'Team D',
]

export default function FormsDropdown({value, onChange} : {value:string, onChange: (val:string) => void}) {
    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'15px'}}>
            <span>Team: </span>
            <Select
                autoComplete='false'
                id="team"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                input={<OutlinedInput/>}
            >
                {teamsAvailable.map((team) => (
                    <MenuItem
                        key={team}
                        value={team}
                    >
                        {team}
                    </MenuItem>
                ))}
            </Select>
        </Box>
    );
}