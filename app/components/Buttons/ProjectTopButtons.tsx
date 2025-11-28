import { useState } from 'react';
// Importing Icons
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';

import '../../page.css';
import AddProj from './ProjButtons/AddProj';
import DeleteProj from './ProjButtons/DeleteProj';
import { Project } from '@/app/page';

export default function ProjectTopButtons({
    setProjectTB,
    selectedProj,
} : {
    setProjectTB:React.Dispatch<React.SetStateAction<Project[]>>
    selectedProj:Project | null,
}){

    const [action, setAction] = useState<'Add' | 'Delete' | null>(null);

    return (
        <div className="managementButtons">
            <button onClick={() => setAction('Add')}>
                <AddOutlinedIcon />
                <span>Add</span>
            </button>
            <button onClick={() => setAction('Delete')}>
                <RemoveOutlinedIcon />
                <span>Delete</span>
            </button>

            {action === 'Add' && <AddProj setProjectAP={setProjectTB} setShowAdd={setAction} />}
            {action === 'Delete' && selectedProj && (<DeleteProj setProjectDP={setProjectTB} setShowDelete={setAction} projectSelected={selectedProj} />)}
        </div>
    );
}