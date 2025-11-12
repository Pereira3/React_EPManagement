import {useState} from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import Box from '@mui/material/Box';
import { MenuItem } from '@mui/material';

const teamsAvailable = [
    'Not Defined',
    'Team A',
    'Team B',
    'Team C',
    'Team D',
]

export default function FormsTeam({value, onChange} : {value:string, onChange: (val:string) => void}) {

    const [team, setTeam] = useState('Not Defined');

    const onTeamChange = (event: SelectChangeEvent<typeof team>) => {
        setTeam(event.target.value);
        onChange(event.target.value)
    }

    return(
        <Box sx={{ display: 'flex', alignItems: 'center', gap:'15px'}}>
            <span>Team:</span>
            <Select
                autoComplete='false'
                id="team"
                value={team}
                onChange={onTeamChange}
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